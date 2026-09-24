# Stepper
Use the Stepper component to manage a step-by-step process for gathering or displaying information. Because Material Design 3 does not include a native stepper component, this implementation is custom-built using [Material Design 3 Expressive](https://m3.material.io/components) design principles.

## Basic Usage

### HTML
To create a basic stepper, use a `<div>` container with the `micl-stepper` class. Place the individual steps within a `<div class="micl-stepper__steps">` container. Apply the `micl-stepper__step` class to each step's `<div>`. You can mark the initial active step with `aria-current="step"`; otherwise, the component defaults to showing the first step.

```HTML
<div class="micl-stepper">
  <div class="micl-stepper__steps">
    <div class="micl-stepper__step" aria-current="step">
      Step 1 Content
    </div>
    <div class="micl-stepper__step">
      Step 2 Content
    </div>
  </div>

  <div class="micl-stepper__actions">
    <div>
      <button type="button" class="micl-button-text-m micl-stepper__action-back">Back</button>
    </div>
    <div>
      <button type="button" class="micl-button-tonal-m micl-stepper__action-next">Next</button>
    </div>
  </div>
</div>
```

### CSS
Import the shared base styles once, followed by the button and stepper styles:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/stepper";
```

Alternatively, import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to handle navigation, state management, and form validation. The library automatically initializes new components as you add them to the DOM.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

### Live Demo
[Interact with a live example](https://henkpb.github.io/micl/stepper.html) of the Stepper component.

## Anatomy
A stepper consists of the following elements. Only the main container, the steps container, and the individual steps are strictly required.

| Element | Class | Description |
| --- | --- | --- |
| Container | `micl-stepper` | A `<div>`, or a `<form>` if you want to enable [step validation](#step-validation). |
| Header (optional) | `micl-stepper__header` | An `<ol>` of step buttons. See [Stepper Header](#stepper-header). |
| Steps container | `micl-stepper__steps` | Contains the steps. Because all steps occupy the same grid cell, this container matches the height of the tallest step, preventing the action buttons below from jumping as users navigate. |
| Step | `micl-stepper__step` | A `<div>`, or a `<fieldset>` inside a form. |
| Actions (optional) | `micl-stepper__actions` | A row with three slots: the first and last children align to the start and end, and an optional middle child centers itself. |
| Back / Next buttons | `micl-stepper__action-back`, `micl-stepper__action-next` | Navigate to the previous or next step. |
| Progress indicators (optional) | `micl-stepper__progress-current`, `micl-stepper__progress-total`, `micl-stepper__progress-dots` | See [Progress Indicators](#progress-indicators). |

## Navigation
The Stepper component automatically manages step navigation and toggles the visibility of the **Back** and **Next** buttons based on the current step.

* **Next Action**: Clicking a button with the `micl-stepper__action-next` class advances the stepper one step. The component automatically hides this button on the final step.
* **Back Action**: Clicking a button with the `micl-stepper__action-back` class moves the stepper back one step. The component automatically hides this button on the first step.

When a user triggers a **Next** or **Back** action, the component moves keyboard focus to the newly revealed step. This ensures screen readers announce the new step and focus is not lost when an action button disappears. To achieve this, the component automatically applies `tabindex="-1"` to each step, unless a `tabindex` is already present.

The new step slides in from the inline end (or the inline start when navigating backward). This animation mirrors automatically in right-to-left layouts and disables entirely if the user prefers reduced motion.

### Step-Specific Action Buttons
You can restrict action buttons to a specific step using the `data-step` attribute. Set its value to the target step number, counting from the beginning (e.g., `1` for the first step) or from the end (e.g., `-1` for the last step). This is useful for replacing a generic **Next** button with a specific **Submit** button on the final step.

In this example of a three-step process, the **Next** button hides on step 3, revealing the **Submit** button instead:

```HTML
<div class="micl-stepper__actions">
  <div>
    <button type="button" class="micl-button-text-m micl-stepper__action-back">Back</button>
  </div>
  <div>
    <button type="submit" class="micl-button-tonal-m" data-step="3">Submit</button>
    <button type="button" class="micl-button-tonal-m micl-stepper__action-next">Next</button>
  </div>
</div>
```

## Stepper Header
The optional Stepper Header is an ordered list that displays step titles horizontally, allowing users to navigate directly to specific steps. Each list item contains a button whose `aria-controls` attribute links to the `id` of its corresponding step. The component automatically marks the current step's button with `aria-current="step"` and numbers the header dots.

```HTML
<div class="micl-stepper">
  <ol class="micl-stepper__header" aria-label="Steps">
    <li>
      <button type="button" id="step1label" class="micl-button-text-xs" aria-controls="step1">
        <span class="micl-stepper__progress-dot" aria-hidden="true"></span>
        Step 1
      </button>
    </li>
    <li>
      <button type="button" id="step2label" class="micl-button-text-xs" aria-controls="step2">
        <span class="micl-stepper__progress-dot" aria-hidden="true"></span>
        Step 2
      </button>
    </li>
  </ol>
  <div class="micl-stepper__steps">
    <div id="step1" class="micl-stepper__step" role="group" aria-labelledby="step1label" aria-current="step">
      Step 1 Content
    </div>
    <div id="step2" class="micl-stepper__step" role="group" aria-labelledby="step2label">
      Step 2 Content
    </div>
  </div>
</div>
```

The `role="group"` and `aria-labelledby` attributes on a step are optional, but they provide an accessible name that screen readers will announce when focus moves into the step. (Note: A `<fieldset>` step already implies the group role natively).

The header pulls outward based on the inline padding of an extra-small button (`--md-comp-stepper-header-outset`), ensuring the first dot perfectly aligns with the content below it. Adjust this CSS property if you use a different button size in the header.

### Linear vs. Non-linear Steppers
* **Linear (Default)**: Users can only interact with the header buttons for the current and previous steps. Header buttons for future steps remain disabled until the user reaches them linearly.
* **Non-linear**: Apply the `micl-stepper--nonlinear` modifier class to the main stepper container. This unlocks all header buttons, allowing users to jump freely between any steps.

## Progress Indicators
You can include optional elements to display the user's progress. Place them anywhere inside the stepper—typically in the middle slot of the actions row.

### Counter
Use the `micl-stepper__progress-current` and `micl-stepper__progress-total` classes to automatically inject the current step number and the total step count (e.g., "1 of 3").

```HTML
<div class="micl-stepper__actions">
  <div>
    <button type="button" class="micl-button-text-m micl-stepper__action-back">Back</button>
  </div>
  <div>
    <span class="micl-stepper__progress-current"></span>
    <span> of </span>
    <span class="micl-stepper__progress-total"></span>
  </div>
  <div>
    <button type="button" class="micl-button-tonal-m micl-stepper__action-next">Next</button>
  </div>
</div>
```

### Dots
Use the `micl-stepper__progress-dots` class to generate a visual dot for each step.

```HTML
<div class="micl-stepper__actions">
  <div>
    <button type="button" class="micl-button-text-m micl-stepper__action-back">Back</button>
  </div>
  <div class="micl-stepper__progress-dots" aria-hidden="true"></div>
  <div>
    <button type="button" class="micl-button-tonal-m micl-stepper__action-next">Next</button>
  </div>
</div>
```

### Dot States
The dots in both the header and the progress indicator automatically reflect one of three states:

| State | Linear stepper | Non-linear stepper | Class |
| --- | --- | --- | --- |
| Current | The current step | The current step | `micl-stepper__progress--current` |
| Done | Steps before the current step | Steps that have been visited | `micl-stepper__progress--done` |
| Pending | Steps after the current step | Steps that have not been visited | *(none)* |

## Step Validation
To enable built-in **form validation** for each step, use a `<form>` element as the main stepper container and replace the step `<div>` tags with `<fieldset>` elements.

* **Step-by-Step Validation**: When a user clicks **Next**, the browser's built-in validation triggers only for the input fields within the *current* step. If any constraints fail, the stepper will not advance.
* **Error Display**: The Stepper component passes the error state down to any child MICL component that supports it, displaying the custom error text. For standard HTML inputs, the default browser validation message appears.
* **Final Submission Validation**: If the final step contains a `type="submit"` button, the component validates the entire form upon submission. The form submits only if all input fields across all steps are valid.
* **Early Submission**: If a user attempts to submit the form before reaching the last step (e.g., by pressing Enter in a text field), the component intercepts the submission, treats it as a **Next** action, validates the current step, and advances the stepper.

```HTML
<form class="micl-stepper" action="/submit-data" method="post" aria-label="My Form">
  <div class="micl-stepper__steps">
    <fieldset class="micl-stepper__step" aria-current="step">
      <div class="micl-textfield-filled">
        <label for="mytextfield">Label text</label>
        <input type="text" id="mytextfield" name="mytext" required>
      </div>
    </fieldset>
    <fieldset class="micl-stepper__step">
      Step 2 Content
    </fieldset>
  </div>
  <div class="micl-stepper__actions">
    ...
  </div>
</form>
```

## Accessibility
* **Header semantics:** Because the header is an ordered list, screen readers will announce the total number of steps. The current step's button receives `aria-current="step"`, and unreachable steps are marked `disabled`. Always provide an accessible name for the list using `aria-label`.
* **Focus management:** The **Next** and **Back** actions move focus to the new step. If a step contains a heading, label the step using `role="group"` and `aria-labelledby` so screen readers announce its name upon entry.
* **Do not rely on dots alone:** The progress dots are purely decorative. Hide the dots row from screen readers using `aria-hidden="true"` and rely on the header or the counter text to convey the user's position in the process.
* **Pending dots contrast:** Pending dots use `on-surface-variant` numbers on a `surface-container-highest` background. This ensures the numbers remain readable with a contrast ratio exceeding 7:1 in standard MICL themes.

## Theming
Each stepper can be themed using CSS custom properties. Apply them to any appropriate parent element to affect its child steppers.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-stepper-motion-spatial` | The easing curve of the slide between steps | `cubic-bezier(0.2, 0, 0, 1)` (emphasized) |
| `--md-comp-stepper-motion-duration` | The duration of the slide between steps. Ignored when the user prefers reduced motion | `500ms` |
| `--md-comp-stepper-counter-style` | The list-style used for the counter number inside the header dots | `decimal` |
| `--md-comp-stepper-header-outset` | How far the header extends beyond the stepper's inline edges | `12px` |
| `--md-comp-stepper-dot-size` | The size of each progress dot | `12px` |
| `--md-comp-stepper-header-dot-size` | The size of the dots in the stepper header | `24px` |
| `--md-comp-stepper-dot-space` | The spacing between the progress dots | `4px` |
| `--md-comp-stepper-dot-color` | The color of a pending dot | `var(--md-sys-color-surface-container-highest)` |
| `--md-comp-stepper-dot-label-color` | The counter color of a pending dot | `var(--md-sys-color-on-surface-variant)` |
| `--md-comp-stepper-dot-done-color` | The color of a completed dot | `var(--md-sys-color-tertiary-container)` |
| `--md-comp-stepper-dot-done-label-color` | The counter color of a completed dot | `var(--md-sys-color-on-tertiary-container)` |
| `--md-comp-stepper-dot-current-color` | The color of the current step's dot | `var(--md-sys-color-primary)` |
| `--md-comp-stepper-dot-current-label-color` | The counter color of the current step's dot | `var(--md-sys-color-on-primary)` |
| `--md-comp-divider-color` | The color of the connector line between the steps in the stepper header (shared with the Divider component) | `var(--md-sys-color-outline-variant)` |

**Example: Changing the style of the counter inside header dots**

```HTML
<div class="micl-stepper" style="--md-comp-stepper-counter-style: upper-alpha">
  ...
</div>
```

## Compatibility
The stepper header relies on [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning), specifically the [`anchor-scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor-scope) property, to draw the connector lines and correctly position the state layers of the header buttons. In browsers without support, the connector lines will not render correctly. Check [MDN Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor-scope#browser_compatibility) for up-to-date support details.

Additionally, the component determines the direction of the sliding animation using the [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) and [`:dir()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir) pseudo-classes.
