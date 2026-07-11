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

const classPrefix  = 'micl-datepicker__';
const noTransition = 'micl-no-transition';

type ValueElement = HTMLInputElement | HTMLButtonElement;

interface DatePickerState {
    invoker    : ValueElement | null;
    invokerEnd : HTMLInputElement | null;
    selected   : Date;
    selectedEnd: Date | null;
    range      : boolean;
    viewDate   : Date; // the month/year currently being viewed
    min        : Date;
    max        : Date;
}

const stateMap = new WeakMap<HTMLDialogElement, DatePickerState>();
const locale = new Intl.DateTimeFormat().resolvedOptions().locale;

const formatters = {
    input: new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit' }),
    header: new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' }),
    monthLong: new Intl.DateTimeFormat(undefined, { month: 'long' }),
    monthShort: new Intl.DateTimeFormat(locale, { month: 'short' }),
    weekdayNarrow: new Intl.DateTimeFormat(locale, { weekday: 'narrow' }),
    weekdayLong: new Intl.DateTimeFormat(locale, { weekday: 'long' })
};

const toLocalMidnight = (date: Date): Date =>
{
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

const formatToInputDateValue = (d: Date): string =>
{
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day   = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
};

const getDateFormat = (): string =>
{
    return formatters.input.formatToParts(new Date(2025, 0, 15)).map(part =>
    {
        switch (part.type) {
            case 'day'    : return 'DD';
            case 'month'  : return 'MM';
            case 'year'   : return 'YYYY';
            case 'literal': return part.value;
            default: return '';
        }
    }).join('').trim();
};

const getFirstDayOfWeek = (): number =>
{
    try {
        const info = (new Intl.Locale(locale) as any).getWeekInfo?.();
        if (info) {
            return info.firstDay === 7 ? 0 : info.firstDay;
        }
    }
    catch {}

    return /US|CA|MX/i.test(locale) ? 0 : 1; // Sunday for USA, Mexico and Canada, Monday as default
};

const firstDayOfWeek = getFirstDayOfWeek();
const isValidDate = (date: Date): boolean => !isNaN(date.getTime());

const readInputDate = (el: HTMLInputElement): Date | null =>
{
    if (el.type === 'date' && el.valueAsDate) {
        return el.valueAsDate;
    }
    return el.value ? new Date(el.value) : null;
};

const commitValue = (el: ValueElement, value: string, text: string): void =>
{
    el.value = value;
    if (el instanceof HTMLInputElement) {
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('input', { bubbles: true }));
    }
    else {
        el.textContent = text;
    }
};

const setText = (parent: Element | null, text: string): void =>
{
    if (!parent) {
        return;
    }
    if (parent.firstElementChild) {
        let node = parent.firstChild;
        while (node) {
            if (node.nodeType === Node.TEXT_NODE) {
                node.nodeValue = text;
                return;
            }
            node = node.nextSibling;
        }
        parent.appendChild(document.createTextNode(text));
    }
    else {
        parent.textContent = text;
    }
};

const getCalendarDays = (
    year : number,
    month: number
): Array<{ date: Date, val: string, isCurrentMonth: boolean }> => {

    const firstOfMonth = new Date(year, month, 1);
    const dayOfWeek    = firstOfMonth.getDay();
    const offset       = (dayOfWeek - firstDayOfWeek + 7) % 7;

    const startDate = new Date(year, month, 1 - offset);

    return Array.from({ length: 42 }, (_, i) => {
        const current = new Date(startDate);
        current.setDate(startDate.getDate() + i);
        return {
            date          : current,
            val           : formatToInputDateValue(current),
            isCurrentMonth: current.getMonth() === month
        };
    });
};

const renderCalendarHeader = (): DocumentFragment =>
{
    const tempDate = new Date();
    const startOffset = tempDate.getDay() - firstDayOfWeek;
    tempDate.setDate(tempDate.getDate() - startOffset);

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 7; i++) {
        const span = document.createElement('span');
        span.style.gridArea = `1 / ${i + 1}`;
        span.textContent = formatters.weekdayNarrow.format(tempDate);
        span.title = formatters.weekdayLong.format(tempDate);
        fragment.appendChild(span);
        tempDate.setDate(tempDate.getDate() + 1);
    }
    return fragment;
};

const populateContainerWithDays = (
    container: HTMLElement,
    days     : Array<{ date: Date, val: string, isCurrentMonth: boolean }>,
    state    : DatePickerState,
    isEmpty  : boolean = false
): void => {
    if (isEmpty) {
        const fragment = renderCalendarHeader();

        days.forEach((_, index) => {
            const time = document.createElement('time');
            const row = Math.floor(index / 7) + 2;
            const col = (index % 7) + 1;
            time.style.gridArea = `${row} / ${col}`;
            fragment.appendChild(time);
        });

        container.appendChild(fragment);
    }

    const today = toLocalMidnight(new Date());
    const start = state.selected.getTime();
    const end   = state.selectedEnd?.getTime();

    container.querySelectorAll('time').forEach((el, index) =>
    {
        const day = days[index];
        el.dateTime = day.val;
        el.textContent = day.date.getDate().toString();

        const time = day.date.getTime();
        const isSelected = time === start || time === end;
        const isToday = time === today.getTime();

        el.className = '';
        if (!day.isCurrentMonth) el.classList.add(`${classPrefix}outside`);
        if (isSelected) el.classList.add(`${classPrefix}selected`);
        if (isToday) el.classList.add(`${classPrefix}today`);

        // A single-day range (end equals start) renders as a plain selection.
        if (end !== undefined && end !== start) {
            if (time === start) {
                el.classList.add(`${classPrefix}range-start`);
            }
            else if (time === end) {
                el.classList.add(`${classPrefix}range-end`);
            }
            else if (time > start && time < end) {
                el.classList.add(`${classPrefix}inrange`);
            }
        }
    });
};

const renderCalendar = (
    dialog: HTMLDialogElement,
    state : DatePickerState,
    amount: number = 0
): void => {

    const content   = dialog.querySelector<HTMLElement>('.micl-dialog__content');
    const calendars = content?.querySelector<HTMLElement>(`.${classPrefix}calendars`);
    if (!calendars) {
        return;
    }

    const startClass     = 'micl-startleft';
    const endClass       = 'micl-startright';
    const moveLeftClass  = 'micl-moveleft';
    const moveRightClass = 'micl-moveright';

    calendars.classList.remove(moveLeftClass, moveRightClass, startClass, endClass);
    void calendars.offsetWidth;

    if (amount !== 0) {
        const oldCalendar = calendars.querySelector<HTMLElement>(`.${classPrefix}calendar`);
        if (!oldCalendar) {
            return;
        }

        const newCalendar      = document.createElement('div');
        const newCalendarInner = document.createElement('div');
        newCalendar.className      = `${classPrefix}calendar`;
        newCalendarInner.className = `${classPrefix}calendar-inner`;

        const days = getCalendarDays(state.viewDate.getFullYear(), state.viewDate.getMonth());
        populateContainerWithDays(newCalendarInner, days, state, true);

        const isNextMonth = amount > 0;
        const startPositionClass = isNextMonth ? startClass : endClass;
        const endTransformClass = isNextMonth ? moveLeftClass : moveRightClass;

        newCalendar.appendChild(newCalendarInner);
        if (isNextMonth) {
            calendars.appendChild(newCalendar);
        }
        else {
            calendars.prepend(newCalendar);
        }

        calendars.classList.add(noTransition, startPositionClass);
        void calendars.offsetWidth;

        requestAnimationFrame(() => {
            calendars.classList.remove(noTransition, startPositionClass);
            calendars.classList.add(endTransformClass);
        });

        const onTransitionEnd = () =>
        {
            calendars.removeEventListener('transitionend', onTransitionEnd);

            setTimeout(() =>
            {
                calendars.classList.remove(endTransformClass);
                if (oldCalendar.parentElement === calendars) {
                    oldCalendar.remove();
                }
                calendars.classList.add(noTransition, startClass);
                void calendars.offsetWidth;

                calendars.classList.remove(noTransition, startClass);
            }, 0);
        };
        calendars.addEventListener('transitionend', onTransitionEnd);
    }
    else {
        let calendar = calendars.querySelector<HTMLElement>(`.${classPrefix}calendar`);
        if (!calendar) {
            calendar = document.createElement('div');
            calendar.className = `${classPrefix}calendar`;
            calendar = calendars.appendChild(calendar);
        }
        let inner = calendar.querySelector<HTMLElement>(`.${classPrefix}calendar-inner`);
        if (!inner) {
            inner = document.createElement('div');
            inner.className = `${classPrefix}calendar-inner`;
            calendar.appendChild(inner);
        }
        const days = getCalendarDays(state.viewDate.getFullYear(), state.viewDate.getMonth());
        populateContainerWithDays(inner, days, state, inner.querySelectorAll('time').length === 0);
    }

    // In range mode the input view holds two text fields: start and end.
    content?.querySelectorAll<HTMLInputElement>(`.${classPrefix}input input`).forEach((input, index) =>
    {
        const date = index === 0 ? state.selected : state.selectedEnd;
        input.value = date ? formatters.input.format(date) : '';
        if (input.value) {
            input.dataset.miclvalue = '1';
        }
        else {
            delete input.dataset.miclvalue;
        }
        if (!input.dataset.micldateformat) {
            input.dataset.micldateformat = getDateFormat();
        }
    });

    setText(
        dialog.querySelector('h1, h2, h3, h4, h5, h6, .micl-heading'),
        state.range
            ? `${formatters.header.format(state.selected)} – ${state.selectedEnd ? formatters.header.format(state.selectedEnd) : ''}`
            : formatters.header.format(state.selected)
    );
    setText(dialog.querySelector(`.${classPrefix}month`), formatters.monthShort.format(state.viewDate));
    setText(
        dialog.querySelector(`.${classPrefix}year`),
        state.viewDate.toLocaleDateString(locale, dialog.classList.contains('micl-dialog--docked') ?
        { year: 'numeric' } : { month: 'long', year: 'numeric' })
    );

    const monthInput = dialog.querySelector<HTMLInputElement>(`.${classPrefix}months input[value="${state.viewDate.getMonth()}"]`);
    if (monthInput) monthInput.checked = true;

    const yearInput = dialog.querySelector<HTMLInputElement>(`.${classPrefix}years input[value="${state.viewDate.getFullYear()}"]`);
    if (yearInput) yearInput.checked = true;
};

const initPeriodPickers = (dialog: HTMLDialogElement, min: Date, max: Date): void =>
{
    const minYear  = min.getFullYear();
    const maxYear  = max.getFullYear();

    ['months', 'years'].forEach(period =>
    {
        const container = dialog.querySelector(`.${classPrefix}${period}`);
        if (!container) {
            return;
        }
        container.innerHTML = '';
        const frag = document.createDocumentFragment();

        const maxMonth = max.getMonth();

        if (period === 'months') {
            const months: number[] = [];

            let current = new Date(min.getFullYear(), min.getMonth(), 1);
            while (
                current <= max
                || (current.getMonth() === maxMonth && current.getFullYear() === maxYear)
            ) {
                months.push(current.getMonth());
                current.setMonth(current.getMonth() + 1);
            }

            [...new Set(months.sort((a, b) => a - b))].forEach(m => {
                const label = document.createElement('label');
                label.innerHTML = `<span class="material-symbols-outlined">check</span><input type="radio" name="miclmonth" value="${m}"> ${formatters.monthLong.format(new Date(2000, m, 1))}`;
                frag.appendChild(label);
            });
        }
        else {
            for (let y = minYear; y <= maxYear; y++) {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="miclyear" value="${y}"> ${y}`;
                frag.appendChild(label);
            }
        }

        const inner = document.createElement('div');
        inner.className = `${classPrefix}${period}-inner`;
        container.appendChild(inner).appendChild(frag);
    });
};

const toggleView = (dialog: HTMLDialogElement, view: 'calendars' | 'months' | 'years' | 'input'): void =>
{
    if (view === 'months' || view === 'years') {
        if (!dialog.querySelector(`.${classPrefix}${view}.${classPrefix}view-hidden`)) {
            view = 'calendars';
        }
    }

    ['calendars', 'input', 'month-selector', 'year-selector'].forEach(name =>
    {
        let doHide = view === 'input';
        if (name === 'calendars' || name === 'input') {
            doHide = view !== name;
        }
        dialog.querySelector(`.${classPrefix}${name}`)?.classList.toggle(
            `${classPrefix}view-hidden`,
            doHide
        );
    });

    const content = dialog.querySelector<HTMLElement>('.micl-dialog__content');
    if (!content) {
        return;
    }
    const contentHeight = parseInt(window.getComputedStyle(content).getPropertyValue('max-block-size'), 10);

    ['months', 'years'].forEach(name =>
    {
        const period = content.querySelector<HTMLElement>(`.${classPrefix}${name}`);
        if (!period) {
            return;
        }
        const selected = period.querySelector<HTMLInputElement>('input:checked');
        const height   = 48;
        let doHide: boolean | null = false;

        if (selected && name === view) {
            const property = window.getComputedStyle(period).getPropertyValue('transition-duration');
            const duration = parseFloat(property) * (property.includes('ms') ? 1 : 1000);
            const maxScrollDistance = period.scrollHeight - contentHeight;
            const centerTop = (contentHeight - height) / 2;

            if (selected.offsetTop > centerTop) {
                let scrollDistance = selected.offsetTop - centerTop - (height / 2);
                if (scrollDistance > maxScrollDistance) {
                    scrollDistance = maxScrollDistance;
                }

                const startTime = performance.now();
                const animateScroll = (currentTime: number) => {
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    content.scrollTop = scrollDistance * progress;
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                };
                period.classList.remove(`${classPrefix}view-hidden`);
                requestAnimationFrame(animateScroll);
                doHide = null;

                period.addEventListener('transitionend', function handler(event)
                {
                    if (event.propertyName === 'height' || event.propertyName === 'block-size') {
                        content.scrollTop = scrollDistance;
                        period.removeEventListener('transitionend', handler);
                    }
                });
            }
        }
        else {
            doHide = true;
        }
        if (doHide !== null) {
            period.classList.toggle(`${classPrefix}view-hidden`, doHide);
        }
    });
};

const changePeriod = (dialog: HTMLDialogElement, amount: number, unit: 'month' | 'year'): void =>
{
    const state = stateMap.get(dialog);
    if (!state) {
        return;
    }

    const newDate = new Date(state.viewDate);
    if (unit === 'month') {
        newDate.setMonth(newDate.getMonth() + amount);
    }
    else {
        newDate.setFullYear(newDate.getFullYear() + amount);
    }

    const belowMin = state.min && newDate < state.min;
    const aboveMax = state.max && newDate > state.max;

    if (belowMin || aboveMax) {
        dialog.querySelector(`.${classPrefix}calendars`)?.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(${belowMin ? 8 : -8}px)` },
            { transform: 'translateX(0)' }
        ], { duration: 500, easing: 'ease-in-out' });
        return;
    }

    state.viewDate = newDate;
    renderCalendar(dialog, state, unit === 'month' ? amount : 0);
};

const parseLocaleDate = (dateStr: string): Date | null =>
{
    const dateformat = getDateFormat();
    if (dateStr.length !== dateformat.length) {
        return null;
    }

    let d = '';
    let m = '';
    let y = '';
    for (let i = 0; i < dateformat.length; i++) {
        switch (dateformat[i]) {
            case 'D': d += dateStr[i]; break;
            case 'M': m += dateStr[i]; break;
            case 'Y': y += dateStr[i]; break;
            default:
        }
    }
    const date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));

    return isValidDate(date) ? date : null;
};

const selectDate = (dialog: HTMLDialogElement, dateStr: string): void =>
{
    const state = stateMap.get(dialog);
    if (!state) {
        return;
    }

    const parts = dateStr.split('-').map(Number);
    if (parts.length === 3) {
        const picked = new Date(parts[0], parts[1] - 1, parts[2]);

        if (state.range) {
            if (state.selectedEnd || picked < state.selected) {
                // Restart when a range is complete; move the start when the
                // picked date lies before it.
                state.selected    = picked;
                state.selectedEnd = null;
            }
            else {
                state.selectedEnd = picked;
            }
        }
        else {
            state.selected = picked;
        }
        state.viewDate = new Date(picked);

        renderCalendar(dialog, state);
    }
};

// Applies a manually entered date to the endpoint belonging to the edited
// text field: index 0 is the start (and the only field in single mode).
const setInputDate = (dialog: HTMLDialogElement, index: number, dateStr: string): void =>
{
    const state = stateMap.get(dialog);
    if (!state) {
        return;
    }

    const parsed = parseLocaleDate(dateStr);
    if (parsed) {
        if (state.range && index > 0) {
            state.selectedEnd = parsed;
        }
        else {
            state.selected = parsed;
        }
        if (state.selectedEnd && state.selectedEnd < state.selected) {
            [state.selected, state.selectedEnd] = [state.selectedEnd, state.selected];
        }
        state.viewDate = new Date(state.selected);
    }

    // An unparsable entry re-renders too: that restores the field's content.
    renderCalendar(dialog, state);
};

export default {
    keydown: (event: Event): void =>
    {
        if (
            !(event instanceof KeyboardEvent)
            || !(event.target instanceof Element)
        ) {
            return;
        }
        const dialog = event.target.closest(datepickerSelector) as HTMLDialogElement;
        if (!dialog) {
            return;
        }

        switch (event.key) {
            case 'Enter':
            case ' ':
                if (event.target instanceof HTMLInputElement && event.target.type === 'date') {
                    event.preventDefault();
                }
                break;
            case 'M':
                toggleView(dialog, 'months');
                break;
            case 'Y':
                toggleView(dialog, 'years');
                break;
            case 'PageUp':
            case 'PageDown':
                changePeriod(dialog, event.key === 'PageUp' ? 1 : -1, event.shiftKey ? 'year' : 'month');
                break;
            default:
        }
    },

    initialize: (dialog: HTMLDialogElement): void =>
    {
        if (dialog.dataset.miclinitialized) {
            return;
        }

        const form    = dialog.querySelector('form');
        const content = dialog.querySelector('.micl-dialog__content');
        if (!form || !content) {
            return;
        }
        dialog.dataset.miclinitialized = '1';

        dialog.addEventListener('click', event =>
        {
            const target = event.target as HTMLElement;
            const btn    = target.closest('button');

            if (btn) {
                const forMonth = btn.parentElement?.classList.contains(`${classPrefix}month-selector`);
                const isNext   = btn.classList.contains(`${classPrefix}next`);
                const isPrev   = btn.classList.contains(`${classPrefix}previous`);

                if (isNext || isPrev) {
                    changePeriod(dialog, isNext ? 1 : -1, forMonth ? 'month' : 'year');
                    return;
                }
            }

            if (target.closest(`.${classPrefix}month`)) toggleView(dialog, 'months');
            if (target.closest(`.${classPrefix}year`)) toggleView(dialog, 'years');

            const mode = target.closest(`.${classPrefix}inputmode`) as HTMLElement;
            if (mode) {
                toggleView(dialog, !dialog.querySelector(
                    `.${classPrefix}input.${classPrefix}view-hidden`
                ) ? 'calendars' : 'input');
            }

            const time = target.closest('time');
            if (time && time.dateTime) {
                selectDate(dialog, time.dateTime);
            }

            if (
                target instanceof HTMLInputElement
                && (target.name === 'miclmonth' || target.name === 'miclyear')
            ) {
                const state = stateMap.get(dialog);
                if (state) {
                    const value = parseInt(target.value, 10);
                    if (target.name === 'miclmonth') {
                        state.viewDate.setMonth(value);
                    }
                    else {
                        state.viewDate.setFullYear(value);
                    }
                    if (state.viewDate < state.min) {
                        state.viewDate = state.min;
                    }
                    else if (state.viewDate > state.max) {
                        state.viewDate = state.max;
                    }
                    renderCalendar(dialog, state);
                    toggleView(dialog, 'calendars');
                }
            }
        });

        dialog.addEventListener('focusout', (event: Event): void =>
        {
            const input = event.target;
            if (!(input instanceof HTMLInputElement) || !input.closest(`.${classPrefix}input`)) {
                return;
            }
            const inputs = dialog.querySelectorAll<HTMLInputElement>(`.${classPrefix}input input`);
            setInputDate(dialog, Array.prototype.indexOf.call(inputs, input), input.value);
        });

        dialog.addEventListener('beforetoggle', (event: any): void =>
        {
            if (event.newState !== 'open') {
                return;
            }
            const isInvoker = (e: Element | null): e is ValueElement => e instanceof HTMLInputElement || e instanceof HTMLButtonElement;

            let invoker = document.activeElement;
            if (
                !isInvoker(invoker)
                || (invoker.dataset.datepicker !== dialog.id
                    && invoker.popoverTargetElement !== dialog
                    && (invoker as any).commandForElement !== dialog)
            ) {
                invoker = document.querySelector(
                    `[data-datepicker="${dialog.id}"],[popovertarget="${dialog.id}"],[commandfor="${dialog.id}"]`
                );
            }
            if (!isInvoker(invoker)) {
                return;
            }

            const range = dialog.classList.contains('micl-datepicker--range');
            let invokerStart: ValueElement = invoker;
            let invokerEnd: HTMLInputElement | null = null;

            if (range && invoker instanceof HTMLInputElement) {
                if (invoker.dataset.miclrangeto) {
                    const end = document.getElementById(invoker.dataset.miclrangeto);
                    invokerEnd = end instanceof HTMLInputElement ? end : null;
                }
                else if (invoker.id) {
                    // the picker was invoked by the end input of a pair
                    const start = document.querySelector<HTMLInputElement>(`input[data-miclrangeto="${invoker.id}"]`);
                    if (start) {
                        invokerEnd   = invoker;
                        invokerStart = start;
                    }
                }
            }

            let initialDate = new Date();
            let initialEnd: Date | null = null;
            let min = new Date(1900, 0, 1);
            let max = new Date(2099, 11, 31);

            if (invokerStart instanceof HTMLInputElement) {
                initialDate = readInputDate(invokerStart) || initialDate;
                if (invokerStart.min) min = new Date(invokerStart.min);
                if (invokerStart.max) max = new Date(invokerStart.max);
            }
            else {
                // a single range invoker holds an ISO 8601 interval (start/end)
                const [startStr, endStr] = (invokerStart.value || invokerStart.textContent || '').split('/');
                const parsed = new Date(startStr);
                if (isValidDate(parsed)) {
                    initialDate = parsed;
                }
                if (range && endStr) {
                    initialEnd = new Date(endStr);
                }
            }
            if (invokerEnd) {
                initialEnd = readInputDate(invokerEnd);
                if (invokerEnd.max) max = new Date(invokerEnd.max);
            }

            if (!isValidDate(initialDate)) initialDate = new Date();
            initialDate = toLocalMidnight(initialDate);

            if (initialEnd && isValidDate(initialEnd)) {
                initialEnd = toLocalMidnight(initialEnd);
                if (initialEnd < initialDate) {
                    [initialDate, initialEnd] = [initialEnd, initialDate];
                }
            }
            else {
                initialEnd = null;
            }

            const state: DatePickerState = {
                invoker    : invokerStart,
                invokerEnd,
                selected   : initialDate,
                selectedEnd: range ? initialEnd : null,
                range,
                viewDate   : new Date(initialDate),
                min,
                max
            };
            stateMap.set(dialog, state);

            initPeriodPickers(dialog, min, max);
            toggleView(dialog, 'calendars');
            renderCalendar(dialog, state);
        });

        dialog.addEventListener('close', (): void =>
        {
            const state = stateMap.get(dialog);
            if (!state?.invoker || dialog.returnValue === '') {
                return;
            }

            // An incomplete range is committed as a single-day range.
            const end = state.selectedEnd || state.selected;

            if (state.range && !state.invokerEnd) {
                // a single invoker holds the range as an ISO 8601 interval
                commitValue(
                    state.invoker,
                    `${formatToInputDateValue(state.selected)}/${formatToInputDateValue(end)}`,
                    `${state.selected.toLocaleDateString()} – ${end.toLocaleDateString()}`
                );
            }
            else {
                commitValue(state.invoker, formatToInputDateValue(state.selected), state.selected.toLocaleDateString());
                if (state.invokerEnd) {
                    commitValue(state.invokerEnd, formatToInputDateValue(end), end.toLocaleDateString());
                }
            }
        });
    }
};
