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

import { register } from '../../foundations/runtime';

export const checkboxGroupSelector = '.micl-checkbox-group';

type GroupState = 'none' | 'some' | 'all';

let announcing = false;

const getParentCheckbox = (checkboxGroup: HTMLElement): HTMLInputElement | null =>
{
    const parentCheckboxes = checkboxGroup.querySelectorAll<HTMLInputElement>('.micl-checkbox__parent');
    return Array.from(parentCheckboxes).find(
        cb => cb.closest(checkboxGroupSelector) === checkboxGroup
    ) ?? null;
};

const setState = (
    cb: HTMLInputElement,
    checked: boolean,
    indeterminate: boolean,
    changed: HTMLInputElement[]
): void =>
{
    if (cb.checked === checked && cb.indeterminate === indeterminate) {
        return;
    }
    cb.checked = checked;
    cb.indeterminate = indeterminate;
    changed.push(cb);
};

const refreshParentCheckbox = (checkboxGroup: HTMLElement, changed: HTMLInputElement[]): GroupState =>
{
    const parentCheckbox = getParentCheckbox(checkboxGroup);
    if (!parentCheckbox) {
        return 'none';
    }
    let nrCheckboxes = 0,
        nrCheckedCheckboxes = 0,
        nrMixedCheckboxes = 0;

    checkboxGroup.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"].micl-checkbox'
    ).forEach(cb =>
    {
        if (cb !== parentCheckbox) {
            const group = cb.closest(checkboxGroupSelector) as HTMLElement;
            if (group === checkboxGroup) {
                nrCheckboxes++;
                if (cb.indeterminate) {
                    nrMixedCheckboxes++;
                }
                else if (cb.checked) {
                    nrCheckedCheckboxes++;
                }
            }
            else if (
                cb.classList.contains('micl-checkbox__parent')
                && (group?.parentElement?.closest(checkboxGroupSelector) === checkboxGroup)
            ) {
                nrCheckboxes++;
                const subState = refreshParentCheckbox(group, changed);
                if (subState === 'all') {
                    nrCheckedCheckboxes++;
                }
                else if (subState === 'some') {
                    nrMixedCheckboxes++;
                }
            }
        }
    });

    let state: GroupState = 'none';
    if (
        (nrMixedCheckboxes > 0)
        || ((nrCheckedCheckboxes > 0) && (nrCheckedCheckboxes < nrCheckboxes))
    ) {
        state = 'some';
    }
    else if ((nrCheckboxes > 0) && (nrCheckedCheckboxes === nrCheckboxes)) {
        state = 'all';
    }

    setState(parentCheckbox, state === 'all', state === 'some', changed);

    return state;
};

const updateCheckboxGroup = (
    checkboxGroup: HTMLElement,
    checked: boolean,
    changed: HTMLInputElement[]
): void =>
{
    checkboxGroup.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"].micl-checkbox'
    ).forEach(cb =>
    {
        const group = cb.closest(checkboxGroupSelector) as HTMLElement;
        if (group === checkboxGroup) {
            setState(cb, checked, false, changed);
        }
        else if (
            cb.classList.contains('micl-checkbox__parent')
            && (group?.parentElement?.closest(checkboxGroupSelector) === checkboxGroup)
        ) {
            setState(cb, checked, false, changed);
            updateCheckboxGroup(group, checked, changed);
        }
    });
};

const refreshCheckboxGroup = (checkboxGroup: HTMLElement, input: HTMLInputElement | null): void =>
{
    const parentCheckbox = getParentCheckbox(checkboxGroup);
    if (!parentCheckbox) {
        return;
    }

    const changed: HTMLInputElement[] = [];

    if (input === parentCheckbox) {
        updateCheckboxGroup(checkboxGroup, input.checked, changed);
    }

    let parentCheckboxGroup,
        cbg = checkboxGroup;
    do {
        parentCheckboxGroup = cbg;
        cbg = cbg.parentElement?.closest(checkboxGroupSelector) as HTMLElement;
    }
    while (cbg);

    refreshParentCheckbox(parentCheckboxGroup, changed);

    if (input && changed.length) {
        announcing = true;
        changed.forEach(cb => cb.dispatchEvent(new Event('change', {
            bubbles   : true,
            cancelable: true
        })));
        announcing = false;
    }
};

const handleChange = (event: Event): void =>
{
    const checkboxGroup = event.currentTarget as HTMLElement;
    const input = event.target as HTMLInputElement;
    if (
        announcing
        || !input.classList.contains('micl-checkbox')
        || input.closest(checkboxGroupSelector) !== checkboxGroup
    ) {
        return;
    }

    refreshCheckboxGroup(checkboxGroup, input);
};

export default register(checkboxGroupSelector, {
    initialize: (element: HTMLElement): void =>
    {
        if (
            !element.matches(checkboxGroupSelector)
            || element.dataset.miclinitialized
        ) {
            return;
        }
        element.dataset.miclinitialized = '1';

        element.addEventListener('change', handleChange);

        refreshCheckboxGroup(element, null);
    },

    cleanup: (element: HTMLElement): void =>
    {
        if (element.matches(checkboxGroupSelector)) {
            element.removeEventListener('change', handleChange);
            delete element.dataset.miclinitialized;
        }
    }
}, HTMLElement);
