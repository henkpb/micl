# Dialog
This component implements the [Material Design 3 Expressive Dialog](https://m3.material.io/components/dialogs/overview) design. A dialog is a small, focused window that prompts the user to make a decision or enter additional information.

## Basic Usage

### HTML

To create a dialog, use the `<dialog>` element with the `micl-dialog` class and open it from a control element, such as a button.

```HTML
<dialog id="mydialog" class="micl-dialog" closedby="closerequest" aria-labelledby="mytitle" aria-describedby="mydesc">
  <div class="micl-dialog__headline">
    <h2 id="mytitle">Basic dialog</h2>
    <span id="mydesc" class="micl-dialog__supporting-text">An example of a basic dialog</span>
  </div>
  <form method="dialog" class="micl-dialog__actions">
    <button class="micl-button-text-s" value="" autofocus>Cancel</button>
    <button class="micl-button-text-s" value="ok">OK</button>
  </form>
</dialog>

<button type="button" class="micl-button-filled-m" command="show-modal" commandfor="mydialog">Open Basic Dialog</button>

```

* `command="show-modal"` combined with `commandfor` opens the dialog as a **modal**: the browser moves it to the top layer, traps keyboard focus inside it, and makes the rest of the page inert. This is the Material Design default and the recommended approach for most use cases.
* `closedby="closerequest"` is the default for a modal dialog and allows the <kbd>Esc</kbd> key to close it. Using `closedby="any"` will additionally close the dialog when the user clicks outside of it. Avoid `closedby="none"`, as it removes the <kbd>Esc</kbd> key escape route.
* `aria-labelledby` points to the heading and `aria-describedby` to the supporting text, ensuring assistive technologies announce both when the dialog opens.
* Buttons inside a `<form method="dialog">` close the dialog when activated, and the activating button's `value` is passed to `dialog.returnValue`. Give a canceling button an explicit `value=""`—a button without a `value` attribute leaves `returnValue` unchanged from its previous state. An empty `returnValue` is the conventional way to signal a cancellation.
* `autofocus` designates the control that receives focus when the dialog opens. Place this on the least destructive action.

### CSS

Import the dialog styles into your project:

```CSS
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/dialog";

```

Or import all MICL styles:

```CSS
@use "material-inspired-component-library/styles";

```

### JavaScript

No custom JavaScript is required for the core functionality of this component. The native `command` and `popover` attributes handle the open and close behaviors entirely.

### Live Demo

A live example of the [Dialog component](https://henkpb.github.io/micl/dialog.html) is available for interaction.

## Anatomy

A dialog consists of up to three sections:

* `micl-dialog__headline`: The header of the dialog. It usually contains:
  * A heading element (`<h1>`-`<h6>`).
  * An optional icon (`micl-dialog__icon`). When present, the icon, heading, and supporting text are centered.
  * An optional sub-header (`micl-dialog__subhead`). Text that exceeds one line is truncated with an ellipsis.
  * An optional `micl-dialog__supporting-text` element describing the dialog's purpose.


* `micl-dialog__content`: The optional main content area where additional information is placed. This section scrolls if the content exceeds the dialog's maximum height.
* `micl-dialog__actions`: A container for action buttons. In a modal dialog, these must be placed inside a `<form method="dialog">`.

```HTML
<dialog id="mydialog" class="micl-dialog" closedby="closerequest" aria-labelledby="mytitle" aria-describedby="mydesc">
  <div class="micl-dialog__headline">
    <span class="micl-dialog__icon material-symbols-outlined" aria-hidden="true">info</span>
    <h2 id="mytitle">Headline</h2>
    <span class="micl-dialog__subhead">Sub-header</span>
    <span id="mydesc" class="micl-dialog__supporting-text">Supporting text</span>
  </div>
  <div class="micl-dialog__content">
    …
  </div>
  <form method="dialog" class="micl-dialog__actions">
    <button class="micl-button-text-s" value="" autofocus>Cancel</button>
    <button class="micl-button-text-s" value="ok">OK</button>
  </form>
</dialog>

```

## Variants

### Alert dialog

A dialog that interrupts the user with an urgent message must use `role="alertdialog"` to ensure assistive technologies announce it appropriately. Keep the content concise and provide at least one confirming and one dismissive action.

```HTML
<dialog id="mydialog" class="micl-dialog" closedby="closerequest" role="alertdialog" aria-labelledby="mytitle" aria-describedby="mydesc">
  <div class="micl-dialog__headline">
    <span class="micl-dialog__icon material-symbols-outlined" aria-hidden="true">delete</span>
    <h2 id="mytitle">Delete selected images?</h2>
    <span id="mydesc" class="micl-dialog__supporting-text">Images will be permanently removed from all synchronized devices.</span>
  </div>
  <form method="dialog" class="micl-dialog__actions">
    <button class="micl-button-text-s" value="" autofocus>Cancel</button>
    <button class="micl-button-text-s" value="dodelete">Delete</button>
  </form>
</dialog>

<button type="button" class="micl-button-outlined-m" command="show-modal" commandfor="mydialog">Delete images</button>

```

### Light-dismiss dialog

Adding the `popover` attribute renders the dialog as a popover instead of a modal. It animates outward from the opening control element and closes automatically when the user clicks outside of it or presses <kbd>Esc</kbd>.

```HTML
<dialog id="mydialog" class="micl-dialog" popover aria-labelledby="mytitle" aria-describedby="mydesc">
  <div class="micl-dialog__headline">
    <h2 id="mytitle">Light-dismiss dialog</h2>
    <span id="mydesc" class="micl-dialog__supporting-text">An example of a dialog that closes when you click outside it</span>
  </div>
  <div class="micl-dialog__actions">
    <button type="button" class="micl-button-text-s" popovertarget="mydialog" popovertargetaction="hide" autofocus>OK</button>
  </div>
</dialog>

<button type="button" class="micl-button-outlined-m" popovertarget="mydialog">Open Dialog</button>

```

> [!IMPORTANT]
> A popover is not a modal. The browser does not trap focus inside it nor does it make the rest of the page inert. Review the Accessibility guidelines before choosing this variant.

Because a popover is governed by the Popover API rather than standard dialog behavior, two modal attributes have no effect here:

* `closedby` is ignored. Light dismissal and <kbd>Esc</kbd> key support are handled natively by the `popover` attribute.
* `<form method="dialog">` will not close a popover. You must close it using a button with `popovertarget` and `popovertargetaction="hide"`, as shown above.

### Docked dialog

A docked dialog opens adjacent to the control element rather than centering on the screen. Add the `micl-dialog--docked` class, assign an `anchor-name` to the control element, and link the dialog using `position-anchor`:

```HTML
<dialog id="mydialog" class="micl-dialog micl-dialog--docked" style="position-anchor:--myanchor" popover aria-labelledby="mytitle">
  <div class="micl-dialog__headline">
    <h2 id="mytitle">Docked dialog</h2>
  </div>
  <div class="micl-dialog__actions">
    <button type="button" class="micl-button-text-s" popovertarget="mydialog" popovertargetaction="hide">Close</button>
  </div>
</dialog>

<button type="button" class="micl-button-outlined-m" popovertarget="mydialog" style="anchor-name:--myanchor">Open Docked Dialog</button>

```

* The dialog places itself below the control element and flips above it if there is insufficient vertical space.
* A docked dialog fades in and out in place, rather than scaling out from the control element.

### Full-screen dialog

A full-screen dialog covers the entire viewport on compact windows (599px and narrower). On wider windows, it behaves like a basic dialog. Use the `micl-dialog--fullscreen` modifier class:

```HTML
<dialog id="mydialog" class="micl-dialog micl-dialog--fullscreen" closedby="closerequest" aria-labelledby="mytitle" aria-describedby="mydesc">
  <form method="dialog" class="micl-dialog__headline">
    <button class="micl-dialog__fullscreen micl-iconbutton-standard-s material-symbols-outlined" aria-label="Close">close</button>
    <span class="micl-dialog__icon material-symbols-outlined" aria-hidden="true">person</span>
    <h2 id="mytitle">Full-screen dialog</h2>
    <button class="micl-dialog__fullscreen micl-button-text-s" value="dosave">Save</button>
  </form>
  <div class="micl-dialog__content">
    <span id="mydesc" class="micl-dialog__supporting-text">This dialog covers the whole screen.</span>
  </div>
  <form method="dialog" class="micl-dialog__actions">
    <button class="micl-button-text-s" value="" autofocus>Cancel</button>
    <button class="micl-button-text-s" value="dosave">Save</button>
  </form>
</dialog>

<button type="button" class="micl-button-outlined-m" command="show-modal" commandfor="mydialog">Open Full-Screen Dialog</button>

```

* In full-screen mode, `micl-dialog__fullscreen` buttons placed directly within the `micl-dialog__headline` become visible. The `micl-dialog__icon` and the standard `micl-dialog__actions` at the bottom are hidden.
* On wider screens, the layout reverts: `micl-dialog__fullscreen` buttons are hidden, and the standard bottom actions (`micl-dialog__actions`) are displayed.
* Scrolling within `micl-dialog__content` applies elevation to the header. This effect relies on scroll-driven animations.

## Accessibility

* **Prefer a modal dialog.** A dialog opened via `command="show-modal"` (or `dialog.showModal()`) correctly utilizes the top layer, traps focus, and hides background content from screen readers. A `popover` dialog does none of this. Reserve the light-dismiss variant strictly for short, non-critical context.
* **Always label the dialog.** Point `aria-labelledby` to the primary heading element. If supporting text is present, link it using `aria-describedby`.
* **Use `role="alertdialog"` exclusively** for dialogs that interrupt the user with urgent messages requiring immediate response.
* **Maintain keyboard navigation.** `closedby="closerequest"` is the default for a reason. Using `closedby="none"` removes the <kbd>Esc</kbd> key escape route and should only be used when a user *must not* abandon the process (and even then, an explicit close button must remain).
* **Assign `autofocus`** to the control that should receive focus upon opening, prioritizing the dismissive action over destructive ones. Without it, browsers will focus the dialog container itself.
* **Provide context for icons.** Give icon-only buttons an `aria-label`, and mark decorative glyphs (like `micl-dialog__icon`) with `aria-hidden="true"`.
* **Respect motion preferences.** Motion is disabled if the user has requested reduced motion at the OS level; the dialog will appear and disappear instantly.

## Theming

Dialogs can be themed using CSS custom properties following the Material Design 3 component-token naming convention. Apply them to a parent element to style its child dialogs.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-dialog-min-width` | Minimum width of a dialog | `280px` |
| `--md-comp-dialog-max-width` | Maximum width of a dialog | `560px` |
| `--md-comp-dialog-margin` | Minimum padding between the dialog and the viewport edge | `48px` |
| `--md-comp-dialog-padding` | Inner padding between the dialog edge and its content | `24px` |
| `--md-comp-dialog-headline-space` | Vertical spacing between header elements | `16px` |
| `--md-comp-dialog-container-color` | Dialog background color | `--md-sys-color-surface-container-high` |
| `--md-comp-dialog-container-shape` | Dialog border radius (corner rounding) | `--md-sys-shape-corner-extra-large` |
| `--md-comp-dialog-container-elevation` | Dialog shadow depth (elevation) | `--md-sys-elevation-level3` |
| `--md-comp-dialog-content-color` | Text color for the main content area | `--md-sys-color-on-surface` |
| `--md-comp-dialog-headline-color` | Text color for the headline | `--md-sys-color-on-surface` |
| `--md-comp-dialog-subhead-color` | Text color for the sub-header | `--md-sys-color-on-surface` |
| `--md-comp-dialog-supporting-text-color` | Text color for supporting text | `--md-sys-color-on-surface-variant` |
| `--md-comp-dialog-icon-color` | Color of the header icon | `--md-sys-color-secondary` |
| `--md-comp-dialog-icon-size` | Size of the header icon | `--md-sys-icon-size` |
| `--md-comp-dialog-motion-spatial` | The easing function used when the dialog opens. Uses a spring animation that slightly overshoots the final size before settling | `--md-sys-motion-expressive-fast-spatial` |
| `--md-comp-dialog-motion-duration` | Animation duration for opening | `650ms` |
| `--md-comp-dialog-motion-duration-reverse` | Animation duration for closing | `350ms` |
| `--md-comp-full-screen-dialog-container-color` | Background color of a full-screen dialog | `--md-sys-color-surface` |

**Example: Changing the dialog padding**

```HTML
<div style="--md-comp-dialog-padding: 16px;">
  <dialog class="micl-dialog">
  </dialog>
</div>

```

## Compatibility

This component utilizes modern web platform features. Review [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor#browser_compatibility) before deploying it in production environments.

* **Open/Close Mechanisms:** Relies on [Invoker commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) (`command` / `commandfor`) and the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). To support legacy browsers, you must implement manual `showModal()` JavaScript calls.
* **Positioning:** [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor) dynamically places docked dialogs. In unsupported browsers, light-dismiss dialogs will appear centered rather than scaling out from the control element, and docked dialogs will fall back to the center of the screen.
* **Animations:** Uses [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) and [`transition-behavior: allow-discrete`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior) for open/close transitions. Without these, the dialog appears instantly.
* **Dynamic Sizing:** [`interpolate-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size) allows the dialog to animate smoothly to its calculated width. In browsers that do not yet support this (e.g., Firefox 156), the dialog still fades and travels, but assumes its final dimensions immediately.
* **Advanced Styling:** Utilizes [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has), [`:dir()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir), and [relative color syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) for icon layout, right-to-left placement, and backdrop rendering.
* **Header Elevation:** Uses [Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll) to elevate the header when content scrolls. Where unsupported, the header remains flat—a purely cosmetic fallback.
