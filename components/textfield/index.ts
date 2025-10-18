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
    const isRequiredType = (
        eventTarget: EventTarget | null
    ): eventTarget is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
    {
        return eventTarget instanceof HTMLInputElement ||
               eventTarget instanceof HTMLSelectElement ||
               eventTarget instanceof HTMLTextAreaElement;
    };

    const setCounter = (input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): void =>
    {
        if (
            !input.parentElement
            || input instanceof HTMLSelectElement
            || !input.maxLength
        ) {
            return;
        }
        const counter = input.parentElement.querySelector('.micl-textfield__character-counter');
        if (counter) {
            counter.textContent = `${input.value.length}/${input.maxLength}`;
        }
    };

    const handleInvalid = (
        input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
        isValid?: boolean
    ): void => {
        if (input.required) {
            input.parentElement?.classList.toggle('micl-textfield--error', !isValid);

            const supporting = input.parentElement?.querySelector(
                '.micl-textfield__supporting-text'
            ) as HTMLElement;

            if (supporting) {
                if (!isValid && !('micltext' in supporting.dataset)) {
                    supporting.dataset.micltext = supporting.textContent;
                }
                supporting.textContent = input.validationMessage || supporting.dataset.micltext || '';
            }
        }
    };

    return {
        initialize: (input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): void =>
        {
            if (input.dataset.miclinitialized) {
                return;
            }
            input.dataset.miclinitialized = '1';

            if (input.value) {
                input.dataset.miclvalue = '1';
            }

            if (input instanceof HTMLSelectElement) {
                input.addEventListener('mousedown', () =>
                {
                    const rect      = input.getBoundingClientRect();
                    const roomAbove = rect.top;
                    const roomBelow = window.innerHeight - rect.bottom;

                    !input.matches(':open') && input.style.setProperty(
                        '--md-sys-select-picker-origin',
                        roomAbove > roomBelow ? 'left bottom' : 'left top'
                    );
                });
            }

            setCounter(input);
        },

        input: (event: Event): void =>
        {
            if (
                !isRequiredType(event.target)
                || !event.target.matches(`${textfieldSelector},${selectSelector},${textareaSelector}`)
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

            handleInvalid(event.target, true);
            setCounter(event.target);
        },

        invalid: (event: Event): void =>
        {
            isRequiredType(event.target) && handleInvalid(event.target);
        }
    };
})();
