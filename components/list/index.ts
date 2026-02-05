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

export default (() =>
{
    const isDisabled = (item: HTMLElement | null): boolean => !!item && item.classList.contains('micl-list-item--disabled');
    const isSelected = (item: HTMLElement | null): boolean => !!item && item.matches(':has(input[type=checkbox]:checked)');

    return {
        keydown: (event: Event): void =>
        {
            if (
                !(event instanceof KeyboardEvent)
                || !(event.target instanceof Element)
                || !event.target.matches('.micl-list-item-one,.micl-list-item-two,.micl-list-item-three')
            ) {
                return;
            }
            const parent = (event.target as Element).parentElement;
            if (!parent) return;

            let items: HTMLElement[] = [];

            if (parent instanceof HTMLDetailsElement) {
                items = Array.from(parent.parentElement?.children || []).map(details => {
                    let summary = details.querySelector(':scope > summary') as HTMLElement;
                    return isDisabled(summary) ? null : summary;
                }).filter(item => !!item);
            }
            else if (parent instanceof HTMLUListElement || parent instanceof HTMLOListElement) {
                items = Array.from(parent.children).map(child => {
                    return (
                        (child instanceof HTMLLIElement)
                        && !isDisabled(child)
                        && (child.role !== 'separator')
                    ) ? child : null;
                }).filter(item => !!item);
            }
            if (items.length === 0) {
                return;
            }

            const selectedIndex = items.findIndex(item => isSelected(item));
            const currentItem   = document.activeElement as HTMLElement;
            const currentIndex  = items.indexOf(currentItem);

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
                    nextIndex = (selectedIndex === -1) ? 0 : selectedIndex;
                    break;
                case ' ':
                    event.preventDefault();
                case 'Enter':
                    const el = (event.target as Element).querySelector(
                        'input[type=checkbox], a[href], button'
                    );
                    if (el instanceof HTMLInputElement) {
                        el.checked = !el.checked;
                    }
                    else if (el instanceof HTMLAnchorElement) {
                        el.click();
                    }
                    else if (el instanceof HTMLButtonElement) {
                        el.dispatchEvent(new MouseEvent('mouseenter', {
                            bubbles   : true,
                            cancelable: true,
                            view      : window
                        }));
                    }
                    break;
                default:
            }

            if (nextIndex !== currentIndex) {
                currentItem?.setAttribute('tabindex', '-1');
                items[nextIndex].setAttribute('tabindex', '0');
                items[nextIndex].focus();
            }
        },

        initialize: (element: HTMLElement): void =>
        {
            if (element.dataset.miclinitialized) return;

            element.dataset.miclinitialized = '1';

            if (element.querySelectorAll<HTMLLIElement>('li[tabindex="0"]').length === 0) {
                return;
            }

            const items: HTMLLIElement[] = Array.from(element.querySelectorAll(
                'li:not([role="separator"])'
            ));

            items.forEach(item =>
            {
                if (item.getAttribute('tabindex') !== '0') {
                    item.setAttribute('tabindex', '-1');
                }

                const links = item.querySelectorAll('a, button, input');
                links.forEach(link => link.setAttribute('tabindex', '-1'));
            });
        }
    };
})();
