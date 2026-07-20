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

export const timepickerSelector = 'dialog.micl-dialog.micl-timepicker';

// The block prefix of all element class names, hoisted to shrink the minified
// bundle: the minifier shortens the constant but never dedupes string literals.
const classPrefix   = 'micl-timepicker__';
const hiddenClass   = 'micl-timepicker__dial--hidden';
const selectedClass = 'micl-timepicker--selected';

type ValueElement = HTMLInputElement | HTMLButtonElement;

interface TimeLimits {
    max: number,
    min: number
}

const uses12HourFormat = (() =>
{
    try {
        const hourCycle = new Intl.DateTimeFormat(undefined, {
            hour: 'numeric'
        }).resolvedOptions().hourCycle;

        return hourCycle === 'h11' || hourCycle === 'h12';
    }
    catch (error) {
        return false;
    }
})();

const getElement = <T extends Element>(parent: Element, selector: string): T | null =>
{
    return parent.querySelector(selector) as T | null;
};

const isValueElement = (element: Element | null): element is ValueElement =>
{
    return element instanceof HTMLInputElement || element instanceof HTMLButtonElement;
};

const isVisible = (element: Element | null): boolean =>
{
    return !!element && !element.classList.contains(hiddenClass);
};

const toggleSelection = (element: Element, force: boolean): void =>
{
    element.classList.toggle(selectedClass, force);
};

const findInvoker = (dialog: HTMLDialogElement): Element | null =>
{
    return document.querySelector(
        `[data-timepicker="${dialog.id}"],[popovertarget="${dialog.id}"],[commandfor="${dialog.id}"]`
    );
};

const getTimeLimits = (name: string): TimeLimits =>
{
    if (name === 'hour') {
        return {
            min: uses12HourFormat ? 1 : 0,
            max: uses12HourFormat ? 12 : 23
        };
    }
    return { min: 0, max: 59 };
};

const formatValue = (element: HTMLInputElement): void =>
{
    const { max, min } = getTimeLimits(element.name);
    let value = parseInt(element.value, 10);

    if (isNaN(value)) value = min;
    if (value > max) value = max;
    if (value < 0) value = min;

    element.value = String(value).padStart(2, '0');
};

const setInputAttributes = (input: HTMLInputElement): void =>
{
    const { min, max } = getTimeLimits(input.name);

    let pattern: string;
    if (input.name === 'hour') {
        pattern = uses12HourFormat ? '(0[1-9]|1[0-2])' : '(0[0-9]|1[0-9]|2[0-3])';
    } else {
        pattern = '(0[0-9]|[1-5][0-9])';
    }

    const attributes: Record<string, string> = {
        maxlength: '2',
        pattern: pattern,
        inputmode: 'numeric',
        autocomplete: 'off',
        role: 'spinbutton',
        min: String(min),
        max: String(max)
    };

    for (const key in attributes) {
        input.setAttribute(key, attributes[key]);
    }
};

const setDial = (dial: HTMLElement, name: string, value: string): void =>
{
    dial.querySelectorAll('data').forEach(
        e => e.classList.remove(`${classPrefix}time--selected`)
    );

    const mark = dial.querySelector(`data[data-${name}][value="${value}"]`);
    let angle  = '';

    if (mark) {
        angle = window.getComputedStyle(mark).getPropertyValue('--micl-angle');
        mark.classList.add(`${classPrefix}time--selected`);
    }
    else if (name === 'minute') {
        angle = `${Math.round((parseInt(value, 10) * 360 / 60) - 90)}deg`;
    }
    !!angle && dial.style.setProperty('--micl-angle', angle);
};

const setInputValue = (
    dialog  : HTMLElement,
    name    : string,
    value?  : string,
    setampm?: boolean,
    setdial : boolean = true
): void => {

    let numeric = parseInt(value || '0', 10);
    if (isNaN(numeric)) {
        return;
    }
    const input = getElement<HTMLInputElement>(dialog, `input[name=${name}]`);
    if (!input) {
        return;
    }

    if (name === 'hour' && setampm && uses12HourFormat) {
        const am = dialog.querySelector(`.${classPrefix}am`) as HTMLInputElement;
        const pm = dialog.querySelector(`.${classPrefix}pm`) as HTMLInputElement;

        // Noon (12) is PM and midnight (0) displays as 12 AM.
        if (numeric >= 12) {
            if (pm) {
                pm.checked = true;
            }
            if (numeric > 12) {
                numeric -= 12;
            }
        }
        else {
            if (am) {
                am.checked = true;
            }
            if (numeric === 0) {
                numeric = 12;
            }
        }
    }
    input.value = `${numeric}`.padStart(2, '0');

    if (setdial) {
        const dial = getElement<HTMLElement>(dialog, `.${classPrefix}dial`);
        if (!dial) {
            return;
        }
        setDial(dial, name, input.value);
    }
}

const addMarks = (dial: HTMLElement): void =>
{
    let angle = uses12HourFormat ? 300 : 270;

    for (let i = (uses12HourFormat ? 1 : 0); i <= (uses12HourFormat ? 12 : 23); i++) {
        const mark = document.createElement('data') as HTMLDataElement;

        mark.value        = `${i}`.padStart(2, '0');
        mark.textContent  = `${i}`;
        mark.dataset.hour = `${i}`;
        mark.style.setProperty('--micl-angle', `${angle}deg`);
        if (!uses12HourFormat && i >= 12) {
            mark.classList.add(`${classPrefix}dial-inner`);
        }
        else {
            mark.dataset.minute = `${(i * 5) % 60}`;
        }
        dial.appendChild(mark);

        angle = (angle + 30) % 360;
    }

    const track: HTMLSpanElement = document.createElement('span');
    track.className = `${classPrefix}track`;
    dial.appendChild(track);
};

const showDialMarks = (dial: HTMLElement, name: string): void =>
{
    dial.querySelectorAll<HTMLDataElement>('data').forEach(mark =>
    {
        if (!!mark.dataset[name]) {
            mark.textContent = mark.dataset[name];
            mark.value       = mark.dataset[name].padStart(2, '0');
        }
        if (mark.classList.contains(`${classPrefix}dial-inner`)) {
            mark.classList[name === 'hour' ? 'remove' : 'add'](hiddenClass);
        }
    });
};

const handleSpinning = (dialog: HTMLElement, input: HTMLInputElement, event: KeyboardEvent): void =>
{
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return;
    }
    event.preventDefault();

    const { max, min } = getTimeLimits(input.name);
    let value = parseInt(input.value, 10) || 0;

    value += event.key === 'ArrowUp' ? 1 : -1;
    if (value < min || value > max) {
        value = (value < min) ? max : min;
        if (input.name === 'hour' && uses12HourFormat) {
            const e = dialog.querySelector('input[name=period]:not(:checked)') as HTMLInputElement;
            e?.click();
        }
    }

    setInputValue(dialog, input.name, `${value}`);
};

export default register(timepickerSelector, {
    initialize: (dialog: HTMLDialogElement): void =>
    {
        if (dialog.dataset.miclinitialized) {
            return;
        }

        const form   = getElement<HTMLFormElement>(dialog, 'form');
        const mode   = getElement<HTMLElement>(dialog, `.${classPrefix}inputmode`);
        const dial   = getElement<HTMLElement>(dialog, `.${classPrefix}dial`);
        const inputs = [
            getElement<HTMLInputElement>(dialog, 'input[name=hour]'),
            getElement<HTMLInputElement>(dialog, 'input[name=minute]')
        ].filter((input): input is HTMLInputElement => input !== null);

        if (!form || inputs.length < 2) {
            return;
        }
        dialog.dataset.miclinitialized = '1';

        inputs.forEach((input, i) =>
        {
            setInputAttributes(input);
            if (dial) {
                input.toggleAttribute('readonly', isVisible(dial));
            }

            input.addEventListener('keydown', handleSpinning.bind(null, dialog, input));
            input.addEventListener('focus', () =>
            {
                toggleSelection(inputs[i === 0 ? 1 : 0], false);
                toggleSelection(input, true);
                if (dial) {
                    showDialMarks(dial, input.name);
                    setDial(dial, input.name, input.value);
                }
            });
            input.addEventListener('blur', () =>
            {
                if (!isVisible(dial)) {
                    formatValue(input);
                    toggleSelection(input, false);
                }
            });
        });

        const period = dialog.querySelector(`.${classPrefix}period`);
        if (period && uses12HourFormat) {
            ['am', 'pm'].forEach(ampm => {
                let e = document.createElement('input') as HTMLInputElement;
                e.type = 'radio';
                e.name = 'period';
                e.className = `${classPrefix}${ampm}`;
                e.value = ampm;
                e.ariaLabel = ampm.toUpperCase();
                period.appendChild(e);
            });
            period.classList.toggle(hiddenClass, !uses12HourFormat);
        }

        mode?.addEventListener('click', () =>
        {
            dial?.classList.toggle(hiddenClass);
            inputs.forEach(input =>
            {
                input.toggleAttribute('readonly', isVisible(dial));
            });
            if (isVisible(dial)) {
                inputs[0].focus();
            }
        });

        if (dial) {
            addMarks(dial);

            const handleSelection = (clientX: number, clientY: number) =>
            {
                const target = document.elementFromPoint(clientX, clientY);
                if (target && target.tagName === 'DATA') {
                    setInputValue(dialog, !dialog.querySelector(
                        `input[name=hour].${selectedClass}`
                    ) ? 'minute' : 'hour', (target as HTMLDataElement).value);
                }
            };
            dial.addEventListener('pointerdown', (event: PointerEvent) =>
            {
                dial.classList.add(`${classPrefix}dial--dragging`);
                handleSelection(event.clientX, event.clientY);
                dial.setPointerCapture(event.pointerId);
            });
            dial.addEventListener('pointermove', (event: PointerEvent) =>
            {
                if (dial.classList.contains(`${classPrefix}dial--dragging`)) {
                    handleSelection(event.clientX, event.clientY);
                }
            });
            const stopDragging = (event: PointerEvent) =>
            {
                dial.classList.remove(`${classPrefix}dial--dragging`);
                dial.releasePointerCapture(event.pointerId);
            };
            dial.addEventListener('pointerup', stopDragging);
            dial.addEventListener('pointercancel', stopDragging);
        }

        dialog.addEventListener('beforetoggle', (event): void =>
        {
            if (event.oldState === 'open') {
                return;
            }

            let invoker = document.activeElement;
            if (
                !isValueElement(invoker)
                || (invoker.dataset.timepicker !== dialog.id
                    && invoker.popoverTargetElement !== dialog
                    && (invoker as any).commandForElement !== dialog)
            ) {
                invoker = findInvoker(dialog);
            }
            if (!isValueElement(invoker)) {
                return;
            }
            (dialog as any)._miclInvoker = invoker;

            const time = (invoker.value || invoker.textContent).split(':');
            if (time.length === 2) {
                setInputValue(dialog, 'hour', time[0], true);
                setInputValue(dialog, 'minute', time[1], false, false);
            }
        });

        dialog.addEventListener('close', (): void =>
        {
            if (!dialog.returnValue) {
                return;
            }

            let invoker = (dialog as any)._miclInvoker;
            if (!invoker) {
                invoker = findInvoker(dialog);
            }
            if (!isValueElement(invoker)) {
                return;
            }

            const inputs = form.elements;
            let h = parseInt((inputs.namedItem('hour') as HTMLInputElement)?.value || '0', 10);
            if (isNaN(h)) {
                return;
            }
            if (uses12HourFormat) {
                // 12 AM is midnight (0) and 12 PM stays noon (12).
                h %= 12;
                if ((inputs.namedItem('period') as RadioNodeList)?.value === 'pm') {
                    h += 12;
                }
            }
            const m = parseInt((inputs.namedItem('minute') as HTMLInputElement)?.value || '0', 10);
            if (isNaN(m)) {
                return;
            }
            const time = `${h}`.padStart(2, '0') + ':' + `${m}`.padStart(2, '0');
            invoker.value = time;

            if (invoker instanceof HTMLInputElement) {
                invoker.dispatchEvent(new Event('change', { bubbles: true }));
                invoker.dispatchEvent(new Event('input', { bubbles: true }));
            }
            else {
                invoker.textContent = time;
            }
        });
    }
}, HTMLDialogElement);
