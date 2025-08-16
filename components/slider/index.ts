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

export const sliderSelector = 'input[type=range].micl-slider-xs,input[type=range].micl-slider-s,input[type=range].micl-slider-m,input[type=range].micl-slider-l,input[type=range].micl-slider-xl';

export default (() =>
{
    const
        tick  = String.fromCharCode(8226),
        blank = String.fromCharCode(8201),
        getTickValues = (element: HTMLInputElement, max: number, min: number): number[] =>
        {
            const values: number[] = [];

            if (!!element.list && (max > min)) {
                element.list.querySelectorAll<HTMLOptionElement>('option[value]').forEach(option =>
                {
                    let value = parseFloat(option.value);
                    if (!isNaN(value) && (value >= min) && (value <= max)) {
                        values.push(value);
                    }
                });
            }
            return values;
        },
        getWrapper = (element: HTMLInputElement): null | HTMLElement =>
        {
            return element.parentElement?.classList.contains('micl-slider__container') ?
                   element.parentElement : null;
        },
        setMax = (element: HTMLInputElement): void =>
        {
            let max = element.max || '100';
            getWrapper(element)?.style.setProperty('--md-sys-slider-max', max);
            element.style.setProperty('--md-sys-slider-max', max);
        },
        setMin = (element: HTMLInputElement): void =>
        {
            let min = element.min || '0';
            getWrapper(element)?.style.setProperty('--md-sys-slider-min', min);
            element.style.setProperty('--md-sys-slider-min', min);
        },
        setTickString = (element: HTMLInputElement, tickString: string): void =>
        {
            // getWrapper(element)?.dataset.miclsliderticks = tickString;
            element.dataset.miclsliderticks = tickString;
        },
        setValue = (element: HTMLInputElement): void =>
        {
            let tip = JSON.stringify(element.value + ''),
                wrapper = getWrapper(element);
            if (wrapper) {
                wrapper.style.setProperty('--md-sys-slider-value', element.value);
                wrapper.style.setProperty('--md-sys-slider-tip', tip);
            }
            element.style.setProperty('--md-sys-slider-value', element.value);
            element.style.setProperty('--md-sys-slider-tip', tip);
        },
        setVars = (element: HTMLInputElement): void =>
        {
            let wrapper = getWrapper(element);
            if (wrapper) {
                const computedStyles = window.getComputedStyle(element);
                ['--md-sys-slider-handle-height', '--md-sys-slider-track-height'].forEach(name => {
                    wrapper.style.setProperty(name, computedStyles.getPropertyValue(name));
                });
            }
        };

    return {
        initialize: (element: HTMLInputElement): void =>
        {
            if (!element.matches(sliderSelector)) {
                return;
            }

            setMax(element);
            setMin(element);
            setValue(element);
            setVars(element);

            const
                max  = parseFloat(element.max),
                min  = parseFloat(element.min),
                rect = element.getBoundingClientRect(),
                percentages = getTickValues(element, max, min).sort((a, b) => a - b).map(value => {
                    return Math.round(100 * (value - min) / (max - min));
                });

            if (percentages.length > 0) {
                const
                    canvas = document.createElement('canvas'),
                    ctx    = canvas.getContext('2d');
                if (ctx) {
                    ctx.font = window.getComputedStyle(element).getPropertyValue('font');
                    let blankWidth   = ctx.measureText(blank).width,
                        tickWidth    = ctx.measureText(tick).width,
                        totalWidth   = rect.width - 10,
                        currentWidth = 0,
                        tickString   = '';

                    percentages.forEach(percentage =>
                    {
                        let position = (totalWidth * percentage) / 100,
                            nrBlanks = Math.round((position - currentWidth) / blankWidth) - 1;
                        for (let i = 0; i < nrBlanks; i++) {
                            tickString   += blank;
                            currentWidth += blankWidth;
                        }
                        tickString += tick;
                        currentWidth += tickWidth;
                    });
                    setTickString(element, tickString);
                }
                canvas.remove();
            }
            else {
                setTickString(element, tick);
            }
        },
        input: (event: Event): void =>
        {
            if (
                (event.target as Element).matches(sliderSelector)
                && event.target instanceof HTMLInputElement
                && !event.target.disabled
            ) {
                setValue(event.target);
            }
        }
    };
})();
