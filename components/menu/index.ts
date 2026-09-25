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

import { register } from '../../foundations/runtime';

export const menuSelector = '.micl-menu[popover]';

const itemSelector = '.micl-list-item-one,.micl-list-item-two,.micl-list-item-three';
const hoverOpened = new WeakSet<HTMLElement>();

let anchorCount = 0;

const getOrigin = (invoker: Element, popover: Element): string =>
{
    const invokerRect = invoker.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    return ((invokerRect.x + invokerRect.width / 2 > popoverRect.x + popoverRect.width / 2) ? 'right ' : 'left ') +
           ((invokerRect.y + invokerRect.height / 2 > popoverRect.y + popoverRect.height / 2) ? 'bottom' : 'top');
};

const navigableItems = (list: Element): HTMLElement[] =>
    Array.from(list.children).filter((child): child is HTMLElement =>
        child instanceof HTMLLIElement
        && child.getAttribute('role') !== 'separator'
        && !child.classList.contains('micl-list-item--disabled')
        && child.matches(itemSelector)
    );

const ownCheckbox = (item: HTMLElement): HTMLInputElement | undefined =>
    Array.from(item.querySelectorAll<HTMLInputElement>('input[type=checkbox]')).find(input => input.closest('li') === item);

const rootMenu = (menu: HTMLElement): HTMLElement =>
{
    let root = menu;
    for (let m = menu.parentElement?.closest<HTMLElement>(menuSelector); m; m = m.parentElement?.closest<HTMLElement>(menuSelector)) {
        root = m;
    }
    return root;
};

export default register(menuSelector, {
    initialize: (element: HTMLElement): void =>
    {
        if (element.dataset.miclinitialized) return;
        element.dataset.miclinitialized = '1';

        const id = CSS.escape(element.id);
        const lists = Array.from(element.querySelectorAll<HTMLElement>(':scope > ul.micl-list'));
        const items = lists.flatMap(list => Array.from(list.children).filter(
            (child): child is HTMLElement => child instanceof HTMLLIElement && child.matches(itemSelector)
        ));
        const focusable = lists.flatMap(navigableItems);
        const start = focusable.find(item => item.getAttribute('tabindex') === '0') ?? focusable[0];

        element.setAttribute('role', 'menu');
        lists.forEach(list =>
        {
            const label = list.querySelector(':scope > .micl-menu__section')?.textContent?.trim();
            list.setAttribute('role', 'group');
            label && list.setAttribute('aria-label', label);
        });
        items.forEach(item =>
        {
            const checkbox = ownCheckbox(item);
            item.setAttribute('role', checkbox ? 'menuitemcheckbox' : 'menuitem');
            checkbox && item.setAttribute('aria-checked', String(checkbox.checked));
            item.classList.contains('micl-list-item--disabled') && item.setAttribute('aria-disabled', 'true');
            item.tabIndex = item === start ? 0 : -1;
            item.querySelectorAll<HTMLElement>('a, button, input').forEach(control => control.tabIndex = -1);
        });
        document.querySelectorAll(`[popovertarget="${id}"],[commandfor="${id}"]`).forEach(
            invoker => invoker.setAttribute('aria-haspopup', 'menu')
        );

        element.addEventListener('change', (event: Event) =>
        {
            const item = (event.target as Element).closest<HTMLElement>('[role=menuitemcheckbox]');
            if (item && items.includes(item)) {
                item.setAttribute('aria-checked', String((event.target as HTMLInputElement).checked));
            }
        });

        element.addEventListener('click', (event: MouseEvent) =>
        {
            const item = (event.target as Element).closest<HTMLElement>(itemSelector);
            if (
                item
                && items.includes(item)
                && item.getAttribute('role') === 'menuitem'
                && !item.hasAttribute('aria-haspopup')
                && !item.hasAttribute('aria-disabled')
            ) {
                rootMenu(element).hidePopover();
            }
        });

        element.addEventListener('toggle', (event: Event) =>
        {
            if ((event as ToggleEvent).newState !== 'open' || hoverOpened.delete(element)) return;

            const first = lists.flatMap(navigableItems)[0];
            if (first) {
                items.forEach(item => item.tabIndex = -1);
                first.tabIndex = 0;
                first.focus();
            }
        });

        element.addEventListener('beforetoggle', (event: Event) =>
        {
            if ((event as ToggleEvent).newState !== 'open') return;

            const source = (event as ToggleEvent & { source?: Element | null }).source
                ?? document.querySelector(`[popovertarget="${id}"],[commandfor="${id}"]`);

            source?.setAttribute('aria-haspopup', 'menu');
            source && requestAnimationFrame(() =>
            {
                if (element.matches(':popover-open')) {
                    element.style.transformOrigin = getOrigin(source, element);
                }
            });
        });

        element.addEventListener('keydown', (event: KeyboardEvent) =>
        {
            const target = event.target;
            if (!(target instanceof HTMLElement) || !items.includes(target)) return;

            const rtl = target.matches(':dir(rtl)');
            if (event.key === (rtl ? 'ArrowLeft' : 'ArrowRight') && target.hasAttribute('aria-haspopup')) {
                event.preventDefault();
                event.stopPropagation();
                (target.querySelector<HTMLButtonElement>(':scope > button[popovertarget]')?.popoverTargetElement as HTMLElement | null)?.showPopover();
                return;
            }
            if (event.key === (rtl ? 'ArrowRight' : 'ArrowLeft')) {
                const parentItem = element.parentElement?.closest<HTMLElement>(itemSelector);
                if (parentItem) {
                    event.preventDefault();
                    event.stopPropagation();
                    element.hidePopover();
                    parentItem.focus();
                }
                return;
            }
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

            const currentList = target.parentElement;
            if (!currentList?.matches('ul.micl-list')) return;
            if (currentList.parentElement !== element || lists.length < 2) return;

            const listIndex = lists.indexOf(currentList as HTMLElement);
            const listItems = navigableItems(currentList);
            const itemIndex = listItems.indexOf(target);
            if (itemIndex === -1) return;

            let nextItem: HTMLElement | undefined;

            if (event.key === 'ArrowDown' && itemIndex === listItems.length - 1) {
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
                const item = submenuinvoker.parentElement!;
                const id = `--micl-submenu-${++anchorCount}`;
                let hoverTimeout: ReturnType<typeof setTimeout>;

                item.setAttribute('aria-haspopup', 'menu');
                item.setAttribute('aria-expanded', 'false');
                popover.addEventListener('toggle', (event: Event) =>
                    item.setAttribute('aria-expanded', String((event as ToggleEvent).newState === 'open'))
                );
                submenuinvoker.popoverTargetAction = 'show';
                submenuinvoker.style.setProperty('anchor-name', id);
                popover.style.setProperty('position-anchor', id);

                const scheduleClose = (event: PointerEvent) =>
                {
                    if (event.pointerType !== 'mouse') return;
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() =>
                    {
                        if (!submenuinvoker.matches(':hover') && !popover.matches(':hover')) {
                            popover.hidePopover();
                        }
                    }, 300);
                };

                submenuinvoker.addEventListener('pointerenter', (event: PointerEvent) =>
                {
                    if (event.pointerType !== 'mouse') return;
                    clearTimeout(hoverTimeout);
                    if (!popover.matches(':popover-open')) {
                        hoverOpened.add(popover);
                        popover.showPopover();
                    }
                });
                submenuinvoker.addEventListener('pointerleave', scheduleClose);
                popover.addEventListener('pointerenter', () =>
                {
                    clearTimeout(hoverTimeout);
                });
                popover.addEventListener('pointerleave', scheduleClose);
            }
        });
    }
}, HTMLElement);
