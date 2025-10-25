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

import form from '../../foundations/form';

export const stepperSelector = '.micl-stepper';

const ACTIONS_SELECTOR = '.micl-stepper__action-back,.micl-stepper__action-next';
const BUTTON_SELECTOR  = '.micl-stepper__header button[role=tab][aria-controls]';
const STEP_CLASS       = 'micl-stepper__step';
const STEP_SELECTOR    = '.' + STEP_CLASS;

export default (() =>
{
    const getSelectedStep = (stepper: HTMLElement): HTMLElement | null =>
    {
        let step = stepper.querySelector(`${STEP_SELECTOR}[aria-current=step]`);
        if (step) {
            return step as HTMLElement;
        }
        return setSelectedStep(stepper, stepper.querySelector(STEP_SELECTOR));
    };

    const getStepNumber = (stepper: HTMLElement, step: HTMLElement): number =>
    {
        const allSteps = Array.from(stepper.querySelectorAll(STEP_SELECTOR));
        const index    = allSteps.indexOf(step);

        return index + 1;
    };

    const setSelectedStep = (stepper: HTMLElement, step: HTMLElement | null): HTMLElement | null =>
    {
        if (!step) {
            return null;
        }
        let index = 0;
        stepper.querySelectorAll(STEP_SELECTOR).forEach((e, i) =>
        {
            e.setAttribute('aria-current', e === step ? 'step' : 'false');
            if (e === step) {
                index = i;
            }
        });
        const button = stepper.querySelectorAll(BUTTON_SELECTOR).item(index);
        stepper.querySelectorAll(BUTTON_SELECTOR).forEach((e, i) =>
        {
            e.setAttribute('aria-selected', e === button ? 'true' : 'false');
        });
        refresh(stepper, step);

        return step;
    };

    const endTransitionSelected = (event: Event): void =>
    {
        const target = event.currentTarget as Element;
        if ((event as TransitionEvent).propertyName !== 'transform' || !target) {
            return;
        }
        target.classList.remove(
            'micl-stepper__step--fromselected',
            'micl-stepper__step--toselected'
        );
        target.removeEventListener('transitionend', endTransitionSelected);
    };

    const goToSibling = (stepper: HTMLElement, selectedStep: HTMLElement, sibling: HTMLElement): void =>
    {
        selectedStep.addEventListener('transitionend', endTransitionSelected);
        selectedStep.classList.add('micl-stepper__step--fromselected');
        selectedStep.offsetHeight;

        sibling.addEventListener('transitionend', endTransitionSelected);
        sibling.classList.add('micl-stepper__step--toselected');
        sibling.offsetHeight;

        setSelectedStep(stepper, sibling);
    };

    const isBackAction = (action: HTMLElement): boolean =>
          action.classList.contains('micl-stepper__action-back');

    const showHideActions = (stepper: HTMLElement, step: HTMLElement): void =>
    {
        Array.from(stepper.querySelectorAll<HTMLElement>(ACTIONS_SELECTOR)).forEach(action =>
        {
            const siblingKey = isBackAction(action) ? 'previousElementSibling' : 'nextElementSibling';
            const hasSibling = (step[siblingKey] as Element)?.classList.contains(STEP_CLASS);

            action.classList.toggle('micl-hidden', !hasSibling);
        });
    };

    const showHideElements = (stepper: HTMLElement, step: HTMLElement): void =>
    {
        const selectedStep = getStepNumber(stepper, step);

        stepper.querySelectorAll<HTMLElement>('[data-step]').forEach(element =>
        {
            const shouldHide = element.dataset.step != `${selectedStep}`;
            element.classList.toggle('micl-hidden', shouldHide);
        });
    };

    const updateProgress = (stepper: HTMLElement, step: HTMLElement): void =>
    {
        const index      = getStepNumber(stepper, step);
        const totalSteps = stepper.querySelectorAll(STEP_SELECTOR).length;
        const linear     = !stepper.classList.contains('micl-stepper--nonlinear');
        const setText    = (selector: string, content: string): void => {
            stepper.querySelectorAll(selector).forEach(e => { e.textContent = content; });
        };

        setText('.micl-stepper__progress-current', `${index}`);
        setText('.micl-stepper__progress-total', `${totalSteps}`);

        stepper.querySelectorAll('.micl-stepper__progress-dots').forEach(dots =>
        {
            const fragment = document.createDocumentFragment();

            dots.innerHTML = '';
            for (let i = 1; i <= totalSteps; i++) {
                let dot = document.createElement('span');
                dot.classList.add('micl-stepper__progress-dot');
                if ((linear && (i <= index)) || (!linear && (i === index))) {
                    dot.classList.add('micl-stepper__progress--done');
                }
                fragment.appendChild(dot);
            }
            dots.appendChild(fragment);
        });
        stepper.querySelectorAll(BUTTON_SELECTOR).forEach((button, i) =>
        {
            button.classList.toggle(
                'micl-stepper__progress--done',
                linear ? i + 1 <= index : i + 1 === index
            );
        });
    };

    const refresh = (stepper: HTMLElement, step: HTMLElement): void =>
    {
        showHideActions(stepper, step);
        showHideElements(stepper, step);
        updateProgress(stepper, step);
    };

    return {
        initialize: (stepper: HTMLElement): void =>
        {
            if (!stepper.matches(stepperSelector) || stepper.dataset.miclinitialized) {
                return;
            }
            stepper.dataset.miclinitialized = '1';

            const step   = getSelectedStep(stepper);
            const header = stepper.querySelector('.micl-stepper__header');

            if (step) {
                refresh(stepper, step);

                header?.querySelectorAll<HTMLButtonElement>(
                    'button[role=tab][aria-controls]'
                ).forEach(button =>
                {
                    button.addEventListener('click', () =>
                    {
                        if (
                            ('ariaControlsElements' in Element.prototype)
                            && button.ariaControlsElements
                        ) {
                            setSelectedStep(stepper, button.ariaControlsElements[0] as HTMLElement);
                        }
                        else {
                            const id = button.getAttribute('aria-controls');
                            if (id) {
                                setSelectedStep(stepper, document.getElementById(id));
                            }
                        }
                    });
                });
            }

            Array.from(stepper.querySelectorAll<HTMLElement>(ACTIONS_SELECTOR)).forEach(action =>
            {
                action.addEventListener('click', function(event: Event)
                {
                    const back         = isBackAction(this);
                    const selectedStep = getSelectedStep(stepper);

                    if (
                        !selectedStep
                        || (!back
                            && selectedStep instanceof HTMLFieldSetElement
                            && !form.validateFieldSet(selectedStep, true))
                    ) {
                        if (!back) {
                            event.stopImmediatePropagation();
                        }
                        return;
                    }
                    const sibling = selectedStep[
                        back ? 'previousElementSibling' : 'nextElementSibling'
                    ] as HTMLElement;

                    if (sibling?.classList.contains(STEP_CLASS)) {
                        goToSibling(stepper, selectedStep, sibling);
                    }
                }, true);
            });

            if (stepper instanceof HTMLFormElement) {
                stepper.addEventListener('submit', (event: SubmitEvent) =>
                {
                    if (!event.submitter?.classList.contains('micl-form--dosubmit')) {
                        event.preventDefault();
                    }
                    if (!form.validateForm(stepper, true)) {
                        event.stopImmediatePropagation();
                    }
                }, true);
            }
        }
    };
})();
