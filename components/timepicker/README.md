# Time picker
This component implements the [Material Design 3 Expressive Time picker](https://m3.material.io/components/time-pickers/overview) design. A time picker is a user interface component that allows users to select a specific time of day.

## Basic Usage

### HTML
The Time picker component is an extension of the [**Dialog** component](../dialog/README.md). To create a basic time picker, use the `<dialog>` element with both the `micl-dialog` and the `micl-timepicker` class.

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
Since the Time picker component is based on the Dialog component, you use the same utility classes for content structure and styling. Refer to the [Dialog component documentation](../dialog/README.md) for more information about this.

### Time Picker Structure
As shown in the example above, the main content area of the dialog consists of the following elements:

- An input field for the number of hours. Its name must be `hour` (`<input type="number" name="hour">`).

- An input field for the number of minutes. Its name must be `minute` (`<input type="number" name="minute">`).

- A text element with the `micl-timepicker__separator` class that separates the hours- and minutes-fields (e.g. by using a colon).

- A container element with the `micl-timepicker__period` class that the component uses to add an AM/PM selector if the user's browser uses the 12-hour time format.

- Optional elements for supporting text (`micl-timepicker__supporting-text-hour` and `micl-timepicker__supporting-text-minute`).

- An optional container element with the `micl-timepicker__dial` class in which the component generates the layout of an analog clock.

By default, the Time picker component has a vertical-oriented layout. Adding the `micl-timepicker--horizontal` class to the `<dialog>` element will change this to a horizontal-oriented layout.

Add a button with the `micl-timepicker__inputmode` class to the dialog's `micl-dialog__actions` section to support switching the time picker from **input**-type to **dial**-type.

### Associating a data field with a Time picker
The Time picker component replaces the browser's data input method for a time-input field. This is accomplished by adding the `timepicker` data-attribute to an `<input>`:

```HTML
<input type="time" data-timepicker="mytimepicker" value="09:41">
```

You may use the same time picker component for different time-input fields. When the user engages with the input field, the time picker is opened showing the time specified in the `value`-attribute.

A Time picker component may also be associated with a button, by specifying the `popovertarget` attribute:

```HTML
<button type="button" class="micl-button-text-m" popovertarget="mytimepicker">09:41</button>
```

The Time picker component uses the button's text as a storage for the time value.

## Customizations
You can customize the appearance of the Time picker component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child time pickers.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-timepicker-input-height | 72px | |
| --md-sys-timepicker-input-width | 96px | |
| --md-sys-timepicker-input-width-24h | 114px | |
| --md-sys-timepicker-separator-width | 24px | |
| --md-sys-timepicker-period-height | 72px | |
| --md-sys-timepicker-period-width | 52px | |
| --md-sys-timepicker-dial-size | 256px | |
| --md-sys-timepicker-dial-center-size | 8px | |
| --md-sys-timepicker-dial-track-width | 2px | |

**Example: Changing the width of the dial track**

```HTML
<div style="--md-sys-timepicker-dial-track-width:3px">
  <dialog class="micl-dialog micl-timepicker" closedby="closerequest">
    ...
  </dialog>
</div>
```
