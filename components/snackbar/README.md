# Snackbar
This component implements the [Material Design 3 Expressive Snackbar](https://m3.material.io/components/snackbar/overview) design. Snackbars are short, temporary notifications that appear at the bottom of the screen.

## Basic Usage

### HTML
To create a simple snackbar, use a `<div>` element with the `micl-snackbar` class and the `popover="manual"` attribute. Inside, use a `<span>` element with the `micl-snackbar__supporting-text` class to contain the snackbar's notification. The `role="status"` attribute on the notification makes screen readers announce it when the snackbar appears.

```HTML
<div id="mysnackbar" class="micl-snackbar" popover="manual" data-micldelay="3000">
  <span class="micl-snackbar__supporting-text" role="status" aria-atomic="true">All changes saved</span>
</div>
```

The snackbar is a [popover](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API): show it from a button with the `popovertarget` attribute, or from JavaScript with `showPopover()`.

```HTML
<button type="button" class="micl-button-filled-m" popovertarget="mysnackbar">Save</button>
```

```JavaScript
document.getElementById("mysnackbar").showPopover();
```

The `data-micldelay` attribute specifies the number of milliseconds the snackbar remains visible before it auto-dismisses. The timer pauses if the pointer rests on the snackbar or if a button inside it receives keyboard focus, and resumes once neither condition is met. Omit the attribute to keep the snackbar open until it is dismissed, for example with a close button (see [Variants](#variants)).

### CSS
Import the snackbar styles into your project:

```CSS
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/snackbar";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to enable auto-dismissing the snackbar.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Snackbar component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Snackbar component](https://henkpb.github.io/micl/snackbar.html) is available to interact with.

## Variants
You can add an action to the snackbar by adding a [MICL button](../button/README.md) to the markup:

```HTML
<div class="micl-snackbar" popover="manual" data-micldelay="3000">
  <span class="micl-snackbar__supporting-text" role="status" aria-atomic="true">Your document has been saved</span>
  <button type="button" class="micl-button-text-s">Undo</button>
</div>
```

You can also add a close button that dismisses the snackbar when pressed. A snackbar without `data-micldelay` stays open until the close button is pressed:

```HTML
<div id="mysnackbar" class="micl-snackbar" popover="manual">
  <span class="micl-snackbar__supporting-text" role="status" aria-atomic="true">Your document has been saved</span>
  <button type="button" class="micl-iconbutton-standard-s material-symbols-outlined" popovertarget="mysnackbar" popovertargetaction="hide" aria-label="Close">close</button>
</div>
```

Add the `micl-snackbar--two` class to the snackbar to increase its height so that it can accommodate two lines of text. Wrap each line in its own `<span>` inside the supporting text:

```HTML
<div class="micl-snackbar micl-snackbar--two" popover="manual" data-micldelay="5000">
  <span class="micl-snackbar__supporting-text" role="status" aria-atomic="true">
    <span>Message sent</span>
    <span>An email has been sent to Alice</span>
  </span>
</div>
```

Text that does not fit the snackbar is clipped: keep the notification short, or use the two-line variant.

With `popover="manual"`, the snackbar is dismissed only by its timer, a close button, or `hidePopover()`. Use the plain `popover` attribute instead for a light-dismissed snackbar that also closes when the user clicks elsewhere or presses <kbd>Escape</kbd>.

The Snackbar component respects the element's computed direction, automatically adjusting its layout for right-to-left (RTL) languages — whether the `dir` attribute (including `dir="auto"`) is set on the element itself or inherited from an ancestor.

## Theming
Each snackbar can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-snackbar-margin` | The distance between the snackbar and the bottom edge of the viewport (the safe-area inset is added) | `8px` |
| `--md-comp-snackbar-padding` | The inner padding of the snackbar | `16px` |
| `--md-comp-snackbar-container-min-width` | The minimum width of the snackbar on medium and larger windows | `320px` |
| `--md-comp-snackbar-container-max-width` | The maximum width of the snackbar | `600px` (the medium breakpoint) |
| `--md-comp-snackbar-container-color` | The background color of the snackbar | `--md-sys-color-inverse-surface` |
| `--md-comp-snackbar-container-elevation` | The shadow (elevation) of the snackbar | `--md-sys-elevation-level3` |
| `--md-comp-snackbar-container-shape` | The corner rounding of the snackbar | `--md-sys-shape-corner-extra-small` |
| `--md-comp-snackbar-with-single-line-container-height` | The height of a single-line snackbar | `48px` |
| `--md-comp-snackbar-with-two-lines-container-height` | The height of a two-line snackbar | `68px` |
| `--md-comp-snackbar-supporting-text-color` | The text color of the notification | `--md-sys-color-inverse-on-surface` |
| `--md-comp-snackbar-action-label-text-color` | The label color of the action button | `--md-sys-color-inverse-primary` |
| `--md-comp-snackbar-action-hover-label-text-color` | The label color of the hovered action button | `--md-sys-color-inverse-primary` |
| `--md-comp-snackbar-action-focus-label-text-color` | The label color of the focused action button | `--md-sys-color-inverse-primary` |
| `--md-comp-snackbar-action-pressed-label-text-color` | The label color of the pressed action button | `--md-sys-color-inverse-primary` |
| `--md-comp-snackbar-icon-size` | The size of the close icon | `24px` |
| `--md-comp-snackbar-icon-color` | The color of the close icon | `--md-sys-color-inverse-on-surface` |
| `--md-comp-snackbar-icon-hover-icon-color` | The color of the hovered close icon | `--md-sys-color-inverse-on-surface` |
| `--md-comp-snackbar-icon-focus-icon-color` | The color of the focused close icon | `--md-sys-color-inverse-on-surface` |
| `--md-comp-snackbar-icon-pressed-icon-color` | The color of the pressed close icon | `--md-sys-color-inverse-on-surface` |
| `--md-comp-snackbar-hover-state-layer-color` | The state layer tinting the snackbar while the pointer rests on it (the auto-dismiss timer pauses) | `--md-sys-color-inverse-primary` |
| `--md-comp-snackbar-hover-state-layer-opacity` | The opacity of the hover state layer | `8%` |
| `--md-comp-snackbar-pressed-state-layer-color` | The state layer tinting the snackbar while pressed | `--md-sys-color-inverse-primary` |
| `--md-comp-snackbar-pressed-state-layer-opacity` | The opacity of the pressed state layer | `10%` |

The distance between the snackbar and the side edges of the viewport follows the [layout foundation](../../foundations/layout/README.md)'s `--md-sys-layout-window-margin`. On compact windows, the snackbar spans the full width between the window margins; on larger windows it is centered and sized to its content, within the minimum and maximum container widths above.

**Example: Changing the padding of the snackbar**

```HTML
<div style="--md-comp-snackbar-padding:24px">
  <div class="micl-snackbar" popover="manual" data-micldelay="3000">
    <span class="micl-snackbar__supporting-text" role="status" aria-atomic="true">All changes saved</span>
  </div>
</div>
```

To change the amount of rounding of the snackbar's corners, you could for example add a CSS rule to your stylesheet:

```CSS
.micl-snackbar {
  --md-comp-snackbar-container-shape: 24px;
}
```

## Compatibility
This component uses the Popover API, which might not be supported in all browsers. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#api.htmlelement.popover) for details.

The entry and exit animations rely on [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) and [`transition-behavior: allow-discrete`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior); in browsers without them the snackbar appears and disappears instantly. The styles also use the [relative color syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) and the [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) pseudo-class.
