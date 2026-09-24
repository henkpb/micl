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
//

import { register } from '../../foundations/runtime';

export const datepickerSelector = 'dialog.micl-dialog.micl-datepicker';

const classPrefix  = 'micl-datepicker__';
const noTransition = 'micl-datepicker__no-transition';

type ValueElement = HTMLInputElement | HTMLButtonElement;

interface DatePickerState {
    invoker    : ValueElement | null;
    invokerEnd : HTMLInputElement | null;
    selected   : Date;
    selectedEnd: Date | null;
    range      : boolean;
    viewDate   : Date; // the month/year currently being viewed
    focusDate  : Date; // the date owning the roving tabindex
    min        : Date;
    max        : Date;
}

const stateMap = new WeakMap<HTMLDialogElement, DatePickerState>();
const slideMap = new WeakMap<HTMLElement, () => void>();
const locale = new Intl.DateTimeFormat().resolvedOptions().locale;

const formatters = {
    input: new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit' }),
    header: new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' }),
    cell: new Intl.DateTimeFormat(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    monthLong: new Intl.DateTimeFormat(locale, { month: 'long' }),
    monthShort: new Intl.DateTimeFormat(locale, { month: 'short' }),
    weekdayNarrow: new Intl.DateTimeFormat(locale, { weekday: 'narrow' }),
    weekdayLong: new Intl.DateTimeFormat(locale, { weekday: 'long' })
};

const isValidDate = (date: Date): boolean => !isNaN(date.getTime());

const localDate = (year: number, month: number, day: number): Date =>
{
    const date = new Date(year, month, day);
    date.setFullYear(year, month, day);
    return date;
};

const toLocalMidnight = (date: Date): Date =>
    localDate(date.getFullYear(), date.getMonth(), date.getDate());

const daysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();

const monthIndex = (date: Date): number => date.getFullYear() * 12 + date.getMonth();

const addMonths = (date: Date, amount: number): Date =>
{
    const first = localDate(date.getFullYear(), date.getMonth() + amount, 1);
    const year  = first.getFullYear();
    const month = first.getMonth();
    return localDate(year, month, Math.min(date.getDate(), daysInMonth(year, month)));
};

const withMonth = (date: Date, year: number, month: number): Date =>
    localDate(year, month, Math.min(date.getDate(), daysInMonth(year, month)));

const clampToRange = (date: Date, min: Date, max: Date): Date =>
    date < min ? new Date(min) : date > max ? new Date(max) : new Date(date);

const clampToMonthRange = (date: Date, min: Date, max: Date): Date =>
{
    if (monthIndex(date) < monthIndex(min)) {
        return withMonth(date, min.getFullYear(), min.getMonth());
    }
    if (monthIndex(date) > monthIndex(max)) {
        return withMonth(date, max.getFullYear(), max.getMonth());
    }
    return new Date(date);
};

const parseISODate = (value: string): Date | null =>
{
    const parts = /^(\d{4,6})-(\d{2})-(\d{2})/.exec(value.trim());
    if (!parts) {
        return null;
    }
    const month = parseInt(parts[2], 10) - 1;
    const day   = parseInt(parts[3], 10);
    const date  = localDate(parseInt(parts[1], 10), month, day);

    return date.getMonth() === month && date.getDate() === day ? date : null;
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
const dateFormat = getDateFormat();

const readInputDate = (el: HTMLInputElement): Date | null =>
{
    const parsed = parseISODate(el.value);
    if (parsed) {
        return parsed;
    }
    if (!el.value) {
        return null;
    }
    const loose = new Date(el.value);
    return isValidDate(loose) ? toLocalMidnight(loose) : null;
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

const commitValue = (el: ValueElement, value: string, text: string): void =>
{
    el.value = value;
    if (el instanceof HTMLInputElement) {
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    }
    else {
        setText(el, text);
    }
};

const getCalendarDays = (
    year : number,
    month: number
): Array<{ date: Date, val: string, isCurrentMonth: boolean }> => {

    const firstOfMonth = localDate(year, month, 1);
    const offset       = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
    const startDate    = localDate(year, month, 1 - offset);

    return Array.from({ length: 42 }, (_, i) => {
        const current = localDate(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
        return {
            date          : current,
            val           : formatToInputDateValue(current),
            isCurrentMonth: current.getMonth() === month
        };
    });
};

const renderCalendarHeader = (): HTMLElement =>
{
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - ((tempDate.getDay() - firstDayOfWeek + 7) % 7));

    const row = document.createElement('div');
    row.setAttribute('role', 'row');

    for (let i = 0; i < 7; i++) {
        const span = document.createElement('span');
        const long = formatters.weekdayLong.format(tempDate);
        span.setAttribute('role', 'columnheader');
        span.setAttribute('aria-label', long);
        span.textContent = formatters.weekdayNarrow.format(tempDate);
        span.title = long;
        row.appendChild(span);
        tempDate.setDate(tempDate.getDate() + 1);
    }
    return row;
};

const populateContainerWithDays = (
    container: HTMLElement,
    days     : Array<{ date: Date, val: string, isCurrentMonth: boolean }>,
    state    : DatePickerState,
    isEmpty  : boolean = false
): void => {
    if (isEmpty) {
        container.setAttribute('role', 'grid');
        container.appendChild(renderCalendarHeader());

        for (let row = 0; row < 6; row++) {
            const week = document.createElement('div');
            week.setAttribute('role', 'row');

            for (let column = 0; column < 7; column++) {
                const time = document.createElement('time');
                time.setAttribute('role', 'gridcell');
                week.appendChild(time);
            }
            container.appendChild(week);
        }
    }

    const today = toLocalMidnight(new Date()).getTime();
    const start = state.selected.getTime();
    const end   = state.selectedEnd?.getTime();
    const focus = state.focusDate.getTime();
    const min   = state.min.getTime();
    const max   = state.max.getTime();
    let   roved = false;

    container.querySelectorAll('time').forEach((el, index) =>
    {
        const day  = days[index];
        const time = day.date.getTime();

        el.dateTime = day.val;
        el.textContent = day.date.getDate().toString();
        el.setAttribute('aria-label', formatters.cell.format(day.date));

        const isSelected = time === start || time === end;
        const isDisabled = !day.isCurrentMonth || time < min || time > max;

        el.className = '';
        if (!day.isCurrentMonth) el.classList.add(`${classPrefix}outside`);
        if (isSelected) el.classList.add(`${classPrefix}selected`);
        if (time === today) el.classList.add(`${classPrefix}today`);
        if (isDisabled) el.classList.add(`${classPrefix}disabled`);

        if (isDisabled) {
            el.setAttribute('aria-disabled', 'true');
            el.removeAttribute('aria-selected');
        }
        else {
            el.removeAttribute('aria-disabled');
            el.setAttribute('aria-selected', String(isSelected));
        }
        if (time === today) {
            el.setAttribute('aria-current', 'date');
        }
        else {
            el.removeAttribute('aria-current');
        }

        const isFocusCell = !isDisabled && !roved && time === focus;
        el.tabIndex = isFocusCell ? 0 : -1;
        roved = roved || isFocusCell;

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

    if (!roved) {
        const fallback = container.querySelector<HTMLElement>(`time:not(.${classPrefix}disabled)`);
        if (fallback) fallback.tabIndex = 0;
    }
};

const createCalendar = (state: DatePickerState): HTMLElement =>
{
    const calendar = document.createElement('div');
    const inner    = document.createElement('div');
    calendar.className = `${classPrefix}calendar`;
    inner.className    = `${classPrefix}calendar-inner`;

    populateContainerWithDays(
        inner,
        getCalendarDays(state.viewDate.getFullYear(), state.viewDate.getMonth()),
        state,
        true
    );
    calendar.appendChild(inner);
    return calendar;
};

const finishSlide = (calendars: HTMLElement): void =>
{
    const done = slideMap.get(calendars);
    if (done) {
        slideMap.delete(calendars);
        done();
    }
};

const slideDuration = (element: HTMLElement): number =>
{
    const value = window.getComputedStyle(element).transitionDuration.split(',')[0].trim();
    const milliseconds = parseFloat(value) * (value.endsWith('ms') ? 1 : 1000);

    return isNaN(milliseconds) ? 500 : milliseconds;
};

const focusCell = (dialog: HTMLDialogElement): void =>
{
    dialog.querySelector<HTMLElement>(`.${classPrefix}calendar time[tabindex="0"]`)
        ?.focus({ preventScroll: true });
};

const setFormatHint = (input: Element): void =>
{
    const hint = input.closest('[class*="micl-textfield"]')
        ?.querySelector<HTMLElement>('.micl-textfield__supporting-text');

    if (hint && (hint.dataset.miclhint || !hint.textContent?.trim())) {
        hint.dataset.miclhint = '1';
        hint.textContent = dateFormat;
    }
};

const setFieldState = (input: HTMLInputElement, invalid: boolean): void =>
{
    if (invalid) {
        input.setAttribute('aria-invalid', 'true');
        input.dataset.miclinvalid = '1';
    }
    else {
        input.removeAttribute('aria-invalid');
        delete input.dataset.miclinvalid;
    }
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

    finishSlide(calendars);
    calendars.classList.remove(moveLeftClass, moveRightClass, startClass, endClass);

    const stale = Array.from(calendars.querySelectorAll<HTMLElement>(`.${classPrefix}calendar`));
    stale.slice(1).forEach(calendar => calendar.remove());

    if (amount !== 0 && stale.length) {
        const oldCalendar = stale[0];
        const newCalendar = createCalendar(state);
        const isNextMonth = amount > 0;

        oldCalendar.querySelectorAll('time').forEach(cell => { cell.tabIndex = -1; });

        if (isNextMonth) {
            calendars.appendChild(newCalendar);
        }
        else {
            calendars.prepend(newCalendar);
        }

        const startPositionClass = isNextMonth ? startClass : endClass;
        const endTransformClass  = isNextMonth ? moveLeftClass : moveRightClass;

        const duration = slideDuration(calendars);

        calendars.classList.add(noTransition, startPositionClass);
        void calendars.offsetWidth;

        let finished = false;
        let timer    = 0;

        const onTransitionEnd = (event: Event): void =>
        {
            if ((event as TransitionEvent).propertyName === 'transform') {
                finishSlide(calendars);
            }
        };

        slideMap.set(calendars, () =>
        {
            finished = true;
            window.clearTimeout(timer);
            calendars.removeEventListener('transitionend', onTransitionEnd);
            calendars.removeEventListener('transitioncancel', onTransitionEnd);

            calendars.classList.add(noTransition);
            calendars.classList.remove(moveLeftClass, moveRightClass, startClass, endClass);
            oldCalendar.remove();
            void calendars.offsetWidth;
            calendars.classList.remove(noTransition);
        });

        requestAnimationFrame(() =>
        {
            if (finished) {
                return;
            }
            calendars.classList.remove(noTransition, startPositionClass);
            calendars.classList.add(endTransformClass);
        });

        calendars.addEventListener('transitionend', onTransitionEnd);
        calendars.addEventListener('transitioncancel', onTransitionEnd);
        timer = window.setTimeout(() => finishSlide(calendars), duration + 100);
    }
    else {
        let calendar = stale[0];
        if (!calendar) {
            calendar = calendars.appendChild(createCalendar(state));
        }
        else {
            const inner = calendar.querySelector<HTMLElement>(`.${classPrefix}calendar-inner`);
            if (inner) {
                populateContainerWithDays(
                    inner,
                    getCalendarDays(state.viewDate.getFullYear(), state.viewDate.getMonth()),
                    state,
                    inner.querySelectorAll('time').length === 0
                );
            }
        }
    }

    content?.querySelectorAll<HTMLInputElement>(`.${classPrefix}input input`).forEach((input, index) =>
    {
        if (!input.dataset.micldateformat) {
            input.dataset.micldateformat = dateFormat;
        }
        setFormatHint(input);

        if (input.dataset.miclinvalid) {
            return;
        }
        const date = index === 0 ? state.selected : state.selectedEnd;
        input.value = date ? formatters.input.format(date) : '';
        if (input.value) {
            input.dataset.miclvalue = '1';
        }
        else {
            delete input.dataset.miclvalue;
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

    const viewYear = state.viewDate.getFullYear();

    dialog.querySelectorAll<HTMLInputElement>(`.${classPrefix}months input`).forEach(input =>
    {
        const index = viewYear * 12 + parseInt(input.value, 10);
        input.disabled = index < monthIndex(state.min) || index > monthIndex(state.max);
        input.checked  = parseInt(input.value, 10) === state.viewDate.getMonth();
    });

    const yearInput = dialog.querySelector<HTMLInputElement>(`.${classPrefix}years input[value="${viewYear}"]`);
    if (yearInput) yearInput.checked = true;
};

const initPeriodPickers = (dialog: HTMLDialogElement, min: Date, max: Date): void =>
{
    const signature = `${formatToInputDateValue(min)}/${formatToInputDateValue(max)}`;
    if (dialog.dataset.miclperiods === signature) {
        return;
    }
    dialog.dataset.miclperiods = signature;

    ['months', 'years'].forEach(period =>
    {
        const container = dialog.querySelector(`.${classPrefix}${period}`);
        if (!container) {
            return;
        }
        container.innerHTML = '';
        const frag = document.createDocumentFragment();

        if (period === 'months') {
            for (let m = 0; m < 12; m++) {
                const label = document.createElement('label');
                label.innerHTML = `<span class="material-symbols-outlined">check</span><input type="radio" name="miclmonth" value="${m}"> ${formatters.monthLong.format(new Date(2000, m, 1))}`;
                frag.appendChild(label);
            }
        }
        else {
            for (let y = min.getFullYear(); y <= max.getFullYear(); y++) {
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
                    const progress = duration > 0 ? Math.min((currentTime - startTime) / duration, 1) : 1;
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

const nudge = (dialog: HTMLDialogElement, belowMin: boolean): void =>
{
    const calendars = dialog.querySelector<HTMLElement>(`.${classPrefix}calendars`);
    if (!calendars) {
        return;
    }
    const nudgeClass = `${classPrefix}nudge-${belowMin ? 'min' : 'max'}`;

    calendars.classList.remove(`${classPrefix}nudge-min`, `${classPrefix}nudge-max`);
    void calendars.offsetWidth;
    calendars.classList.add(nudgeClass);
    calendars.addEventListener(
        'animationend',
        () => calendars.classList.remove(nudgeClass),
        { once: true }
    );
};

const changePeriod = (dialog: HTMLDialogElement, amount: number, unit: 'month' | 'year'): void =>
{
    const state = stateMap.get(dialog);
    if (!state) {
        return;
    }

    const months  = unit === 'month' ? amount : amount * 12;
    const newDate = addMonths(state.viewDate, months);
    const index   = monthIndex(newDate);

    const belowMin = index < monthIndex(state.min);
    const aboveMax = index > monthIndex(state.max);

    if (belowMin || aboveMax) {
        nudge(dialog, belowMin);
        return;
    }

    state.viewDate  = newDate;
    state.focusDate = clampToRange(addMonths(state.focusDate, months), state.min, state.max);

    renderCalendar(dialog, state, unit === 'month' ? amount : 0);
};

const setViewMonth = (dialog: HTMLDialogElement, year: number, month: number): void =>
{
    const state = stateMap.get(dialog);
    if (!state) {
        return;
    }

    state.viewDate  = clampToMonthRange(withMonth(state.viewDate, year, month), state.min, state.max);
    state.focusDate = clampToRange(
        withMonth(state.focusDate, state.viewDate.getFullYear(), state.viewDate.getMonth()),
        state.min,
        state.max
    );

    renderCalendar(dialog, state);
};

const parseLocaleDate = (dateStr: string): Date | null =>
{
    if (dateStr.length !== dateFormat.length) {
        return null;
    }

    let d = '';
    let m = '';
    let y = '';
    for (let i = 0; i < dateFormat.length; i++) {
        switch (dateFormat[i]) {
            case 'D': d += dateStr[i]; break;
            case 'M': m += dateStr[i]; break;
            case 'Y': y += dateStr[i]; break;
            default:
        }
    }
    if (!/^\d+$/.test(d + m + y)) {
        return null;
    }
    const month = parseInt(m, 10) - 1;
    const day   = parseInt(d, 10);
    const date  = localDate(parseInt(y, 10), month, day);

    return date.getMonth() === month && date.getDate() === day ? date : null;
};

const selectDate = (dialog: HTMLDialogElement, dateStr: string): void =>
{
    const state  = stateMap.get(dialog);
    const picked = parseISODate(dateStr);

    if (!state || !picked || picked < state.min || picked > state.max) {
        return;
    }

    if (state.range) {
        if (state.selectedEnd || picked < state.selected) {
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
    state.viewDate  = new Date(picked);
    state.focusDate = new Date(picked);

    renderCalendar(dialog, state);
};

const setInputDate = (dialog: HTMLDialogElement, input: HTMLInputElement, index: number): void =>
{
    const state = stateMap.get(dialog);
    if (!state) {
        return;
    }

    const parsed = parseLocaleDate(input.value);

    if (input.value.trim() && (!parsed || parsed < state.min || parsed > state.max)) {
        setFieldState(input, true);
        return;
    }
    setFieldState(input, false);

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
        state.viewDate  = new Date(state.selected);
        state.focusDate = new Date(state.selected);
    }

    renderCalendar(dialog, state);
};

const moveFocus = (dialog: HTMLDialogElement, days: number): void =>
{
    const state = stateMap.get(dialog);
    if (!state) {
        return;
    }
    const target = localDate(
        state.focusDate.getFullYear(),
        state.focusDate.getMonth(),
        state.focusDate.getDate() + days
    );
    if (target < state.min || target > state.max) {
        return;
    }

    const steps = monthIndex(target) - monthIndex(state.viewDate);
    state.focusDate = target;

    if (steps !== 0) {
        state.viewDate = withMonth(state.viewDate, target.getFullYear(), target.getMonth());
        renderCalendar(dialog, state, steps > 0 ? 1 : -1);
    }
    else {
        renderCalendar(dialog, state);
    }
    focusCell(dialog);
};

const commitSelection = (dialog: HTMLDialogElement): void =>
{
    const state = stateMap.get(dialog);
    if (!state?.invoker) {
        return;
    }

    const end = state.selectedEnd || state.selected;

    if (state.range && !state.invokerEnd) {
        commitValue(
            state.invoker,
            `${formatToInputDateValue(state.selected)}/${formatToInputDateValue(end)}`,
            `${state.selected.toLocaleDateString(locale)} – ${end.toLocaleDateString(locale)}`
        );
    }
    else {
        commitValue(state.invoker, formatToInputDateValue(state.selected), state.selected.toLocaleDateString(locale));
        if (state.invokerEnd) {
            commitValue(state.invokerEnd, formatToInputDateValue(end), end.toLocaleDateString(locale));
        }
    }
};

export default register(datepickerSelector, {
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

        const cell = event.target.closest('time');

        if (cell) {
            const rtl  = window.getComputedStyle(dialog).direction === 'rtl';
            const step = (days: number): void =>
            {
                event.preventDefault();
                moveFocus(dialog, days);
            };
            const weekday = (parseISODate(cell.dateTime)?.getDay() ?? firstDayOfWeek);
            const offset  = (weekday - firstDayOfWeek + 7) % 7;

            switch (event.key) {
                case 'ArrowLeft' : return step(rtl ? 1 : -1);
                case 'ArrowRight': return step(rtl ? -1 : 1);
                case 'ArrowUp'   : return step(-7);
                case 'ArrowDown' : return step(7);
                case 'Home'      : return step(-offset);
                case 'End'       : return step(6 - offset);
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    selectDate(dialog, cell.dateTime);
                    focusCell(dialog);
                    return;
                default:
            }
        }

        if (event.target.closest(`.${classPrefix}input`)) {
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

        const headline = dialog.querySelector('h1, h2, h3, h4, h5, h6, .micl-heading');
        if (headline) {
            headline.setAttribute('aria-live', 'polite');
            headline.setAttribute('aria-atomic', 'true');
        }
        if (dialog.id) {
            document.querySelectorAll(`[data-datepicker="${dialog.id}"]`).forEach(setFormatHint);
        }

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
                    setViewMonth(
                        dialog,
                        target.name === 'miclyear' ? value : state.viewDate.getFullYear(),
                        target.name === 'miclmonth' ? value : state.viewDate.getMonth()
                    );
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
            setInputDate(dialog, input, Array.prototype.indexOf.call(inputs, input));
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
                    const start = document.querySelector<HTMLInputElement>(`input[data-miclrangeto="${invoker.id}"]`);
                    if (start) {
                        invokerEnd   = invoker;
                        invokerStart = start;
                    }
                }
            }

            let initialDate = toLocalMidnight(new Date());
            let initialEnd: Date | null = null;
            let min = localDate(1900, 0, 1);
            let max = localDate(2099, 11, 31);

            if (invokerStart instanceof HTMLInputElement) {
                initialDate = readInputDate(invokerStart) || initialDate;
                min = parseISODate(invokerStart.min) || min;
                max = parseISODate(invokerStart.max) || max;
            }
            else {
                const [startStr, endStr] = (invokerStart.value || invokerStart.textContent || '').split('/');
                initialDate = parseISODate(startStr) || initialDate;
                if (range && endStr) {
                    initialEnd = parseISODate(endStr);
                }
            }
            if (invokerEnd) {
                initialEnd = readInputDate(invokerEnd);
                max = parseISODate(invokerEnd.max) || max;
            }

            if (max < min) {
                max = new Date(min);
            }
            if (initialEnd) {
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
                viewDate   : clampToMonthRange(initialDate, min, max),
                focusDate  : clampToRange(initialDate, min, max),
                min,
                max
            };
            stateMap.set(dialog, state);

            setFormatHint(invokerStart);
            if (invokerEnd) {
                setFormatHint(invokerEnd);
            }

            const calendars = dialog.querySelector<HTMLElement>(`.${classPrefix}calendars`);
            if (calendars) {
                finishSlide(calendars);
                calendars.replaceChildren();
            }
            dialog.querySelectorAll<HTMLInputElement>(`.${classPrefix}input input`)
                .forEach(input => setFieldState(input, false));

            initPeriodPickers(dialog, min, max);
            toggleView(dialog, 'calendars');
            renderCalendar(dialog, state);
        });

        dialog.addEventListener('close', (): void =>
        {
            const calendars = dialog.querySelector<HTMLElement>(`.${classPrefix}calendars`);
            if (calendars) {
                finishSlide(calendars);
            }
            if (dialog.returnValue !== '') {
                commitSelection(dialog);
            }
        });
    }
}, HTMLDialogElement);
