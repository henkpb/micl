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

interface TimeLimits {
    max: number,
    min: number
}

export default (() =>
{
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

    const isValueElement = (element: Element): element is ValueElement =>
    {
        return element instanceof HTMLInputElement ||
               element instanceof HTMLTextAreaElement ||
               element instanceof HTMLSelectElement;
    };

    const isVisible = (element: Element | null): boolean =>
    {
        return !!element && !element.classList.contains('micl-hidden');
    };

    const toggleSelection = (element: Element, force: boolean): void =>
    {
        element.classList.toggle('micl-timepicker--selected', force);
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
            e => e.classList.remove('micl-timepicker__time--selected')
        );

        const mark = dial.querySelector(`data[data-${name}][value="${value}"]`);
        let angle  = '';

        if (mark) {
            angle = window.getComputedStyle(mark).getPropertyValue('--micl-angle');
            mark.classList.add('micl-timepicker__time--selected');
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
            const am = dialog.querySelector('.micl-timepicker__am') as HTMLInputElement;
            const pm = dialog.querySelector('.micl-timepicker__pm') as HTMLInputElement;

            if (numeric > 12) {
                if (pm) {
                    pm.checked = true;
                }
                numeric -= 12;
            }
            else if (am) {
                am.checked = true;
            }
        }
        input.value = `${numeric}`.padStart(2, '0');

        if (setdial) {
            const dial = getElement<HTMLElement>(dialog, '.micl-timepicker__dial');
            if (!dial) {
                return;
            }
            setDial(dial, name, input.value);
        }
    }

    const addMarks = (dialog: HTMLElement, dial: HTMLElement): void =>
    {
        let angle = uses12HourFormat ? 300 : 270;

        for (let i = (uses12HourFormat ? 1 : 0); i <= (uses12HourFormat ? 12 : 23); i++) {
            const mark = document.createElement('data') as HTMLDataElement;

            mark.value        = `${i}`.padStart(2, '0');
            mark.textContent  = `${i}`;
            mark.dataset.hour = `${i}`;
            mark.style.setProperty('--micl-angle', `${angle}deg`);
            if (!uses12HourFormat && i >= 12) {
                mark.classList.add('micl-timepicker__dial-inner');
            }
            else {
                mark.dataset.minute = `${(i * 5) % 60}`;
            }

            const element: HTMLDataElement = dial.appendChild(mark);

            element.addEventListener('pointerenter', event =>
            {
                if (dial.classList.contains('micl-timepicker__dial--dragging')) {
                    event.preventDefault();
                    setInputValue(dialog, !dialog.querySelector(
                        'input[name=hour].micl-timepicker--selected'
                    ) ? 'minute' : 'hour', mark.value);
                }
            });
            element.addEventListener('click', () =>
            {
                setInputValue(dialog, !dialog.querySelector(
                    'input[name=hour].micl-timepicker--selected'
                ) ? 'minute' : 'hour', element.value);
            });
            angle = (angle + 30) % 360;
        }

        const track: HTMLSpanElement = document.createElement('span');
        track.classList.add('micl-timepicker__track');
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
            if (mark.classList.contains('micl-timepicker__dial-inner')) {
                mark.classList[name === 'hour' ? 'remove' : 'add']('micl-hidden');
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

    return {
        initialize: (dialog: HTMLDialogElement): void =>
        {
            if (dialog.dataset.miclinitialized) {
                return;
            }

            const form   = getElement<HTMLFormElement>(dialog, 'form');
            const mode   = getElement<HTMLElement>(dialog, '.micl-timepicker__inputmode');
            const dial   = getElement<HTMLElement>(dialog, '.micl-timepicker__dial');
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

            const period = dialog.querySelector('.micl-timepicker__period');
            if (period && uses12HourFormat) {
                ['am', 'pm'].forEach(ampm => {
                    let e = document.createElement('input') as HTMLInputElement;
                    e.type = 'radio';
                    e.name = 'period';
                    e.classList.add(`micl-timepicker__${ampm}`);
                    e.value = ampm;
                    e.ariaLabel = ampm.toUpperCase();
                    period.appendChild(e);
                });
                period.classList.toggle('micl-hidden', !uses12HourFormat);
            }

            mode?.addEventListener('click', () =>
            {
                const icon = mode.textContent;
                mode.textContent = mode.dataset.alticon || icon;
                mode.dataset.alticon = icon;
                dial?.classList.toggle('micl-hidden');
                inputs.forEach(input =>
                {
                    input.toggleAttribute('readonly', isVisible(dial));
                });
                if (isVisible(dial)) {
                    inputs[0].focus();
                }
            });

            if (dial) {
                addMarks(dialog, dial);

                dial.addEventListener('pointerdown', event => {
                    event.preventDefault();
                    dial.classList.add('micl-timepicker__dial--dragging');
                });
                dial.addEventListener('pointerup', event => {
                    event.preventDefault();
                    dial.classList.remove('micl-timepicker__dial--dragging');
                });
            }

            dialog.addEventListener('beforetoggle', (event): void =>
            {
                if (event.oldState === 'open') {
                    return;
                }

                let invoker = document.activeElement as HTMLInputElement | HTMLButtonElement | null;
                if (
                    !invoker
                    || (!invoker.dataset.timepicker && !invoker.popoverTargetElement)
                ) {
                    invoker = document.querySelector(
                        `[data-timepicker="${dialog.id}"],[popovertarget="${dialog.id}"]`
                    );
                }
                if (!invoker) {
                    return;
                }
                (dialog as any)._miclInvoker = invoker;

                const time = (isValueElement(invoker) ? invoker.value : invoker.textContent).split(':');
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
                    invoker = document.querySelector(
                        `[data-timepicker="${dialog.id}"],[popovertarget="${dialog.id}"]`
                    );
                }
                if (!invoker) {
                    return;
                }

                const inputs = form.elements;
                let h = parseInt((inputs.namedItem('hour') as HTMLInputElement)?.value || '0', 10);
                if (isNaN(h)) {
                    return;
                }
                if (uses12HourFormat && (inputs.namedItem('period') as RadioNodeList)?.value === 'pm') {
                    h += 12;
                }
                const m = parseInt((inputs.namedItem('minute') as HTMLInputElement)?.value || '0', 10);
                if (isNaN(m)) {
                    return;
                }
                const time = `${h}`.padStart(2, '0') + ':' + `${m}`.padStart(2, '0');

                if (isValueElement(invoker)) {
                    invoker.value = time;
                }
                else {
                    invoker.textContent = time;
                }
            });
        }
    };
})();
