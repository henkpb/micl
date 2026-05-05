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

export const listSelector = '.micl-list';

const isDisabled   = (item?: HTMLElement | null) => item?.classList.contains('micl-list-item--disabled');
const isSelectable = (item?: HTMLElement | null) => item?.matches(':has(input[type=checkbox])');
const isSelected   = (item?: HTMLElement | null) => item?.matches(':has(input[type=checkbox]:checked)');

export default
{
    keydown(event: KeyboardEvent | Event): void
    {
        const target = event.target as HTMLElement;

        if (
            !(event instanceof KeyboardEvent)
            || !target?.matches('.micl-list-item-one,.micl-list-item-two,.micl-list-item-three')
        ) {
            return;
        }

        const parent = target.parentElement;
        if (!parent) return;

        const isAccordion = parent instanceof HTMLDetailsElement;
        let items: HTMLElement[] = [];

        if (isAccordion) {
            items = Array.from(parent.parentElement?.children || [])
                .map(details => details.querySelector(':scope > summary') as HTMLElement)
                .filter(Boolean);
        }
        else if (['UL', 'OL'].includes(parent.tagName)) {
            items = Array.from(parent.children).filter(child =>
                child instanceof HTMLLIElement && child.getAttribute('role') !== 'separator'
                ) as HTMLElement[];
        }

        items = items.filter(item => !isDisabled(item));
        if (!items.length) return;

        const currentIndex = items.indexOf(target);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault(); // prevent page scrolling
                nextIndex = (currentIndex + 1) % items.length;
                break;
            case 'ArrowUp':
                event.preventDefault();
                nextIndex = (currentIndex - 1 + items.length) % items.length;
                break;
            case 'Tab':
                if (!isAccordion) {
                    const selectedIndex = items.findIndex(isSelected);
                    nextIndex = selectedIndex === -1 ? 0 : selectedIndex;
                }
                break;
            case ' ':
            case 'Enter':
                if (isAccordion) break;
                if (event.key === ' ') {
                    event.preventDefault();
                }
                const el = target.querySelector<HTMLElement>(
                    'input[type=checkbox], a[href], button'
                );
                if (el instanceof HTMLInputElement) {
                    el.checked = !el.checked;
                    el.dispatchEvent(new Event('change', {
                        bubbles   : true,
                        cancelable: true
                    }));
                }
                else {
                    el?.click();
                }
                break;
            default:
        }

        if (nextIndex !== currentIndex) {
            if (!isAccordion) {
                target.setAttribute('tabindex', '-1');
                items[nextIndex].setAttribute('tabindex', '0');
            }
            items[nextIndex].focus();
        }
    },

    initialize(element: HTMLElement): void
    {
        if (element.dataset.miclinitialized) return;
        element.dataset.miclinitialized = '1';

        element.querySelectorAll<HTMLElement>(
            ':scope > details > summary.micl-list-item--disabled'
        ).forEach(summary => summary.setAttribute('tabindex', '-1'));

        if (!element.querySelector('li[tabindex="0"]')) return;

        element.querySelectorAll<HTMLLIElement>('li:not([role="separator"])').forEach(item =>
        {
            if (item.getAttribute('tabindex') !== '0') {
                item.setAttribute('tabindex', '-1');
            }

            item.querySelectorAll('a, button, input').forEach(link => link.setAttribute('tabindex', '-1'));

            if (isSelectable(item)) {
                item.setAttribute('role', 'option');
                item.parentElement?.setAttribute('role', 'listbox');
            }
        });
    }
};
