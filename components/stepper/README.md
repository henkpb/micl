# Stepper
This component creates a **Stepper** to manage a linear, step-by-step process for gathering or displaying information, inspired by the design principles of [Material Design 3 Expressive](https://m3.material.io/components).

## Basic Usage

### HTML
To create a basic stepper, use a `<div>` container with the `micl-stepper` class and the `role="tablist"` attribute. The individual steps are placed within `<div class="micl-stepper__steps">`. Each step content is a `<div>` with the `micl-stepper__step` class and the `role="tabpanel"` attribute. The currently active step must be marked with `aria-current="step"`.

```HTML
<div class="micl-stepper" role="tablist" aria-label="My Step-by-Step Process">
  <div class="micl-stepper__steps">
    <div class="micl-stepper__step" role="tabpanel" aria-current="step">
      Step 1 Content
    </div>
    <div class="micl-stepper__step" role="tabpanel">
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
Import the stepper styles into your project:

```CSS
@use "material-inspired-component-library/dist/stepper";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to enable navigation, state management, and form validation. The library will automatically initialize new components as they're added to the DOM.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

### Live Demo
A live example of the [Stepper component](https://henkpb.github.io/micl/stepper.html) is available to interact with.

## Action and State Management
The Stepper component automatically manages navigation between steps and controls the visibility of the **Back** and **Next** buttons based on the current step.

- **Next Action**: Clicking a button with the `micl-stepper__action-next` class advances the stepper by one step. This button is automatically hidden when the last step is active.

- **Back Action**: Clicking a button with the `micl-stepper__action-back` class moves the stepper back one step. This button is automatically hidden when the first step is active.

### Stepper Header
The optional Stepper Header displays the step titles horizontally, allowing users to navigate directly to steps. The `aria-controls` and `aria-labelledby` attributes are essential for accessibility, linking the header buttons to their corresponding step panels.

```HTML
<div class="micl-stepper">
  <div class="micl-stepper__header">
    <button type="button" role="tab" id="step1Label class="micl-button-text-xs" aria-controls="step1" aria-selected="true">
      <span class="micl-stepper__progress-dot" aria-hidden="true"></span>
      Step 1
    </button>
    <button type="button" role="tab" id="step2Label class="micl-button-text-xs" aria-controls="step2">
      <span class="micl-stepper__progress-dot" aria-hidden="true"></span>
      Step 2
    </button>
  </div>
  <div class="micl-stepper__steps">
    <div id="step1" role="tabpanel" class="micl-stepper__step" aria-labelledby="step1Label" aria-current="step">
      Step 1 Content
    </div>
    <div id="step2" role="tabpanel" class="micl-stepper__step" aria-labelledby="step2Label">
      Step 2 Content
    </div>
  </div>
</div>
```

### Linear vs. Non-linear Steppers
- **Linear (Default)**: The user can only click the header buttons of previous steps to revisit them. Navigation to future steps is disabled until they are reached.

- **Non-linear**: Apply the `micl-stepper--nonlinear` modifier class to the main stepper container. This allows the user to click any of the header buttons to freely jump between steps.

## Variants

### Progress indicator
You can include optional elements to display the user's progress.

#### Counter
Use the `micl-stepper__progress-current` and `micl-stepper__progress-total` classes to automatically display the current step number and the total number of steps (e.g., "1 of 3").

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

#### Dots
Use the `micl-stepper__progress-dots` class to generate a visual progress bar using colored dots. The dots dynamically change color to indicate the current step.

```HTML
<div class="micl-stepper__actions">
  <div>
    <button type="button" class="micl-button-text-m micl-stepper__action-back">Back</button>
  </div>
  <div class="micl-stepper__progress-dots"></div>
  <div>
    <button type="button" class="micl-button-tonal-m micl-stepper__action-next">Next</button>
  </div>
</div>
```

### Step validation
To enable built-in **form validation** for each step, use a `<form>` element as the main stepper container and replace the step `<div>`s with `<fieldset>` elements.

#### Validation Flow
- **Step-by-Step Validation**: When a user clicks **Next**, the browser's built-in validation is triggered only for the input fields within the current step. If any constraints are violated, the stepper will not advance.

- **Error Display**: The Stepper component applies the error state to any child MICL component that supports it, displaying the custom error text. Otherwise, the default browser validation message appears.

- **Final Submission Validation**: If the final step contains a `type="submit"` button, the component validates the entire form upon submission. The form will only be submitted if all data input fields across all steps are valid.

```HTML
<form class="micl-stepper" action="/submit-data" method="post" role="tablist" aria-label="My Form">
  <div class="micl-stepper__steps">
    <fieldset class="micl-stepper__step" role="tabpanel" aria-current="step">
      <div class="micl-textfield-filled">
        <label for="mytextfield">Label text</label>
        <input type="text" id="mytextfield" name="mytext" required>
      </div>
    </fieldset>
    <fieldset class="micl-stepper__step" role="tabpanel">
      Step 2 Content
    </fieldset>
  </div>
  <div class="micl-stepper__actions">
    ...
  </div>
</form>
```

#### Step-Specific Action Buttons
Action buttons can be made visible only on a specific step by using the `data-step` attribute, which specifies the step number (starting from 1). This is useful for replacing the default **Next** button with a content-specific action, like a **Submit** button on the final step.

In this example for a three-step stepper, the **Next** button is hidden on step 3, and the **Submit** button is shown instead:

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

## Customizations
You can customize the appearance of the Stepper component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child steppers.

| Variable name | Default Value | Description |
| ------------- | ----- | ----------- |
| --md-sys-stepper-counter-style | decimal | The list-style used for the counter number inside the dots in the stepper header |
| --md-sys-stepper-dot-size | 12px | Controls the size of each progress dot |

**Example: Changing the style of the counter inside header dots**

```HTML
<div class="micl-stepper" style="--md-sys-stepper-counter-style:upper-alpha">
  ...
</div>
```
