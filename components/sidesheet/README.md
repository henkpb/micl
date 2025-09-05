# Side sheet
This component implements the the [Material Design 3 Expressive Side sheet](https://m3.material.io/components/side-sheets/overview) design. Side sheets provide optional content and actions without interrupting the main content.

## Basic Usage

### HTML
To create a standard side sheet, use the `<dialog>` element with the `popover` attribute. The `closedby="any"` attribute allows the user to dismiss the side sheet by clicking anywhere outside of it.

```HTML
<dialog id="mysidesheet" class="micl-sidesheet" closedby="any" popover aria-labelledby="mytitle">
  <div class="micl-sidesheet__headline">
    <h2 id="mytitle">Title</h2>
    <button
      type="button"
      class="micl-iconbutton-s material-symbols-outlined"
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

### JavaScript
No custom JavaScript is required for the core functionality of the side sheet component.

### Demo
A live example of the [Side sheet component](https://henkpb.github.io/micl/sidesheet.html) is available for you to interact with.

## Variants
A **modal** side sheet blocks access to the rest of the page and must be dismissed explicitly by the user. This is suitable for critical tasks or information that requires a user's full attention.

To create a modal side sheet, use the `<dialog>` element without the `popover` attribute. Use `closedby="closerequest"` to prevent the side sheet from being dismissed by clicking outside of it. You'll also need a button or other control with popovertarget to close it.

```HTML
<dialog id="mysidesheet" class="micl-sidesheet" closedby="closerequest" aria-labelledby="mytitle">
  <div class="micl-sidesheet__headline">
    <button
      type="button"
      class="micl-iconbutton-s material-symbols-outlined"
    >arrow_back</button>
    <h2 id="mytitle">Title</h2>
    <button
      type="button"
      class="micl-iconbutton-s material-symbols-outlined"
      popovertarget="mysidesheet"
    >close</button>
  </div>
  <div class="micl-sidesheet__content">
    ...your content...
  </div>
  <div class="micl-sidesheet__actions">
    <button type="button" class="micl-button-filled-s">Save</button>
  </div>
</dialog>
```

To open either a standard or modal side sheet, link a button to the side sheet's ID using the `popovertarget` attribute:
```HTML
<button type="button" popovertarget="mysidesheet">Open Side Sheet</button>
```

The back-button and the actions-container are optional. To remove the vertical divider of the "standard" side sheet, assign zero to the following CSS variable:
```CSS
#mysidesheet {
  --md-sys-divider-thickness: 0;
}
```
To remove the horizontal divider of the actions-container:
```CSS
#mysidesheet .micl-sidesheet__actions {
  --md-sys-divider-thickness: 0;
}
```

### Warning
The **standard** side sheet component adds CSS rules to the `<body>` element to properly resize the main content area when the side sheet is open. Overriding these rules may cause the component to behave unexpectedly. The rules that are applied are:

```CSS
box-sizing: border-box;
margin: 0;
max-inline-size: ...varies depending on if the side sheet is opened...
transition: ...transition on max-inline-size...
```

## Customizations
You can customize the appearance of the Side sheet component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child side sheets.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-sidesheet-width | 256px | The default (and minimum allowed) width of the side sheet |
| --md-sys-sidesheet-maxwidth | 400px | The largest allowed width of tthe side sheet |
| --md-sys-sidesheet-padding-standard | 24px | The amount of space between the vertical edges and the content |

**Example: Changing the width of the sidesheet**

```HTML
<body style="--md-sys-sidesheet-width:320px">
  <dialog id="mysidesheet" class="micl-sidesheet" popover>
    ...
  </dialog>
</body>
```

## Compatibility
This component uses the Popover API, which might not be supported in all browsers. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#api.htmlelement.popover) for details.
