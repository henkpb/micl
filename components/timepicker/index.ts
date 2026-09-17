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

const classPrefix    = 'micl-timepicker__';
const hiddenClass    = 'micl-timepicker__dial--hidden';
const draggingClass  = 'micl-timepicker__dial--dragging';
const innerClass     = 'micl-timepicker__dial-inner';
const markClass      = 'micl-timepicker__time--selected';
const selectedClass  = 'micl-timepicker--selected';
const angleProperty  = '--micl-angle';
const radiusProperty = '--micl-track-radius';

type ValueElement = HTMLInputElement | HTMLButtonElement;

const intl = (() => {
    try {
        const format = Intl.DateTimeFormat;

        return {
            cycle  : new format(undefined, { hour: 'numeric' }).resolvedOptions().hourCycle || 'h23',
            time   : new format(undefined, { hour: 'numeric', minute: '2-digit' }),
            periods: [9, 21].map((hour, i) => new format(undefined, { hour: 'numeric', hour12: true })
                .formatToParts(new Date(2024, 0, 1, hour))
                .find(part => part.type === 'dayPeriod')?.value || (i ? 'PM' : 'AM'))
        };
    }
    catch {
        return { cycle: 'h23', time: null, periods: ['AM', 'PM'] };
    }
})();

const pad = (value: number | string): string => `${value}`.padStart(2, '0');

const toInt = (value: string): number => parseInt(value, 10);

const getElement = <T extends Element>(parent: Element, selector: string): T | null => {
    return parent.querySelector(selector) as T | null;
};

const isValueElement = (element: Element | null): element is ValueElement => {
    return element instanceof HTMLInputElement || element instanceof HTMLButtonElement;
};

const isVisible = (element: Element | null): boolean => {
    return !!element && !element.classList.contains(hiddenClass);
};

const toggleSelection = (element: Element, force: boolean): void => {
    element.classList.toggle(selectedClass, force);
};

const findInvoker = (dialog: HTMLDialogElement): Element | null => {
    return document.querySelector(
        `[data-timepicker="${dialog.id}"],[popovertarget="${dialog.id}"],[commandfor="${dialog.id}"]`
    );
};

const uses12HourFormat = (dialog: HTMLElement): boolean => {
    const cycle = dialog.dataset.miclhourcycle || intl.cycle;
    return cycle === 'h11' || cycle === 'h12';
};

const getTimeLimits = (name: string, h12: boolean): number[] => {
    return name === 'hour' ? (h12 ? [1, 12] : [0, 23]) : [0, 59];
};

const setValue = (input: HTMLInputElement, value: number): void => {
    input.value = pad(value);
    input.setAttribute('aria-valuenow', `${value}`);
    input.setAttribute('aria-valuetext', input.value);
};

const formatValue = (input: HTMLInputElement, h12: boolean): void => {
    const [min, max] = getTimeLimits(input.name, h12);
    let value = toInt(input.value);

    if (isNaN(value) || value < min) value = min;
    if (value > max) value = max;

    setValue(input, value);
};

const setInputAttributes = (input: HTMLInputElement, h12: boolean): void => {
    const [min, max] = getTimeLimits(input.name, h12);
    const attributes: Record<string, string | number> = {
        type: 'text',
        maxlength: 2,
        pattern: input.name === 'hour'
            ? (h12 ? '(0[1-9]|1[0-2])' : '(0[0-9]|1[0-9]|2[0-3])')
            : '(0[0-9]|[1-5][0-9])',
        inputmode: 'numeric',
        autocomplete: 'off',
        role: 'spinbutton',
        'aria-valuemin': min,
        'aria-valuemax': max
    };

    for (const key in attributes) {
        input.setAttribute(key, attributes[key] as string);
    }
};

const setDial = (dial: HTMLElement, name: string, value: string): void => {
    dial.querySelectorAll('data').forEach(e => e.classList.remove(markClass));

    const mark = dial.querySelector(`data[data-${name}][value="${value}"]`);
    let angle  = NaN;

    dial.style.removeProperty(radiusProperty);

    if (mark) {
        const style = window.getComputedStyle(mark);

        angle = parseFloat(style.getPropertyValue(angleProperty));
        dial.style.setProperty(radiusProperty, style.getPropertyValue('--micl-hour-radius'));
        mark.classList.add(markClass);
    }
    else if (name === 'minute') {
        angle = (toInt(value) * 360 / 60) - 90;
    }
    if (isNaN(angle)) {
        return;
    }

    const current = parseFloat(dial.style.getPropertyValue(angleProperty)) || 0;

    dial.style.setProperty(
        angleProperty,
        `${current + (((((angle - current) % 360) + 540) % 360) - 180)}deg`
    );
};

const setInputValue = (
    dialog  : HTMLElement,
    input   : HTMLInputElement,
    value?  : string,
    setampm?: boolean,
    setdial : boolean = true
): void => {

    let numeric = toInt(value || '0');
    if (isNaN(numeric)) {
        return;
    }

    if (input.name === 'hour' && setampm && uses12HourFormat(dialog)) {
        const am = getElement<HTMLInputElement>(dialog, `.${classPrefix}am`);
        const pm = getElement<HTMLInputElement>(dialog, `.${classPrefix}pm`);

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
    setValue(input, numeric);

    const dial = setdial && getElement<HTMLElement>(dialog, `.${classPrefix}dial`);
    if (dial) {
        setDial(dial, input.name, input.value);
    }
}

const addMarks = (dial: HTMLElement, h12: boolean): void => {
    let angle = h12 ? 300 : 270;
    let marks = '';

    for (let i = (h12 ? 1 : 0); i <= (h12 ? 12 : 23); i++) {
        const ring = !h12 && i >= 12
            ? ` class="${innerClass}"`
            : ` data-minute="${(i * 5) % 60}"`;

        marks += `<data value="${pad(i)}" data-hour="${i}"${ring} style="${angleProperty}:${angle}deg">${i}</data>`;
        angle  = (angle + 30) % 360;
    }
    dial.innerHTML = `${marks}<span class="${classPrefix}track"></span>`;
};

const showDialMarks = (dial: HTMLElement, name: string): void => {
    dial.querySelectorAll<HTMLDataElement>('data').forEach(mark =>
    {
        const value = mark.dataset[name];

        if (value) {
            mark.textContent = value;
            mark.value       = pad(value);
        }
        if (mark.classList.contains(innerClass)) {
            mark.classList.toggle(hiddenClass, name !== 'hour');
        }
    });
};

const handleSpinning = (dialog: HTMLElement, input: HTMLInputElement, event: KeyboardEvent): void => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return;
    }
    event.preventDefault();

    const h12 = uses12HourFormat(dialog);
    const [min, max] = getTimeLimits(input.name, h12);
    let value = toInt(input.value) || 0;

    value += event.key === 'ArrowUp' ? 1 : -1;
    if (value < min || value > max) {
        value = (value < min) ? max : min;
        if (input.name === 'hour' && h12) {
            getElement<HTMLInputElement>(dialog, 'input[name=period]:not(:checked)')?.click();
        }
    }

    setInputValue(dialog, input, `${value}`);
};

export default register(timepickerSelector, {
    initialize: (dialog: HTMLDialogElement): void =>
    {
        if (dialog.dataset.miclinitialized) {
            return;
        }

        const form     = getElement<HTMLFormElement>(dialog, 'form');
        const mode     = getElement<HTMLElement>(dialog, `.${classPrefix}inputmode`);
        const dial     = getElement<HTMLElement>(dialog, `.${classPrefix}dial`);
        const headline = getElement<HTMLElement>(dialog, '.micl-dialog__headline h2');
        const inputs   = [
            getElement<HTMLInputElement>(dialog, 'input[name=hour]'),
            getElement<HTMLInputElement>(dialog, 'input[name=minute]')
        ].filter((input): input is HTMLInputElement => !!input);

        if (!form || inputs.length < 2) {
            return;
        }
        dialog.dataset.miclinitialized = '1';

        const h12 = uses12HourFormat(dialog);

        const applyMode = (focus?: boolean): void => {
            const dialMode = isVisible(dial);
            const text     = dialog.dataset[dialMode ? 'micldialheadline' : 'miclinputheadline'];

            inputs.forEach(input => input.toggleAttribute('readonly', dialMode));
            if (headline && text) {
                headline.textContent = text;
            }
            if (focus) {
                inputs[0].focus();
                dialMode || inputs[0].select();
            }
        };

        inputs.forEach((input, i) => {
            setInputAttributes(input, h12);
            formatValue(input, h12);

            input.addEventListener('keydown', handleSpinning.bind(null, dialog, input));
            input.addEventListener('focus', () =>
            {
                toggleSelection(inputs[1 - i], false);
                toggleSelection(input, true);
                isVisible(dial) || input.select();
                if (dial) {
                    showDialMarks(dial, input.name);
                    setDial(dial, input.name, input.value);
                }
            });
            input.addEventListener('blur', () =>
            {
                if (!isVisible(dial)) {
                    formatValue(input, h12);
                    toggleSelection(input, false);
                }
            });
        });
        applyMode();

        const period = getElement<HTMLElement>(dialog, `.${classPrefix}period`);
        if (period && h12) {
            period.innerHTML = ['am', 'pm'].map((ampm, i) => '<input type="radio" name="period"'
                + ` class="${classPrefix}${ampm}" value="${ampm}"`
                + ` aria-label="${intl.periods[i]}"${i ? '' : ' checked'}>`
            ).join('');
        }

        mode?.addEventListener('click', () => {
            dial?.classList.toggle(hiddenClass);
            applyMode(true);
        });

        if (dial) {
            dial.setAttribute('aria-hidden', 'true');
            addMarks(dial, h12);

            const handleSelection = (event: PointerEvent) => {
                const target = document.elementFromPoint(event.clientX, event.clientY);
                if (target && target.tagName === 'DATA') {
                    setInputValue(
                        dialog,
                        inputs[inputs[1].classList.contains(selectedClass) ? 1 : 0],
                        (target as HTMLDataElement).value
                    );
                }
            };
            dial.addEventListener('pointerdown', (event: PointerEvent) => {
                dial.classList.add(draggingClass);
                handleSelection(event);
                dial.setPointerCapture(event.pointerId);
            });
            dial.addEventListener('pointermove', (event: PointerEvent) => {
                dial.classList.contains(draggingClass) && handleSelection(event);
            });
            const stopDragging = (event: PointerEvent, advance?: boolean): void => {
                const dragging = dial.classList.contains(draggingClass);

                dial.classList.remove(draggingClass);
                if (dial.hasPointerCapture(event.pointerId)) {
                    dial.releasePointerCapture(event.pointerId);
                }

                if (advance && dragging && inputs[0].classList.contains(selectedClass)) {
                    inputs[1].focus();
                }
            };
            dial.addEventListener('pointerup', event => stopDragging(event, true));
            dial.addEventListener('pointercancel', stopDragging);
        }

        dialog.addEventListener('beforetoggle', (event): void => {
            if (event.newState !== 'open') {
                return;
            }

            if (dial) {
                showDialMarks(dial, 'hour');
            }
            toggleSelection(inputs[1], false);
            toggleSelection(inputs[0], true);

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
                setInputValue(dialog, inputs[0], time[0], true);
                setInputValue(dialog, inputs[1], time[1], false, false);
            }
        });

        dialog.addEventListener('close', (): void => {
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

            let h     = toInt(inputs[0].value);
            const m   = toInt(inputs[1].value);
            if (isNaN(h) || isNaN(m)) {
                return;
            }
            if (h12) {
                h %= 12;
                if ((form.elements.namedItem('period') as RadioNodeList)?.value === 'pm') {
                    h += 12;
                }
            }
            const time = `${pad(h)}:${pad(m)}`;
            invoker.value = time;

            if (invoker instanceof HTMLInputElement) {
                invoker.dispatchEvent(new Event('change', { bubbles: true }));
                invoker.dispatchEvent(new Event('input', { bubbles: true }));
            }
            else {
                invoker.textContent = intl.time
                    ? intl.time.format(new Date(2024, 0, 1, h, m))
                    : time;
            }
        });
    }
}, HTMLDialogElement);
