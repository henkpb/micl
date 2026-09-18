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

### Co-Existing Bottom Sheet
Setting the `popover` attribute to `manual` lets a bottom sheet co-exist and be interactive with the rest of the page. It is not dismissed by a click outside of it, so it always needs a button of its own to close it.

```HTML
<dialog id="mybottomsheet" class="micl-bottomsheet" popover="manual">
  <div class="micl-bottomsheet__content">
    ...your content...
  </div>
</dialog>
```

To open or close a bottom sheet that is a popover, add the markup of a button that is linked to the bottom sheet using the `popovertarget` attribute:

```HTML
<button type="button" popovertarget="mybottomsheet">Open Bottom Sheet</button>
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

A modal bottom sheet is not a popover, so `popovertarget` does not reach it. Use the `command` and `commandfor` attributes instead:

```HTML
<button type="button" command="show-modal" commandfor="mybottomsheet">Open Bottom Sheet</button>
<button type="button" command="close" commandfor="mybottomsheet">Close</button>
```

### Resizable Bottom Sheet
To create a **resizable** bottom sheet, add a `micl-bottomsheet__headline` drag area above the content. The drag-handle inside it is optional, but it is the only way to resize the bottom sheet with a keyboard, and the only visible sign that the bottom sheet can be resized at all.

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

Every time it opens, the bottom sheet starts at the height of its content, capped at 50% of the screen's height. Once it is being resized, it can grow to the full height of the screen minus `--md-comp-bottomsheet-margin-top`. You can define specific preset heights by using the `data-miclsnapheights` attribute.

```HTML
<dialog data-miclsnapheights="0,200,420" ...>
```

The value `0` is equivalent to closing the bottom sheet, and preset heights that exceed the resizing ceiling are ignored. When a user activates the drag-handle, the bottom sheet cycles through these preset heights and its initial height, from the smallest upwards. The bottom sheet will also snap to these preset heights as a user drags the drag area, and settles on the nearest preset when released. Dragging the bottom sheet down to less than 48px closes it.

## Theming
Each bottom sheet style can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. The properties are declared on the component itself and can be changed on any appropriate parent element to affect its child bottom sheets.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-bottomsheet-height` | The height of the opened bottom sheet (managed by the library for resizable bottom sheets) | `max-content` |
| `--md-comp-bottomsheet-margin` | The space between the bottom sheet and the sides of the screen, on screens of the medium breakpoint and wider | `56px` |
| `--md-comp-bottomsheet-margin-top` | The minimum space between the bottom sheet and the top of the screen | `72px` |
| `--md-comp-bottomsheet-padding` | The amount of space between the edges and the content | `24px` |
| `--md-comp-bottomsheet-container-color` | The background color of the bottom sheet | `--md-sys-color-surface-container-low` |
| `--md-comp-bottomsheet-container-shape` | The corner rounding of the bottom sheet | `--md-sys-shape-corner-extra-large-top` |
| `--md-comp-bottomsheet-container-elevation` | The shadow (elevation) of the bottom sheet | `--md-sys-elevation-level1` |
| `--md-comp-bottomsheet-drag-handle-width` | The width of the drag handle | `32px` |
| `--md-comp-bottomsheet-drag-handle-height` | The height of the drag handle | `4px` |
| `--md-comp-bottomsheet-drag-handle-color` | The color of the drag handle | `--md-sys-color-on-surface-variant` |
| `--md-comp-bottomsheet-focus-indicator-color` | The color of the drag handle's keyboard-focus outline | `--md-sys-color-secondary` |
| `--md-comp-bottomsheet-motion-spatial` | The easing function used when the bottom sheet changes height. Uses a spring animation that slightly overshoots the final height before settling | `--md-sys-motion-expressive-slow-spatial` |
| `--md-comp-bottomsheet-motion-duration` | Animation duration for opening and for resizing | `650ms` |
| `--md-comp-bottomsheet-motion-duration-reverse` | Animation duration for closing | `500ms` |

**Example: Changing the background color of the bottom sheet**

```HTML
<dialog class="micl-bottomsheet" popover style="--md-comp-bottomsheet-container-color:var(--md-sys-color-surface-container)">
  ...
</dialog>
```

## Accessibility
* **Always label the bottom sheet.** Point `aria-labelledby` to the heading inside it, or give the bottom sheet an `aria-label` when it has no visible heading.
* **Label the drag-handle.** It is a button without a text label, so it needs an `aria-label` of its own.
* **Keep a keyboard path.** A drag area without a drag-handle can only be resized by pointer. Include the drag-handle, or offer another way to reach every height.
* **Provide a way out.** A modal bottom sheet and a `popover="manual"` bottom sheet are not dismissed by a click outside of them, so they need a close button.
* **Respect motion preferences.** Motion is disabled if the user has requested reduced motion at the OS level; the bottom sheet will appear, resize and disappear instantly.

## Compatibility
This component uses the Popover API and the `interpolate-size` CSS property, which animates the height of the bottom sheet between zero and the height of its content. These might not be supported in your browser. Please check [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#api.htmlelement.popover) and [interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size#browser_compatibility) for details.
