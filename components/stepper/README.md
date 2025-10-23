# Stepper
This component creates a Stepper to manage a linear, step-by-step process for gathering or displaying information, inspired by [Material Design 3 Expressive](https://m3.material.io/components).

## Basic Usage

### HTML
To create a basic stepper, use a `<div>` element with the `micl-stepper` class and the `role="tablist"` attribute. The individual steps are contained within `<div class="micl-stepper__steps">`. Each step content is a `<div>` with the `micl-stepper__step` class and the `role="tabpanel"` attribute. The currently active step must be marked with `aria-selected="true"`.

```HTML
<div class="micl-stepper" role="tablist" aria-label="My Stepper">
  <div class="micl-stepper__steps">
    <div class="micl-stepper__step" role="tabpanel" aria-selected="true">
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

### JavaScript
This component requires JavaScript to support stepper functionality. The library will automatically initialize new components as they're added to the DOM.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

### Live Demo
A live example of the [Stepper component](https://henkpb.github.io/micl/stepper.html) is available to interact with.

## Action and State Management
The Stepper component manages the navigation and visibility of the **Back** and **Next** buttons automatically based on the current step:

- **Next Action**: Clicking a button with the `micl-stepper__action-next` class moves the stepper one step forward. This button is automatically hidden when the last step is active.

- **Back Action**: Clicking a button with the `micl-stepper__action-back` class moves the stepper one step backward. This button is automatically hidden when the first step is active.

## Variants

### Progress indicator
You can include the following optional elements to display the user's progress.

**Counter**
Use the `micl-stepper__progress-current` and `micl-stepper__progress-total` classes to display the current step number out of the total.

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

**Dots**
Use the `micl-stepper__progress-dots` class to generate a visual progress bar using colored dots, where the color changes based on the current step.

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
To enable built-in form validation for each step, use a `<form>` element for the stepper and replace the step `<div>`s with `<fieldset>` elements.

When a user clicks **Next**, the browser's built-in validation is triggered for all input fields within the current step:

- If any fields are invalid (e.g., a required field is empty), an error is reported, and the stepper will not advance.

- The Stepper component applies its error state to any child MICL component that supports it, displaying the error text. Otherwise, the default browser validation message appears.

```HTML
<form class="micl-stepper" action="/submit-data" method="post" role="tablist" aria-label="My Form">
  <div class="micl-stepper__steps">
    <fieldset class="micl-stepper__step" role="tabpanel" aria-selected="true">
      <div class="micl-textfield-filled">
        <label for="mytextfield">Label text</label>
        <input type="text" id="mytextfield" name="mytext" required maxlength="10">
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

If the final step contains a `type="submit"`-button, the component validates the **entire form** upon submission. The form will only be submitted if all data input fields across all steps are valid.

#### Step-Specific Action Buttons
Action buttons can be made visible only on a specific step by using the `data-step` attribute, which specifies the step number (starting from 1). This is useful for replacing the default **Next** button with a **Submit** button on the final step.

In this example for a three-step stepper, the **Next** button is hidden on step 3, and the **Submit** button is shown:

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
| --md-sys-stepper-dot-size | 12px | Controls the size of each progress dot |

**Example: Changing the size of the progress dots**

```HTML
<div class="micl-stepper" style="--md-sys-stepper-dot-size:16px">
  ...
</div>
```
