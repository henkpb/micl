# Side sheet
This component implements the [Material Design 3 Expressive Side sheet](https://m3.material.io/components/side-sheets/overview) design. Side sheets provide optional content and actions without interrupting the main content.

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
@use "material-inspired-component-library/dist/sidesheet";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of the side sheet component.

### Live Demo
A live example of the [Side sheet component](https://henkpb.github.io/micl/sidesheet.html) is available to interact with.

## Variants
A **modal** side sheet blocks access to the rest of the page and must be dismissed explicitly by the user. This is suitable for critical tasks or information that requires a user's full attention.

To create a modal side sheet, use the `<dialog>` element without the `popover` attribute. Use `closedby="closerequest"` to prevent the side sheet from being dismissed by clicking outside of it. You'll also need a button or other control with `popovertarget` to close it.

```HTML
<dialog id="mysidesheet" class="micl-sidesheet" closedby="closerequest" aria-labelledby="mytitle">
  <div class="micl-sidesheet__headline">
    <button
      type="button"
      class="micl-iconbutton-standard-s material-symbols-outlined"
    >arrow_back</button>
    <h2 id="mytitle">Title</h2>
    <button
      type="button"
      class="micl-iconbutton-standard-s material-symbols-outlined"
      popovertarget="mysidesheet"
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

To open a standard or modal side sheet, link a button to the side sheet's ID using the `popovertarget` attribute:
```HTML
<button type="button" popovertarget="mysidesheet">Open Side Sheet</button>
```

The back-button and the actions-container are optional. To remove the vertical divider of the standard side sheet, assign zero to the following CSS variable:
```CSS
#mysidesheet {
  --md-sys-divider-thickness: 0;
}
```

> [!WARNING]
> The **standard** side sheet component adds CSS rules to the `<body>` element to properly resize the main content area when the side sheet is open. Overriding these rules may cause the component to behave unexpectedly. The rules that are applied are:
> ```CSS
> box-sizing: border-box;
> margin: 0;
> max-inline-size: ...varies depending on if the side sheet is opened...
> transition: ...transition on max-inline-size...
> ```

## Theming
Each side sheet style can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-sidesheet-container-width` | The default (and minimum allowed) width of the side sheet | 256px |
| `--md-comp-sidesheet-container-max-width` | The largest allowed width of the side sheet | 400px |
| `--md-comp-sidesheet-padding` | The amount of space between the vertical edges and the content | `--md-sys-layout-window-margin` (24px) |
| `--md-comp-sidesheet-container-shape` | The corner rounding of the standard side sheet | `--md-sys-shape-corner-none` (0px) |
| `--md-comp-sidesheet-standard-container-color` | The background color of the standard side sheet | `--md-sys-color-surface` |
| `--md-comp-sidesheet-standard-container-elevation` | The shadow (elevation) of the standard side sheet | `--md-sys-elevation-level0` (none) |
| `--md-comp-sidesheet-modal-container-color` | The background color of the modal side sheet | `--md-sys-color-surface-container-low` |
| `--md-comp-sidesheet-modal-container-elevation` | The shadow (elevation) of the modal side sheet | `--md-sys-elevation-level1` |
| `--md-comp-sidesheet-modal-container-shape` | The corner rounding of the modal side sheet, applied to the two corners facing the content | `--md-sys-shape-corner-large` (16px) |


**Example: Changing the width of the sidesheet**

```HTML
<body style="--md-comp-sidesheet-container-width:320px">
  <dialog id="mysidesheet" class="micl-sidesheet" popover>
    ...
  </dialog>
</body>
```

## Compatibility
This component uses the Popover API, which might not be supported in all browsers. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#api.htmlelement.popover) for details.
