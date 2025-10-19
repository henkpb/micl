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

export const checkboxGroupSelector = '.micl-checkbox-group';

export default (() =>
{
    const getParentCheckbox = (checkboxGroup: HTMLElement): HTMLInputElement | null =>
    {
        const parentCheckbox = checkboxGroup.querySelector<HTMLInputElement>('.micl-checkbox__parent');
        return (parentCheckbox?.closest(checkboxGroupSelector) === checkboxGroup) ? parentCheckbox : null;
    };

    const refreshParentCheckbox = (checkboxGroup: HTMLElement): boolean =>
    {
        const parentCheckbox = getParentCheckbox(checkboxGroup);
        if (!parentCheckbox) {
            return false;
        }
        let nrCheckboxes = 0,
            nrCheckedCheckboxes = 0;

        checkboxGroup.querySelectorAll<HTMLInputElement>(
            'input[type="checkbox"].micl-checkbox'
        ).forEach(cb =>
        {
            if (cb !== parentCheckbox) {
                const group = cb.closest(checkboxGroupSelector) as HTMLElement;
                if (group === checkboxGroup) {
                    nrCheckboxes++;
                    if (cb.checked && !cb.indeterminate) {
                        nrCheckedCheckboxes++;
                    }
                }
                else if (
                    cb.classList.contains('micl-checkbox__parent')
                    && (group?.parentElement?.closest(checkboxGroupSelector) === checkboxGroup)
                ) {
                    nrCheckboxes++;
                    if (refreshParentCheckbox(group)) {
                        nrCheckedCheckboxes++;
                    }
                }
            }
        });

        if (nrCheckedCheckboxes === 0) {
            parentCheckbox.checked = false;
            parentCheckbox.indeterminate = false;
        }
        else if (nrCheckedCheckboxes === nrCheckboxes) {
            parentCheckbox.checked = true;
            parentCheckbox.indeterminate = false;
        }
        else {
            parentCheckbox.checked = true;
            parentCheckbox.indeterminate = true;
        }

        return nrCheckedCheckboxes === nrCheckboxes;
    };

    const updateCheckboxGroup = (checkboxGroup: HTMLElement, checked: boolean): void =>
    {
        checkboxGroup.querySelectorAll<HTMLInputElement>(
            'input[type="checkbox"].micl-checkbox'
        ).forEach(cb =>
        {
            const group = cb.closest(checkboxGroupSelector) as HTMLElement;
            if (group === checkboxGroup) {
                cb.checked = checked;
            }
            else if (
                cb.classList.contains('micl-checkbox__parent')
                && (group?.parentElement?.closest(checkboxGroupSelector) === checkboxGroup)
            ) {
                cb.checked = checked;
                updateCheckboxGroup(group, checked);
            }
        });
    };

    const refreshCheckboxGroup = (checkboxGroup: HTMLElement, input: HTMLInputElement | null): void =>
    {
        const parentCheckbox = getParentCheckbox(checkboxGroup);
        if (!parentCheckbox) {
            return;
        }

        if (input === parentCheckbox) {
            updateCheckboxGroup(checkboxGroup, input.checked);
        }

        let parentCheckboxGroup,
            cbg = checkboxGroup;
        do {
            parentCheckboxGroup = cbg;
            cbg = cbg.parentElement?.closest(checkboxGroupSelector) as HTMLElement;
        }
        while (cbg);

        refreshParentCheckbox(parentCheckboxGroup);
    };

    return {
        initialize: (element: HTMLElement): void =>
        {
            if (
                !element.matches(checkboxGroupSelector)
                || element.dataset.miclinitialized
            ) {
                return;
            }
            element.dataset.miclinitialized = '1';

            element.addEventListener('change', event =>
            {
                const input = event.target as HTMLInputElement;
                if (!input.classList.contains('micl-checkbox')) {
                    return;
                }
                event.stopPropagation();

                refreshCheckboxGroup(element, input);
            });

            refreshCheckboxGroup(element, null);
        }
    };
})();
