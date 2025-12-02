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
        data-alticon="schedule"
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
- Data Attribute: `data-alticon="schedule"` (defines the icon to show when toggled).

### Integration
You can trigger the Time picker component from standard input fields or buttons.

#### Connecting to an Input Field
To replace the browser's native time picker, add the `data-timepicker` attribute to an `<input>` element. The value of this attribute must match the `id` of your Time picker dialog.

```HTML
<input type="time" data-timepicker="mytimepicker" value="09:41">
```

- **Behavior**: When the input is clicked, the picker opens with the input's current value.
- **Reusability**: Multiple input fields can target the same Time picker component ID.

You may use the same time picker component for different time-input fields. When the user engages with the input field, the time picker is opened showing the time specified in the `value`-attribute.

#### Connecting to a Button
You can use a button to trigger the picker using the standard `popovertarget` attribute.

```HTML
<button type="button" class="micl-button-text-m" popovertarget="mytimepicker">09:41</button>
```

- **Behavior**: The Time picker treats the button's text content as the time value to read from and write to.

## Customizations
You can customize the appearance of the Time picker component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child time pickers.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-timepicker-input-height | 72px | Height of the hour a minute input boxes |
| --md-sys-timepicker-input-width | 96px | Width of the input boxes in 12-hour mode |
| --md-sys-timepicker-input-width-24h | 114px | Width of the input boxes in 24-hour mode |
| --md-sys-timepicker-separator-width | 24px | Width of the space containing the colon separator |
| --md-sys-timepicker-period-height | 72px | Total height of the AM/PM selector toggle |
| --md-sys-timepicker-period-width | 52px | Width of the AM/PM selector toggle |
| --md-sys-timepicker-dial-size | 256px | Diameter of the analog clock face |
| --md-sys-timepicker-dial-center-size | 8px | Diameter of the center dot in the analog dial |
| --md-sys-timepicker-dial-track-width | 2px | Thickness of the circular track line on the dial |

**Example: Changing the width of the dial track**

```HTML
<div style="--md-sys-timepicker-dial-track-width:3px">
  <dialog class="micl-dialog micl-timepicker" closedby="closerequest">
    ...
  </dialog>
</div>
```
