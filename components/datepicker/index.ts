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

type ValueElement = HTMLInputElement | HTMLButtonElement;

interface DatePickerState {
    invoker : ValueElement | null;
    selected: Date;
    viewDate: Date; // the month/year currently being viewed
    min     : Date;
    max     : Date;
}

const stateMap = new WeakMap<HTMLDialogElement, DatePickerState>();

const locale = new Intl.DateTimeFormat().resolvedOptions().locale;

const formatter = new Intl.DateTimeFormat(locale, {
    year : 'numeric',
    month: '2-digit',
    day  : '2-digit'
});

const formatToInputDateValue = (d: Date): string =>
{
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day   = d.getDate().toString().padStart(2, '0');

    return `${d.getFullYear()}-${month}-${day}`;
};

const getDateFormat = (): string =>
{
    return formatter.formatToParts(new Date(2025, 0, 15)).map(part =>
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

const toLocalMidnight = (date: Date): Date =>
{
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

const isValueElement = (element: Element | null): element is ValueElement =>
{
    return element instanceof HTMLInputElement || element instanceof HTMLButtonElement;
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

    const results      = [];
    const firstOfMonth = new Date(year, month, 1);
    const dayOfWeek    = firstOfMonth.getDay();
    const offset       = (dayOfWeek - firstDayOfWeek + 7) % 7;
    const current      = new Date(year, month, 1 - offset);
    const pad          = (n: number): string => n.toString().padStart(2, '0');

    // 6 weeks * 7 days
    for (let i = 0; i < 42; i++) {
        results.push({
            date          : new Date(current),
            val           : `${current.getFullYear()}-${pad(current.getMonth())}-${pad(current.getDate())}`,
            isCurrentMonth: current.getMonth() === month
        });
        current.setDate(current.getDate() + 1);
    }
    return results;
};

const populateContainerWithDays = (
    container: HTMLElement,
    days     : Array<{ date: Date, val: string, isCurrentMonth: boolean }>,
    state    : DatePickerState,
    isEmpty  : boolean = false
): void => {
    if (isEmpty) {
        const fragment    = document.createDocumentFragment();
        const tempDate    = new Date();
        const startOffset = tempDate.getDay() - firstDayOfWeek;
        tempDate.setDate(tempDate.getDate() - startOffset); 
        
        for (let i = 0; i < 7; i++) {
            const span = document.createElement('span');
            span.style.gridArea = `1 / ${i + 1}`;
            span.textContent = tempDate.toLocaleDateString(locale, { weekday: 'narrow' });
            span.title = tempDate.toLocaleDateString(locale, { weekday: 'long' });
            fragment.appendChild(span);
            tempDate.setDate(tempDate.getDate() + 1);
        }

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
    container.querySelectorAll('time').forEach((el, index) =>
    {
        const day = days[index];
        el.dateTime = day.val;
        el.textContent = day.date.getDate().toString();
        
        const isSelected = day.date.getTime() === state.selected.getTime();
        const isToday = day.date.getTime() === today.getTime();
        
        el.className = '';
        if (!day.isCurrentMonth) el.classList.add('micl-datepicker__outside');
        if (isSelected) el.classList.add('micl-datepicker__selected');
        if (isToday) el.classList.add('micl-datepicker__today');
    });
};

const renderCalendar = (
    dialog: HTMLDialogElement,
    state : DatePickerState,
    amount: number = 0
): void => {

    const content   = dialog.querySelector<HTMLElement>('.micl-dialog__content');
    const calendars = content?.querySelector<HTMLElement>('.micl-datepicker__calendars');
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
        const oldCalendar = calendars.querySelector<HTMLElement>('.micl-datepicker__calendar');
        if (!oldCalendar) {
            return;
        }

        const newCalendar      = document.createElement('div');
        const newCalendarInner = document.createElement('div');
        newCalendar.classList.add('micl-datepicker__calendar');
        newCalendarInner.classList.add('micl-datepicker__calendar-inner');

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

        calendars.classList.add('micl-no-transition', startPositionClass);
        void calendars.offsetWidth;

        requestAnimationFrame(() => {
            calendars.classList.remove('micl-no-transition', startPositionClass);
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
                calendars.classList.add('micl-no-transition', startClass);
                void calendars.offsetWidth;

                calendars.classList.remove('micl-no-transition', startClass);
            }, 0);
        };
        calendars.addEventListener('transitionend', onTransitionEnd);
    }
    else {
        let calendar = calendars.querySelector<HTMLElement>('.micl-datepicker__calendar');
        if (!calendar) {
            calendar = document.createElement('div');
            calendar.classList.add('micl-datepicker__calendar');
            calendar = calendars.appendChild(calendar);
        }
        let inner = calendar.querySelector<HTMLElement>('.micl-datepicker__calendar-inner');
        if (!inner) {
            inner = document.createElement('div');
            inner.classList.add('micl-datepicker__calendar-inner');
            calendar.appendChild(inner);
        }
        const days = getCalendarDays(state.viewDate.getFullYear(), state.viewDate.getMonth());
        populateContainerWithDays(inner, days, state, inner.querySelectorAll('time').length === 0);
    }

    const input = content?.querySelector<HTMLInputElement>('.micl-datepicker__input input');
    if (input) {
        input.value = formatter.format(state.selected);
        if (input.value) {
            input.dataset.miclvalue = '1';
        }
        else {
            delete input.dataset.miclvalue;
        }
        if (!input.dataset.micldateformat) {
            input.dataset.micldateformat = getDateFormat();
        }
    }

    setText(
        dialog.querySelector('h1, h2, h3, h4, h5, h6, .micl-heading'),
        state.selected.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })
    );
    setText(
        dialog.querySelector('.micl-datepicker__month'),
        state.viewDate.toLocaleDateString(locale, { month: 'short' })
    );
    setText(
        dialog.querySelector('.micl-datepicker__year'),
        state.viewDate.toLocaleDateString(locale, dialog.classList.contains('micl-dialog--docked') ?
        { year: 'numeric' } : { month: 'long', year: 'numeric' })
    );

    ['months', 'years'].forEach(period => {
        const value = period === 'months' ? state.viewDate.getMonth() : state.viewDate.getFullYear();
        const input = dialog.querySelector<HTMLInputElement>(`.micl-datepicker__${period} input[value="${value}"]`);
        if (input) {
            input.checked = true;
        }
    });
};

const initPeriodPickers = (dialog: HTMLDialogElement, min: Date, max: Date): void =>
{
    ['months', 'years'].forEach(period => {
        const container = dialog.querySelector(`.micl-datepicker__${period}`);
        if (container) {
            container.innerHTML = '';
            const frag = document.createDocumentFragment();

            const maxMonth = max.getMonth();
            const maxYear  = max.getFullYear();

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
                
                const fmt = new Intl.DateTimeFormat(undefined, { month: 'long' });

                [...new Set(months.sort((a, b) => a - b))].forEach(m => {
                    const label = document.createElement('label');
                    label.innerHTML = `<span class="material-symbols-outlined">check</span><input type="radio" name="miclmonth" value="${m}"> ${fmt.format(new Date(2000, m, 1))}`;
                    frag.appendChild(label);
                });
            }
            else {
                for (let y = min.getFullYear(); y <= maxYear; y++) {
                    const label = document.createElement('label');
                    label.innerHTML = `<input type="radio" name="miclyear" value="${y}"> ${y}`;
                    frag.appendChild(label);
                }
            }

            const inner = document.createElement('div');
            inner.classList.add(`micl-datepicker__${period}-inner`);
            container.appendChild(inner).appendChild(frag);
        }
    });
};

const toggleView = (dialog: HTMLDialogElement, view: 'calendars' | 'months' | 'years' | 'input'): void =>
{
    if (view === 'months' || view === 'years') {
        if (!dialog.querySelector(`.micl-datepicker__${view}.micl-datepicker__view-hidden`)) {
            view = 'calendars';
        }
    }

    ['calendars', 'input', 'month-selector', 'year-selector'].forEach(name =>
    {
        let doHide = view === 'input';
        if (name === 'calendars' || name === 'input') {
            doHide = view !== name;
        }
        dialog.querySelector(`.micl-datepicker__${name}`)?.classList.toggle(
            'micl-datepicker__view-hidden',
            doHide
        );
    });

    const content = dialog.querySelector<HTMLElement>('.micl-dialog__content');
    if (!content) {
        return;
    }
    const contentHeight = parseInt(window.getComputedStyle(content).getPropertyValue('max-block-size'), 10);

    ['.micl-datepicker__months', '.micl-datepicker__years'].forEach(selector =>
    {
        const period = content.querySelector<HTMLElement>(selector);
        if (!period) {
            return;
        }
        const selected = period.querySelector<HTMLInputElement>('input:checked');
        const height   = 48;
        let doHide: boolean | null = false;

        if (selected && (selector.substring(18) === view)) {
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
                period.classList.remove('micl-datepicker__view-hidden');
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
            period.classList.toggle('micl-datepicker__view-hidden', doHide);
        }
    });

    const mode = dialog.querySelector<HTMLElement>('.micl-datepicker__inputmode[data-miclalt]');
    if (mode) {
        if (!mode.dataset.miclalticon) {
            mode.dataset.miclalticon = mode.textContent;
        }
        mode.textContent = (view === 'input' ? mode.dataset.miclalt : mode.dataset.miclalticon) || '';
    }
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
        const animation = dialog.querySelector('.micl-datepicker__calendars')?.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(${belowMin ? 8 : -8}px)` },
            { transform: 'translateX(0)' }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });
        return;
    }

    state.viewDate = newDate;
    renderCalendar(dialog, state, unit === 'month' ? amount : 0);
};

const selectDate = (dialog: HTMLDialogElement, dateStr: string, isLocaleFormatted = false): void =>
{
    const state = stateMap.get(dialog);
    if (!state) {
        return;
    }

    let parts: number[] = [];
    if (isLocaleFormatted) {
        const dateformat = getDateFormat();
        if (dateStr.length === dateformat.length) {
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
            parts = [parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)];
        }
    }
    else {
        parts = dateStr.split('-').map(Number);
    }

    if (parts.length === 3) {
        state.selected = new Date(parts[0], parts[1], parts[2]);
        state.viewDate = new Date(state.selected);
        
        renderCalendar(dialog, state);
    }
};

export default (() =>
{
    return {
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
                case 'Y':
                    toggleView(dialog, event.key === 'M' ? 'months' : 'years');
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
                    const forMonth = btn.parentElement?.classList.contains('micl-datepicker__month-selector');
                    const isNext   = btn.classList.contains('micl-datepicker__next');
                    const isPrev   = btn.classList.contains('micl-datepicker__previous');
                    
                    if (isNext || isPrev) {
                        changePeriod(dialog, isNext ? 1 : -1, forMonth ? 'month' : 'year');
                        return;
                    }
                }

                if (target.closest('.micl-datepicker__month')) toggleView(dialog, 'months');
                if (target.closest('.micl-datepicker__year')) toggleView(dialog, 'years');

                const mode = target.closest('.micl-datepicker__inputmode') as HTMLElement;
                if (mode) {
                    toggleView(dialog, !dialog.querySelector(
                        '.micl-datepicker__input.micl-datepicker__view-hidden'
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

            dialog.addEventListener('beforetoggle', (event: any): void =>
            {
                if (event.newState !== 'open') {
                    return;
                }

                let invoker = document.activeElement;
                if (
                    !isValueElement(invoker)
                    || (!invoker.dataset.datepicker && !invoker.getAttribute('popovertarget'))
                ) {
                    invoker = document.querySelector(
                        `[data-datepicker="${dialog.id}"],[popovertarget="${dialog.id}"]`
                    );
                }
                if (!isValueElement(invoker)) {
                    return;
                }

                let initialDate = new Date();
                let min = new Date(1900, 0, 1);
                let max = new Date(2099, 11, 31);

                if (invoker instanceof HTMLInputElement) {
                    if (invoker.type === 'date' && invoker.valueAsDate) {
                        initialDate = invoker.valueAsDate;
                    }
                    else if (invoker.value) {
                        initialDate = new Date(invoker.value);
                    }
                    if (invoker.min) min = new Date(invoker.min);
                    if (invoker.max) max = new Date(invoker.max);
                }
                else {
                    const parsed = new Date(invoker.value || invoker.textContent);
                    if (isValidDate(parsed)) {
                        initialDate = parsed;
                    }
                }
                if (!isValidDate(initialDate)) initialDate = new Date();
                initialDate = toLocalMidnight(initialDate);

                stateMap.set(dialog, {
                    invoker: invoker as ValueElement,
                    selected: initialDate,
                    viewDate: new Date(initialDate),
                    min,
                    max
                });

                initPeriodPickers(dialog, min, max);
                toggleView(dialog, 'calendars');
                renderCalendar(dialog, stateMap.get(dialog)!);

                dialog.querySelector('.micl-datepicker__input input')?.addEventListener('blur', e =>
                {
                    if (e.target) {
                        selectDate(dialog, (e.target as HTMLInputElement).value, true);
                    }
                });
            });

            dialog.addEventListener('close', (): void =>
            {
                const state = stateMap.get(dialog);
                if (!state || !state.invoker || dialog.returnValue === '') {
                    return;
                }
                state.invoker.value = formatToInputDateValue(state.selected);

                if (state.invoker instanceof HTMLInputElement) {
                    state.invoker.dispatchEvent(new Event('change', { bubbles: true }));
                    state.invoker.dispatchEvent(new Event('input', { bubbles: true }));
                }
                else {
                    state.invoker.textContent = state.selected.toLocaleDateString();
                }
            });
        }
    };
})();
