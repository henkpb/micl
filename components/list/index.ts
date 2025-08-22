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

export const listSelector = '.micl-list-item-one,.micl-list-item-two,.micl-list-item-three';

export default (() =>
{
    const
        isDisabled = (item: HTMLElement | null): boolean => !!item && item.classList.contains('micl-list-item--disabled'),
        isSelected = (item: HTMLElement | null): boolean => !!item && item.matches(':has(input[type=checkbox]:checked)');

    return {
        keydown: (event: Event) =>
        {
            if (
                !(event instanceof KeyboardEvent)
                || !(event.target instanceof Element)
                || !event.target.matches('.micl-list-item-one,.micl-list-item-two,.micl-list-item-three')
            ) {
                return;
            }
            const parent = (event.target as Element).parentElement;
            if (!parent) {
                return;
            }

            let items: HTMLElement[] = [];
            if (parent instanceof HTMLDetailsElement) {
                items = Array.from(parent.parentElement?.children || []).map(details => {
                    let summary = details.querySelector(':scope > summary') as HTMLElement;
                    return isDisabled(summary) ? null : summary;
                }).filter(item => !!item);
            }
            else if (parent instanceof HTMLUListElement) {
                items = Array.from(parent.children).map(li => {
                    return ((li instanceof HTMLLIElement) && !isDisabled(li)) ? li : null;
                }).filter(item => !!item);
            }
            if (items.length === 0) {
                return;
            }

            let selectedIndex = items.findIndex(item => isSelected(item)),
                currentIndex  = items.findIndex(item => item.tabIndex === 0),
                nextIndex     = currentIndex;

            switch (event.key) {
                case 'ArrowDown':
                    nextIndex = (currentIndex + 1) % items.length;
                    event.preventDefault(); // prevent page scrolling
                    break;
                case 'ArrowUp':
                    nextIndex = (currentIndex - 1 + items.length) % items.length;
                    event.preventDefault();
                    break;
                case 'Tab':
                    if (selectedIndex === -1) {
                        if (currentIndex !== 0) {
                            items[currentIndex].tabIndex = -1;
                            items[0].tabIndex = 0;
                        }
                    }
                    else if (selectedIndex !== currentIndex) {
                        items[currentIndex].tabIndex = -1;
                        items[selectedIndex].tabIndex = 0;
                    }
                    break;
                case 'Enter':
                case ' ':
                    const cb = (event.target as Element).querySelector('input[type=checkbox]');
                    if (cb instanceof HTMLInputElement) {
                        cb.checked = !cb.checked;
                    }
                    break;
                default:
            }
            if (nextIndex !== currentIndex) {
                items[currentIndex].tabIndex = -1;
                items[nextIndex].tabIndex = 0;
                items[nextIndex].focus();

                const btn = items[nextIndex].querySelector(':scope > button');
                btn?.dispatchEvent(new MouseEvent('mouseenter', {
                    bubbles   : true,
                    cancelable: true,
                    view      : window
                }));
            }
        }
    };
})();
