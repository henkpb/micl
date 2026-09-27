# Scrollbar
This foundation gives every scrollbar on the page — the viewport's and those of scrollable components such as menus, sheets and panes — a slim, button-less appearance: an 8px rounded thumb in the theme's **outline** color role, set in a 2px transparent gutter. Browsers without the `::-webkit-scrollbar` pseudo-elements (Firefox) get the closest standard equivalent, a thin native scrollbar with the same thumb color, via `scrollbar-width` and `scrollbar-color`.

## Basic Usage

### CSS
The styles are part of the full `micl.css`. To load them on their own:

```SCSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/scrollbar";
```

Or with plain CSS:

```HTML
<link rel="stylesheet" type="text/css" href="path/to/dist/base.css">
<link rel="stylesheet" type="text/css" href="path/to/dist/scrollbar.css">
```

### JavaScript
None is required when the [theme](../../themes/README.md) class sits on the `<html>` element. A theme applied to `<body>` cannot color the viewport's scrollbar by itself, because that scrollbar reads its colors from `<html>`; the MICL runtime (`dist/micl.js` or any per-component script) closes that gap by copying the body's outline color to `<html>`, and keeps it current when the body's `class` or `style` attribute changes or the color scheme preference flips.

### Live Demo
A live example of the [Scrollbar foundation](https://henkpb.github.io/micl/scrollbar.html) is available to interact with.

## Theming

| Variable name | Description | Default value |
| ------------- | ----------- | ------------- |
| `--md-sys-scrollbar-thumb-color` | The color of the scrollbar thumb. Set it on `<html>` to override the theme color. | `--md-sys-color-outline` |

Scrollable elements inherit the thumb color from their ancestors; set `--md-sys-scrollbar-thumb-color` on any scroll container to change it locally. Note that setting the standard `scrollbar-width` or `scrollbar-color` property on an element switches that element's scrollbar to the browser's native rendering in Chromium.

In Firefox, the fallback resolves the thumb color on `<html>` and `<body>`, and scroll containers inherit the resulting color rather than the custom property, so a local `--md-sys-scrollbar-thumb-color` has no effect there. To recolor one container in Firefox as well, set `scrollbar-color` on it for browsers without the `::-webkit-scrollbar` pseudo-elements only, so that Chromium keeps the styled scrollbar:

```CSS
.my-panel {
  --md-sys-scrollbar-thumb-color: var(--md-sys-color-primary);
}
@supports not selector(::-webkit-scrollbar) {
  .my-panel {
    scrollbar-color: var(--md-sys-scrollbar-thumb-color) transparent;
  }
}
```

## Compatibility
Chromium and Safari render the styled scrollbar through the `::-webkit-scrollbar` pseudo-elements. Firefox renders the `scrollbar-width: thin` fallback. Browsers that support neither show their default scrollbars.
