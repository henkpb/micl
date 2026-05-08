# Styles
This guide covers the fundamental visual settings used by components, all based on the [Material Design 3 Styles](https://m3.material.io/styles) specifications.

## Elevation
Elevation represents the distance between surfaces on the z-axis, creating a sense of depth and hierarchy. It's a realization of the [Material Design 3 Elevation](https://m3.material.io/styles/elevation/overview) system.

### CSS
Import the elevation styles into your project. To install all six elevation levels at once, configure the module in master mode:

```CSS
@use "material-inspired-component-library/styles/elevation" with ($master: true);
```

To install only specific levels (useful when you build your own subset bundle), use the `level` mixin:

```CSS
@use "material-inspired-component-library/styles/elevation";
@include elevation.level(1);
@include elevation.level(2);
```

### Customizations
You can customize elevation levels by overriding their global CSS variables.

**Example: Changing the elevation of a sidesheet:**

```HTML
<div style="--md-sys-elevation-level1: rgba(0, 0, 0, 0.2) 0px 3px 4px -1px, rgba(0, 0, 0, 0.1) 0px 4px 8px 0px, rgba(0, 0, 0, 0.1) 0px 1px 9px 0px">
  <dialog class="micl-sidesheet" closedby="any" popover>
  </dialog>
</div>
```


## Motion
Motion brings your UI to life, making it expressive and intuitive to use. The motion styles are based on the [Material Design 3 Motion](https://m3.material.io/styles/motion/overview/how-it-works) guidelines.

### CSS
Import the motion styles into your project:

```CSS
@use "material-inspired-component-library/styles/motion";
```


## Shape corner-radius tokens
Shape tokens define the corner radii used across every component, following the [Material Design 3 Shape](https://m3.material.io/styles/shape/overview-principles) principles. Components import these automatically — there is nothing to opt into.

Corner radii are exposed as CSS custom properties (`--md-sys-shape-corner-extra-small`, `--md-sys-shape-corner-medium`, `--md-sys-shape-corner-full`, etc.) and can be overridden anywhere in the cascade.

**Example: Changing the corner radius of a card:**

```HTML
<div style="--md-sys-shape-corner-medium: 14px">
  <div class="micl-card-outlined">
  </div>
</div>
```

The decorative shape gallery (heart, cookie, clover, sunny, …) is **not** part of these tokens. It is shipped as an opt-in component — see [components/shape](../components/shape/README.md).


## State layers
State layers are visual overlays that communicate the interaction status of a component, such as when it's hovered over or pressed. These are based on [Material Design 3 States](https://m3.material.io/foundations/interaction/states/overview).

### CSS
Import the state layer styles into your project:

```CSS
@use "material-inspired-component-library/styles/statelayer";
```

### Customizations
Customize the appearance of state layers by overriding their global CSS variables, such as adjusting the opacity.

**Example: Changing the opacity of the hover-state layer:**

```HTML
<div style="--md-sys-state-hover-state-layer-opacity: 12%">
</div>
```


## Typography
Typography is the foundation of text styling. The typography styles in this library are based on the [Material Design 3 Typography](https://m3.material.io/styles/typography/overview) specifications.

### CSS
Import the typography styles into your project:

```CSS
@use "material-inspired-component-library/styles/typography";
```

### Customizations
You can customize font settings by overriding their global CSS variables on the **:root** CSS pseudo-class.

**Changing both the plain and brand style font:**

```CSS
:root {
  --md-ref-typeface-plain: Roboto, system-ui, sans-serif;
  --md-ref-typeface-brand: Roboto, system-ui, sans-serif;
}
```

And include a reference to the font in your application.

```HTML
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap">
```

**Font width and letter spacing**

The default typography styles apply natural letter spacing (`0px` or `normal`) optimized for the default MICL font, [**Google Sans**](https://fonts.google.com/specimen/Google+Sans). If you opt to use a narrower geometric font, such as [**Roboto**](https://fonts.google.com/specimen/Roboto), you can enable positive letter spacing to improve legibility at smaller sizes. To do this, set the `--md-ref-typeface-plain-narrow` variable to `1` in your root stylesheet:

```CSS
:root {
    --md-ref-typeface-plain-narrow: 1;
}
```
