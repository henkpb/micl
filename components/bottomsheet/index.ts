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

export const bottomsheetSelector = 'dialog.micl-bottomsheet';

export default (() =>
{
    const getSnapHeights = (dialog: HTMLDialogElement): number[] =>
    {
        let fitHeight = parseInt(dialog.dataset.miclfitheight || '0', 10);

        if (fitHeight < 1) {
            fitHeight = dialog.getBoundingClientRect().height;
            dialog.dataset.miclfitheight = `${fitHeight}`;
        }

        // data-miclfitheight is now set, so this resolves to the lifted resizing ceiling
        let maxHeight   = parseInt(window.getComputedStyle(dialog).getPropertyValue('max-block-size'), 10),
            snapHeights = (dialog.dataset.miclsnapheights || '').split(',').map(Number).filter(
                n => !isNaN(n) && (n >= 0) && (n <= maxHeight)
            );

        return [...new Set(snapHeights.concat([Math.min(fitHeight, maxHeight)]).sort((a, b) => a - b))];
    };

    const getNextSnapHeight = (dialog: HTMLDialogElement, isResizing: boolean): number =>
    {
        let currentHeight = dialog.getBoundingClientRect().height,
            snapHeights   = getSnapHeights(dialog),
            largerSnaps   = snapHeights.filter(height => height > currentHeight + 4);

        return largerSnaps[0] || snapHeights[isResizing ? snapHeights.length - 1 : 0];
    };

    const getPreviousSnapHeight = (dialog: HTMLDialogElement): number =>
    {
        // 0 (closing) is excluded: closing requires dragging below the 48px threshold
        let currentHeight = dialog.getBoundingClientRect().height,
            snapHeights   = getSnapHeights(dialog).filter(height => height > 0),
            smallerSnaps  = snapHeights.filter(height => height < currentHeight - 4);

        return smallerSnaps[smallerSnaps.length - 1] || snapHeights[0];
    };

    const setHeight = (dialog: HTMLDialogElement, value: number): void =>
    {
        if (value < 1) {
            delete dialog.dataset.miclfitheight;
            dialog.style.removeProperty('--md-comp-bottomsheet-height');
            dialog[!dialog.popover ? 'close' : 'hidePopover']();
        }
        else {
            dialog.style.setProperty('--md-comp-bottomsheet-height', `${value}px`);
        }
    }

    return {
        initialize: (element: HTMLDialogElement) =>
        {
            if (
                !element.matches(bottomsheetSelector)
                || element.dataset.miclinitialized
            ) {
                return;
            }
            element.dataset.miclinitialized = '1';

            const headline = element.querySelector('.micl-bottomsheet__headline') as HTMLElement;
            if (!headline) {
                return;
            }
            const draghandle = headline.querySelector('.micl-bottomsheet__draghandle') as HTMLElement;

            let isPreparing = false,
                isResizing  = false,
                wasResized  = false,
                initialPointerY: number,
                initialHeight: number;

            draghandle?.addEventListener('click', () =>
            {
                if (wasResized) {
                    return;
                }
                setHeight(element, getNextSnapHeight(element, false));
            });

            headline.addEventListener('pointerdown', (event: Event) =>
            {
                if ((event.target === headline) || (event.target === draghandle)) {
                    isPreparing = true;
                    wasResized  = false;
                    event.preventDefault();
                    initialPointerY = (event as PointerEvent).clientY;
                    initialHeight = element.getBoundingClientRect().height;
                    document.addEventListener('pointermove', onPointerMove);
                    document.addEventListener('pointerup', onPointerUp);
                }
            });

            function onPointerMove(event: Event)
            {
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
            function onPointerUp(event: Event)
            {
                isPreparing = false;
                element.classList.remove('micl-bottomsheet--resizing');
                document.removeEventListener('pointermove', onPointerMove);
                document.removeEventListener('pointerup', onPointerUp);
                if (isResizing) {
                    isResizing = false;
                    wasResized = true;

                    const currentPointerY = (event as PointerEvent).clientY;
                    if (currentPointerY < initialPointerY) {
                        setHeight(element, getNextSnapHeight(element, true));
                    }
                    else if (element.getBoundingClientRect().height < 48) {
                        setHeight(element, 0);
                    }
                    else {
                        setHeight(element, getPreviousSnapHeight(element));
                    }
                }
            }
        },
        cleanup: (element: HTMLDialogElement) =>
        {
            if (element.matches(bottomsheetSelector)) {
                element.classList.remove('micl-bottomsheet--resizing');
                delete element.dataset.miclinitialized;
                delete element.dataset.miclfitheight;
            }
        }
    };
})();
