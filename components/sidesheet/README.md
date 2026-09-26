# Side sheet

This component implements the [Material Design 3 Expressive Side sheet](https://m3.material.io/components/side-sheets/overview) specification. Side sheets display optional content and actions without interrupting the user's workflow in the main content area.

## Basic Usage

### HTML
To create a standard side sheet, use the `<dialog>` element with the `popover` attribute.

```HTML
<dialog id="mysidesheet" class="micl-sidesheet" popover aria-labelledby="mytitle">
  <div class="micl-sidesheet__headline">
    <h2 id="mytitle">Title</h2>
    <button
      type="button"
      class="micl-iconbutton-standard-s material-symbols-outlined"
      popovertarget="mysidesheet"
      aria-label="Close"
    >close</button>
  </div>
  <div class="micl-sidesheet__content">
    ...your content...
  </div>
</dialog>
```

### CSS
Import the side sheet styles into your project:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/divider";
@use "material-inspired-component-library/dist/sidesheet";
```

Alternatively, import all MICL styles at once:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of the side sheet component.

### Live Demo
A live interactive demo of the [Side sheet component](https://henkpb.github.io/micl/sidesheet.html) is available.

## Anatomy
A **standard** side sheet allows the rest of the page to remain usable by dynamically narrowing the main content area to make room for itself. Its headline and actions container are both optional; a side sheet may consist of nothing but content.

| Element | Meaning |
| --- | --- |
| `dialog.micl-sidesheet` | The container. Add the `popover` attribute for a standard side sheet; omit it for a modal one. |
| `.micl-sidesheet__headline` | The header row: holds an optional back button, a heading, and an optional close button. |
| `.micl-sidesheet__content` | The scrollable body of the side sheet. |
| `.micl-sidesheet__actions` | An optional row of buttons pinned to the bottom, usually preceded by an `<hr class="micl-divider">`. |

A side sheet is **docked**, meaning it spans the full height of the viewport and sits flush against the trailing edge.

> [!WARNING]
> The **standard** side sheet component dynamically applies CSS rules to the `<body>` element to properly resize the main content area when the sheet is open. Overriding these rules may cause unexpected layout behavior. The applied rules are:
> ```CSS
> box-sizing: border-box;
> margin: 0;
> max-inline-size: /* varies dynamically based on side sheet state */
> transition: /* handles max-inline-size animation */
> ```
> 
> These rules only take effect on medium window size classes (600px) and wider. On compact screens lacking horizontal space, the main content area is left untouched and the side sheet simply overlays it.

## Variants
Using a plain `popover` attribute makes the side sheet an *auto* popover: it closes automatically when the user presses <kbd>Esc</kbd> or clicks anywhere outside of it. This behavior is ideal for temporary panels like settings menus.

### Co-Existing Side Sheet
For a side sheet that should remain open while the user interacts with the main content, use `popover="manual"` instead. A manual popover is only dismissed by its own close button:

```HTML
<dialog id="mysidesheet" class="micl-sidesheet" popover="manual" aria-labelledby="mytitle">
  ...
</dialog>
```

To open a **standard** side sheet, link a trigger button to the sheet's ID using `popovertarget`:
```HTML
<button type="button" popovertarget="mysidesheet">Open Side Sheet</button>
```

### Modal Side Sheet
A **modal** side sheet blocks access to the rest of the page and requires the user to explicitly dismiss it. This variant is suitable for critical tasks or information requiring full attention.

To create a modal side sheet, use the `<dialog>` element *without* the `popover` attribute. Because it isn't a popover, `popovertarget` has no effect. Instead, you must provide a button (or another control) using `command="close"` to dismiss it. A modal side sheet is inherently not dismissed by outside clicks; explicitly setting `closedby="closerequest"` enforces this behavior while keeping the <kbd>Esc</kbd> key functional. (If you *do* want outside clicks to close it, use `closedby="any"` instead).
```HTML
<dialog id="mysidesheet" class="micl-sidesheet" closedby="closerequest" aria-labelledby="mytitle">
  <div class="micl-sidesheet__headline">
    <button
      type="button"
      class="micl-iconbutton-standard-s material-symbols-outlined"
      aria-label="Back"
    >arrow_back</button>
    <h2 id="mytitle">Title</h2>
    <button
      type="button"
      class="micl-iconbutton-standard-s material-symbols-outlined"
      command="close"
      commandfor="mysidesheet"
      aria-label="Close"
    >close</button>
  </div>
  <div class="micl-sidesheet__content">
    ...your content...
  </div>
  <hr class="micl-divider">
  <div class="micl-sidesheet__actions">
    <button type="button" class="micl-button-filled-s">Save</button>
  </div>
</dialog>
```

To open a **modal** side sheet, use the `show-modal` command instead:
```HTML
<button type="button" command="show-modal" commandfor="mysidesheet">Open Side Sheet</button>
```

## Accessibility
* **Name the side sheet:** A `<dialog>` is exposed to assistive technologies as a dialog. Always provide an accessible name by pointing `aria-labelledby` to the headline's heading `id`.
* **Name the icon buttons:** Always provide a descriptive `aria-label` for icon buttons, like the back and close buttons.
* **Manage initial focus:** A standard side sheet relies on the Popover API, which automatically moves focus into the side sheet when the user tabs away from the trigger button, and returns focus upon closing. A modal side sheet natively focuses its first focusable descendant. This is rarely the desired behavior if the first element is a "Back" button. Add the `autofocus` attribute to the control that should legitimately receive focus first. *(Note: placing `autofocus` directly on the `<dialog>` element is ignored).*
* **Scrolling by keyboard:** When the content container overflows, modern browsers make it a distinct tab stop (often with a visible focus ring) so it can be scrolled via arrow keys. This is a deliberate accessibility feature; do not suppress the focus ring.
* **Dismissal constraints:** A side sheet opened with `popover` or `showModal()` is dismissed via the <kbd>Esc</kbd> key. A `popover="manual"` side sheet is not, meaning a visible close button is strictly required.
* **Respect motion preferences:** All motion is automatically disabled if the user has requested reduced motion at the OS level. The side sheet (and the main content resizing) will toggle instantly.

## Theming
Each side sheet can be themed using CSS custom properties formatted to match the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-sidesheet-container-width` | The width of the side sheet | `256px` |
| `--md-comp-sidesheet-container-max-width` | The maximum allowed width of the side sheet; any larger `--md-comp-sidesheet-container-width` is clamped to this | `400px` |
| `--md-comp-sidesheet-padding` | The padding between the vertical edges and the content | `--md-sys-layout-window-margin` |
| `--md-comp-sidesheet-headline-height` | The minimum height of the headline row; increase this if using icon buttons larger than `micl-iconbutton-standard-s` | `40px` |
| `--md-comp-sidesheet-container-shape` | The corner rounding of the standard side sheet | `--md-sys-shape-corner-none` |
| `--md-comp-sidesheet-content-color` | The text color inside the side sheet | `--md-sys-color-on-surface` |
| `--md-comp-sidesheet-standard-container-color` | The background color of the standard side sheet | `--md-sys-color-surface` |
| `--md-comp-sidesheet-divider-thickness` | The thickness of the standard side sheet's vertical divider | `1px` |
| `--md-comp-sidesheet-divider-color` | The color of the standard side sheet's vertical divider | `--md-sys-color-outline-variant` |
| `--md-comp-sidesheet-standard-container-elevation` | The shadow depth (elevation) of the standard side sheet | `--md-sys-elevation-level0` |
| `--md-comp-sidesheet-modal-container-color` | The background color of the modal side sheet | `--md-sys-color-surface-container-low` |
| `--md-comp-sidesheet-modal-container-elevation` | The shadow depth (elevation) of the modal side sheet | `--md-sys-elevation-level1` |
| `--md-comp-sidesheet-modal-container-shape` | The corner rounding of the modal side sheet (applied to the two corners facing the main content) | `--md-sys-shape-corner-large` |
| `--md-comp-sidesheet-motion-spatial` | The easing function for sliding the side sheet (uses a spring animation that slightly overshoots before settling) | `--md-sys-motion-expressive-slow-spatial` |
| `--md-comp-sidesheet-motion-duration` | Animation duration for opening | `--md-sys-motion-expressive-slow-spatial-duration` |
| `--md-comp-sidesheet-motion-duration-reverse` | Animation duration for closing | `--md-sys-motion-expressive-default-spatial-duration` |

**Example: Changing the width of the side sheet**

```HTML
<body style="--md-comp-sidesheet-container-width: 320px;">
  <dialog id="mysidesheet" class="micl-sidesheet" popover>
    ...
  </dialog>
</body>
```

To remove the vertical divider of a standard side sheet, set the following CSS variable to zero:
```CSS
#mysidesheet {
  --md-comp-sidesheet-divider-thickness: 0;
}
```

> [!NOTE]
> For a **standard** side sheet, define the `--md-comp-sidesheet-container-width` custom property on the `<body>` (or `:root`) element rather than on the side sheet itself. The CSS rule responsible for shrinking the main content area reads this variable from the body. Setting it only on the `<dialog>` would cause the side sheet and the main content area to fall out of sync.

## Compatibility

The standard side sheet relies on the Popover API. Please review [browser compatibility for the Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) if you are targeting older browsers.

The modal side sheet is opened and closed using the `command` and `commandfor` attributes. Review [browser compatibility for the Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API). If these attributes are not supported in your target environments, calling `showModal()` and `close()` via JavaScript serves as an effective fallback.
