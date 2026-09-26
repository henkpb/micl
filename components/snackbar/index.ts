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

import { initialized, register } from '../../foundations/runtime';

export const snackbarSelector = '.micl-snackbar';

interface SnackbarState {
    timeoutid?: number;
    delay: number;
    hovering: boolean;
    controller: AbortController;
}

const snackbarStates = new WeakMap<HTMLElement, SnackbarState>();

const clearTimer = (state: SnackbarState): void =>
{
    clearTimeout(state.timeoutid);
    state.timeoutid = undefined;
};

const updateTimer = (element: HTMLElement, state: SnackbarState): void =>
{
    clearTimer(state);
    if (!element.matches(':popover-open') || state.hovering || element.matches(':has(:focus-visible)')) {
        return;
    }
    state.timeoutid = window.setTimeout(() => {
        if (element.isConnected && element.matches(':popover-open')) {
            element.hidePopover();
        }
    }, state.delay);
};

export default register(snackbarSelector,
{
    initialize: (element: HTMLElement): void =>
    {
        if (!element.matches(snackbarSelector) || initialized.has(element)) {
            return;
        }

        const delay = parseInt(element.dataset.micldelay ?? '', 10);
        if (!(delay > 0)) return;

        initialized.add(element);

        const state: SnackbarState = { delay, hovering: false, controller: new AbortController() };
        snackbarStates.set(element, state);

        const update = (): void => updateTimer(element, state);

        const toggle = (): void =>
        {
            state.hovering = false;
            update();
        };

        const hover = (event: Event): void =>
        {
            if ((event as PointerEvent).pointerType !== 'touch') {
                state.hovering = event.type === 'pointerenter';
                update();
            }
        };

        const options = { signal: state.controller.signal };
        element.addEventListener('toggle', toggle, options);
        element.addEventListener('pointerenter', hover, options);
        element.addEventListener('pointerleave', hover, options);
        element.addEventListener('focusin', update, options);
        element.addEventListener('focusout', update, options);

        update();
    },

    cleanup: (element: HTMLElement): void =>
    {
        const state = snackbarStates.get(element);

        if (state) {
            state.controller.abort();
            clearTimer(state);
            snackbarStates.delete(element);
        }
        initialized.delete(element);
    }
}, HTMLElement);
