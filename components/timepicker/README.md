# Time picker

This component implements the [Material Design 3 Expressive Time picker](https://m3.material.io/components/time-pickers/overview) design. It allows users to select a specific time of day using either a text input or an analog dial interface.

## Basic Usage

### HTML

The Time picker component is an extension of the [**Dialog** component](../dialog/README.md). To create a basic time picker, use a `<dialog>` element with both the `micl-dialog` and `micl-timepicker` classes.

```HTML
<dialog
  id="mytimepicker"
  class="micl-dialog micl-timepicker"
  closedby="closerequest"
  aria-labelledby="mytitle"
  data-micldialheadline="Select time"
  data-miclinputheadline="Enter time"
>
  <form method="dialog">
    <div class="micl-dialog__headline">
      <h2 id="mytitle">Select time</h2>
    </div>

    <div class="micl-dialog__content">
      <input type="text" name="hour" value="00" aria-labelledby="myhour">
      <span class="micl-timepicker__separator">:</span>
      <input type="text" name="minute" value="00" aria-labelledby="myminute">
      <div class="micl-timepicker__period"></div>
      <span id="myhour" class="micl-timepicker__supporting-text-hour">Hour</span>
      <span id="myminute" class="micl-timepicker__supporting-text-minute">Minute</span>
      <div class="micl-timepicker__dial"></div>
    </div>

    <div class="micl-dialog__actions">
      <button
        type="button"
        id="myinputmode"
        class="micl-timepicker__inputmode micl-iconbutton-standard-s micl-button--toggle micl-button--square material-symbols-outlined"
        commandfor="myinputmode"
        command="--micl-toggle"
        data-miclicon="keyboard"
        data-micliconselected="schedule"
        aria-pressed="false"
        aria-label="Switch input mode"
      ></button>
      <div>
        <button class="micl-button-text-s" value="">Cancel</button>
        <button class="micl-button-text-s" value="OK">OK</button>
      </div>
    </div>
  </form>
</dialog>

```

### CSS

Import the time picker, dialog, and button styles into your project:

```CSS
@use "material-inspired-component-library/dist/dialog";
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/iconbutton";
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

If you are loading individual JavaScript modules, ensure you include `dist/textfield` (to wire the triggering input field) and `dist/button` (to manage the `aria-pressed` state and icon of the mode toggle).

### Live Demo

A live example of the [Time picker component](https://henkpb.github.io/micl/timepicker.html) is available for interaction.

## Anatomy

As an extension of the Dialog component, the Time picker utilizes the same utility classes for its content structure. Refer to the [Dialog component documentation](../dialog/README.md) for base layout details.

For the picker to function correctly, the `micl-dialog__content` area must contain:

* **Hour input:** `<input type="text" name="hour">`
* **Minute input:** `<input type="text" name="minute">`
* **Separator:** A text element with the class `micl-timepicker__separator` (e.g., a colon).
* **AM/PM Container:** An empty `<div>` with the class `micl-timepicker__period`. The component logic populates this container automatically when using a 12-hour clock.
* **Dial Container:** An optional empty `<div>` with the class `micl-timepicker__dial` for the analog clock interface.
* **Supporting Text:** Optional elements mapping to "Hour" and "Minute" labels.

By default, the layout is **vertical**. To switch to a **horizontal** layout (side-by-side inputs and dial), add the `micl-timepicker--horizontal` modifier class to the `<dialog>`. The two layouts only differ visually while the dial is displayed.

## Variants

#### 12-Hour and 24-Hour Clocks

By default, the picker adopts the hour cycle of the user's locale: a 12-hour clock displays an AM/PM selector and hours 1–12 on the dial, while a 24-hour clock displays hours 0–11 on the outer ring and 12–23 on the inner ring. The AM/PM labels reflect the locale's day period names (e.g., a Spanish locale will display *a.m.* / *p.m.*).

To explicitly set the clock format regardless of the user's locale (useful for applications with custom locale switchers), add `data-miclhourcycle` to the `<dialog>`:

```HTML
<dialog class="micl-dialog micl-timepicker" data-miclhourcycle="h12" closedby="closerequest">
  ...
</dialog>

```

Accepted values are `h11` and `h12` (for 12-hour formatting) and `h23` and `h24` (for 24-hour formatting). These map directly to the [`hourCycle`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions) values reported by `Intl`.

#### Starting in Input Mode

By default, the picker opens in dial mode. To default to input mode, add the `micl-timepicker__dial--hidden` class to the `micl-timepicker__dial` element, and set `aria-pressed="true"` on the `micl-timepicker__inputmode` button so it displays the matching `schedule` icon. These two attributes operate independently and must be synced in your initial markup.

#### Input Mode Switching

To allow users to toggle between text inputs and the analog dial, add an icon [toggle button](../iconbutton/README.md) to the `micl-dialog__actions` container, as shown in the basic example:

* **Class:** `micl-timepicker__inputmode` alongside the standard icon button and `micl-button--toggle` classes.
* **Behavior:** A self-targeting `commandfor` / `command="--micl-toggle"` pair flips the button's `aria-pressed` state upon activation.
* **Dial Icon:** `data-miclicon="keyboard"` (displayed in dial mode when `aria-pressed="false"`).
* **Input Icon:** `data-micliconselected="schedule"` (displayed in input mode when `aria-pressed="true"`).

Material Design specifies different headlines for the two modes. By adding `data-micldialheadline` and `data-miclinputheadline` to the `<dialog>`, the component will dynamically update the headline text to match the current mode. If omitted, the default heading remains static.

### Integration

You can trigger the Time picker component from standard input fields or buttons.

#### Connecting to an Input Field

To replace the browser's native time picker, assign the `data-timepicker` attribute to an `<input>` element. The value of this attribute must match the `id` of your Time picker dialog.

```HTML
<input type="time" data-timepicker="mytimepicker" value="09:41">

```

* **Behavior**: Clicking the input opens the picker, initialized to the input's current value.
* **Reusability**: Multiple input fields can target the same Time picker ID. The component will automatically read from and write to the specific input field the user interacted with.

#### Connecting to a Button

You can trigger the picker from a button using standard `command` / `commandfor` attributes.

```HTML
<button
  type="button"
  class="micl-button-text-m"
  command="show-modal"
  commandfor="mytimepicker"
  value="09:41"
>09:41</button>

```

* **Behavior**: The Time picker reads from and writes to the button's `value` attribute, which must hold the time in 24-hour `HH:MM` format.
* **Formatting**: The component updates the button's visible text content with the selected time, formatted according to the user's locale.

> [!NOTE]
> Because a time picker requires explicit user confirmation, it must function as a modal dialog. Opening it as a popover (`popovertarget`) is **not supported**. A `<dialog popover>` does not fire the standard `close` event required by the component to write the selected time back to the invoker.

## Accessibility

* **Always label the dialog.** Point `aria-labelledby` to the headline element. Additionally, ensure both input fields use `aria-labelledby` to point to their respective supporting text elements (as demonstrated in the HTML snippet).
* **Ensure full keyboard navigation.** The two input fields serve as the primary keyboard path. Exposed as spin buttons, they respond to <kbd>↑</kbd> and <kbd>↓</kbd> keys in *both* modes, wrapping at the limits of their ranges, while <kbd>Home</kbd> and <kbd>End</kbd> jump to the lowest and highest value. On a 12-hour clock, wrapping past 12 or below 1 automatically toggles the AM/PM selector.
* **Hide the dial from assistive technologies.** The dial is purely a pointer affordance. It uses `aria-hidden="true"` to prevent screen readers from announcing an inoperable list of numbers. Everything configurable via the dial is fully accessible via the input fields.
* **Manage field states dynamically.** The input fields are marked `read-only` while in dial mode to prevent mobile on-screen keyboards from appearing unnecessarily. Switching to input mode restores editability, moves focus to the hour field, and selects its contents.
* **Provide context for the toggle button.** The mode toggle is an icon-only button; it requires an `aria-label`. Its `aria-pressed` state programmatically communicates the active mode to screen readers.
* **Respect motion preferences.** The selector visually sweeps between values only if the user has not enabled OS-level reduced motion.

## Theming

Time pickers can be themed using CSS custom properties adhering to the Material Design 3 component-token naming convention. Container color, shape, and elevation are inherited directly from the [Dialog component](../dialog/README.md).

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-time-picker-motion-duration` | Duration of the selector sweep and state layer fades | `--md-sys-motion-expressive-fast-spatial-duration` |
| `--md-comp-time-picker-time-selector-container-height` | Height of the hour and minute input boxes | `72px` (`80px` in dial mode) |
| `--md-comp-time-picker-time-selector-container-width` | Width of the input boxes in 12-hour mode | `96px` |
| `--md-comp-time-picker-time-selector-24h-container-width` | Width of the input boxes in 24-hour mode | `114px` |
| `--md-comp-time-picker-time-selector-unselected-container-color` | Background color of inactive input boxes | `--md-sys-color-surface-container-highest` |
| `--md-comp-time-picker-time-selector-unselected-label-text-color` | Text color of inactive input boxes | `--md-sys-color-on-surface` |
| `--md-comp-time-picker-time-selector-selected-container-color` | Background color of the active input box | `--md-sys-color-primary-container` |
| `--md-comp-time-picker-time-selector-selected-label-text-color` | Text color of the active input box | `--md-sys-color-on-primary-container` |
| `--md-comp-time-input-focus-outline-color` | Border color of the active input box in keyboard input mode | `--md-sys-color-primary` |
| `--md-comp-time-picker-separator-width` | Width of the container holding the colon separator | `24px` |
| `--md-comp-time-picker-separator-color` | Color of the colon separator | `--md-sys-color-on-surface` |
| `--md-comp-time-picker-headline-color` | Text color of the dialog headline | `--md-sys-color-on-surface-variant` |
| `--md-comp-time-picker-supporting-text-color` | Text color of the labels beneath the input boxes | `--md-sys-color-on-surface-variant` |
| `--md-comp-time-picker-period-selector-container-height` | Total height of the AM/PM selector toggle | `72px` (`80px` or `38px` in dial modes) |
| `--md-comp-time-picker-period-selector-container-width` | Width of the AM/PM selector toggle | `52px` |
| `--md-comp-time-picker-period-selector-outline-color` | Border color of the AM/PM selector toggle | `--md-sys-color-outline` |
| `--md-comp-time-picker-period-selector-unselected-label-text-color` | Text color of the unselected period | `--md-sys-color-on-surface-variant` |
| `--md-comp-time-picker-period-selector-selected-container-color` | Background color of the selected period | `--md-sys-color-tertiary-container` |
| `--md-comp-time-picker-period-selector-selected-label-text-color` | Text color of the selected period | `--md-sys-color-on-tertiary-container` |
| `--md-comp-time-picker-clock-dial-container-size` | Diameter of the analog clock face | `256px` |
| `--md-comp-time-picker-clock-dial-color` | Background color of the analog clock face | `--md-sys-color-surface-container-highest` |
| `--md-comp-time-picker-clock-dial-unselected-label-text-color` | Text color of the unselected dial marks | `--md-sys-color-on-surface` |
| `--md-comp-time-picker-clock-dial-selected-label-text-color` | Text color of the selected dial mark | `--md-sys-color-on-primary` |
| `--md-comp-time-picker-clock-dial-selector-handle-container-color` | Background color of the selected dial mark | `--md-sys-color-primary` |
| `--md-comp-time-picker-clock-dial-selector-track-container-color` | Color of the selector track line on the dial | `--md-sys-color-primary` |
| `--md-comp-time-picker-clock-dial-selector-track-container-width` | Thickness of the selector track line on the dial | `2px` |
| `--md-comp-time-picker-clock-dial-selector-center-container-color` | Color of the center dot on the dial | `--md-sys-color-primary` |
| `--md-comp-time-picker-clock-dial-selector-center-container-size` | Diameter of the center dot on the dial | `8px` |

**Example: Changing the width of the dial track**

```HTML
<div style="--md-comp-time-picker-clock-dial-selector-track-container-width: 3px;">
  <dialog class="micl-dialog micl-timepicker" closedby="closerequest">
    ...
  </dialog>
</div>

```

## Compatibility

This component relies on modern web platform features. Review *Browser compatibility* before deploying it in production environments.

* **Open/Close Mechanisms:** Relies on the `<dialog>` element's [`beforetoggle`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforetoggle_event) event to load the invoker's time, and on the `close` event to write it back. Buttons open the picker using the [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) (`command` / `commandfor`). In browsers where this is unsupported, you must trigger `showModal()` manually.
* **Input Mode Toggle:** The icon and `aria-pressed` state of the toggle button are driven by a custom invoker command. Without Invoker Commands support, the dial will still toggle, but the button will not visually reflect the active mode.
* **Selector Sweep:** The animated dial selector utilizes a registered [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) custom property of type `<angle>`. In browsers without `@property` support, the selector will snap to the new value instantly rather than sweeping smoothly.
* **Dial Geometry:** The clock face calculates mark positions using the [`cos()` and `sin()](https://developer.mozilla.org/en-US/docs/Web/CSS/sin)` trigonometric CSS functions.
* **Advanced Styling:** Utilizes [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has), [`:dir()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir), and [relative color syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) to handle layout switching, right-to-left rendering, and state layer opacities.
* **Locale Data:** Locale-specific details (hour cycle, AM/PM labels, button text formatting) are sourced from [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat). If the lookup fails, the component safely falls back to a 24-hour clock using English day periods.
