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

interface DatePickerState {
    invoker : ValueElement | HTMLElement | null;
    selected: Date;
    viewDate: Date; // the month/year currently being viewed
    min     : Date | null;
    max     : Date | null;
}

const stateMap = new WeakMap<HTMLDialogElement, DatePickerState>();

const locale = new Intl.DateTimeFormat().resolvedOptions().locale;

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

const toLocalMidnight = (date: Date): Date =>
{
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

const isValidDate = (d: Date): boolean => !isNaN(d.getTime());

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
            date: new Date(current),
            val: `${current.getFullYear()}-${pad(current.getMonth() + 1)}-${pad(current.getDate())}`,
            isCurrentMonth: current.getMonth() === month
        });
        current.setDate(current.getDate() + 1);
    }
    return results;
};

const populateContainerWithDays = (container: HTMLElement, days: Array<{ date: Date, val: string, isCurrentMonth: boolean }>, state: DatePickerState, isEmpty: boolean = false): void =>
{
    if (isEmpty) {
        const fragment    = document.createDocumentFragment();
        const tempDate    = new Date();
        const startOffset = tempDate.getDay() - firstDayOfWeek;
        tempDate.setDate(tempDate.getDate() - startOffset); 
        
        for (let i = 0; i < 7; i++) {
            const span = document.createElement('span');
            span.style.gridArea = `1 / ${i + 1}`;
            span.textContent = tempDate.toLocaleDateString(locale, { weekday: 'narrow' });
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

const renderCalendar = (dialog: HTMLDialogElement, state: DatePickerState, amount: number = 0): void =>
{
    const content   = dialog.querySelector<HTMLElement>('.micl-dialog__content');
    const calendars = content?.querySelector<HTMLElement>('.micl-datepicker__calendars');
    if (!calendars) {
        return;
    }

    const startClass = 'start-left';
    const endClass   = 'start-right';

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
        const endTransformClass = isNextMonth ? 'move-left' : 'move-right';

        newCalendar.appendChild(newCalendarInner);
        if (isNextMonth) {
            calendars.appendChild(newCalendar);
        }
        else {
            calendars.prepend(newCalendar);
        }

        calendars.classList.add('micl-no-transition');
        calendars.classList.add(startPositionClass);
        void calendars.offsetWidth;

        requestAnimationFrame(() => {
            calendars.classList.remove('micl-no-transition');
            calendars.classList.remove(startPositionClass);
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
                calendars.classList.add('micl-no-transition');
                calendars.classList.add(startClass);
                void calendars.offsetWidth;

                calendars.classList.remove('micl-no-transition');
                calendars.classList.remove(startClass);
            }, 0);
        };
        calendars.addEventListener('transitionend', onTransitionEnd);
    }
    else {
        calendars.classList.remove('move-left', 'move-right', startClass, endClass);

        let calendar      = calendars.querySelector<HTMLElement>('.micl-datepicker__calendar');
        let calendarInner = calendar?.querySelector<HTMLElement>('.micl-datepicker__calendar-inner');
        if (!calendar || !calendarInner) {
            calendar      = document.createElement('div');
            calendarInner = document.createElement('div');
            calendar.classList.add('micl-datepicker__calendar');
            calendarInner.classList.add('micl-datepicker__calendar-inner');
            calendars.appendChild(calendar).appendChild(calendarInner);
        }
        const days = getCalendarDays(state.viewDate.getFullYear(), state.viewDate.getMonth());
        populateContainerWithDays(calendarInner, days, state, calendarInner.querySelectorAll('time').length === 0);
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
        state.viewDate.toLocaleDateString(locale, dialog.classList.contains('micl-dialog--anchored') ?
        { year: 'numeric' } : { month: 'long', year: 'numeric' })
    );

    const monthRadio = dialog.querySelector<HTMLInputElement>(`.micl-datepicker__months input[value="${state.viewDate.getMonth()}"]`);
    if (monthRadio) {
        monthRadio.checked = true;
    }
    const yearRadio = dialog.querySelector<HTMLInputElement>(`.micl-datepicker__years input[value="${state.viewDate.getFullYear()}"]`);
    if (yearRadio) {
        yearRadio.checked = true;
    }
};

const initMonthYearPickers = (dialog: HTMLDialogElement, minYear: number, maxYear: number): void =>
{
    const monthsContainer = dialog.querySelector('.micl-datepicker__months');
    const yearsContainer  = dialog.querySelector('.micl-datepicker__years');
    
    if (monthsContainer && !monthsContainer.hasChildNodes()) {
        const frag = document.createDocumentFragment();
        const fmt  = new Intl.DateTimeFormat(undefined, { month: 'long' });

        for (let i = 0; i < 12; i++) {
            const label = document.createElement('label');
            label.innerHTML = `<span class="material-symbols-outlined">check</span><input type="radio" name="miclmonth" value="${i}"> ${fmt.format(new Date(2000, i, 1))}`;
            frag.appendChild(label);
        }

        const inner = document.createElement('div');
        inner.classList.add('micl-datepicker__months-inner');
        monthsContainer.appendChild(inner).appendChild(frag);
    }

    if (yearsContainer) {
        yearsContainer.innerHTML = '';
        const frag = document.createDocumentFragment();

        for (let i = minYear; i <= maxYear; i++) {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="miclyear" value="${i}"> ${i}`;
            frag.appendChild(label);
        }

        const inner = document.createElement('div');
        inner.classList.add('micl-datepicker__years-inner');
        yearsContainer.appendChild(inner).appendChild(frag);
    }
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

    const months = content.querySelector<HTMLElement>('.micl-datepicker__months');
    if (months) {
        const selectedMonth = months.querySelector<HTMLInputElement>('input:checked');
        const monthHeight   = 48;
        let doHide: boolean | null = false;

        if (view === 'months' && selectedMonth) {
            const property = window.getComputedStyle(months).getPropertyValue('transition-duration');
            const duration = parseFloat(property) * (property.includes('ms') ? 1 : 1000);
            const maxScrollDistance = months.scrollHeight - contentHeight;

            const centerTop = (contentHeight - monthHeight) / 2;
            if (selectedMonth.offsetTop > centerTop) {
                let scrollDistance = selectedMonth.offsetTop - centerTop - (monthHeight / 2);
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
                months.classList.remove('micl-datepicker__view-hidden');
                requestAnimationFrame(animateScroll);
                doHide = null;

                months.addEventListener('transitionend', function handler(event)
                {
                    if (event.propertyName === 'height' || event.propertyName === 'block-size') {
                        content.scrollTop = scrollDistance;
                        months.removeEventListener('transitionend', handler);
                    }
                });
            }
        }
        else {
            doHide = true;
        }
        if (doHide !== null) {
            months.classList.toggle('micl-datepicker__view-hidden', doHide);
        }
    }    

    const years = content.querySelector<HTMLElement>('.micl-datepicker__years');
    if (years) {
        const selectedYear = years.querySelector<HTMLInputElement>('input:checked');
        const yearHeight   = 40;
        let doHide: boolean | null = false;

        if (view === 'years' && selectedYear) {
            const property = window.getComputedStyle(years).getPropertyValue('transition-duration');
            const duration = parseFloat(property) * (property.includes('ms') ? 1 : 1000);
            const maxScrollDistance = years.scrollHeight - contentHeight;

            const centerTop = (contentHeight - yearHeight) / 2;
            if (selectedYear.offsetTop > centerTop) {
                let scrollDistance = selectedYear.offsetTop - centerTop - (yearHeight / 2);
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
                years.classList.remove('micl-datepicker__view-hidden');
                requestAnimationFrame(animateScroll);
                doHide = null;

                years.addEventListener('transitionend', function handler(event)
                {
                    if (event.propertyName === 'height' || event.propertyName === 'block-size') {
                        content.scrollTop = scrollDistance;
                        years.removeEventListener('transitionend', handler);
                    }
                });
            }
        }
        else {
            doHide = true;
        }
        if (doHide !== null) {
            years.classList.toggle('micl-datepicker__view-hidden', doHide);
        }
    }
};

const changeMonthYear = (dialog: HTMLDialogElement, amount: number, unit: 'month' | 'year') =>
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

    if (state.min && newDate < state.min) return;
    if (state.max && newDate > state.max) return;

    state.viewDate = newDate;
    renderCalendar(dialog, state, unit === 'month' ? amount : 0);
};

const selectDate = (dialog: HTMLDialogElement, dateStr: string) =>
{
    const state = stateMap.get(dialog);
    if (!state) {
        return;
    }

    const parts = dateStr.split('-').map(Number);
    state.selected = new Date(parts[0], parts[1] - 1, parts[2]);
    state.viewDate = new Date(state.selected);
    
    renderCalendar(dialog, state);
};

export default (() =>
{
    const setScrollbarColor = () =>
    {
        document.documentElement.style.setProperty(
            '--md-sys-scrollbar-thumb-color',
            window.getComputedStyle(document.body).getPropertyValue('--md-sys-color-outline').trim()
        );
    };

    return {
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
                        changeMonthYear(dialog, isNext ? 1 : -1, forMonth ? 'month' : 'year');
                        return;
                    }
                }

                if (target.closest('.micl-datepicker__month')) toggleView(dialog, 'months');
                if (target.closest('.micl-datepicker__year')) toggleView(dialog, 'years');

                const mode = target.closest('.micl-datepicker__inputmode') as HTMLElement;
                if (mode) {
                    const icon = mode.textContent;
                    mode.textContent = mode.dataset.alticon || icon;
                    mode.dataset.alticon = icon;
                    const inputHidden = !!dialog.querySelector('.micl-datepicker__input.micl-datepicker__view-hidden');
                    toggleView(dialog, inputHidden ? 'input' : 'calendars');
                }

                const time = target.closest('time');
                if (time && time.dateTime) {
                    selectDate(dialog, time.dateTime);
                }

                if (target.matches('input[name=miclmonth]')) {
                    const state = stateMap.get(dialog);
                    if (state) {
                        state.viewDate.setMonth(parseInt((target as HTMLInputElement).value));
                        renderCalendar(dialog, state);
                        toggleView(dialog, 'calendars');
                    }
                }
                if (target.matches('input[name=miclyear]')) {
                    const state = stateMap.get(dialog);
                    if (state) {
                        state.viewDate.setFullYear(parseInt((target as HTMLInputElement).value));
                        renderCalendar(dialog, state);
                        toggleView(dialog, 'calendars');
                    }
                }
            });

            dialog.querySelectorAll('input[type=date]').forEach(input => {
                input.addEventListener('keydown', (event: Event) =>
                {
                    if ((event instanceof KeyboardEvent) && (event.key === ' ' || event.key === 'Enter')) {
                        event.preventDefault();
                    }
                });
            });

            dialog.addEventListener('beforetoggle', (event: any): void =>
            {
                if (event.newState !== 'open') {
                    return;
                }

                let invoker = document.activeElement as HTMLElement;
                if (
                    !invoker
                    || (!invoker.dataset.datepicker && !invoker.getAttribute('popovertarget'))
                ) {
                    invoker = document.querySelector(
                        `[data-datepicker="${dialog.id}"],[popovertarget="${dialog.id}"]`
                    ) as HTMLElement;
                }

                let initialDate = new Date();
                let min: Date | null = null;
                let max: Date | null = null;

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
                else if (invoker?.textContent) {
                    const parsed = new Date(invoker.textContent);
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

                initMonthYearPickers(dialog, min ? min.getFullYear() : 1900, max ? max.getFullYear() : 2099);
                toggleView(dialog, 'calendars');
                renderCalendar(dialog, stateMap.get(dialog)!);
            });

            dialog.addEventListener('close', (): void =>
            {
                const state = stateMap.get(dialog);
                if (!state || !state.invoker || dialog.returnValue === '') {
                    return;
                }
                const pad  = (n: number): string => n.toString().padStart(2, '0');
                const date = `${state.selected.getFullYear()}-${pad(state.selected.getMonth() + 1)}-${pad(state.selected.getDate())}`;

                if (state.invoker instanceof HTMLInputElement) {
                    state.invoker.value = date;
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
