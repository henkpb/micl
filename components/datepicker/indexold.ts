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

export const datepickerSelector = 'dialog.micl-dialog.micl-datepicker';

type ValueElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface CalendarDay {
    date          : Date;
    dayOfMonth    : number;
    isCurrentMonth: boolean;
    isSelected    : boolean;
    isToday       : boolean;
    value         : string;
}

type CalendarWeek = CalendarDay[];

export default (() =>
{
    const setScrollbarColor = () =>
    {
        document.documentElement.style.setProperty(
            '--md-sys-scrollbar-thumb-color',
            window.getComputedStyle(document.body).getPropertyValue('--md-sys-color-outline').trim()
        );
    };

    const locale = ((): string => (new Intl.DateTimeFormat()).resolvedOptions().locale)();

    const firstDayOfWeek = ((): number =>
    {
        try {
            const currentLocale = new Intl.Locale(locale);
            if (typeof currentLocale.getWeekInfo === 'function') {
                const firstDay = currentLocale.getWeekInfo().firstDay;
                return firstDay === 7 ? 0 : firstDay;
            }
        }
        catch (e) {
        }
        if (locale.toLowerCase().includes('us') || locale.toLowerCase().includes('ca')) {
            return 0; // Sunday for USA and Canada
        }
        return 1; // default to Monday
    })();

    const toLocalDate = (utcDate: Date | null): Date =>
    {
        const date = !utcDate ? new Date() :
                     new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000);
        date.setHours(0, 0, 0, 0);
        return date;
    };

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

    const updateTextNode = (element: Element | null, value: string): void =>
    {
        if (!element) {
            return;
        }
        const child = element.firstElementChild;
        if (!child) {
            element.textContent = value;
        }
        else {
            let neighbour = child.previousSibling;
            if (neighbour && neighbour.nodeType === Node.TEXT_NODE) {
                neighbour.nodeValue = value;
            }
            else {
                neighbour = child.nextSibling;
                if (neighbour && neighbour.nodeType === Node.TEXT_NODE) {
                    neighbour.nodeValue = value;
                }
                else {
                    const newTextNode = document.createTextNode(value);
                    element.insertBefore(newTextNode, element);
                }
            }
        }
    };

    const getCalendar = (forYear: number, forMonth: number, selected: Date): CalendarWeek[] =>
    {
        const firstDayOfMonth = new Date(forYear, forMonth, 1);
        const today           = new Date();
        today.setHours(0, 0, 0, 0);

        let offset   = firstDayOfMonth.getDay() - firstDayOfWeek;
        if (offset < 0) {
            offset += 7;
        }
        const startDay = new Date(firstDayOfMonth);
        startDay.setDate(firstDayOfMonth.getDate() - offset);

        const calendar: CalendarWeek[] = [];
        let currentDay = new Date(startDay);

        for (let i = 0; i < 6; i++) {
            const week: CalendarWeek = [];
            for (let j = 0; j < 7; j++) {
                const year  = currentDay.getFullYear();
                const month = currentDay.getMonth();
                const day   = currentDay.getDate();

                const weekday: CalendarDay = {
                    date          : new Date(currentDay),
                    dayOfMonth    : day,
                    isCurrentMonth: month === forMonth,
                    isSelected    : currentDay.getTime() === selected.getTime(),
                    isToday       : currentDay.getTime() === today.getTime(),
                    value         : `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                };
                week.push(weekday);
                currentDay.setDate(day + 1);
            }
            calendar.push(week);
        }

        return calendar;
    };

    const addCalendar = (dialog: HTMLDialogElement): void =>
    {
        const container = getElement<HTMLElement>(dialog, '.micl-datepicker__calendar');
        if (!container) {
            return;
        }
        const calendar: CalendarWeek[] = getCalendar(
            (dialog as any)._miclDatePicker.year,
            (dialog as any)._miclDatePicker.month,
            (dialog as any)._miclDatePicker.selected
        );
        const tempDate = new Date(2023, 0, firstDayOfWeek === 6 ? 1 : 2);
        for (let i = 1; i <= 7; i++) {
            const e = document.createElement('span') as HTMLSpanElement;
            e.style.gridArea = `1 / ${i} / 1 / ${i}`;
            e.appendChild(document.createTextNode(tempDate.toLocaleDateString(locale, { weekday: 'narrow' })));
            container.appendChild(e);
            tempDate.setDate(tempDate.getDate() + 1);
        }

        calendar.forEach((week, i) => {
            week.forEach((day, j) => {
                const e = document.createElement('time') as HTMLTimeElement;
                e.dateTime = day.value;
                e.style.gridArea = `${i + 2} / ${j + 1} / ${i + 2} / ${j + 1}`;
                e.appendChild(document.createTextNode(`${day.dayOfMonth}`));
                container.appendChild(e);
            });
        });
    };

    const updateCalendar = (dialog: HTMLDialogElement): void =>
    {
        const container = getElement<HTMLElement>(dialog, '.micl-datepicker__calendar');
        if (!container) {
            return;
        }
        const calendar: CalendarWeek[] = getCalendar(
            (dialog as any)._miclDatePicker.year,
            (dialog as any)._miclDatePicker.month,
            (dialog as any)._miclDatePicker.selected
        );
        const title = getElement<HTMLElement>(dialog, 'h1, h2, h3, h4, h5, h6, .micl-heading');
        const month = getElement<HTMLElement>(dialog, '.micl-datepicker__month');
        const year  = getElement<HTMLElement>(dialog, '.micl-datepicker__year');
        const times = container.querySelectorAll('time');

        calendar.forEach((week, i) => {
            week.forEach((day, j) => {
                const e = times.item(7 * i + j);
                e.dateTime = day.value;
                e.textContent = `${day.dayOfMonth}`;
                e.classList.toggle('micl-datepicker__outside', !day.isCurrentMonth);
                e.classList.toggle('micl-datepicker__today', day.isToday);
                e.classList.toggle('micl-datepicker__selected', day.isSelected);
            });
        });

        const tempDate = new Date((dialog as any)._miclDatePicker.year, (dialog as any)._miclDatePicker.month, firstDayOfWeek === 6 ? 1 : 4);
        updateTextNode(title, (dialog as any)._miclDatePicker.selected.toLocaleDateString(locale, {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        }));
        updateTextNode(month, tempDate.toLocaleDateString(
            locale,
            !year ? { month: 'long', year: 'numeric' } : { month: 'short' }
        ));
        updateTextNode(year, tempDate.toLocaleDateString(locale, { year: 'numeric' }));

        getElement<HTMLElement>(dialog, `.micl-datepicker__months input[value="${(dialog as any)._miclDatePicker.month}"]`)?.click();
        getElement<HTMLElement>(dialog, `.micl-datepicker__years input[value="${(dialog as any)._miclDatePicker.year}"]`)?.click();

        setScrollbarColor();
    };

    const drawMonths = (dialog: HTMLDialogElement): void =>
    {
        const months = getElement<HTMLElement>(dialog, '.micl-datepicker__months');
        if (!months) {
            return;
        }
        const formatter = new Intl.DateTimeFormat(undefined, { month: 'long' });
        months.innerHTML = '';

        for (let i = 0; i < 12; i++) {
            const input = document.createElement('input') as HTMLInputElement;
            input.type  = 'radio';
            input.id    = `miclmonth${i}`;
            input.name  = 'miclmonth';
            input.value = `${i}`;

            const icon = document.createElement('span') as HTMLSpanElement;
            icon.classList.add('material-symbols-outlined');
            icon.appendChild(document.createTextNode('check'));

            const label = document.createElement('label') as HTMLLabelElement;
            label.appendChild(icon);
            label.appendChild(input);
            label.appendChild(document.createTextNode(formatter.format(new Date(2026, i, 1))));
            months.appendChild(label);
        }
    };

    const drawYears = (dialog: HTMLDialogElement): void =>
    {
        const years = getElement<HTMLElement>(dialog, '.micl-datepicker__years');
        if (!years) {
            return;
        }
        years.innerHTML = '';

        for (let i = (dialog as any)._miclDatePicker.minmax[0];
                 i <= (dialog as any)._miclDatePicker.minmax[2];
                 i++
        ) {
            const input = document.createElement('input') as HTMLInputElement;
            input.type  = 'radio';
            input.id    = `miclyear${i}`;
            input.name  = 'miclyear';
            input.value = `${i}`;

            const label = document.createElement('label') as HTMLLabelElement;
            label.appendChild(input);
            label.appendChild(document.createTextNode(`${i}`));
            years.appendChild(label);
        }
    };

    const toggleVisibility = (dialog: HTMLDialogElement, show: number = 0): void =>
    {
        getElement<HTMLElement>(dialog, '.micl-datepicker__calendar')?.classList.toggle('micl-hidden', show !== 0);
        getElement<HTMLElement>(dialog, '.micl-datepicker__months')?.classList.toggle('micl-hidden', show !== 1);
        getElement<HTMLElement>(dialog, '.micl-datepicker__years')?.classList.toggle('micl-hidden', show !== 2);
        if (show !== 0) {
            dialog.querySelectorAll('input[type=radio]:checked').forEach(e => {
                e.scrollIntoView({ block: 'center' });
            });
        }
    };

    return {
        initialize: (dialog: HTMLDialogElement): void =>
        {
            if (dialog.dataset.miclinitialized) {
                return;
            }

            const form    = getElement<HTMLFormElement>(dialog, 'form');
            const content = getElement<HTMLElement>(dialog, '.micl-dialog__content');

            if (!form || !content) {
                return;
            }
            dialog.dataset.miclinitialized = '1';

            const today = new Date();
            (dialog as any)._miclDatePicker = {
                invoker : null,
                selected: today,
                minmax  : [1900, 0, 2099, 12],
                month   : today.getMonth(),
                year    : today.getFullYear()
            };

            toggleVisibility(dialog);

            addCalendar(dialog);

            dialog.querySelectorAll('.micl-datepicker__previous').forEach(button =>
            {
                button.addEventListener('click', () =>
                {
                    if (button.parentElement?.classList.contains('micl-datepicker__month-selector')) {
                        if (
                            (dialog as any)._miclDatePicker.minmax[0] < (dialog as any)._miclDatePicker.year
                            || (dialog as any)._miclDatePicker.minmax[1] < (dialog as any)._miclDatePicker.month
                        ) {
                            (dialog as any)._miclDatePicker.month--;
                            if ((dialog as any)._miclDatePicker.month < 0) {
                                (dialog as any)._miclDatePicker.month = 11;
                                (dialog as any)._miclDatePicker.year--;
                            }
                            updateCalendar(dialog);
                        }
                    }
                    else {
                        if ((dialog as any)._miclDatePicker.minmax[0] < (dialog as any)._miclDatePicker.year) {
                            (dialog as any)._miclDatePicker.year--;
                            updateCalendar(dialog);
                        }
                    }
                });
            });
            dialog.querySelectorAll('.micl-datepicker__next').forEach(button =>
            {
                button.addEventListener('click', () =>
                {
                    if (button.parentElement?.classList.contains('micl-datepicker__month-selector')) {
                        if (
                            (dialog as any)._miclDatePicker.minmax[2] > (dialog as any)._miclDatePicker.year
                            || (dialog as any)._miclDatePicker.minmax[3] > (dialog as any)._miclDatePicker.month
                        ) {
                            (dialog as any)._miclDatePicker.month++;
                            if ((dialog as any)._miclDatePicker.month > 11) {
                                (dialog as any)._miclDatePicker.month = 0;
                                (dialog as any)._miclDatePicker.year++;
                            }
                            updateCalendar(dialog);
                        }
                    }
                    else {
                        if ((dialog as any)._miclDatePicker.minmax[2] > (dialog as any)._miclDatePicker.year) {
                            (dialog as any)._miclDatePicker.year++;
                            updateCalendar(dialog);
                        }
                    }
                });
            });
            getElement<HTMLElement>(dialog, '.micl-datepicker__month')?.addEventListener('click', () =>
            {
                toggleVisibility(dialog, 1);
            });
            getElement<HTMLElement>(dialog, '.micl-datepicker__year')?.addEventListener('click', () =>
            {
                toggleVisibility(dialog, 2);
            });

            dialog.addEventListener('beforetoggle', (event): void =>
            {
                if (event.oldState === 'open') {
                    return;
                }

                let invoker = document.activeElement as HTMLInputElement | HTMLButtonElement | null;
                if (
                    !invoker
                    || (!invoker.dataset.datepicker && !invoker.popoverTargetElement)
                ) {
                    invoker = document.querySelector(
                        `[data-datepicker="${dialog.id}"],[popovertarget="${dialog.id}"]`
                    );
                }
                if (!invoker) {
                    return;
                }

                let date   = toLocalDate(null);
                let max    = '';
                let min    = '';
                let minmax = [1900, 0, 2099, 12];
                if (isValueElement(invoker)) {
                    if (invoker.type === 'date') {
                        date = toLocalDate(invoker.valueAsDate);
                        max  = invoker.max;
                        min  = invoker.min;
                    }
                    else if (invoker.value) {
                        date = new Date(invoker.value);
                    }
                }
                else if (invoker.textContent) {
                    date = new Date(invoker.textContent);
                }
                if (isNaN(date.valueOf())) {
                    date = toLocalDate(null);
                }
                [min, max].forEach((m, i) => {
                    if (m) {
                        const mDate = new Date(m);
                        if (!isNaN(mDate.valueOf())) {
                            minmax[i * 2] = mDate.getFullYear();
                            minmax[i * 2 + 1] = mDate.getMonth();
                        }
                    }
                });

                (dialog as any)._miclDatePicker = {
                    invoker : invoker,
                    selected: date,
                    minmax  : minmax,
                    month   : date.getMonth(),
                    year    : date.getFullYear()
                };

                drawMonths(dialog);
                drawYears(dialog);
                updateCalendar(dialog);
            });

            dialog.addEventListener('close', (): void =>
            {
                if (!dialog.returnValue) {
                    return;
                }

                let invoker = (dialog as any)._miclInvoker;
                if (!invoker) {
                    invoker = document.querySelector(
                        `[data-datepicker="${dialog.id}"],[popovertarget="${dialog.id}"]`
                    );
                }
                if (!invoker) {
                    return;
                }


                if (isValueElement(invoker)) {
                    // invoker.value = date;
                }
                else {
                    // invoker.textContent = date;
                }
            });
        }
    };
})();
