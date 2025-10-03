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

export const textfieldSelector = '.micl-textfield-outlined > input,.micl-textfield-filled > input';
export const textareaSelector  = '.micl-textfield-outlined > textarea,.micl-textfield-filled > textarea';
export const selectSelector = '.micl-textfield-filled > select,.micl-textfield-outlined > select';

export default (() =>
{
    const setCounter = (element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) =>
    {
        if (
            !element.parentElement
            || element instanceof HTMLSelectElement
            || !element.maxLength
        ) {
            return;
        }
        const counter = element.parentElement.querySelector('.micl-textfield__character-counter');
        if (counter) {
            counter.textContent = `${element.value.length}/${element.maxLength}`;
        }
    };

    return {
        initialize: (element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): void =>
        {
            if (element.dataset.miclinitialized) {
                return;
            }
            element.dataset.miclinitialized = '1';

            if (element.value) {
                element.dataset.miclvalue = '1';
            }

            if (element instanceof HTMLSelectElement) {
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
            }
            setCounter(element);
        },

        input: (event: Event): void =>
        {
            if (
                !(event.target as Element).matches(`${textfieldSelector},${selectSelector},${textareaSelector}`)
                || !((event.target instanceof HTMLInputElement)
                    || (event.target instanceof HTMLSelectElement)
                    || (event.target instanceof HTMLTextAreaElement))
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

            setCounter(event.target);
        }
    };
})();
