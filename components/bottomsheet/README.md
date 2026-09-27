# Bottom sheet

This component implements the [Material Design 3 Expressive Bottom sheet](https://m3.material.io/components/bottom-sheets/overview) specification. Bottom sheets display secondary content anchored to the bottom of the screen.

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
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/bottomsheet";
```

Alternatively, import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to support **resizable** bottom sheets. The library automatically initializes new components as they are added to the DOM.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

### Live Demo
A live example of the [Bottom sheet component](https://henkpb.github.io/micl/bottomsheet.html) is available to interact with.

## Variants

### Co-Existing Bottom Sheet
Setting the `popover` attribute to `manual` allows a bottom sheet to remain open while the user interacts with the rest of the page. Because clicking outside the sheet will not dismiss it, you must provide a dedicated close button.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" popover="manual">
  <div class="micl-bottomsheet__content">
    ...your content...
  </div>
</dialog>
```

To open or close a manual popover bottom sheet, link a button to it using the `popovertarget` attribute:

```HTML
<button type="button" popovertarget="mybottomsheet">Open Bottom Sheet</button>
```

### Modal Bottom Sheet
A **modal** bottom sheet blocks access to the rest of the page and must be explicitly dismissed by the user. This is suitable for critical tasks or information requiring the user's full attention.

To create a modal bottom sheet, use the `<dialog>` element *without* the `popover` attribute. Add the `closedby="any"` attribute to allow the bottom sheet to be dismissed when the user clicks the backdrop.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" closedby="any">
  <div class="micl-bottomsheet__content">
    ...your content...
  </div>
</dialog>
```

Because a modal bottom sheet is not a popover, `popovertarget` will not work. Use the `command` and `commandfor` attributes instead:

```HTML
<button type="button" command="show-modal" commandfor="mybottomsheet">Open Bottom Sheet</button>
<button type="button" command="close" commandfor="mybottomsheet">Close</button>
```

### Resizable Bottom Sheet
To create a **resizable** bottom sheet, add a `micl-bottomsheet__headline` drag area above the content. While the visual drag-handle inside this area is optional, it is required for keyboard resizing and provides the only visual cue that the sheet is resizable.

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

Upon opening, the bottom sheet defaults to the height of its content, capped at 50% of the screen's height. When resized, it can expand to the full height of the screen minus the `--md-comp-bottomsheet-margin-top` value. You can define specific preset snap points using the `data-miclsnapheights` attribute.

```HTML
<dialog data-miclsnapheights="0,200,420" ...>
```

**Behavior of Snap Heights:**
* The value `0` equates to closing the bottom sheet.
* Preset heights exceeding the maximum allowed height are ignored.
* Activating the drag-handle via keyboard cycles through the initial height and all valid preset heights in ascending order.
* When dragging via pointer, the sheet snaps to the nearest preset upon release.
* Dragging the sheet below 48px automatically closes it.



## Theming

Each bottom sheet style can be themed using CSS custom properties aligned with the Material Design 3 component-token naming convention. Declare these properties on the component itself, or on an appropriate parent element to affect all child bottom sheets.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-bottomsheet-height` | The height of the opened bottom sheet (managed dynamically for resizable sheets) | `max-content` |
| `--md-comp-bottomsheet-margin` | The space between the sheet and screen edges (medium breakpoint and wider) | `56px` |
| `--md-comp-bottomsheet-margin-top` | The minimum space between the sheet and the top of the screen | `72px` |
| `--md-comp-bottomsheet-padding` | The padding between the sheet edges and its content | `24px` |
| `--md-comp-bottomsheet-container-color` | The background color | `--md-sys-color-surface-container-low` |
| `--md-comp-bottomsheet-container-shape` | The corner rounding | `--md-sys-shape-corner-extra-large-top` |
| `--md-comp-bottomsheet-container-elevation` | The shadow depth (elevation) | `--md-sys-elevation-level1` |
| `--md-comp-bottomsheet-drag-handle-width` | The width of the drag handle | `32px` |
| `--md-comp-bottomsheet-drag-handle-height` | The height of the drag handle | `4px` |
| `--md-comp-bottomsheet-drag-handle-color` | The color of the drag handle | `--md-sys-color-on-surface-variant` |
| `--md-comp-bottomsheet-focus-indicator-color` | The color of the drag handle's keyboard-focus outline | `--md-sys-color-secondary` |
| `--md-comp-bottomsheet-motion-spatial` | The easing function for height changes (uses a spring animation that slightly overshoots before settling) | `--md-sys-motion-expressive-slow-spatial` |
| `--md-comp-bottomsheet-motion-duration` | Animation duration for opening and resizing | `--md-sys-motion-expressive-slow-spatial-duration` |
| `--md-comp-bottomsheet-motion-duration-reverse` | Animation duration for closing | `--md-sys-motion-expressive-default-spatial-duration` |

**Example: Changing the background color of the bottom sheet**

```HTML
<dialog class="micl-bottomsheet" popover style="--md-comp-bottomsheet-container-color: var(--md-sys-color-surface-container);">
  ...
</dialog>
```

## Accessibility

* **Always label the bottom sheet:** Point `aria-labelledby` to the heading inside it, or provide an `aria-label` directly on the `<dialog>` if there is no visible heading.
* **Label the drag-handle:** Because it is an icon-only button, it requires a descriptive `aria-label` (e.g., "Resize bottom sheet").
* **Ensure keyboard accessibility:** A drag area without a handle can only be resized via pointer. Always include the drag-handle or provide alternative UI controls to adjust the sheet's height.
* **Provide a clear exit:** Modal and `popover="manual"` bottom sheets are not dismissed by clicking outside of them; you must include a dedicated close button within the sheet.
* **Respect motion preferences:** All motion animations are automatically disabled if the user has requested reduced motion at the OS level (the sheet will appear, resize, and close instantly).

## Compatibility

This component relies on the Popover API and the `interpolate-size` CSS property (which animates the height between zero and `max-content`). Review browser compatibility grids for the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) and [interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size) if you are targeting older browsers.
