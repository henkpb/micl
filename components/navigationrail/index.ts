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

export const navigationrailSelector = '.micl-navigationrail';

interface NavigationRailState {
    boundHandleClick: (event: Event) => void;
}

const navigationrailStates = new WeakMap<HTMLElement, NavigationRailState>();

export default
{
    initialize: (element: HTMLElement): void =>
    {
        if (!element.matches(navigationrailSelector) || element.dataset.miclinitialized) {
            return;
        }

        element.dataset.miclinitialized = '1';

        const boundHandleClick = (event: Event): void =>
        {
            const clickedItem = (event.target as HTMLElement).closest<HTMLAnchorElement>(
                'a.micl-navigationrail__item'
            );

            if (clickedItem) {
                const allItems = element.querySelectorAll<HTMLAnchorElement>(
                    'a.micl-navigationrail__item'
                );
                allItems.forEach(item => item.removeAttribute('aria-current'));

                clickedItem.setAttribute('aria-current', 'page');
            }
        };

        navigationrailStates.set(element, { boundHandleClick });

        element.addEventListener('click', boundHandleClick);
    },

    keydown: (event: Event): void =>
    {
        if (
            !(event instanceof KeyboardEvent)
            || !(event.target instanceof HTMLElement)
            || !event.target.matches('.micl-navigationrail__item')
        ) {
            return;
        }

        if (event.keyCode === 32 || event.key === ' ') {
            event.preventDefault();
            event.target.click();
        }
    },

    cleanup: (element: HTMLElement): void =>
    {
        const state = navigationrailStates.get(element);

        if (state) {
            element.removeEventListener('click', state.boundHandleClick);
        }

        delete element.dataset.miclinitialized;
    }
};
