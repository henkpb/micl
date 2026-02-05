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
    const isTextFieldElement = (target: EventTarget | null): target is
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
        (target as Element).matches(`${textfieldSelector},${selectSelector},${textareaSelector}`);

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

    const formatAsDate = (input: HTMLInputElement, inputType: string): void =>
    {
        const partsRegex = /([DMY]{2,4})([^DMY])?([DMY]{2,4})([^DMY])?([DMY]{2,4})/;
        const match      = (input.dataset.micldateformat || '').match(partsRegex);
        if (!match) {
            return;
        }

        const components = [
            { type: match[1], length: match[1].length, separator: match[2] || '' },
            { type: match[3], length: match[3].length, separator: match[4] || '' },
            { type: match[5], length: match[5].length, separator: '' }
        ];

        input.maxLength = components.reduce((sum, c) => sum + c.length + (c.separator ? 1 : 0), 0);

        let value = input.value.replace(/\D/g, ''); // remove all non-digits
        let formattedValue = '';
        let valueIndex = 0;
        let cursorPosition = input.selectionStart || 0;

        for (let i = 0; i < components.length; i++) {
            const comp = components[i];
            if (value.length < valueIndex) break;

            const segment = value.substring(valueIndex, valueIndex + comp.length);
            formattedValue += segment;
            valueIndex += segment.length;
            
            if (segment.length === comp.length && comp.separator) {
                formattedValue += comp.separator;
            }
        }

        const prevLength = input.value.length;
        input.value = formattedValue.substring(0, input.maxLength);
        const newLength = input.value.length;

        if (inputType.startsWith('deleteContent')) {
            if (cursorPosition > 0) {
                input.setSelectionRange(cursorPosition, cursorPosition);
            }
        }
        else {
            if (newLength > prevLength && newLength > cursorPosition) {
                input.setSelectionRange(newLength, newLength);
            }
            else {
                input.setSelectionRange(cursorPosition, cursorPosition);
            }
        }
    };

    const refreshTextField = (event: Event): void =>
    {
        if (
            !isTextFieldElement(event.target)
            || !event.target.dataset.miclinitialized
            || event.target.disabled
        ) {
            return;
        }

        if (event.target instanceof HTMLInputElement && event.target.dataset.micldateformat) {
            formatAsDate(event.target, (event as InputEvent).inputType);
        }
        if (event.target.value) {
            event.target.dataset.miclvalue = '1';
        }
        else {
            delete event.target.dataset.miclvalue;
        }

        setCounter(event.target);
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
                    const rect       = input.getBoundingClientRect();
                    const spaceAbove = rect.top;
                    const spaceBelow = window.innerHeight - rect.bottom;

                    !input.matches(':open') && input.style.setProperty(
                        '--md-sys-select-picker-origin',
                        spaceAbove > spaceBelow ? 'left bottom' : 'left top'
                    );
                });
            }

            if (input.matches('input[type=time][data-timepicker],input[type=date][data-datepicker]')) {
                const picker = !input.dataset.timepicker ? (!input.dataset.datepicker ? null :
                               document.getElementById(input.dataset.datepicker)) :
                               document.getElementById(input.dataset.timepicker);
                if (picker instanceof HTMLDialogElement) {
                    input.addEventListener('click', (event: Event) =>
                    {
                        event.preventDefault();
                        picker.showModal();
                    });
                    input.addEventListener('keydown', (event: Event) =>
                    {
                        if (!(event instanceof KeyboardEvent)) {
                            return;
                        }
                        switch (event.key) {
                            case 'Enter':
                            case ' ':
                                event.preventDefault();
                                picker.showModal();
                                break;
                            default:
                        }
                    });
                }
            }

            setCounter(input);
        },

        change: (event: Event): void =>
        {
            refreshTextField(event);
        },
        input: (event: Event): void =>
        {
            refreshTextField(event);
        }
    };
})();
