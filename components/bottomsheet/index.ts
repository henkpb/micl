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
    var fitHeight = 0;

    const getSnapHeights = (dialog: HTMLDialogElement): number[] =>
    {
        let maxHeight   = parseInt(window.getComputedStyle(dialog).getPropertyValue('max-height')),
            snapHeights = (dialog.dataset.snapheights || '').split(',').map(Number).filter(
                n => !isNaN(n) && (n > 0) && (n <= maxHeight)
            );

        if (!fitHeight) {
            fitHeight = dialog.getBoundingClientRect().height;
        }
        return [...new Set(snapHeights.concat([fitHeight, maxHeight]).sort())];
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
        let currentHeight = dialog.getBoundingClientRect().height,
            snapHeights   = getSnapHeights(dialog),
            smallerSnaps  = snapHeights.filter(height => height < currentHeight - 4);

        return smallerSnaps[smallerSnaps.length - 1] || snapHeights[0];
    };

    const setHeight = (dialog: HTMLDialogElement, value: number): void =>
    {
        dialog.style.setProperty('--md-sys-bottomsheet-height', `${value}px`);
    }

    return {
        initialize: (element: HTMLDialogElement) =>
        {
            if (
                !element.matches('dialog.micl-bottomsheet')
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

            draghandle?.addEventListener('click', () =>
            {
                const nextSnapHeight = getNextSnapHeight(element, false);
                if (nextSnapHeight > 4) {
                    setHeight(element, nextSnapHeight);
                }
            });

            let isPreparing = false,
                isResizing  = false,
                initialMouseY: number,
                initialHeight: number;

            headline.addEventListener('mousedown', (event: Event) =>
            {
                if (event.eventPhase === Event.AT_TARGET) {
                    isPreparing = true;
                    event.preventDefault();
                    initialMouseY = (event as MouseEvent).clientY;
                    initialHeight = element.getBoundingClientRect().height;
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                }
            });

            function onMouseMove(event: Event)
            {
                const currentMouseY = (event as MouseEvent).clientY;
                if (isPreparing && (Math.abs(initialMouseY - currentMouseY) > 4)) {
                    isPreparing = false;
                    isResizing  = true;
                    element.classList.add('micl-bottomsheet--resizing');
                }
                if (isResizing) {
                    setHeight(element, initialHeight + initialMouseY - currentMouseY);
                }
            }
            function onMouseUp(event: Event)
            {
                isPreparing = false;
                element.classList.remove('micl-bottomsheet--resizing');
                if (isResizing) {
                    isResizing = false;

                    const currentMouseY = (event as MouseEvent).clientY;
                    if (currentMouseY < initialMouseY) {
                        setHeight(element, getNextSnapHeight(element, true));
                    }
                    else {
                        if (element.getBoundingClientRect().height < 48) {
                            if (!!element.popover) {
                                element.hidePopover();
                            }
                            setHeight(element, initialHeight);
                        }
                        else {
                            setHeight(element, getPreviousSnapHeight(element));
                        }
                    }
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }
            }
        },
        cleanup: (element: HTMLDialogElement) =>
        {
            if (element.matches('dialog.micl-bottomsheet')) {
                delete element.dataset.miclinitialized;
            }
        }
    };
})();
