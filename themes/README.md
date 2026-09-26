# Themes
This documentation covers how MICL uses color schemes and design tokens to style its components. By using design tokens, you can ensure style updates propagate consistently throughout your web page or application.

## How it works

A **color scheme** is a set of design tokens that map to specific color values. A design token, such as `--md-sys-color-primary`, is a variable that represents a specific role or function within a design system. Every MICL component reads its colors from these tokens, so a component has no colors until a scheme is applied to it or to one of its ancestors.

Each MICL theme defines its schemes as classes. You apply a scheme by putting its class on a root element, usually the `<body>`:

```HTML
<body class="light">
  ...
</body>
```

Switching the class, for example from `light` to `dark`, recolors every component on the page. A scheme class on any other element applies to that element and its descendants only.

## Using Pre-built Themes
The MICL package includes the following themes in the `themes` folder: `airblue`, `barnred`, `citrine`, `gray`, `greenery`, `hermana`, `illuminating`, `magenta`, `mocha`, `olivegreen` and `peri`.

Each theme folder contains one file per scheme, plus `theme.css` with all six schemes:

| File | Class |
| --- | --- |
| `light.css` | `light` |
| `light-mc.css` | `light-medium-contrast` |
| `light-hc.css` | `light-high-contrast` |
| `dark.css` | `dark` |
| `dark-mc.css` | `dark-medium-contrast` |
| `dark-hc.css` | `dark-high-contrast` |

To use the "Olive Green" theme with all its schemes, include `theme.css` in your page:

```HTML
<link rel="stylesheet" href="path/to/themes/olivegreen/theme.css">
```

Or import only the schemes you need into your main stylesheet:

```SCSS
@use "material-inspired-component-library/themes/olivegreen/light.css";
@use "material-inspired-component-library/themes/olivegreen/dark.css";
```

Then add the scheme's class (`light` in this example) to your `<body>` or another root element.

## Creating a Custom Theme
To create your own custom color scheme, you can generate a set of design tokens that match your brand's color palette. The process for generating these custom themes is comprehensively described in the [Material Design Color Guide](https://m3.material.io/styles/color/static/custom-brand). This guide provides tools and best practices for creating a harmonious and accessible color system for your application.

Define the tokens under your own scheme classes, following the structure of the pre-built themes:

```CSS
.light {
  --md-sys-color-primary: rgb(32 100 135);
  /* Other light color tokens... */
}

.dark {
  --md-sys-color-primary: rgb(145 206 245);
  /* Other dark color tokens... */
}
```
