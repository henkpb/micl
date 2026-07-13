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
}

export interface ComponentHandler<T extends HTMLElement> extends ComponentEventHandlers {
    initialize?: (element: T) => void;
    cleanup?   : (element: T) => void;
}

interface ComponentEntry<T extends HTMLElement> {
    component: ComponentHandler<T>;
    type: new () => T;
}

interface Registry {
    map      : Record<string, ComponentEntry<any>>;
    rippled  : WeakSet<HTMLElement>;
    activated: boolean;
}

type EventHandlerKey = keyof ComponentEventHandlers;

// The registry lives on globalThis because every standalone component bundle carries its
// own copy of this module: they must share one component map and one activation
// (MutationObserver + delegated document listeners).
const registry: Registry = ((globalThis as any).__miclRegistry ??= {
    map      : {},
    rippled  : new WeakSet<HTMLElement>(),
    activated: false
});

const selector = (): string => Object.keys(registry.map).join(',');

const findEntry = (element: HTMLElement): ComponentEntry<HTMLElement> | undefined =>
    Object.entries(registry.map)
        .find(([selector, { type }]) => element.matches(selector) && element instanceof type)
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

const initializeComponents = (parent: HTMLDocument | HTMLElement): void => {
    const s = selector();
    if (s) {
        parent.querySelectorAll<HTMLElement>(s).forEach(initializeComponent);
    }
    parent.querySelectorAll<HTMLElement>('[class*="micl-"], [class*="micl-"] > summary').forEach(element => {
        if (registry.rippled.has(element)) return;

        if (window.getComputedStyle(element).getPropertyValue('--micl-ripple') === '1') {
            element.addEventListener('pointerdown', (e: PointerEvent) => {
                if ((e.currentTarget as Element).classList.contains('micl-card--nonactionable')) {
                    return;
                }
                e.stopPropagation();

                const r = element.getBoundingClientRect();
                element.style.setProperty('--micl-x', `${e.clientX - r.left}px`);
                element.style.setProperty('--micl-y', `${e.clientY - r.top}px`);

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
            });

            registry.rippled.add(element);
        }
    });

    initializeScrollbars();
};

const cleanupComponent = (element: HTMLElement): void => {
    const entry = findEntry(element);
    if (entry && typeof entry.component.cleanup === 'function') {
        entry.component.cleanup(element);
    }
};

const cleanupComponents = (parent: HTMLDocument | HTMLElement): void => {
    const s = selector();
    if (s) {
        parent.querySelectorAll<HTMLElement>(s).forEach(cleanupComponent);
    }
};

const handleEvent = (event: Event): void => {
    const s = selector();
    if (!s) return;

    const target = (event.target as Element).closest(s);
    if (!(target instanceof HTMLElement)) return;

    const entry = findEntry(target);
    const key   = event.type as EventHandlerKey;
    if (entry && typeof entry.component[key] === 'function') {
        entry.component[key]?.(event);
    }
};

const activate = () => {
    if (registry.activated) {
        return;
    }
    registry.activated = true;

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type !== 'childList') {
                return;
            }
            mutation.addedNodes.forEach(node => {
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
    observer.observe(document.body, { childList: true, subtree: true });

    initializeComponents(document);

    // Delegated Event Handlers
    document.addEventListener('change', handleEvent);
    document.addEventListener('input', handleEvent);
    document.addEventListener('keydown', handleEvent);
};

//
// Registers a component handler and returns it, so a component module can wrap its default export.
// Registration alone activates nothing; the first module loaded activates the shared runtime once
// the document is ready, and later registrations (bundles loaded after that) initialize their
// elements here.
//
export const register = <T extends HTMLElement, C extends ComponentHandler<T>>(
    componentSelector: string,
    component: C,
    type: new () => T
): C => {
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

if (document.readyState !== 'loading') {
    activate();
}
else {
    document.addEventListener('DOMContentLoaded', loaded);
}

export default {
    initialize: () => initializeComponents(document),
    cleanup   : () => cleanupComponents(document)
};
