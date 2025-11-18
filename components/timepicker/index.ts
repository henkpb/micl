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

export const timepickerSelector = 'dialog.micl-dialog.micl-timepicker';

type ValueElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export default (() =>
{
    const isValueElement = (element: Element): element is ValueElement =>
    {
        return element instanceof HTMLInputElement ||
               element instanceof HTMLTextAreaElement ||
               element instanceof HTMLSelectElement;
    };

    return {
        initialize: (dialog: HTMLDialogElement): void =>
        {
            const form  = dialog.querySelector('form') as HTMLFormElement;
            const input = dialog.querySelector('input') as HTMLInputElement;
            if (!form || !input) {
                return;
            }
            if (dialog.dataset.miclinitialized) {
                return;
            }
            dialog.dataset.miclinitialized = '1';

            input.addEventListener('keydown', (event: Event) =>
            {
                if (!(event instanceof KeyboardEvent)) {
                    return;
                }
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                }
            });

            input.addEventListener('change', () =>
            {
                const hour = parseInt(input.value.split(':')[0], 10);
                input.classList.toggle('micl-timepicker--pm', hour >= 12);
                console.log(`${input.value}  -  ${hour}`);
            });

            const dial = dialog.querySelector('.micl-timepicker__dial');
            if (dial) {
                dial.addEventListener('mousedown', () => {
                    dial.classList.add('micl-timepicker__dial--dragging');
                });
                dial.addEventListener('mouseup', () => {
                    dial.classList.remove('micl-timepicker__dial--dragging');
                });
            }

            dialog.addEventListener('beforetoggle', event =>
            {
                if (event.oldState === 'open') {
                    return;
                }
                const element = document.querySelector(
                    `[data-timepicker="${dialog.id}"],[popovertarget="${dialog.id}"]`
                );
                if (!element) {
                    return;
                }
                if (isValueElement(element)) {
                    input.value = element.value;
                }
                else if ('textContent' in element) {
                    input.value = element.textContent;
                }
            });

            dialog.addEventListener('close', () =>
            {
                if (!dialog.returnValue) {
                    return;
                }
                document.querySelectorAll(
                    `[data-timepicker="${dialog.id}"],[popovertarget="${dialog.id}"]`
                ).forEach(element =>
                {
                    if (isValueElement(element)) {
                        element.value = input.value;
                    }
                    else if ('textContent' in element) {
                        element.textContent = input.value;
                    }
                });
            });
        }
    };
})();
