# Divider
This component implements the [Material Design 3 Expressive Divider](https://m3.material.io/components/divider/overview) specification. Dividers are thin lines that separate content into distinct sections.

## Basic Usage

### HTML
To add a basic divider, use the `<hr>` element with the `micl-divider` class:

```HTML
<hr class="micl-divider">
```

### CSS
Import the divider styles into your project:

```CSS
@use "material-inspired-component-library/dist/divider";
```

Or import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Divider component](https://henkpb.github.io/micl/divider.html) is available to interact with.

## Variants
The Divider component offers five CSS classes for different divider styles:

| CSS class | Description |
| --- | --- |
| `micl-divider` | A standard, full-width divider |
| `micl-divider-inset` | Indented on both the start and the end side |
| `micl-divider-inset-start` | Indented on the start side only (left in LTR, right in RTL) |
| `micl-divider-inset-end` | Indented on the end side only (right in LTR, left in RTL) |
| `micl-divider-vertical` | A vertical divider |

## Horizontal Dividers
A horizontal divider is a block-level element that fills the inline size (width) of its container:

```HTML
<p>Above</p>
<hr class="micl-divider">
<p>Below</p>
```

When placing a divider inside a list or a menu, use a list item with `role="separator"` instead of an `<hr>` to ensure your HTML remains valid:

```HTML
<ul class="micl-list">
  <li class="micl-list-item-one">
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Item</span>
    </span>
  </li>
  <li role="separator" class="micl-divider-inset"></li>
  <li class="micl-list-item-one">
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Item</span>
    </span>
  </li>
</ul>
```

**Note on Flexbox:** A horizontal divider placed directly inside a **flex row** will collapse to a zero inline size because flex items are sized by their content. To fix this, place the divider in a block or flex-column container, or explicitly give it `inline-size: 100%`.

## Vertical Dividers
The `micl-divider-vertical` class draws the line along the inline-start edge and stretches the divider to the height of its siblings. Because it relies on stretching, it requires a **flex or grid** parent:

```HTML
<div style="display: flex;">
  <p>Start</p>
  <hr class="micl-divider-vertical" aria-orientation="vertical">
  <p>End</p>
</div>
```

**Note on Layout:** In a standard block container, a vertical divider has no defined height to stretch to and will remain invisible.

The inset classes do not apply to vertical dividers. Instead, use `--md-comp-divider-space` to control the gap on either side of the line.

## Spacing
The `--md-comp-divider-space` token defines the distance from the adjacent content to the **center** of the line, ensuring the line stays optically centered in the gap regardless of its thickness.

For a horizontal divider, the applied margin is calculated as `space - (thickness / 2)`. Therefore, setting the space token to exactly half the thickness (`0.5px` at the default `1px` thickness) makes the divider sit flush against its neighbors. This flush styling is how the List, Menu, and Select components embed their dividers.

**Important Spacing Rules:**

* **Units are required:** The value must carry a unit (e.g., `0px`). A bare `0` makes the underlying CSS `calc()` invalid, causing the spacing to fall back to zero.
* **Margin collapsing:** Spacing is applied as a margin. In a standard block container, this margin will collapse with the margins of adjacent elements. If a neighbor already has a larger margin, that larger margin wins and `--md-comp-divider-space` will have no visible effect. (Note: Flex and Grid containers do not collapse margins).

## Accessibility
By default, the `<hr>` element and `role="separator"` expose the divider as a non-focusable separator to assistive technologies.

* **Decorative dividers:** If a divider is purely visual and repeats grouping information that the HTML structure already conveys, hide it from assistive technology by adding `role="presentation"`.
* **Vertical dividers:** Always add `aria-orientation="vertical"` to vertical dividers, as the implicit orientation of the `separator` role is horizontal.

## Theming
Each divider can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-divider-color` | The color of the divider | `--md-sys-color-outline-variant` |
| `--md-comp-divider-thickness` | Controls the thickness (height for horizontal, width for vertical) | `1px` |
| `--md-comp-divider-inset-margin` | Defines the indentation distance for inset dividers | `16px` |
| `--md-comp-divider-space` | Distance from adjacent content to the center of the line (Horizontal dividers apply this to block margins; vertical dividers apply twice the value to inline margins) | `4px` |

Because these tokens are resolved on the divider itself, they can be set on the element directly or inherited from any ancestor (such as a scoped theme class).

**Example: Changing the inset margin**

```HTML
<div style="--md-comp-divider-inset-margin: 32px;">
  <hr class="micl-divider-inset">
</div>
```

**Example: A thicker, tinted divider with custom spacing**

```HTML
<hr class="micl-divider" style="--md-comp-divider-thickness: 4px; --md-comp-divider-color: var(--md-sys-color-primary); --md-comp-divider-space: 12px;">
```
