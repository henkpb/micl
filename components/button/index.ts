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

export const buttonSelector = 'button[popovertarget],button.micl-button--toggle';

export default (() =>
{
    const onClick = (event: Event) =>
    {
        if (!event.target || !(event.target instanceof HTMLButtonElement)) {
            return;
        }
        if (event.target.popoverTargetElement instanceof HTMLDialogElement) {
            if (event.target.popoverTargetElement.open) {
                event.target.popoverTargetElement.close();
            }
            else {
                event.target.popoverTargetElement.showModal();
            }
        }
        if (event.target.classList.contains('micl-button--toggle')) {
            event.target.classList.add('micl-button--toggled');
            event.target.classList.toggle('micl-button--selected');
            if (!!event.target.dataset.miclalt) {
                [event.target.textContent, event.target.dataset.miclalt] = 
                [event.target.dataset.miclalt, event.target.textContent];
            }
        }
    };

    return {
        initialize: (element: HTMLButtonElement) =>
        {
            if (
                !element.matches('button[popovertarget],button.micl-button--toggle')
                || element.dataset.miclinitialized
            ) {
                return;
            }
            element.dataset.miclinitialized = '1';

            if (
                (element.popoverTargetElement instanceof HTMLDialogElement)
                && !element.popoverTargetElement.hasAttribute('popover')
            ) {
                element.addEventListener('click', onClick);
            }
            else if (element.classList.contains('micl-button--toggle')) {
                element.addEventListener('click', onClick);
            }
        },
        cleanup: (element: HTMLButtonElement) =>
        {
            if (element.matches('button[popovertarget],button.micl-button--toggle')) {
                document.removeEventListener('click', onClick);
                delete element.dataset.miclinitialized;
            }
        }
    };
})();
