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

export default (() =>
{
    return {
        keydown: (event: Event): void =>
        {
            if (
                !(event instanceof KeyboardEvent)
                || !(event.target instanceof HTMLLabelElement)
                || !event.target.matches('label.micl-navigationrail__item[for]')
            ) {
                return;
            }
            const input = document.getElementById(event.target.htmlFor) as HTMLInputElement;
            if (!input) {
                return;
            }

            switch (event.key) {
                case ' ':
                    event.preventDefault();
                case 'Enter':
                    if (!input.checked) {
                        input.checked = !input.checked;
                    }

                    const el = (event.target as Element).querySelector('a[href]');
                    if (el instanceof HTMLAnchorElement) {
                        el.click();
                    }
                    break;
                default:
            }
        },

        initialize: (element: HTMLElement): void =>
        {
            if (element.dataset.miclinitialized) return;

            element.dataset.miclinitialized = '1';

            element.querySelectorAll<HTMLAnchorElement>('label[for] a[href]').forEach(link =>
            {
                link.setAttribute('tabindex', '-1');
            });
        }
    };
})();
