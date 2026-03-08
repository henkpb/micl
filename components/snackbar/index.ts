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

export const snackbarSelector = '.micl-snackbar';

interface SnackbarState {
    timeoutid?: number;
    delay: number;
    boundHandleToggle: (event: Event) => void;
    boundClearTimer: () => void;
    boundHandleMouseLeave: () => void;
}

const snackbarStates = new WeakMap<HTMLElement, SnackbarState>();

const clearTimer = (element: HTMLElement): void =>
{
    const state = snackbarStates.get(element);
    if (state && state.timeoutid) {
        clearTimeout(state.timeoutid);
        state.timeoutid = undefined;
    }
};

const startTimer = (element: HTMLElement): void =>
{
    clearTimer(element);
    const state = snackbarStates.get(element);
    if (!state) return;

    state.timeoutid = window.setTimeout(() => {
        if (element.isConnected && element.matches(':popover-open')) {
            element.hidePopover();
        }
    }, state.delay);
};

export default
{
    initialize: (element: HTMLElement): void =>
    {
        if (!element.matches(snackbarSelector) || element.dataset.miclinitialized) {
            return;
        }

        const delayAttr = element.dataset.micldelay;
        const delay = delayAttr ? parseInt(delayAttr, 10) : 0;

        if (isNaN(delay) || delay <= 0) return;

        element.dataset.miclinitialized = '1';

        // Create bound handlers specifically for THIS snackbar.
        const boundClearTimer = () => clearTimer(element);

        const boundHandleToggle = (event: Event): void =>
        {
            const toggleEvent = event as ToggleEvent;
            if (toggleEvent.newState === 'open') {
                startTimer(element);
            }
            else {
                clearTimer(element);
            }
        };

        const boundHandleMouseLeave = (): void =>
        {
            if (element.matches(':popover-open')) {
                startTimer(element);
            }
        };

        // Save these references in the WeakMap.
        snackbarStates.set(element, {
            delay,
            boundHandleToggle,
            boundClearTimer,
            boundHandleMouseLeave
        });

        element.addEventListener('toggle', boundHandleToggle);
        element.addEventListener('mouseenter', boundClearTimer);
        element.addEventListener('mouseleave', boundHandleMouseLeave);
    },

    cleanup: (element: HTMLElement): void =>
    {
        const state = snackbarStates.get(element);

        if (state) {
            clearTimer(element);
            element.removeEventListener('toggle', state.boundHandleToggle);
            element.removeEventListener('mouseenter', state.boundClearTimer);
            element.removeEventListener('mouseleave', state.boundHandleMouseLeave);
            snackbarStates.delete(element);
        }
        delete element.dataset.miclinitialized;
    }
};
