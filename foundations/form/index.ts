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

export default (() =>
{
    const isCVElement = (element: Element): element is
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLFieldSetElement =>
        'willValidate' in element;

    const setErrorStateCheckbox = (element: HTMLInputElement): boolean =>
    {
        element.classList.toggle('micl-checkbox--error', !!element.validationMessage);

        return false;
    };

    const setErrorStateTextField = (textField: HTMLElement, message: string): boolean =>
    {
        textField.classList.toggle('micl-textfield--error', !!message);

        const supporting = textField.querySelector(
            '.micl-textfield__supporting-text'
        ) as HTMLElement;

        if (supporting) {
            if (!message) {
                if ('micltext' in supporting.dataset) {
                    supporting.textContent = supporting.dataset.micltext || '';
                }
            }
            else {
                if (!supporting.dataset.micltext) {
                    supporting.dataset.micltext = supporting.textContent;
                }
                supporting.textContent = message;
            }
        }

        return !!message && !!supporting;
    };

    const setErrorState = (element: HTMLElement): boolean =>
    {
        if (
            !element.parentElement
            || !isCVElement(element)
        ) {
            return false;
        }
        let reported = false;

        if (
            element instanceof HTMLInputElement
            && (element.type === 'checkbox')
            && element.classList.contains('micl-checkbox')
        ) {
            reported = setErrorStateCheckbox(element);
        }
        else if (
            element.parentElement.classList.contains('micl-textfield-outlined')
            || element.parentElement.classList.contains('micl-textfield-filled')
        ) {
            reported = setErrorStateTextField(element.parentElement, element.validationMessage);
        }

        return reported;
    };

    const clearCustomValidity = (event: Event): void =>
    {
        const element = event.target as Element;
        if (isCVElement(element)) {
            element.setCustomValidity('');
        }
    };

    const setCustomValidityFieldSet = (fieldset: HTMLFieldSetElement): void =>
    {
        const message = fieldset.dataset.miclvalidateMessage || '';
        if (!message) {
            return;
        }

        if (fieldset.matches('[data-miclvalidate-checkboxes-name]')) {
            const name       = fieldset.dataset.miclvalidateCheckboxesName || '';
            const countEqual = fieldset.dataset.miclvalidateCheckboxesCountEqual || '';
            const countMax   = fieldset.dataset.miclvalidateCheckboxesCountMax || '';
            const countMin   = fieldset.dataset.miclvalidateCheckboxesCountMin || '';

            if (name && (countEqual || countMax || countMin)) {
                const checkedCount = fieldset.querySelectorAll<HTMLInputElement>(
                    `input[type="checkbox"][name="${name}"]:checked`
                ).length;
                const expectedCountEqual = parseInt(countEqual, 10);
                const expectedCountMax   = parseInt(countMax, 10);
                const expectedCountMin   = parseInt(countMin, 10);

                let invalid = (!isNaN(expectedCountEqual) && (checkedCount != expectedCountEqual))
                              || (!isNaN(expectedCountMax) && (checkedCount > expectedCountMax))
                              || (!isNaN(expectedCountMin) && (checkedCount < expectedCountMin));

                fieldset.setCustomValidity(invalid ? message : '');

                const firstCheckbox = fieldset.querySelector<HTMLInputElement>(
                    `input[type="checkbox"][name="${name}"]`
                );
                if (firstCheckbox) {
                    firstCheckbox.setCustomValidity(invalid ? message : '');
                    if (invalid) {
                        firstCheckbox.addEventListener('change', clearCustomValidity);
                    }
                    else {
                        firstCheckbox.removeEventListener('change', clearCustomValidity);
                    }
                }
            }
        }
    };

    const validity = (container: HTMLFormElement | HTMLFieldSetElement, doReport?: boolean): boolean =>
    {
        let invalid = false;

        container.querySelectorAll<HTMLFieldSetElement>(
            'fieldset'
        ).forEach(setCustomValidityFieldSet);

        Array.from(container.elements).forEach(element =>
        {
            if (isCVElement(element) && element.willValidate) {
                if (!element.checkValidity()) {
                    invalid = true;
                }
                let reported = setErrorState(element);
                if (!reported && doReport) {
                    element.reportValidity();
                }
            }
        });

        return !invalid;
    };

    return {
        validateFieldSet: (fieldset: HTMLFieldSetElement, doReport?: boolean): boolean =>
        {
            setCustomValidityFieldSet(fieldset);
            return validity(fieldset, doReport);
        },

        validateForm: (form: HTMLFormElement, doReport?: boolean): boolean =>
        {
            return validity(form, doReport);
        }
    };
})();
