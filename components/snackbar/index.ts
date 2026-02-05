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

export const snackbarSelector = '.micl-snackbar';

export default (() =>
{
    return {
        initialize: (element: HTMLElement): void =>
        {
            if (
                !element.matches(snackbarSelector)
                || element.dataset.miclinitialized
            ) {
                return;
            }
            element.dataset.miclinitialized = '1';

            const delay = parseInt(element.dataset.micldelay || '0', 10);
            if (!isNaN(delay) && delay > 0) {
                element.addEventListener('toggle', event =>
                {
                    let timeoutid = parseInt(element.dataset.micltimeoutid || '0', 10);
                    if (timeoutid > 0) {
                        clearTimeout(timeoutid);
                        delete element.dataset.micltimeoutid;
                    }

                    if ((event as ToggleEvent).oldState === 'closed') {
                        // The snackbar has just opened.
                        timeoutid = window.setTimeout(() => { element.hidePopover(); }, delay);
                        element.dataset.micltimeoutid = `${timeoutid}`;
                    }
                });
            }
        }
    };
})();
