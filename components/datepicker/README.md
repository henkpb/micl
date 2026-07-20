# Date picker
This component implements the [Material Design 3 Expressive Date picker](https://m3.material.io/components/date-pickers/overview) design. It allows users to select a date using either a text input or a calendar interface.

## Basic Usage

### HTML
The Date Picker component is an extension of the [**Dialog** component](../dialog/README.md). To create a basic date picker, use a `<dialog>` element with both `micl-dialog` and `micl-datepicker` classes.

```HTML
<dialog id="mydatepicker" class="micl-dialog micl-datepicker" closedby="closerequest" aria-labelledby="mytitle">
  <form method="dialog">
    <div class="micl-dialog__headline">
      <h2 id="mytitle">Enter date</h2>
      <span class="micl-dialog__supporting-text">Select date</span>
      <button type="button" id="btn" class="micl-datepicker__inputmode micl-iconbutton-standard-s micl-button--toggle material-symbols-outlined" commandfor="btn" command="--micl-toggle" data-miclicon="edit" data-micliconselected="calendar_today"></button>
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
@use "material-inspired-component-library/dist/textfield";
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/divider";
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
When loading individual JavaScript files, also load `dist/textfield` — it wires the input field that opens the picker.

This will initialize any Date picker component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Date picker component](https://henkpb.github.io/micl/datepicker.html) is available to interact with.

## Variants
Because the Date picker component relies on the Dialog component, it utilizes the same utility classes for content structure. Refer to the [Dialog component documentation](../dialog/README.md) for structural details.

### Date Picker Structure
For the picker to function, the `micl-dialog__content` area **must** contain the `<div class="micl-datepicker__calendars">` container. This holds the month-based calendars.

Additionally, the content area may contain:

- A container for selecting a year: `<div class="micl-datepicker__years">`

- A container for selecting a month: `<div class="micl-datepicker__months">`

- A [Text field component](../textfield/README.md) with the `micl-datepicker__input` class for manual date entry.

The `micl-dialog__headline` area may contain:

- **Title**: A heading element (e.g., `<h2>`) to display the selected date.

- **Supporting label**: A text element with the class `micl-dialog__supporting-text`.

- **Month selector**: A container with three [Icon button components](../iconbutton/README.md):
    - `micl-datepicker__month`: Opens the month selection container.
    - `micl-datepicker__previous`: Navigates to the previous month.
    - `micl-datepicker__next`: Navigates to the next month.

- **Year selector**: A container with three [Icon button components](../iconbutton/README.md):
    - `micl-datepicker__year`: Opens the year selection container.
    - `micl-datepicker__previous`: Navigates to the previous year.
    - `micl-datepicker__next`: Navigates to the next year.

Any item not required for your implementation may be omitted.

#### Input Mode Switching
To allow users to toggle between the calendar view and the manual date input, add an icon button to the `micl-dialog__headline` area:

- Class: `micl-datepicker__inputmode`
- Data Attribute: `data-miclicon="edit"` (defines the icon to show).
- Data Attribute: `data-micliconselected="calendar_today"` (defines the icon to show when toggled).

### Integration
You can trigger the Date picker component from standard input fields or buttons.

#### Connecting to an Input Field
To replace the browser's native date picker, add the `data-datepicker` attribute to an `<input>` element. The value of this attribute must match the `id` of your Date picker dialog.

```HTML
<input type="date" data-datepicker="mydatepicker" value="2025-12-02">
```

- **Behavior**: Clicking the input opens the picker initialized with the input's current value.
- **Reusability**: Multiple input fields can target the same Date picker component ID. The picker will automatically update to reflect the date of the specific input field engaged by the user.

**Docked Positioning** By default, the Date picker opens in the center of the screen. To anchor it to the input field, use the `micl-dialog--docked` class and CSS Anchor positioning.

```HTML
<dialog id="mydatepicker" class="micl-dialog micl-dialog--docked micl-datepicker" style="position-anchor:--myanchor">

<div class="micl-textfield-outlined" style="anchor-name:--myanchor">
  <label for="mytextfield">Start date</label>
  <input type="date" id="mytextfield" data-datepicker="mydatepicker">
</div>
```

#### Connecting to a Button
You can trigger the picker from a button using the standard `popovertarget` attribute.

```HTML
<button type="button" class="micl-button-text-m" popovertarget="mydatepicker" value="2026-01-23">23.01.2026</button>
```

- **Behavior**: The Date picker reads from and writes to the button's value attribute.
- **Formatting**: The component automatically updates the button's text content with the selected date, formatted according to the user's locale.

## Date Range Selection
Add the `micl-datepicker--range` class to the dialog to let users select a range of dates instead of a single date:

```HTML
<dialog id="myrangepicker" class="micl-dialog micl-datepicker micl-datepicker--range" closedby="closerequest">
```

The first selected date becomes the start of the range and the second one its end. Selecting a date before the start moves the start, and any selection after a completed range starts a new one. Confirming before an end date has been chosen commits a single-day range.

### Connecting a Pair of Input Fields
Connect two date input fields — both referring to the picker in their `data-datepicker` attribute — and identify the field holding the end date in the `data-miclrangeto` attribute of the start field:

```HTML
<input type="date" id="from" data-datepicker="myrangepicker" data-miclrangeto="to">
<input type="date" id="to" data-datepicker="myrangepicker">
```

- **Behavior**: Clicking either field opens the picker with the range loaded from both fields; reversed values are swapped. Confirming writes both fields and fires their change-events.
- **Limits**: The earliest allowed date is taken from the `min` attribute of the start field, the latest from the `max` attribute of the end field.

### Connecting to a Button
A single button invoker holds the range in its value attribute as an ISO 8601 time interval. The component updates the button's text content with the localized range:

```HTML
<button type="button" class="micl-button-text-m" popovertarget="myrangepicker" value="2026-01-23/2026-02-06">23.01.2026 – 06.02.2026</button>
```

### Text Input Mode
In range mode, the manual input area holds two [Text field components](../textfield/README.md) instead of being one itself:

```HTML
<div class="micl-datepicker__input">
  <div class="micl-textfield-outlined">
    <label for="rangestart">From</label>
    <input type="text" id="rangestart">
  </div>
  <div class="micl-textfield-outlined">
    <label for="rangeend">To</label>
    <input type="text" id="rangeend">
  </div>
</div>
```

Entering a start date that lies after the end date swaps the two. The fields cannot be emptied: to discard the end of a range, return to the calendar view and start a new range by selecting any date.

## Theming
Each date picker can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. The container color, shape and elevation are inherited from the [Dialog component](../dialog/README.md).

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-date-picker-modal-container-width` | The width of the modal date picker | `360px` |
| `--md-comp-date-input-modal-container-width` | The width of the modal date picker in text input mode | `328px` |
| `--md-comp-date-picker-docked-container-width` | The width of the docked date picker | `360px` |
| `--md-comp-date-picker-header-headline-color` | The text color of the headline showing the selected date | `--md-sys-color-on-surface-variant` |
| `--md-comp-date-picker-weekdays-label-text-color` | The text color of the weekday labels | `--md-sys-color-on-surface` |
| `--md-comp-date-picker-date-unselected-label-text-color` | The text color of the selectable dates | `--md-sys-color-on-surface` |
| `--md-comp-date-picker-date-selected-container-color` | The background color of the selected date | `--md-sys-color-primary` |
| `--md-comp-date-picker-date-selected-label-text-color` | The text color of the selected date | `--md-sys-color-on-primary` |
| `--md-comp-date-picker-date-today-container-outline-color` | The outline color of today's date | `--md-sys-color-primary` |
| `--md-comp-date-picker-date-today-label-text-color` | The text color of today's date | `--md-sys-color-primary` |
| `--md-comp-date-picker-selection-year-unselected-label-text-color` | The text color of the selectable years | `--md-sys-color-on-surface-variant` |
| `--md-comp-date-picker-selection-year-selected-container-color` | The background color of the selected year | `--md-sys-color-primary` |
| `--md-comp-date-picker-selection-year-selected-label-text-color` | The text color of the selected year | `--md-sys-color-on-primary` |
| `--md-comp-date-picker-range-selection-active-indicator-container-color` | The background color of the band connecting the endpoints of a range | `--md-sys-color-secondary-container` |
| `--md-comp-date-picker-selection-date-in-range-label-text-color` | The text color of the dates inside a range | `--md-sys-color-on-secondary-container` |

**Example: Changing the width of the modal date picker**

```CSS
#mydatepicker {
  --md-comp-date-picker-modal-container-width: 400px;
}
```
