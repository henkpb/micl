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

export const stepperSelector = '.micl-stepper';

export default (() =>
{
    const getCurrentStep = (stepper: HTMLElement): HTMLElement | null =>
    {
        let step = stepper.querySelector('.micl-stepper__step--current') as HTMLElement;
        if (step) {
            return step;
        }
        step = stepper.querySelector('.micl-stepper__step') as HTMLElement;
        if (!step) {
            return null;
        }
        step.classList.add('micl-stepper__step--current');
        return step;
    };

    const endTransitionCurrent = (event: Event): void =>
    {
        if (!event.currentTarget || ((event as TransitionEvent).propertyName !== 'transform')) {
            return;
        }
        (event.currentTarget as Element).classList.remove(
            'micl-stepper__step--fromcurrent',
            'micl-stepper__step--tocurrent'
        );
        event.currentTarget.removeEventListener('transitionend', endTransitionCurrent);
    };

    const showHideActions = (actions: HTMLElement[], step: HTMLElement | null): void =>
    {
        step && actions.forEach(action =>
        {
            action.classList.toggle('micl-hidden', !step[
                action.classList.contains('micl-stepper--gonext') ?
                'nextElementSibling' : 'previousElementSibling'
            ]?.classList.contains('micl-stepper__step'));
        });
    };

    const showHideElements = (stepper: HTMLElement, step: HTMLElement): void =>
    {
        stepper.querySelectorAll<HTMLElement>('[data-step]').forEach(element =>
        {
            element.classList.toggle('micl-hidden', element.dataset.step !== step.dataset.miclstep);
        });
    };

    const checkStepValidity = (stepper: HTMLElement): HTMLElement | null =>
    {
        let currentStep = getCurrentStep(stepper);
        if (currentStep) {
            currentStep.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
                'input:required,select:required,textarea:required'
            ).forEach(input =>
            {
                if (!input.checkValidity()) {
                    currentStep = null;
                }
            });

            currentStep?.querySelectorAll<HTMLFieldSetElement>(
                'fieldset.micl-checkbox-group[data-miclname]'
            ).forEach(fieldset =>
            {
                let nrChecked = 0;
                fieldset.querySelectorAll<HTMLInputElement>(
                    `.micl-checkbox[name="${fieldset.dataset.miclname}"]`
                ).forEach(checkbox =>
                {
                    if (checkbox.checked) {
                        nrChecked++;
                    }
                });
                if (nrChecked === 0) {
                    console.log("NOT ENGOUGH CHECKS");
                }
            });
        }
        return currentStep;
    };

    return {
        initialize: (stepper: HTMLElement): void =>
        {
            if (
                !stepper.matches(stepperSelector)
                || stepper.dataset.miclinitialized
            ) {
                return;
            }
            stepper.dataset.miclinitialized = '1';

            stepper.querySelectorAll<HTMLElement>('.micl-stepper__step').forEach((step, index) =>
            {
                step.dataset.miclstep = `${index + 1}`;
            });

            const
                step    = getCurrentStep(stepper),
                actions = stepper.querySelectorAll<HTMLButtonElement>(
                    'button.micl-stepper--goback,button.micl-stepper--gonext'
                );
            showHideActions([...actions], step);
            step && showHideElements(stepper, step);

            actions.forEach(action =>
            {
                action.addEventListener('click', () =>
                {
                    const currentStep = checkStepValidity(stepper);
                    if (!currentStep) {
                        return;
                    }
                    const
                        goNext  = action.classList.contains('micl-stepper--gonext'),
                        sibling = currentStep[
                            goNext ? 'nextElementSibling' : 'previousElementSibling'
                        ] as HTMLElement;

                    if (sibling?.classList.contains('micl-stepper__step')) {
                        currentStep.addEventListener('transitionend', endTransitionCurrent);
                        currentStep.classList.add('micl-stepper__step--fromcurrent');
                        currentStep.offsetHeight;

                        sibling.addEventListener('transitionend', endTransitionCurrent);
                        sibling.classList.add('micl-stepper__step--tocurrent');
                        sibling.offsetHeight;

                        sibling.classList.add('micl-stepper__step--current');
                        currentStep.classList.remove('micl-stepper__step--current');
                        currentStep.offsetHeight;

                        showHideActions([...actions], sibling);
                        showHideElements(stepper, sibling);
                    }
                });
            });
        }
    };
})();
