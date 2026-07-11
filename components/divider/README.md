# Divider
This component implements the [Material Design 3 Expressive Divider](https://m3.material.io/components/divider/overview) design. Dividers are thin lines that separate content into distinct sections.

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

Or import all MICL styles:
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
| --------- | ----------- |
| micl-divider | A standard, full-width divider |
| micl-divider-inset | Indented equally on both the left and right sides |
| micl-divider-inset-start | Indented only on the left (start) side |
| micl-divider-inset-end | Indented only on the right (end) side |
| micl-divider-vertical | A vertical divider |

## Theming
Each divider can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-divider-color | The color of the divider | `--md-sys-color-outline-variant` |
| --md-comp-divider-thickness | Controls the thickness (height for horizontal, width for vertical) of the divider | 1px |
| --md-comp-divider-inset-margin | Defines the indentation distance for inset dividers | 16px |
| --md-comp-divider-space | Sets the spacing between the divider and adjacent text or elements | 4px |

**Example: Changing the inset margin**

```HTML
<div style="--md-comp-divider-inset-margin:32px">
  <hr class="micl-divider-inset">
</div>
```
