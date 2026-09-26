//
// Copyright © 2025 Hermana AS
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

interface ComponentEventHandlers {
    input?  : (event: Event) => void;
    keydown?: (event: Event) => void;
    change? : (event: Event) => void;
    command?: (event: Event) => void;
}

export interface ComponentHandler<T extends HTMLElement> extends ComponentEventHandlers {
    initialize?: (element: T) => void;
    cleanup?   : (element: T) => void;
    reset?     : (element: T) => void;
}

interface ElementTypes {
    HTMLElement        : HTMLElement;
    HTMLButtonElement  : HTMLButtonElement;
    HTMLDialogElement  : HTMLDialogElement;
    HTMLInputElement   : HTMLInputElement;
    HTMLSelectElement  : HTMLSelectElement;
    HTMLTextAreaElement: HTMLTextAreaElement;
}

type ElementType = keyof ElementTypes;

interface ComponentEntry<T extends HTMLElement> {
    component: ComponentHandler<T>;
    type: ElementType;
}

interface Registry {
    map        : Record<string, ComponentEntry<any>>;
    activated  : boolean;
    initialized: WeakSet<HTMLElement>;
}

type EventHandlerKey = keyof ComponentEventHandlers;

const registry: Registry = ((globalThis as any).__miclRegistry ??= {
    map        : {},
    activated  : false,
    initialized: new WeakSet<HTMLElement>()
});

export const initialized: WeakSet<HTMLElement> = registry.initialized;

const rippleSelector = '[class*="micl-"], [class*="micl-"] > summary';

const selector = (): string => Object.keys(registry.map).join(',');

const findEntry = (element: HTMLElement): ComponentEntry<HTMLElement> | undefined =>
    Object.entries(registry.map)
        .find(([selector, { type }]) => element.matches(selector) && element instanceof window[type])
        ?.[1];

const initializeScrollbars = (): void => {
    document.documentElement.style.setProperty(
        '--md-sys-scrollbar-thumb-color',
        window.getComputedStyle(document.body).getPropertyValue('--md-sys-color-outline').trim()
    );
};

const initializeComponent = (element: HTMLElement): void => {
    const entry = findEntry(element);
    if (entry && typeof entry.component.initialize === 'function') {
        entry.component.initialize(element);
    }
};

const initializeComponents = (parent: Document | HTMLElement): void => {
    const s = selector();
    if (s) {
        parent.querySelectorAll<HTMLElement>(s).forEach(initializeComponent);
    }

    initializeScrollbars();
};

const rippleTarget = (target: EventTarget | null): HTMLElement | null => {
    let element = target instanceof Element ? target.closest<HTMLElement>(rippleSelector) : null;

    while (element) {
        if (
            !element.classList.contains('micl-card--nonactionable')
            && window.getComputedStyle(element).getPropertyValue('--micl-ripple') === '1'
        ) {
            return element;
        }
        element = element.parentElement?.closest<HTMLElement>(rippleSelector) ?? null;
    }

    return null;
};

const handlePointerDown = (event: PointerEvent): void => {
    const element = rippleTarget(event.target);
    if (!element) return;

    const r = element.getBoundingClientRect();
    element.style.setProperty('--micl-x', `${(event.clientX - r.left) / r.width * 100}%`);
    element.style.setProperty('--micl-y', `${(event.clientY - r.top) / r.height * 100}%`);

    element.classList.remove('micl-rippling');
    void element.offsetWidth;
    element.classList.add('micl-rippling');

    const cleanup = (ev: AnimationEvent): void => {
        if (ev.animationName !== 'micl-ripple') return;

        element.classList.remove('micl-rippling');
        element.style.removeProperty('--micl-x');
        element.style.removeProperty('--micl-y');
        element.removeEventListener('animationend', cleanup);
    };

    element.addEventListener('animationend', cleanup);
};

const cleanupComponent = (element: HTMLElement): void => {
    const entry = findEntry(element);
    if (entry && typeof entry.component.cleanup === 'function') {
        entry.component.cleanup(element);
    }
};

const cleanupComponents = (parent: Document | HTMLElement): void => {
    const s = selector();
    if (s) {
        parent.querySelectorAll<HTMLElement>(s).forEach(cleanupComponent);
    }
};

const handleEvent = (event: Event): void => {
    const s = selector();
    if (!s) return;

    if (!(event.target instanceof Element)) return;

    const key = event.type as EventHandlerKey;
    let target = event.target.closest<HTMLElement>(s);

    while (target) {
        const handler = findEntry(target)?.component[key];
        if (typeof handler === 'function') {
            handler(event);
            return;
        }
        target = target.parentElement?.closest<HTMLElement>(s) ?? null;
    }
};

const handleReset = (event: Event): void => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    requestAnimationFrame(() => {
        if (event.defaultPrevented) return;

        const s = selector();
        new Set<Element>([...form.elements, ...(s ? form.querySelectorAll(s) : [])]).forEach(element => {
            if (element instanceof HTMLElement) {
                findEntry(element)?.component.reset?.(element);
            }
        });
    });
};

const activate = () => {
    if (registry.activated) {
        return;
    }
    registry.activated = true;

    const bodyObserver = new MutationObserver(initializeScrollbars);
    const observeBody  = (): void => {
        bodyObserver.disconnect();
        bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
    };

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type !== 'childList') {
                return;
            }
            mutation.addedNodes.forEach(node => {
                if (node === document.body) {
                    observeBody();
                    initializeScrollbars();
                }
                if (node instanceof HTMLElement) {
                    const s = selector();
                    if (s && node.matches(s)) {
                        initializeComponent(node);
                    }
                    if (s) {
                        node.querySelectorAll<HTMLElement>(s).forEach(initializeComponent);
                    }
                }
            });
            mutation.removedNodes.forEach(node => {
                if (node instanceof HTMLElement) {
                    const s = selector();
                    if (s && node.matches(s)) {
                        cleanupComponent(node);
                    }
                    cleanupComponents(node);
                }
            });
        });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    observeBody();

    initializeComponents(document);

    document.addEventListener('change', handleEvent);
    document.addEventListener('input', handleEvent);
    document.addEventListener('keydown', handleEvent);
    document.addEventListener('command', handleEvent, true);
    document.addEventListener('reset', handleReset);
    document.addEventListener('pointerdown', handlePointerDown);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', initializeScrollbars);
};

//
// Registers a component handler and returns it, so a component module can wrap its default export.
// Registration alone activates nothing; the first module loaded activates the shared runtime once
// the document is ready, and later registrations (bundles loaded after that) initialize their
// elements here. The first registration of a selector wins: every script bundles its own copy of
// the component module, and module state (such as the date picker's) must stay with one copy.
//
export const register = <K extends ElementType, C extends ComponentHandler<ElementTypes[K]>>(
    componentSelector: string,
    component: C,
    type: K
): C => {
    const registered = registry.map[componentSelector];
    if (registered) {
        return registered.component as C;
    }
    registry.map[componentSelector] = { component, type };
    if (registry.activated) {
        document.querySelectorAll<HTMLElement>(componentSelector).forEach(initializeComponent);
    }
    return component;
};

const loaded = () => {
    document.removeEventListener('DOMContentLoaded', loaded);
    activate();
};

if (typeof document !== 'undefined') {
    if (document.readyState !== 'loading') {
        activate();
    }
    else {
        document.addEventListener('DOMContentLoaded', loaded);
    }
}

export default {
    initialize: () => initializeComponents(document),
    cleanup   : () => cleanupComponents(document)
};
