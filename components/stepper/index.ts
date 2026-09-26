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

import { initialized, register } from '../../foundations/runtime';

export const stepperSelector = '.micl-stepper';

const ACTIONS_SELECTOR = '.micl-stepper__action-back,.micl-stepper__action-next';
const BUTTON_SELECTOR  = '.micl-stepper__header button[aria-controls]';
const STEP_CLASS       = 'micl-stepper__step';
const STEP_SELECTOR    = '.' + STEP_CLASS;

const visited = new WeakSet<HTMLElement>();

const getSteps = (stepper: HTMLElement): HTMLElement[] =>
    Array.from(stepper.querySelectorAll<HTMLElement>(STEP_SELECTOR));

const getSelectedStep = (stepper: HTMLElement): HTMLElement | null => {
    const step = stepper.querySelector<HTMLElement>(`${STEP_SELECTOR}[aria-current=step]`);
    if (step) {
        return step;
    }
    return setSelectedStep(stepper, stepper.querySelector<HTMLElement>(STEP_SELECTOR));
};

const getControlledStep = (button: HTMLButtonElement): HTMLElement | null => {
    if (('ariaControlsElements' in Element.prototype) && button.ariaControlsElements) {
        return button.ariaControlsElements[0] as HTMLElement ?? null;
    }
    const id = button.getAttribute('aria-controls');
    return id ? document.getElementById(id) : null;
};

const getSibling = (step: HTMLElement, back: boolean): HTMLElement | null => {
    const sibling = step[back ? 'previousElementSibling' : 'nextElementSibling'];
    return sibling?.classList.contains(STEP_CLASS) ? sibling as HTMLElement : null;
};

const setSelectedStep = (stepper: HTMLElement, step: HTMLElement | null): HTMLElement | null => {
    if (!step) {
        return null;
    }
    getSteps(stepper).forEach(e =>
    {
        e.setAttribute('aria-current', e === step ? 'step' : 'false');
    });
    visited.add(step);
    refresh(stepper, step);

    return step;
};

const navigate = (stepper: HTMLElement, back: boolean): boolean => {
    const selectedStep = getSelectedStep(stepper);
    if (
        !selectedStep
        || (!back
            && selectedStep instanceof HTMLFieldSetElement
            && !form.validateFieldSet(selectedStep, true))
    ) {
        return false;
    }
    const sibling = getSibling(selectedStep, back);
    if (sibling) {
        setSelectedStep(stepper, sibling);
        sibling.focus();
    }
    return true;
};

const isBackAction = (action: HTMLElement): boolean =>
      action.classList.contains('micl-stepper__action-back');

const showHideActions = (stepper: HTMLElement, step: HTMLElement): void => {
    stepper.querySelectorAll<HTMLElement>(ACTIONS_SELECTOR).forEach(action =>
    {
        action.classList.toggle(
            'micl-stepper__action--hidden',
            !getSibling(step, isBackAction(action))
        );
    });
};

const showHideElements = (stepper: HTMLElement, selected: number, total: number): void => {
    stepper.querySelectorAll<HTMLElement>('[data-step]').forEach(element =>
    {
        const stepnr = parseInt(element.dataset.step || '0', 10);
        element.classList.toggle(
            'micl-stepper--hidden',
            stepnr > 0 ? stepnr != selected : total + stepnr + 1 != selected
        );
    });
};

const updateProgress = (stepper: HTMLElement, steps: HTMLElement[], index: number): void => {
    const totalSteps = steps.length;
    const linear     = !stepper.classList.contains('micl-stepper--nonlinear');
    const setState   = (element: Element, n: number): void => {
        element.classList.toggle(
            'micl-stepper__progress--done',
            n !== index && (linear ? n < index : visited.has(steps[n - 1]))
        );
        element.classList.toggle('micl-stepper__progress--current', n === index);
    };
    const setText    = (selector: string, content: string): void => {
        stepper.querySelectorAll(selector).forEach(e => { e.textContent = content; });
    };

    setText('.micl-stepper__progress-current', `${index}`);
    setText('.micl-stepper__progress-total', `${totalSteps}`);

    stepper.querySelectorAll('.micl-stepper__progress-dots').forEach(dots => {
        const fragment = document.createDocumentFragment();
        dots.innerHTML = '';
        for (let i = 1; i <= totalSteps; i++) {
            let dot = document.createElement('span');
            dot.classList.add('micl-stepper__progress-dot');
            setState(dot, i);
            fragment.appendChild(dot);
        }
        dots.appendChild(fragment);
    });
    stepper.querySelectorAll<HTMLButtonElement>(BUTTON_SELECTOR).forEach(button => {
        const n = steps.indexOf(getControlledStep(button) as HTMLElement) + 1;
        setState(button, n);
        button.disabled = linear && n > index;
        if (n === index) {
            button.setAttribute('aria-current', 'step');
        }
        else {
            button.removeAttribute('aria-current');
        }
    });
};

const refresh = (stepper: HTMLElement, step: HTMLElement): void => {
    const steps = getSteps(stepper);
    const index = steps.indexOf(step) + 1;

    showHideActions(stepper, step);
    showHideElements(stepper, index, steps.length);
    updateProgress(stepper, steps, index);
};

export default register(stepperSelector, {
    initialize: (stepper: HTMLElement): void =>
    {
        if (!stepper.matches(stepperSelector) || initialized.has(stepper)) {
            return;
        }
        initialized.add(stepper);

        getSteps(stepper).forEach(step => {
            if (!step.hasAttribute('tabindex')) {
                step.tabIndex = -1;
            }
        });
        setSelectedStep(
            stepper,
            stepper.querySelector<HTMLElement>(`${STEP_SELECTOR}[aria-current=step]`)
            ?? stepper.querySelector<HTMLElement>(STEP_SELECTOR)
        );

        stepper.querySelectorAll<HTMLButtonElement>(BUTTON_SELECTOR).forEach((button, index) => {
            button.style.setProperty('--micl-stepper-anchor', `--micl-step-${index}`);
            if (index > 0) {
                button.style.setProperty('--micl-stepper-prev', `--micl-step-${index - 1}`);
            }
            button.addEventListener('click', () =>
            {
                setSelectedStep(stepper, getControlledStep(button));
            });
        });

        stepper.querySelectorAll<HTMLElement>(ACTIONS_SELECTOR).forEach(action => {
            action.addEventListener('click', function(event: Event)
            {
                const back = isBackAction(this);
                if (!navigate(stepper, back) && !back) {
                    event.stopImmediatePropagation();
                }
            }, true);
        });

        if (stepper instanceof HTMLFormElement) {
            stepper.addEventListener('submit', (event: SubmitEvent) => {
                const step = getSelectedStep(stepper);

                if (step && getSibling(step, false)) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    navigate(stepper, false);
                }
                else if (!form.validateForm(stepper, true)) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            }, true);
        }
    }
}, 'HTMLElement');
