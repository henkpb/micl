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

export const progressindicatorSelector = 'progress.micl-progress-linear,progress.micl-progress-circular';

export default (() =>
{
    // <progress> emits no input/change events when its value/max change, so a
    // per-instance MutationObserver mirrors the determinate attributes into the
    // CSS custom properties the SCSS reads. Indeterminate progress (no value
    // attribute) is handled entirely in CSS via the :indeterminate pseudo-class.
    const observers = new WeakMap<HTMLProgressElement, MutationObserver>();

    const setVars = (element: HTMLProgressElement): void =>
    {
        // position is value/max for determinate, or -1 when indeterminate.
        const fraction = element.position;

        if (fraction < 0) {
            element.style.removeProperty('--md-comp-progress-value');
            element.style.removeProperty('--md-comp-progress-max');
            element.style.removeProperty('--md-comp-progress-fraction');
            element.style.removeProperty('--md-comp-progress-amplitude-scale');
            return;
        }

        // The Expressive wave amplitude eases to zero over the final 10% so the
        // active indicator settles into a straight line as it completes.
        const scale = Math.max(0, Math.min(1, (1 - fraction) / 0.1));

        element.style.setProperty('--md-comp-progress-value', String(element.value));
        element.style.setProperty('--md-comp-progress-max', String(element.max || 1));
        element.style.setProperty('--md-comp-progress-fraction', String(fraction));
        element.style.setProperty('--md-comp-progress-amplitude-scale', String(scale));
    };

    return {
        initialize: (element: HTMLProgressElement): void =>
        {
            if (!element.matches(progressindicatorSelector)) {
                return;
            }

            setVars(element);

            const observer = new MutationObserver(() => setVars(element));
            observer.observe(element, { attributes: true, attributeFilter: ['value', 'max'] });
            observers.set(element, observer);
        },
        cleanup: (element: HTMLProgressElement): void =>
        {
            const observer = observers.get(element);
            if (observer) {
                observer.disconnect();
                observers.delete(element);
            }
        }
    };
})();
