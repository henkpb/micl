# Date picker

This component implements the [Material Design 3 Expressive Date picker](https://m3.material.io/components/date-pickers/overview) specification. It allows users to select a date using either a text input or a calendar interface.

## Basic Usage

### HTML
The Date picker component is an extension of the [**Dialog** component](../dialog/README.md). To create a basic date picker, use a `<dialog>` element with both the `micl-dialog` and `micl-datepicker` classes.

```HTML
<dialog
  id="mydatepicker"
  class="micl-dialog micl-datepicker"
  closedby="closerequest"
  aria-labelledby="mysupport"
  >
  <form method="dialog">
    <div class="micl-dialog__headline">
      <h2>Enter date</h2>
      <span id="mysupport" class="micl-dialog__supporting-text">Select date</span>
      <button type="button" id="btn"
        class="micl-datepicker__inputmode micl-iconbutton-standard-s micl-button--toggle material-symbols-outlined"
        commandfor="btn"
        command="--micl-toggle"
        aria-pressed="false"
        aria-label="Switch between calendar and text input"
        data-miclicon="edit"
        data-micliconselected="calendar_today"
      ></button>
      <hr class="micl-divider">

      <div class="micl-datepicker__month-selector">
        <button type="button"
          class="micl-datepicker__previous micl-iconbutton-standard-xs material-symbols-outlined"
          aria-label="Previous month"
        >chevron_backward</button>
        <button type="button" class="micl-datepicker__month micl-button-text-xs">
          <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">arrow_drop_down</span>
        </button>
        <button type="button"
          class="micl-datepicker__next micl-iconbutton-standard-xs material-symbols-outlined"
          aria-label="Next month"
        >chevron_forward</button>
      </div>

      <div class="micl-datepicker__year-selector">
        <button type="button"
          class="micl-datepicker__previous micl-iconbutton-standard-xs material-symbols-outlined"
          aria-label="Previous year"
        >chevron_backward</button>
        <button type="button" class="micl-datepicker__year micl-button-text-xs">
          <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">arrow_drop_down</span>
        </button>
        <button type="button"
          class="micl-datepicker__next micl-iconbutton-standard-xs material-symbols-outlined"
          aria-label="Next year"
        >chevron_forward</button>
      </div>
    </div>

    <div class="micl-dialog__content">
      <div class="micl-datepicker__calendars"></div>
      <div class="micl-datepicker__years"></div>
      <div class="micl-datepicker__months"></div>
      <div class="micl-datepicker__input micl-textfield-outlined">
        <label for="mydate">Date</label>
        <input type="text" id="mydate">
        <span class="micl-textfield__supporting-text"></span>
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

Import the required component styles into your project:

```CSS
@use "material-inspired-component-library/dist/dialog";
@use "material-inspired-component-library/dist/textfield";
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/divider";
@use "material-inspired-component-library/dist/datepicker";
```

Alternatively, import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript

This component requires JavaScript to function:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

Importing the script initializes all Date picker components on the page, including those dynamically added to the DOM later.

If you are loading individual JavaScript files, be sure to also load `dist/textfield` — it wires the input field that triggers the picker.

### Live Demo

A live interactive demo of the [Date picker component](https://henkpb.github.io/micl/datepicker.html) is available.

## Anatomy

For the picker to function, the `micl-dialog__content` area **must** contain the `<div class="micl-datepicker__calendars">` container. This holds the month-based calendars.

Additionally, the content area may contain:

* A container for selecting a year: `<div class="micl-datepicker__years">`
* A container for selecting a month: `<div class="micl-datepicker__months">`
* A [Text field component](../textfield/README.md) with the `micl-datepicker__input` class for manual date entry.

The `micl-dialog__headline` area may contain:

* **Title**: A heading element (e.g., `<h2>`) displaying the selected date. Because its content is dynamically replaced whenever the selection changes, ensure the dialog's `aria-labelledby` attribute points to the supporting label instead.
* **Supporting label**: A text element with the class `micl-dialog__supporting-text`.
* **Month selector**: A container with a [Button component](../button/README.md) flanked by two [Icon button components](../iconbutton/README.md):
  * `micl-datepicker__month`: Opens the month selection container.
  * `micl-datepicker__previous`: Navigates to the previous month.
  * `micl-datepicker__next`: Navigates to the next month.


* **Year selector**: A container with a [Button component](../button/README.md) flanked by two [Icon button components](../iconbutton/README.md):
  * `micl-datepicker__year`: Opens the year selection container.
  * `micl-datepicker__previous`: Navigates to the previous year.
  * `micl-datepicker__next`: Navigates to the next year.

Any structural item not required for your specific implementation may be omitted.

## Variants

Because the Date picker relies on the Dialog component, it utilizes the same utility classes for content structure. Refer to the [Dialog component documentation](../dialog/README.md) for structural details.

### Selectable Dates

The `min` and `max` attributes of the invoking input field limit the selection. Dates outside this range are rendered in a disabled state; they cannot be selected, navigated to, or typed in. Additionally, calendar navigation arrows will stop at the first and last months containing a selectable date.

Days from neighbouring months that pad the first and last weeks of the calendar are displayed in the same disabled state. These elements carry the `micl-datepicker__outside` class, allowing you to hide them completely via CSS if preferred.

### Input Mode Switching

To allow users to toggle between the calendar view and the manual date input, add an icon button to the `micl-dialog__headline` area:

* Class: `micl-datepicker__inputmode`
* Data Attribute: `data-miclicon="edit"` (defines the default icon).
* Data Attribute: `data-micliconselected="calendar_today"` (defines the toggled icon).

Since this is an icon-only button, it requires an `aria-label`. You must also include `aria-pressed="false"`. The self-targeting `--micl-toggle` command will automatically keep this attribute in sync with the active mode.

The text field accepts dates in the user's localized format and formats the entry while it is typed. Add a `micl-textfield__supporting-text` element, and the component will automatically populate it with the localized format string (e.g., `DD.MM.YYYY`, `MM/DD/YYYY`) to serve as a hint:

```HTML
<div class="micl-datepicker__input micl-textfield-outlined">
  <label for="mydate">Date</label>
  <input type="text" id="mydate">
  <span class="micl-textfield__supporting-text"></span>
</div>
```

An entry that is not a valid date, or one that falls outside the allowed `min` and `max` range, leaves the text field in an error state and does not change the selection. The invalid entry is preserved for correction. If the user confirms anyway, the picker commits the last valid selection.

## Integration

You can trigger the Date picker component from standard input fields or buttons.

### Connecting to an Input Field

To replace the browser's native date picker, add the `data-datepicker` attribute to an `<input>` element. The value of this attribute must match the `id` of your Date picker dialog.

```HTML
<input type="date" data-datepicker="mydatepicker" value="2025-12-02">
```

* **Behavior**: Clicking the input opens the picker, initialized with the input's current value.
* **Reusability**: Multiple input fields can target the same Date picker component ID. The picker automatically updates to reflect the date of the specific input field currently engaged by the user.

When the invoking input is wrapped in a [Text field component](../textfield/README.md), add an empty `micl-textfield__supporting-text` element to spell out the date format below the field. The component fills this element with the locale's date format, matching the one it uses in its own input view:

```HTML
<div class="micl-textfield-outlined">
  <label for="mytextfield">Start date</label>
  <input type="date" id="mytextfield" data-datepicker="mydatepicker" value="2025-12-02">
  <span class="micl-textfield__supporting-text"></span>
</div>

```

*(Note: If you provide custom text content within this element, the component will not overwrite it.)*

#### Docked Positioning

By default, the Date picker opens in the center of the screen. To anchor it to the input field, use the `micl-dialog--docked` class and CSS Anchor positioning. A docked date picker still opens as a modal dialog — unlike a standard docked [Dialog](../dialog/README.md), it cannot be a popover (for the reason detailed in the important note below).

```HTML
<dialog id="mydatepicker" class="micl-dialog micl-dialog--docked micl-datepicker" style="position-anchor:--myanchor">

<div class="micl-textfield-outlined" style="anchor-name:--myanchor">
  <label for="mytextfield">Start date</label>
  <input type="date" id="mytextfield" data-datepicker="mydatepicker">
</div>

```

### Connecting to a Button

You can trigger the picker from a button using the standard `command` attribute.

```HTML
<button
  type="button"
  class="micl-button-text-m"
  command="show-modal"
  commandfor="mydatepicker"
  value="2026-01-23"
>23.01.2026</button>
```

* **Behavior**: The Date picker reads from and writes to the button's `value` attribute.
* **Formatting**: The component automatically updates the button's text content with the selected date, formatted according to the user's locale.

> [!IMPORTANT]
> Because a date picker requires explicit user confirmation, it must function as a modal dialog. Opening it as a popover (`popovertarget`) is **not supported**. A `<dialog popover>` is not closed by `<form method="dialog">` and does not fire the standard `close` event required by the component to write the selected date back to the invoker.

## Date Range Selection

Add the `micl-datepicker--range` class to the dialog to let users select a range of dates instead of a single date:

```HTML
<dialog class="micl-dialog micl-datepicker micl-datepicker--range" closedby="closerequest">
```

The first selected date becomes the start of the range, and the second selection defines the end. Selecting a date *before* the current start date moves the start, and any selection made after a completed range resets the picker to start a new range. Confirming before an end date is chosen commits a single-day range.

### Connecting a Pair of Input Fields

Connect two date input fields — both referencing the picker in their `data-datepicker` attributes — and identify the end-date field using the `data-miclrangeto` attribute on the start-date field:

```HTML
<input type="date" id="from" data-datepicker="myrangepicker" data-miclrangeto="to">
<input type="date" id="to" data-datepicker="myrangepicker">
```

* **Behavior**: Clicking either field opens the picker with the range loaded from both fields. If the start date is after the end date, the values are automatically swapped. Confirming the selection updates both fields and fires their respective `change` events.
* **Limits**: The earliest allowed date is derived from the `min` attribute of the start field; the latest allowed date is derived from the `max` attribute of the end field.

### Connecting to a Button

A single button invoker holds the range in its `value` attribute as an ISO 8601 time interval. The component updates the button's text content with the localized range string:

```HTML
<button
  type="button"
  class="micl-button-text-m"
  command="show-modal"
  commandfor="myrangepicker"
  value="2026-01-23/2026-02-06"
>23.01.2026 – 06.02.2026</button>
```

### Text Input Mode

In range mode, the manual input area contains two [Text field components](../textfield/README.md) instead of one:

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

Entering a start date that occurs after the end date will swap the two inputs. These fields cannot be fully cleared; to discard the end of a range, the user must return to the calendar view and start a new range by clicking any date.

## Accessibility

* **Dialog labeling:** Always label the dialog. Point `aria-labelledby` at the supporting label, not at the headline. The headline holds the current selection and is rewritten on every change (the component marks it `aria-live="polite"` so assistive technologies announce new selections).
* **Grid structure:** The calendar is exposed as a `grid` of `row`s, with the weekday labels acting as `columnheader`s. Every date is a `gridcell` carrying its full, localized date as an `aria-label`. Selected dates are `aria-selected`, today's date is `aria-current="date"`, and dates outside the allowed range are `aria-disabled`.
* **Keyboard navigation:** The calendar utilizes a single tab stop and moves focus between dates with the arrow keys. Dates from neighboring months and those outside the allowed range are safely skipped.

| Key | Action |
| --- | --- |
| <kbd>←</kbd> <kbd>→</kbd> | Move to the previous or next day (mirrored in a right-to-left context) |
| <kbd>↑</kbd> <kbd>↓</kbd> | Move to the same weekday of the previous or next week |
| <kbd>Home</kbd> <kbd>End</kbd> | Move to the first or last day of the week |
| <kbd>Enter</kbd> <kbd>Space</kbd> | Select the focused date |
| <kbd>PageUp</kbd> <kbd>PageDown</kbd> | Show the next or previous month |
| <kbd>Shift</kbd> + <kbd>PageUp</kbd> / <kbd>PageDown</kbd> | Show the next or previous year |
| <kbd>Shift</kbd> + <kbd>M</kbd> / <kbd>Y</kbd> | Open the month or year selection |
| <kbd>Esc</kbd> | Close the picker without changing the invoker |

Moving beyond the first or last date of the month smoothly scrolls the calendar to the adjacent month while keeping focus on the active date.

* **Icon-only buttons:** The month/year arrows and the input mode toggle carry no text. Ensure each has a descriptive `aria-label`. The input mode toggle communicates the active mode through the `aria-pressed` attribute.
* **Motion preferences:** The component respects OS-level accessibility settings. The calendar will only slide between months and nudge at limits if the user has *not* enabled reduced motion.

## Theming

Each date picker can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. The container color, shape, and elevation are inherited directly from the [Dialog component](../dialog/README.md).

| Custom property | Meaning | Default |
| --- | --- | --- |
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
| `--md-comp-date-picker-selection-month-selected-container-color` | The background color of the selected month | `--md-sys-color-surface-variant` |
| `--md-comp-date-picker-selection-month-selected-label-text-color` | The text color of the selected month | `--md-sys-color-on-surface` |
| `--md-comp-date-picker-focus-indicator-color` | The color of the focus indicator around a date, month or year | `--md-sys-color-secondary` |
| `--md-comp-date-picker-range-selection-active-indicator-container-color` | The background color of the band connecting the endpoints of a range | `--md-sys-color-secondary-container` |
| `--md-comp-date-picker-selection-date-in-range-label-text-color` | The text color of the dates inside a range | `--md-sys-color-on-secondary-container` |
| `--md-comp-date-picker-motion-spatial` | The easing function of the slide between two months | `--md-sys-motion-expressive-fast-effects` |
| `--md-comp-date-picker-motion-spatial-duration` | The duration of the slide between two months | `--md-sys-motion-expressive-default-spatial-duration` |
| `--md-comp-date-picker-motion-duration` | The duration of the fade between the calendar, month, year and input views | `--md-sys-motion-expressive-default-effects-duration` |
| `--md-comp-date-picker-motion-duration-reverse` | The duration of the fade of the view that is leaving | `--md-sys-motion-expressive-fast-effects-duration` |
| `--md-comp-date-picker-button-motion-duration` | The duration of the state layer fade of a date or year | `--md-sys-motion-expressive-fast-spatial-duration` |

*(Note: All motion is disabled if the user has requested reduced motion at the OS level.)*

**Example: Changing the width of the modal date picker**

```CSS
#mydatepicker {
  --md-comp-date-picker-modal-container-width: 400px;
}
```
