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

export default (() =>
{
    const getSelectedStep = (stepper: HTMLElement): HTMLElement | null =>
    {
        let step = stepper.querySelector('.micl-stepper__step[aria-selected=true]') as HTMLElement;
        if (step) {
            return step;
        }
        step = stepper.querySelector('.micl-stepper__step') as HTMLElement;
        if (step) {
            step.setAttribute('aria-selected', 'true');
        }
        return step;
    };

    const getStepNumber = (stepper: HTMLElement, step: HTMLElement): number =>
    {
        let stepNumber = 1;
        let sibling    = step.previousElementSibling;

        while (sibling) {
            if (sibling.classList.contains('micl-stepper__step')) {
                stepNumber++;
            }
            sibling = sibling.previousElementSibling;
        }
        return stepNumber;
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

    const goToSibling = (selectedStep: HTMLElement, sibling: HTMLElement): void =>
    {
        selectedStep.addEventListener('transitionend', endTransitionSelected);
        selectedStep.classList.add('micl-stepper__step--fromselected');
        selectedStep.offsetHeight;

        sibling.addEventListener('transitionend', endTransitionSelected);
        sibling.classList.add('micl-stepper__step--toselected');
        sibling.offsetHeight;

        sibling.setAttribute('aria-selected', 'true');
        selectedStep.setAttribute('aria-selected', 'false');
        selectedStep.offsetHeight;
    };

    const showHideActions = (actions: HTMLElement[], step: HTMLElement): void =>
    {
        actions.forEach(action =>
        {
            const siblingKey = action.classList.contains('micl-stepper__action-back') ?
                               'previousElementSibling' : 'nextElementSibling';
            const hasSibling = (step[siblingKey] as Element)?.classList.contains('micl-stepper__step');

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
        const totalSteps = stepper.querySelectorAll('.micl-stepper__step').length;

        stepper.querySelectorAll('.micl-stepper__progress-current').forEach(current =>
        {
            current.textContent = `${index}`;
        });
        stepper.querySelectorAll('.micl-stepper__progress-total').forEach(total =>
        {
            total.textContent = `${totalSteps}`;
        });
        stepper.querySelectorAll('.micl-stepper__progress-dots').forEach(dots =>
        {
            const fragment = document.createDocumentFragment();

            dots.innerHTML = '';
            for (let i = 1; i <= totalSteps; i++) {
                let dot = document.createElement('span');
                dot.classList.add((i <= index) ? 'micl-stepper__progress-dot-done' :
                                                 'micl-stepper__progress-dot');
                fragment.appendChild(dot);
            }
            dots.appendChild(fragment);
        });
    };

    return {
        initialize: (stepper: HTMLElement): void =>
        {
            if (!stepper.matches(stepperSelector) || stepper.dataset.miclinitialized) {
                return;
            }
            stepper.dataset.miclinitialized = '1';

            const step    = getSelectedStep(stepper);
            const actions = Array.from(stepper.querySelectorAll<HTMLElement>(
                '.micl-stepper__action-back,.micl-stepper__action-next'
            ));

            if (step) {
                showHideActions(actions, step);
                showHideElements(stepper, step);
                updateProgress(stepper, step);
            }

            actions.forEach(action =>
            {
                action.addEventListener('click', function(event: Event)
                {
                    const back         = this.classList.contains('micl-stepper__action-back');
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

                    if (sibling?.classList.contains('micl-stepper__step')) {
                        goToSibling(selectedStep, sibling);
                        showHideActions(actions, sibling);
                        showHideElements(stepper, sibling);
                        updateProgress(stepper, sibling);
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
