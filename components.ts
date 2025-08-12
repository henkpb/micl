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
import _checkbox, { checkboxSelector } from './components/checkbox';
import _list, { listSelector } from './components/list';
import _menu, { menuSelector } from './components/menu';
import _slider, { sliderSelector } from './components/slider';
import _textfield, { textfieldSelector, selectSelector, textareaSelector } from './components/textfield';

interface ComponentEntry<T extends HTMLElement> {
    component: {
        initialize?: (element: T) => void,
        input?     : (event: Event) => void,
        keydown?   : (event: Event) => void,
        cleanup?   : (element: T) => void
    };
    type: new () => T;
}

export default (() =>
{
    const componentMap: Record<string, ComponentEntry<any>> = {
        [bottomsheetSelector]: { component: _bottomsheet, type: HTMLDialogElement },
        [buttonSelector]     : { component: _button, type: HTMLButtonElement },
        [checkboxSelector]   : { component: _checkbox, type: HTMLInputElement },
        [listSelector]       : { component: _list, type: HTMLElement },
        [menuSelector]       : { component: _menu, type: HTMLElement },
        [selectSelector]     : { component: _textfield, type: HTMLSelectElement },
        [sliderSelector]     : { component: _slider, type: HTMLInputElement },
        [textareaSelector]   : { component: _textfield, type: HTMLTextAreaElement },
        [textfieldSelector]  : { component: _textfield, type: HTMLInputElement }
    };

    const selector = Object.keys(componentMap).join(',');

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

    const initializeComponents = () =>
    {
        document.querySelectorAll<HTMLElement>(selector).forEach(initializeComponent);

        document.querySelectorAll<HTMLElement>('[class*="micl-"]').forEach(element => {
            if (window.getComputedStyle(element).getPropertyValue('--miclripple')) {
                element.addEventListener('pointerdown', e => {
                    if ((e.currentTarget as Element).classList.contains('micl-card--nonactionable')) {
                        return;
                    }
                    const
                        x = e.clientX,
                        y = e.clientY,
                        r = element.getBoundingClientRect(),
                        d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
                    element.style.cssText = `--s:0;--o:1;`;
                    element.offsetTop;
                    element.style.cssText = `--t:1;--o:0;--d:${d};--x:${x - r.left};--y:${y - r.top}`;
                });
            }
        });
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
                    node.querySelectorAll<HTMLElement>(selector).forEach(cleanupComponent);
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    initializeComponents();

    // Delegated Event Handlers
    document.addEventListener('input', event =>
    {
        for (const [selector, { component, type }] of Object.entries(componentMap)) {
            if (
                (event.target as Element).matches(selector)
                && event.target instanceof type
                && typeof component.input === 'function'
            ) {
                component.input(event);
                return;
            }
        }
    });
    document.addEventListener('keydown', event =>
    {
        for (const [selector, { component, type }] of Object.entries(componentMap)) {
            if (
                (event.target as Element).matches(selector)
                && event.target instanceof type
                && typeof component.keydown === 'function'
            ) {
                component.keydown(event);
                return;
            }
        }
    });

    return {
        initialize: () => initializeComponents(),
        cleanup   : () => document.querySelectorAll<HTMLElement>(selector).forEach(cleanupComponent)
    };
})();
