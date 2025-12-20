# Date picker
This component implements the [Material Design 3 Expressive Date picker](https://m3.material.io/components/date-pickers/overview) design. It allows users to select a specific date using either a text input or a calendar interface.

## Basic Usage

### HTML
The Date picker component is an extension of the [**Dialog** component](../dialog/README.md). To create a basic date picker, use a `<dialog>` element with both `micl-dialog` and `micl-datepicker` classes.

```HTML
<dialog id="mydatepicker" class="micl-dialog micl-datepicker" closedby="closerequest" aria-labelledby="mytitle">
  <form method="dialog">
    <div class="micl-dialog__headline">
      <h2 id="mytitle">Enter date</h2>
      <span class="micl-dialog__supporting-text">Select date</span>
      <button type="button" class="micl-datepicker__inputmode micl-iconbutton-standard-s material-symbols-outlined" data-miclalt="calendar_today">edit</button>
      <hr class="micl-divider">
      <div class="micl-datepicker__month-selector">
        <button type="button" class="micl-datepicker__previous micl-iconbutton-standard-xs material-symbols-outlined" aria-label="Previous month">chevron_left</button>
        <button type="button" class="micl-datepicker__month micl-button-text-xs">
          <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">arrow_drop_down</span>
        </button>
        <button type="button" class="micl-datepicker__next micl-iconbutton-standard-xs material-symbols-outlined" aria-label="Next month">chevron_right</button>
      </div>
      <div class="micl-datepicker__year-selector">
        <button type="button" class="micl-datepicker__previous micl-iconbutton-standard-xs material-symbols-outlined" aria-label="Previous year">chevron_left</button>
        <button type="button" class="micl-datepicker__year micl-button-text-xs">
          <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">arrow_drop_down</span>
        </button>
        <button type="button" class="micl-datepicker__next micl-iconbutton-standard-xs material-symbols-outlined" aria-label="Next year">chevron_right</button>
      </div>
    </div>

    <div class="micl-dialog__content">
      <div class="micl-datepicker__calendars"></div>
      <div class="micl-datepicker__years"></div>
      <div class="micl-datepicker__months"></div>
      <div class="micl-datepicker__input micl-textfield-outlined">
        <label for="mydate">Date</label>
        <input type="text" id="mydate">
     </div>
    </div>

    <div class="micl-dialog__actions">
      <button class="micl-button-text-s" value="">Cancel</button>
      <button class="micl-button-text-s" value="OK">OK</button>
    </div>
  </form>
</dialog>
```

### CSS
Import both the date picker and the dialog styles into your project:

```CSS
@use "material-inspired-component-library/dist/dialog";
@use "material-inspired-component-library/dist/datepicker";
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

This will initialize any Date picker component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Date picker component](https://henkpb.github.io/micl/datepicker.html) is available to interact with.

## Variants
Because the Date picker component relies on the Dialog component, it utilizes the same utility classes for content structure. Refer to the [Dialog component documentation](../dialog/README.md) for structural details.

### Date Picker Structure
For the picker to function correctly, the `micl-dialog__content` area must contain the `<div class="micl-datepicker__calendars">` container that will hold the month-based calendars. In addition, the content area may contain:

- Container from which to select a year: `<div class="micl-datepicker__years">`
- Container from which to select a month: `<div class="micl-datepicker__months">`
- [Text field component](../textfield/README.md) with the `micl-datepicker__input` class to manually enter a date

The `micl-dialog__headline` area may contain the following items:

- Title: A heading element like `<h2>` that will display the selected date.
- Supporting label: A text element with class `micl-dialog__supporting-text`.
- Month selector: A sub-container containing three [Icon button components](../iconbutton/README.md) with these classes:
    - `micl-datepicker__month`: opens the `micl-datepicker__months` container from which to select a month.
    - `micl-datepicker__previous`: navigates to the previous month.
    - `micl-datepicker__next`: navigates to the next month.
- Year selector: A sub-container containing three Icon buttons with these classes:
    - `micl-datepicker__year`: opens the `micl-datepicker__years` container from which to select a year.
    - `micl-datepicker__previous`: navigates to the previous year.
    - `micl-datepicker__next`: navigates to the next year.

Each of these items may be omitted if its functionality is not required.

#### Input Mode Switching
To allow users to toggle between the date picker and the date input field, add an icon button to the `micl-dialog__headling` area:

- Class: `micl-datepicker__inputmode`
- Data Attribute: `data-miclalt="calendar_today"` (defines the icon to show when toggled).

### Integration
You can trigger the Date picker component from standard input fields or buttons.

#### Connecting to an Input Field
To replace the browser's native date picker, add the `data-datepicker` attribute to an `<input>` element. The value of this attribute must match the `id` of your Date picker dialog.

```HTML
<input type="date" data-datepicker="mydatepicker" value="2025-12-02">
```

- **Behavior**: When the input is clicked, the picker opens with the input's current value.
- **Reusability**: Multiple input fields can target the same Date picker component ID.

You may use the same date picker component for different date-input fields. When the user engages with the input field, the date picker is opened showing the date specified in the `value`-attribute.

#### Connecting to a Button
You can use a button to trigger the picker using the standard `popovertarget` attribute.

```HTML
<button type="button" class="micl-button-text-m" popovertarget="mydatepicker" value="2026-01-23">23.01.2026</button>
```

- **Behavior**: The Date picker treats the button's value attribute as the date value to read from and write to. In addition, it updates the button's text content with the selected date formatted according to the user's locale.
