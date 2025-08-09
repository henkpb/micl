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

/**
 * Set the origin for menu transformations just before transitions start.
 * By default, the origin is "top left" (the menu opens just below the invoker, left aligned),
 * but could also be "top right", "bottom left" or "bottom right".
 * When the browser needs to apply a position-try-fallbacks, because there is not enough space
 * for the menu in the default location, then the reverse transformation will be applied from
 * the wrong origin.
 * Therefore, when the menu is open, calculate the transformation origin just before the
 * transitions start. When the menu is closed, do the same just after the 'display:none' has
 * been removed by the browser (the 'toggle' event has then been triggered).
 */
export default (() =>
{
    const getOrigin = (invoker: Element, popover: Element): string =>
    {
        const invokerY  = invoker.getBoundingClientRect().y,
              popoverY  = popover.getBoundingClientRect().y,
              oldOrigin = window.getComputedStyle(popover).getPropertyValue('transform-origin');

        return ((invokerY > popoverY) ? 'bottom ' : 'top ') +
               ((parseInt(oldOrigin) > 0) ? 'right' : 'left');
    };

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

            invoker && element.addEventListener('beforetoggle', event =>
            {
                if ((event as ToggleEvent).oldState === 'open') {
                    // The popover is about to be closed.
                    element.style.transformOrigin = getOrigin(invoker, element);
                }
            });
            invoker && element.addEventListener('toggle', event =>
            {
                if ((event as ToggleEvent).oldState === 'closed') {
                    // The popover has just opened.
                    element.style.transformOrigin = getOrigin(invoker, element);
                }
            });

        }
    };
})();
