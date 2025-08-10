# Divider
This component implements the the [Material Design 3 Expressive Divider](https://m3.material.io/components/divider/overview) design.

## Basic Usage

### HTML
To add a basic divider, use the `<hr>` element with the `micl-divider` class:

```HTML
<hr class="micl-divider">
```

### CSS
Import the divider styles into your project:

```CSS
@use "material-inspired-component-library/components/divider";
```

### TypeScript
No custom TypeScript is required for the core functionality of this component.

## Variants
The Divider component offers five CSS classes for different divider styles:

| CSS class | Description |
| --------- | ----------- |
| micl-divider | A standard, full-width divider |
| micl-divider-inset | Indented equally on both the left and right sides |
| micl-divider-inset--start | Indented only on the left (start) side |
| micl-divider-inset--end | Indented only on the right (end) side |
| micl-divider-vertical | A vertical divider |

## Customizations
You can customize the appearance of the Divider component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child dividers.

| Variable name | Default Value | Description |
| ------------- | ----- | ----------- |
| --md-sys-divider-thickness | 1px | Controls the thickness (height for horizontal, width for vertical) of the divider |
| --md-sys-divider-inset-margin | 16px | Defines the indentation distance for inset dividers |
| --md-sys-divider-space | 4px | Sets the spacing between the divider and adjacent text or elements |

**Example: Changing the inset margin**

```HTML
<div style="--md-sys-divider-inset-margin:32px">
  <hr class="micl-divider-inset">
</div>
```
