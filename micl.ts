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

import _bottomsheet, { bottomsheetSelector } from './components/bottomsheet';
import _button, { buttonSelector } from './components/button';
import _checkboxgroup, { checkboxGroupSelector } from './components/checkbox';
import _datepicker, { datepickerSelector } from './components/datepicker';
import _list, { listSelector } from './components/list';
import _menu, { menuSelector } from './components/menu';
import _navigationrail, { navigationrailSelector } from './components/navigationrail';
import _slider, { sliderSelector } from './components/slider';
import _stepper, { stepperSelector } from './components/stepper';
import _textfield, { textfieldSelector, textareaSelector, selectSelector } from './components/textfield';
import _timepicker, { timepickerSelector } from './components/timepicker';

interface ComponentEntry<T extends HTMLElement> {
    component: {
        initialize?: (element: T) => void,
        input?     : (event: Event) => void,
        keydown?   : (event: Event) => void,
        cleanup?   : (element: T) => void
    };
    type: new () => T;
}
type ComponentKey = keyof ComponentEntry<any>['component'];

export default (() =>
{
    const componentMap: Record<string, ComponentEntry<any>> = {
        [bottomsheetSelector]   : { component: _bottomsheet, type: HTMLDialogElement },
        [buttonSelector]        : { component: _button, type: HTMLButtonElement },
        [checkboxGroupSelector] : { component: _checkboxgroup, type: HTMLElement },
        [datepickerSelector]    : { component: _datepicker, type: HTMLDialogElement },
        [listSelector]          : { component: _list, type: HTMLElement },
        [menuSelector]          : { component: _menu, type: HTMLElement },
        [navigationrailSelector]: { component: _navigationrail, type: HTMLLabelElement },
        [selectSelector]        : { component: _textfield, type: HTMLSelectElement },
        [sliderSelector]        : { component: _slider, type: HTMLInputElement },
        [stepperSelector]       : { component: _stepper, type: HTMLElement },
        [textareaSelector]      : { component: _textfield, type: HTMLTextAreaElement },
        [textfieldSelector]     : { component: _textfield, type: HTMLInputElement },
        [timepickerSelector]    : { component: _timepicker, type: HTMLDialogElement }
    };

    const selector = Object.keys(componentMap).join(',');

    const initializeScrollbars = (): void =>
    {
        document.documentElement.style.setProperty(
            '--md-sys-scrollbar-thumb-color',
            window.getComputedStyle(document.body).getPropertyValue('--md-sys-color-outline').trim()
        );
    };

    const initializeComponent = (element: HTMLElement): void =>
    {
        for (const [selector, { component, type }] of Object.entries(componentMap)) {
            if (
                element.matches(selector)
                && element instanceof type
                && typeof component.initialize === 'function'
            ) {
                component.initialize(element);
                return;
            }
        }
    };

    const initializeComponents = (parent: HTMLDocument | HTMLElement): void =>
    {
        parent.querySelectorAll<HTMLElement>(selector).forEach(initializeComponent);

        parent.querySelectorAll<HTMLElement>('[class*="micl-"]').forEach(element =>
        {
            if (window.getComputedStyle(element).getPropertyValue('--micl-ripple') === '1') {
                element.addEventListener('pointerdown', e =>
                {
                    if ((e.currentTarget as Element).classList.contains('micl-card--nonactionable')) {
                        return;
                    }
                    e.stopPropagation();

                    let r = element.getBoundingClientRect();
                    element.style.setProperty('--micl-x', `${e.clientX - r.left}px`);
                    element.style.setProperty('--micl-y', `${e.clientY - r.top}px`);
                });
            }
        });

        initializeScrollbars();
    };

    const cleanupComponent = (element: HTMLElement): void =>
    {
        for (const [selector, { component, type }] of Object.entries(componentMap)) {
            if (
                element.matches(selector)
                && element instanceof type
                && typeof component.cleanup === 'function'
            ) {
                component.cleanup(element);
                return;
            }
        }
    };

    const cleanupComponents = (parent: HTMLDocument | HTMLElement): void =>
    {
        parent.querySelectorAll<HTMLElement>(selector).forEach(cleanupComponent);
    };

    const handleEvent = (event: Event): void =>
    {
        for (const [selector, { component, type }] of Object.entries(componentMap)) {
            if (typeof component[event.type as ComponentKey] === 'function') {
                const e = (event.target as Element).closest(selector);
                if (e instanceof type) {
                    component[event.type as ComponentKey]?.(event);
                    return;
                }
            }
        }
    };

    const activate = () =>
    {
        const observer = new MutationObserver(mutations =>
        {
            mutations.forEach(mutation =>
            {
                if (mutation.type !== 'childList') {
                    return;
                }
                mutation.addedNodes.forEach(node =>
                {
                    if (node instanceof HTMLElement) {
                        if (node.matches(selector)) {
                            initializeComponent(node);
                        }
                        node.querySelectorAll<HTMLElement>(selector).forEach(initializeComponent);
                    }
                });
                mutation.removedNodes.forEach(node =>
                {
                    if (node instanceof HTMLElement) {
                        if (node.matches(selector)) {
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
        document.addEventListener('input', handleEvent);
        document.addEventListener('keydown', handleEvent);
    };

    const loaded = () =>
    {
        document.removeEventListener('DOMContentLoaded', loaded);
        activate();
    };

    if (document.readyState !== 'loading') {
        activate();
    }
    else {
        document.addEventListener('DOMContentLoaded', loaded);
    }

    return {
        initialize: () => initializeComponents(document),
        cleanup   : () => cleanupComponents(document)
    };
})();
