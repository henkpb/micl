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

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
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

The value `0` is equivalent to closing the bottom sheet. When a user clicks the drag-handle, the bottom sheet toggles between these preset heights and its initial height. The bottom sheet will also snap to these preset heights as a user drags the heading, and settles on the nearest preset when released. Dragging the bottom sheet down to less than 48px closes it.

## Theming
Each bottom sheet style can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. The properties are declared on the component itself and can be changed on any appropriate parent element to affect its child bottom sheets.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-bottomsheet-height` | The height of the opened bottom sheet (managed by the library for resizable bottom sheets) | `max-content` |
| `--md-comp-bottomsheet-margin` | The space between the bottom sheet and the sides of the screen, on screens wider than 640px | `56px` |
| `--md-comp-bottomsheet-margin-top` | The minimum space between the bottom sheet and the top of the screen | `72px` |
| `--md-comp-bottomsheet-padding` | The amount of space between the edges and the content | `24px` |
| `--md-comp-bottomsheet-container-color` | The background color of the bottom sheet | `--md-sys-color-surface-container-low` |
| `--md-comp-bottomsheet-container-shape` | The corner rounding of the bottom sheet | `--md-sys-shape-corner-extra-large-top` |
| `--md-comp-bottomsheet-container-elevation` | The shadow (elevation) of the bottom sheet | `--md-sys-elevation-level1` |
| `--md-comp-bottomsheet-drag-handle-width` | The width of the drag handle | `32px` |
| `--md-comp-bottomsheet-drag-handle-height` | The height of the drag handle | `4px` |
| `--md-comp-bottomsheet-drag-handle-color` | The color of the drag handle | `--md-sys-color-on-surface-variant` |
| `--md-comp-bottomsheet-focus-indicator-color` | The color of the drag handle's keyboard-focus outline | `--md-sys-color-secondary` |

**Example: Changing the background color of the bottom sheet**

```HTML
<dialog class="micl-bottomsheet" popover style="--md-comp-bottomsheet-container-color:var(--md-sys-color-surface-container)">
  ...
</dialog>
```

## Compatibility
This component uses the Popover API, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#api.htmlelement.popover) for details.
