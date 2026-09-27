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

export const sliderSelector = 'input[type=range][class*=micl-slider-]';

const getTarget = (element: HTMLInputElement): HTMLElement =>
    element.parentElement?.classList.contains('micl-slider__container') ?
    element.parentElement : element;

const setValue = (element: HTMLInputElement): void =>
{
    const target = getTarget(element);

    target.style.setProperty('--micl-slider-min', element.min || '0');
    target.style.setProperty('--micl-slider-max', element.max || '100');
    target.style.setProperty('--micl-slider-value', element.value);
    target.style.setProperty('--micl-slider-tip', JSON.stringify(element.value));
};

const stopLayers = (fractions: number[], span: string): string =>
    fractions.map(fraction => {
        const offset = `(8px + ${fraction} * ${span})`;

        return 'radial-gradient(circle 2px at ' +
               `calc(var(--_kx) * ${offset} + var(--_cx)) ` +
               `calc(var(--_ky) * ${offset} + var(--_cy)),` +
               'currentColor 100%,transparent 0)';
    }).join(',');

const setStops = (element: HTMLInputElement): void =>
{
    const min = parseFloat(element.min || '0');
    const max = parseFloat(element.max || '100');
    const values = new Set<number>();

    if (max > min) {
        element.list?.querySelectorAll<HTMLOptionElement>('option[value]').forEach(option =>
        {
            const value = parseFloat(option.value);
            if (!isNaN(value) && (value >= min) && (value <= max)) {
                values.add((value - min) / (max - min));
            }
        });
    }
    if (values.size > 0) {
        const fractions = [...values].sort((a, b) => a - b);

        element.style.setProperty('--micl-slider-stops',
            stopLayers(fractions, '(100% - 16px)'));
        element.style.setProperty('--micl-slider-stops-progress',
            stopLayers(fractions, '(100% / max(var(--_fraction), 0.0001))'));
    }
};

export default register(sliderSelector, {
    initialize: (element: HTMLInputElement): void =>
    {
        if (element.matches(sliderSelector)) {
            setValue(element);
            setStops(element);
        }
    },
    input: (event: Event): void =>
    {
        if (event.target instanceof HTMLInputElement && event.target.matches(sliderSelector)) {
            setValue(event.target);
        }
    },
    reset: setValue
}, 'HTMLInputElement');
