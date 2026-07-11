# Time picker
This component implements the [Material Design 3 Expressive Time picker](https://m3.material.io/components/time-pickers/overview) design. It allows users to select a specific time of day using either a text input or an analog dial interface.

## Basic Usage

### HTML
The Time picker component is an extension of the [**Dialog** component](../dialog/README.md). To create a basic time picker, use a `<dialog>` element with both `micl-dialog` and `micl-timepicker` classes.

```HTML
<dialog id="mytimepicker" class="micl-dialog micl-timepicker" closedby="closerequest" aria-labelledby="mytitle">
  <form method="dialog">
    <div class="micl-dialog__headline">
      <h2 id="mytitle">Enter time</h2>
    </div>

    <div class="micl-dialog__content">
      <input type="number" name="hour" value="00" aria-labelledby="myhour">
      <span class="micl-timepicker__separator">:</span>
      <input type="number" name="minute" value="00" aria-labelledby="myminute">
      <div class="micl-timepicker__period"></div>
      <span id="myhour" class="micl-timepicker__supporting-text-hour">Hour</span>
      <span id="myminute" class="micl-timepicker__supporting-text-minute">Minute</span>
      <div class="micl-timepicker__dial"></div>
    </div>

    <div class="micl-dialog__actions">
      <button
        type="button"
        class="micl-timepicker__inputmode micl-iconbutton-standard-s material-symbols-outlined"
        data-miclalt="schedule"
        aria-label="Switch input mode"
      >keyboard</button>
      <div>
        <button class="micl-button-text-s" value="">Cancel</button>
        <button class="micl-button-text-s" value="OK">OK</button>
      </div>
    </div>
  </form>
</dialog>
```

### CSS
Import both the time picker and the dialog styles into your project:

```CSS
@use "material-inspired-component-library/dist/dialog";
@use "material-inspired-component-library/dist/timepicker";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to function:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Time picker component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Time picker component](https://henkpb.github.io/micl/timepicker.html) is available to interact with.

## Variants
Because the Time picker component relies on the Dialog component, it utilizes the same utility classes for content structure. Refer to the [Dialog component documentation](../dialog/README.md) for structural details.

### Time Picker Structure
For the picker to function correctly, the `micl-dialog__content` area must contain:

- Hour input: `<input type="number" name="hour">`
- Minute input: `<input type="number" name="minute">`
- Separator: A text element with class `micl-timepicker__separator` (e.g., a colon).
- AM/PM Container: An empty `<div>` with class `micl-timepicker__period`. The component logic will populate this selector if the user's locale uses a 12-hour format.
- Dial Container: An optional empty `<div>` with class `micl-timepicker__dial` for the analog clock interface.
- Optional elements for "Hour" and "Minute" supporting text.

By default, the layout is **vertical**. To switch to a **horizontal** layout (side-by-side inputs and dial), add the modifier class `micl-timepicker--horizontal` to the `<dialog>`.

#### Input Mode Switching
To allow users to toggle between the text inputs and the analog dial, add a button to the `micl-dialog__actions` container:

- Class: `micl-timepicker__inputmode`
- Data Attribute: `data-miclicon="keyboard"` (defines the icon to show).
- Data Attribute: `data-micliconselected="schedule"` (defines the icon to show when toggled).

### Integration
You can trigger the Time picker component from standard input fields or buttons.

#### Connecting to an Input Field
To replace the browser's native time picker, add the `data-timepicker` attribute to an `<input>` element. The value of this attribute must match the `id` of your Time picker dialog.

```HTML
<input type="time" data-timepicker="mytimepicker" value="09:41">
```

- **Behavior**: Clicking the input opens the picker initialized with the input's current value.
- **Reusability**: Multiple input fields can target the same Time picker component ID. The picker will automatically update to reflect the time of the specific input field engaged by the user.

#### Connecting to a Button
You can trigger the picker from a button using the standard `popovertarget` attribute.

```HTML
<button type="button" class="micl-button-text-m" popovertarget="mytimepicker" value="09:41">09:41</button>
```

- **Behavior**: The Time picker reads from and writes to the button's value attribute.
- **Formatting**: The component automatically updates the button's text content with the selected time, formatted according to the user's locale.

## Theming
Each time picker can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. The container color, shape and elevation are inherited from the [Dialog component](../dialog/README.md).

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-time-picker-time-selector-container-height | Height of the hour and minute input boxes | 72px (80px in dial mode) |
| --md-comp-time-picker-time-selector-container-width | Width of the input boxes in 12-hour mode | 96px |
| --md-comp-time-picker-time-selector-24h-container-width | Width of the input boxes in 24-hour mode | 114px |
| --md-comp-time-picker-time-selector-unselected-container-color | The background color of the input boxes | --md-sys-color-surface-container-highest |
| --md-comp-time-picker-time-selector-unselected-label-text-color | The text color of the input boxes | --md-sys-color-on-surface |
| --md-comp-time-picker-time-selector-selected-container-color | The background color of the active input box | --md-sys-color-primary-container |
| --md-comp-time-picker-time-selector-selected-label-text-color | The text color of the active input box | --md-sys-color-on-primary-container |
| --md-comp-time-input-focus-outline-color | The border color of the active input box in keyboard input mode | --md-sys-color-primary |
| --md-comp-time-picker-separator-width | Width of the space containing the colon separator | 24px |
| --md-comp-time-picker-separator-color | The color of the colon separator | --md-sys-color-on-surface |
| --md-comp-time-picker-headline-color | The text color of the headline | --md-sys-color-on-surface-variant |
| --md-comp-time-picker-supporting-text-color | The text color of the labels below the input boxes | --md-sys-color-on-surface-variant |
| --md-comp-time-picker-period-selector-container-height | Total height of the AM/PM selector toggle | 72px (80px or 38px in dial modes) |
| --md-comp-time-picker-period-selector-container-width | Width of the AM/PM selector toggle | 52px |
| --md-comp-time-picker-period-selector-outline-color | The border color of the AM/PM selector toggle | --md-sys-color-outline |
| --md-comp-time-picker-period-selector-unselected-label-text-color | The text color of the unselected period | --md-sys-color-on-surface-variant |
| --md-comp-time-picker-period-selector-selected-container-color | The background color of the selected period | --md-sys-color-tertiary-container |
| --md-comp-time-picker-period-selector-selected-label-text-color | The text color of the selected period | --md-sys-color-on-tertiary-container |
| --md-comp-time-picker-clock-dial-container-size | Diameter of the analog clock face | 256px |
| --md-comp-time-picker-clock-dial-color | The background color of the analog clock face | --md-sys-color-surface-container-highest |
| --md-comp-time-picker-clock-dial-unselected-label-text-color | The text color of the dial marks | --md-sys-color-on-surface |
| --md-comp-time-picker-clock-dial-selected-label-text-color | The text color of the selected dial mark | --md-sys-color-on-primary |
| --md-comp-time-picker-clock-dial-selector-handle-container-color | The background color of the selected dial mark | --md-sys-color-primary |
| --md-comp-time-picker-clock-dial-selector-track-container-color | The color of the selector track line on the dial | --md-sys-color-primary |
| --md-comp-time-picker-clock-dial-selector-track-container-width | Thickness of the selector track line on the dial | 2px |
| --md-comp-time-picker-clock-dial-selector-center-container-color | The color of the center dot of the dial | --md-sys-color-primary |
| --md-comp-time-picker-clock-dial-selector-center-container-size | Diameter of the center dot of the dial | 8px |

**Example: Changing the width of the dial track**

```HTML
<div style="--md-comp-time-picker-clock-dial-selector-track-container-width:3px">
  <dialog class="micl-dialog micl-timepicker" closedby="closerequest">
    ...
  </dialog>
</div>
```
