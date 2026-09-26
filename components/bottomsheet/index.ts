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

export const bottomsheetSelector = 'dialog.micl-bottomsheet';

const controllers = new WeakMap<HTMLDialogElement, AbortController>();

const resetHeight = (dialog: HTMLDialogElement): void => {
    delete dialog.dataset.miclfitheight;
    dialog.style.removeProperty('--md-comp-bottomsheet-height');
};

const settledHeight = (dialog: HTMLDialogElement): number => {
    dialog.getAnimations().forEach(animation => animation.finish());
    return dialog.getBoundingClientRect().height;
};

const getSnapHeights = (dialog: HTMLDialogElement): number[] => {
    let fitHeight = parseInt(dialog.dataset.miclfitheight || '0', 10);

    if (fitHeight < 1) {
        fitHeight = settledHeight(dialog);
        dialog.dataset.miclfitheight = `${fitHeight}`;
    }

    let maxHeight   = parseInt(window.getComputedStyle(dialog).getPropertyValue('max-block-size'), 10) || Infinity,
        snapHeights = (dialog.dataset.miclsnapheights || '').split(',').map(Number).filter(
            n => !isNaN(n) && (n >= 0) && (n <= maxHeight)
        );

    return [...new Set(snapHeights.concat([Math.min(fitHeight, maxHeight)]).sort((a, b) => a - b))];
};

const getNextSnapHeight = (dialog: HTMLDialogElement): number => {
    let currentHeight = settledHeight(dialog),
        snapHeights   = getSnapHeights(dialog),
        largerSnaps   = snapHeights.filter(height => height > currentHeight + 4);
    return largerSnaps[0] || snapHeights[0];
};

const getNearestSnapHeight = (dialog: HTMLDialogElement, height: number): number => {
    const snapHeights = getSnapHeights(dialog).filter(snapHeight => snapHeight > 0);
    return snapHeights.reduce(
        (nearest, snapHeight) => (Math.abs(snapHeight - height) < Math.abs(nearest - height)) ? snapHeight : nearest,
        snapHeights[0] ?? height
    );
};

const setHeight = (dialog: HTMLDialogElement, value: number): void => {
    if (value < 1) {
        resetHeight(dialog);
        dialog[!dialog.popover ? 'close' : 'hidePopover']();
    }
    else {
        dialog.style.setProperty('--md-comp-bottomsheet-height', `${value}px`);
    }
}

export default register(bottomsheetSelector, {
    initialize: (element: HTMLDialogElement) =>
    {
        if (
            !element.matches(bottomsheetSelector)
            || initialized.has(element)
        ) {
            return;
        }

        const headline = element.querySelector('.micl-bottomsheet__headline') as HTMLElement;
        if (!headline) {
            return;
        }
        initialized.add(element);

        const draghandle = headline.querySelector('.micl-bottomsheet__draghandle') as HTMLElement,
              controller = new AbortController(),
              options    = { signal: controller.signal };

        controllers.set(element, controller);

        let isPreparing = false,
            isResizing  = false,
            wasResized  = false,
            initialPointerY: number,
            initialHeight: number;

        element.addEventListener('beforetoggle', (event: Event) => {
            if ((event as ToggleEvent).newState === 'open') {
                resetHeight(element);
            }
        }, options);

        draghandle?.addEventListener('click', (event: Event) => {
            if (wasResized && (event as PointerEvent).detail) {
                return;
            }
            setHeight(element, getNextSnapHeight(element));
        }, options);

        headline.addEventListener('pointerdown', (event: Event) => {
            if ((event.target === headline) || (event.target === draghandle)) {
                isPreparing = true;
                wasResized  = false;
                event.preventDefault();

                initialPointerY = (event as PointerEvent).clientY;
                initialHeight   = settledHeight(element);
                document.addEventListener('pointermove', onPointerMove, options);
                document.addEventListener('pointerup', stopResizing, options);
                document.addEventListener('pointercancel', stopResizing, options);
            }
        }, options);

        function onPointerMove(event: Event) {
            const currentPointerY = (event as PointerEvent).clientY;
            if (isPreparing && (Math.abs(initialPointerY - currentPointerY) > 4)) {
                isPreparing = false;
                isResizing  = true;
                element.classList.add('micl-bottomsheet--resizing');
            }
            if (isResizing) {
                const targetHeight = Math.max(1, initialHeight + initialPointerY - currentPointerY),
                      snapHeight   = getSnapHeights(element).find(
                          height => (height > 0) && (Math.abs(height - targetHeight) <= 12)
                      );
                setHeight(element, snapHeight || targetHeight);
            }
        }

        function stopResizing(event: Event) {
            const resized = isResizing;

            isPreparing = false;
            isResizing  = false;
            element.classList.remove('micl-bottomsheet--resizing');
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', stopResizing);
            document.removeEventListener('pointercancel', stopResizing);

            if (resized) {
                wasResized = true;

                const currentHeight = element.getBoundingClientRect().height,
                      isDismissed   = (currentHeight < 48) && (event.type === 'pointerup');

                setHeight(element, isDismissed ? 0 : getNearestSnapHeight(element, currentHeight));
            }
        }
    },
    cleanup: (element: HTMLDialogElement) =>
    {
        const controller = controllers.get(element);

        if (controller) {
            controller.abort();
            controllers.delete(element);
        }
        element.classList.remove('micl-bottomsheet--resizing');
        resetHeight(element);
        initialized.delete(element);
    }
}, HTMLDialogElement);
