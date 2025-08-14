# Bottom sheet
This component implements the the [Material Design 3 Expressive Bottom sheet](https://m3.material.io/components/bottom-sheets/overview) design.

## Basic Usage

### HTML
To create a standard bottom sheet, use the `<dialog>` element with the `popover` attribute. The `closedby="any"` attribute allows the user to dismiss the bottom sheet by clicking anywhere outside of it.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" closedby="any" popover>
  <div class="micl-bottomsheet__content">
    ...your content...
  </div>
</dialog>
```

### CSS
Import the bottom sheet styles into your project:

```CSS
@use "material-inspired-component-library/dist/bottomsheet";
```

### JavaScript
This component requires JavaScript to support **modal** and **resizable** bottom sheets:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Bottom sheet component, including those that will be added to the DOM later on.

### Demo
A live example of the [Bottom sheet component](https://henkpb.github.io/micl/bottomsheet.html) is available for you to interact with.

## Variants
A **modal** bottom sheet blocks access to the rest of the page and must be dismissed explicitly by the user. This is suitable for critical tasks or information that requires a user's full attention.

To create a modal bottom sheet, use the `<dialog>` element without the `popover` attribute. Use `closedby="closerequest"` to prevent the bottom sheet from being dismissed by clicking outside of it. You'll also need a button or other control with popovertarget to close it.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" closedby="closerequest">
  <div class="micl-bottomsheet__content">
    ...your content...
  </div>
</dialog>
```

Include the bottom sheet heading (and optionally a drag-handle) to create a **resizable** bottom sheet.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" closedby="any" popover>
  <div class="micl-bottomsheet__headline">
    <button type="button" class="micl-bottomsheet__draghandle" aria-label="Drag handle"></button>
  </div>
  <div class="micl-bottomsheet__content">
    ...your content...
  </div>
</dialog>
```

The height of a bottom sheet is determined by its contents, initially capped at 50% of the screen height. You can set multiple preset heights for the bottom sheet by adding the `data-snapheights` attribute:

```HTML
<dialog data-snapheights="200,420" ...>
```

To open or close a bottom sheet, add the markup of a button that is linked to the bottom sheet using the `popovertarget` attribute:

```HTML
<button type="button" popovertarget="mybottomsheet">Open Bottom Sheet</button>
```

## Compatibility
This component uses the Popover API, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#api.htmlelement.popover) for details.
