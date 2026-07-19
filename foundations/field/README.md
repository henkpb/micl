# Field
This foundation implements the classic [Material Design](https://m3.material.io/foundations/layout/layout-overview) form layout: form fields stacked in a grid with a consistent vertical rhythm, optionally with a leading icon column that labels a group of related fields.

## Basic Usage

### HTML
To stack form fields with the standard Material row gap, wrap them in an element with the `micl-grid-field` class:

```HTML
<div class="micl-grid-field">
  <div class="micl-textfield-outlined">
    <label for="name">Name</label>
    <input type="text" id="name">
  </div>
  <div class="micl-textfield-outlined">
    <label for="email">Email</label>
    <input type="email" id="email">
  </div>
</div>
```

To lead a group of fields with an icon, use `micl-grid-iconfield` instead. Icons are placed in a fixed 48px start column and align with the first line of the field they belong to:

```HTML
<div class="micl-grid-iconfield">
  <span class="micl-grid-iconfield__icon material-symbols-outlined">call</span>
  <div class="micl-grid-iconfield__field micl-textfield-outlined">
    <label for="phone">Phone</label>
    <input type="tel" id="phone">
  </div>
  <div class="micl-grid-iconfield__field micl-textfield-outlined">
    <label for="fax">Fax</label>
    <input type="tel" id="fax">
  </div>
</div>
```

### CSS
Import the field styles into your project:

```CSS
@use "material-inspired-component-library/dist/field";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for this foundation.

## Variants

| CSS class | Description |
| --------- | ----------- |
| `micl-grid-field` | A single-column grid of form fields with the standard row gap |
| `micl-grid-iconfield` | A two-column grid: a 48px icon column and a field column |
| `micl-grid-iconfield__icon` | Places an icon in the icon column |
| `micl-grid-iconfield__field` | Places a field in the field column |

## Theming
The row gap follows the `--md-sys-padding-xl` design token (default 24px), defined in the shared `base.css`:

```HTML
<div class="micl-grid-field" style="--md-sys-padding-xl:16px">
  ...
</div>
```
