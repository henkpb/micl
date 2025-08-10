# Themes
This documentation covers how MICL uses color schemes and design tokens to style its components. By using design tokens, you can ensure style updates propagate consistently throughout your web page or application.

## How it works

A **color scheme** is a set of design tokens that map to specific color values. A design token, such as `--md-sys-color-primary`, is a variable that represents a specific role or function within a design system.

For example, you could define a `light.css` file for a light theme:

```CSS
:root {
  --md-sys-color-primary: rgb(32 100 135);
  /* Other light mode color tokens... */
}
```

Similarly, you could create a `dark.css` file for a dark theme:

```CSS
:root {
  --md-sys-color-primary: rgb(145 206 245);
  /* Other dark mode color tokens... */
}
```

These files reference the same tokens but assign them different color values. You can then apply a theme to your application by conditionally including the appropriate CSS file or by switching a class on a root element, like the `<body>`.

**Example: Switching themes with a class**

```HTML
.light {
  --md-sys-color-primary: rgb(32 100 135);
}

.dark {
  --md-sys-color-primary: rgb(145 206 245);
}

<body class="light">
</body>
```

This approach allows you to switch between themes with minimal effort, as all components will automatically update their colors based on the new token values.

## Using Pre-built Themes
The MICL package includes several example color schemes that you can use as a starting point for your project. These are provided as separate CSS files for easy integration.

To use the "Olive Green" light theme, for instance, simply import it into your main stylesheet:

```CSS
@use "material-inspired-component-library/themes/olivegreen/light.css";
```

You can then apply this theme to your <body> or another root element in your application.

## Creating a Custom Theme
To create your own custom color scheme, you can generate a set of design tokens that match your brand's color palette. The process for generating these custom themes is comprehensively described in the [Material Design Color Guide](https://m3.material.io/styles/color/static/custom-brand). This guide provides tools and best practices for creating a harmonious and accessible color system for your application.
