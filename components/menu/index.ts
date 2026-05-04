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

export const menuSelector = '.micl-menu[popover]';

export default (() =>
{
    const getOrigin = (invoker: Element, popover: Element): string =>
    {
        const invokerRect = invoker.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();

        return ((invokerRect.x > popoverRect.x) ? 'right ' : 'left ') +
               ((invokerRect.y > popoverRect.y) ? 'bottom' : 'top');
    };

    const navigableItems = (list: Element): HTMLElement[] =>
        Array.from(list.children).filter((child): child is HTMLElement =>
            child instanceof HTMLLIElement
            && child.getAttribute('role') !== 'separator'
            && !child.classList.contains('micl-list-item--disabled')
            && child.matches('.micl-list-item-one,.micl-list-item-two,.micl-list-item-three')
        );

    return {
        initialize: (element: HTMLElement): void =>
        {
            if (
                !element.matches('.micl-menu[popover]')
                || element.dataset.miclinitialized
            ) {
                return;
            }
            element.dataset.miclinitialized = '1';

            const invoker = document.querySelector(`[popovertarget="${element.id}"]`);

            invoker && element.addEventListener('beforetoggle', () =>
            {
                element.style.transformOrigin = getOrigin(invoker, element);
            });

            element.addEventListener('keydown', (event: KeyboardEvent) =>
            {
                if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

                const target = event.target;
                if (
                    !(target instanceof HTMLElement)
                    || !target.matches('.micl-list-item-one,.micl-list-item-two,.micl-list-item-three')
                ) {
                    return;
                }

                const currentList = target.parentElement;
                if (!currentList?.matches('ul.micl-list')) return;
                if (currentList.parentElement !== element) return;

                const lists = Array.from(element.querySelectorAll<HTMLElement>(':scope > ul.micl-list'));
                if (lists.length < 2) return;

                const listIndex = lists.indexOf(currentList as HTMLElement);
                const items = navigableItems(currentList);
                const itemIndex = items.indexOf(target);
                if (itemIndex === -1) return;

                let nextItem: HTMLElement | undefined;

                if (event.key === 'ArrowDown' && itemIndex === items.length - 1) {
                    const nextListIndex = (listIndex + 1) % lists.length;
                    nextItem = navigableItems(lists[nextListIndex])[0];
                }
                else if (event.key === 'ArrowUp' && itemIndex === 0) {
                    const prevListIndex = (listIndex - 1 + lists.length) % lists.length;
                    const prev = navigableItems(lists[prevListIndex]);
                    nextItem = prev[prev.length - 1];
                }

                if (nextItem) {
                    event.preventDefault();
                    event.stopPropagation();
                    target.setAttribute('tabindex', '-1');
                    nextItem.setAttribute('tabindex', '0');
                    nextItem.focus();
                }
            }, true);

            element.querySelectorAll<HTMLButtonElement>(
                ':scope > ul.micl-list > li > button[popovertarget]'
            ).forEach(submenuinvoker =>
            {
                if (submenuinvoker.popoverTargetElement?.matches('.micl-menu[popover]')) {
                    const popover = submenuinvoker.popoverTargetElement as HTMLElement;
                    const id = `--${popover.id}`;
                    let hoverTimeout: ReturnType<typeof setTimeout>;

                    submenuinvoker.style.setProperty('anchor-name', id);
                    popover.style.insetBlockStart = `anchor(${id} start)`;
                    popover.style.insetInlineStart = `anchor(${id} end)`;

                    const scheduleClose = () =>
                    {
                        clearTimeout(hoverTimeout);
                        hoverTimeout = setTimeout(() =>
                        {
                            if (!submenuinvoker.matches(':hover') && !popover.matches(':hover')) {
                                popover.hidePopover();
                            }
                        }, 300);
                    };

                    submenuinvoker.addEventListener('mouseenter', () =>
                    {
                        clearTimeout(hoverTimeout);
                        popover.showPopover();
                    });
                    submenuinvoker.addEventListener('mouseleave', scheduleClose);
                    popover.addEventListener('mouseenter', () =>
                    {
                        clearTimeout(hoverTimeout);
                    });
                    popover.addEventListener('mouseleave', scheduleClose);
                }
            });
        }
    };
})();
