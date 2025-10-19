# Bottom sheet
This component implements the [Material Design 3 Expressive Bottom sheet](https://m3.material.io/components/bottom-sheets/overview) design. Bottom sheets show secondary content anchored to the bottom of the screen.

## Basic Usage

### HTML
To create a standard bottom sheet, use the `<dialog>` element with the `popover` attribute.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" popover>
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
This component requires JavaScript to support **resizable** bottom sheets. The library will automatically initialize new components as they're added to the DOM.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

### Live Demo
A live example of the [Bottom sheet component](https://henkpb.github.io/micl/bottomsheet.html) is available to interact with.

## Variants
Setting the `popover` attribute to `manual` lets a bottom sheet co-exist and be interactive with the rest of the page.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" popover="manual">
  <div class="micl-bottomsheet__content">
    ...your content...
  </div>
</dialog>
```

### Modal Bottom Sheet
A **modal** bottom sheet blocks access to the rest of the page and must be dismissed explicitly by the user. This is suitable for critical tasks or information that requires a user's full attention.

To create a modal bottom sheet, use the `<dialog>` element without the `popover` attribute. Add the `closedby="any"` to allow the bottom sheet to be dismissed by a user clicking outside of it.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" closedby="any">
  <div class="micl-bottomsheet__content">
    ...your content...
  </div>
</dialog>
```

To open or close a bottom sheet, add the markup of a button that is linked to the bottom sheet using the `popovertarget` attribute:

```HTML
<button type="button" popovertarget="mybottomsheet">Open Bottom Sheet</button>
```

### Resizable Bottom Sheet
To create a **resizable** bottom sheet, include a heading and an optional drag-handle.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" popover>
  <div class="micl-bottomsheet__headline">
    <button type="button" class="micl-bottomsheet__draghandle" aria-label="Drag handle"></button>
  </div>
  <div class="micl-bottomsheet__content">
    ...your content...
  </div>
</dialog>
```

The initial height is determined by its content and capped at 50% of the screen's height. You can define specific preset heights by using the `data-miclsnapheights` attribute.

```HTML
<dialog data-miclsnapheights="0,200,420" ...>
```

The value `0` is equivalent to closing the bottom sheet. When a user clicks the drag-handle, the bottom sheet toggles between these preset heights and its initial height. The bottom sheet will also snap to these preset heights as a user drags the heading.

## Compatibility
This component uses the Popover API, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#api.htmlelement.popover) for details.
