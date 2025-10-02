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

export const selectSelector = '.micl-textfield-filled > select,.micl-textfield-outlined > select';

export default (() =>
{
    return {
        initialize: (element: HTMLSelectElement): void =>
        {
            if (element.dataset.miclinitialized) {
                return;
            }
            element.dataset.miclinitialized = '1';

            if (element.value) {
                element.dataset.miclvalue = '1';
            }

            element.addEventListener('mousedown', event =>
            {
                const
                    rect      = element.getBoundingClientRect(),
                    roomAbove = rect.top,
                    roomBelow = window.innerHeight - rect.bottom;

                !element.matches(':open') && element.style.setProperty(
                    '--md-sys-select-picker-origin',
                    roomAbove > roomBelow ? 'left bottom' : 'left top'
                );
            });
        },

        input: (event: Event): void =>
        {
            if (
                !(event.target as Element).matches(`${selectSelector}`)
                || !(event.target instanceof HTMLSelectElement)
                || !event.target.dataset.miclinitialized
                || event.target.disabled
            ) {
                return;
            }

            if (event.target.value) {
                event.target.dataset.miclvalue = '1';
            }
            else {
                delete event.target.dataset.miclvalue;
            }
        }
    };
})();
