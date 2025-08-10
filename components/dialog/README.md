# Dialog
This component implements the the [Material Design 3 Expressive Dialog](https://m3.material.io/components/dialogs/overview) design.

## Basic Usage

### HTML
To create a basic dialog, use the `<dialog>` element with the `micl-dialog` class. You can open and close the dialog using JavaScript, or you can use a control element, such as a button, to open and close the dialog.

```HTML
<dialog id="mydialog" class="micl-dialog" closedby="any" popover>
  <div class="micl-dialog__headline">
    <h2>Basic dialog</h2>
    <span class="micl-dialog__supporting-text">An example of a basic dialog</span>
  </div>
</dialog>

<button type="button" popovertarget="mydialog">Open Basic Dialog</button>
```

- The `popover` attribute makes the dialog a non-modal (light dismiss) popover.

- The `closedby="any"` attribute allows the dialog to be closed by clicking or tapping outside of it, or by pressing the <kbd>Esc</kbd> key.

### CSS
Import the dialog styles into your project:

```CSS
@use "material-inspired-component-library/components/dialog";
```

### TypeScript
No custom TypeScript is required for the core functionality of this component, as the native popover attribute handles the open/close behavior.

### Demo
A live example of the [Dialog component](https://henkpb.github.io/micl/dialog.html) is available for you to interact with.

## Variants
When dialogs with the `popover` attribute are opened, they animate from the control element to the center of the screen. They can be easily dismissed by clicking outside or pressing <kbd>Esc</kbd>.

Removing the `popover` attribute creates a more intrusive **modal** dialog. This type of dialog requires the user to interact with its buttons or press the <kbd>Esc</kbd> key to close it.

```HTML
<dialog id="mydialog" class="micl-dialog" closedby="closerequest">
  <div class="micl-dialog__headline">
    <span class="micl-dialog__icon material-symbols-outlined" aria-hidden="true">info</span>
    <h2>Modal dialog</h2>
    <span class="micl-dialog__supporting-text">An example of a modal dialog</span>
  </div>
  <div class="micl-dialog__actions">
    <form method="dialog">
      <button class="micl-button">Cancel</button>
      <button class="micl-button">Save</button>
    </form>
  </div>
</dialog>

<button type="button" popovertarget="mydialog">Open Modal Dialog</button>
```

- The `closedby="closerequest"` attribute restricts closing methods, typically requiring an explicit action within the dialog.

By default, modal dialogs open in the center of the screen. You can anchor a modal dialog to a control element, causing it to open relative to that element:

```HTML
<dialog id="mydialog" class="micl-dialog" closedby="closerequest" style="position-anchor:--myanchor">
</dialog>

<button type="button" popovertarget="mydialog" style="anchor-name:--myanchor">Open Modal Dialog</button>
```

### Dialog Structure Sections

A dialog typically consists of three main sections to organize its content:

- `micl-dialog__headline`: The header of the dialog. It usually contains:

  - A heading element (`<h1>`-`<h6>`).

  - An optional icon (use `micl-dialog__icon`).

  - An optional sub-header (e.g., `<span class="micl-dialog__subhead">`).

  - An optional `micl-dialog__supporting-text` element, describing the dialog's purpose.

- `micl-dialog__content`: The optional main content area of the dialog, where additional information can be placed.

- `micl-dialog__actions`: A container for action buttons that allow the user to perform actions related to the dialog or close it. Actions are typically placed in a `<form method="dialog">` for native HTML dialog closing.

### Full-screen dialog
A full-screen dialog covers the entire viewport, primarily on smaller screens. On screens wider than 560 pixels, a full-screen dialog behaves like a basic dialog. Use the `micl-dialog-fullscreen` class for this variant:

```HTML
<dialog id="mydialog" class="micl-dialog-fullscreen" closedby="none" popover>
  <form method="dialog" class="micl-dialog__headline">
    <button type="button" class="micl-iconbutton-s material-symbols-outlined" popovertarget="mydialog" aria-label="Close">close</button>
    <span class="micl-dialog__icon material-symbols-outlined" aria-hidden="true">person</span>
    <h2>Full-screen dialog</h2>
    <button class="micl-button" value="dosave">Save</button>
  </form>
  <div class="micl-dialog__content">
    <span class="micl-dialog__supporting-text">This dialog covers the whole screen.</span>
  </div>
  <form method="dialog" class="micl-dialog__actions">
    <button type="button" class="micl-button" popovertarget="mydialog">Cancel</button>
    <button class="micl-button" value="dosave">Save</button>
  </form>
</dialog>

<button type="button" popovertarget="mydialog">Open Full-Screen Dialog</button>
```

- In full-screen mode, buttons placed directly within the `micl-dialog__headline` become visible, while the `micl-dialog__icon` and `micl-dialog__actions` at the bottom are hidden.

- When not in full-screen mode (e.g., on wider screens), the `micl-dialog__headline` buttons are hidden, and the standard dialog actions (`micl-dialog__actions`) are visible.

## Customizations
You can customize the appearance of the Dialog component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child dialogs.

| Variable name | Default Value | Description |
| ------------- | ----- | ----------- |
| --md-sys-dialog-padding | 24px | The inner padding between the dialog's edge and its content |

**Example: Changing the dialog padding**

```HTML
<div style="--md-sys-dialog-padding:16px">
  <dialog class="micl-dialog">
  </dialog>
</div>
```

## Compatibility
This component uses **popover anchor positioning** to place the dialog in relation to its invoker. This is a modern CSS feature that may not be fully supported in all browsers. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor#browser_compatibility) for details.
