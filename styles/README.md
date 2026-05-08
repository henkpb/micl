# Styles
This guide covers the fundamental visual settings used by components, all based on the [Material Design 3 Styles](https://m3.material.io/styles) specifications.

Each style-topic ships as a Sass partial with the same opt-in pattern: `@use ... with ($master: true)` installs the full set of tokens — that is what the master CSS bundle does. The default mode exposes mixins that emit only the tokens you ask for, so per-component bundles (and any custom subset bundle you build yourself) carry only the tokens they actually reference.

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
Import the motion styles into your project. To install all sixteen duration tokens at once, configure the module in master mode:

```CSS
@use "material-inspired-component-library/styles/motion" with ($master: true);
```

To install only specific durations, use the `duration` mixin:

```CSS
@use "material-inspired-component-library/styles/motion";
@include motion.duration('short3');
@include motion.duration('long4');
```

The easing curves (`$md-sys-motion-easing-emphasized`, `$md-sys-motion-easing-standard` and its accelerate/decelerate variants, the expressive/standard fast-default-slow × spatial-effects curves, etc.) are exposed as **Sass variables**, not CSS custom properties. Reference them through interpolation in your transitions:

```CSS
@use "material-inspired-component-library/styles/motion";
@include motion.duration('short3');

.my-component {
    transition: opacity var(--md-sys-motion-duration-short3) motion.$md-sys-motion-easing-standard;
}
```

### Customizations
You can customize duration tokens by overriding their global CSS variables.

**Example: Slowing the long4 duration:**

```HTML
<div style="--md-sys-motion-duration-long4: 800ms">
</div>
```


## Shape corner-radius tokens
Shape tokens define the corner radii used across every component, following the [Material Design 3 Shape](https://m3.material.io/styles/shape/overview-principles) principles.

### CSS
Each component opts into the corner tokens it actually uses, so when you `@use` a component, the matching corner tokens come along automatically — typically there is nothing to opt into yourself. To install **all** corner tokens at once (useful when you build your own subset bundle), configure the module in master mode:

```CSS
@use "material-inspired-component-library/styles/shapes" with ($master: true);
```

To install only specific corner tokens, use the `corner` mixin:

```CSS
@use "material-inspired-component-library/styles/shapes";
@include shapes.corner('medium');
@include shapes.corner('full');
```

### Customizations
Corner radii are exposed as CSS custom properties and can be overridden anywhere in the cascade.

**Example: Changing the corner radius of a card:**

```HTML
<div style="--md-sys-shape-corner-medium: 14px">
  <div class="micl-card-outlined">
  </div>
</div>
```

The decorative shape gallery (heart, cookie, clover, sunny, …) is **not** part of these tokens. It is shipped as an opt-in component — see the [Shape Component](../components/shape/README.md).


## State layers
State layers are visual overlays that communicate the interaction status of a component, such as when it's hovered over or pressed. These are based on [Material Design 3 States](https://m3.material.io/foundations/interaction/states/overview).

### CSS
Import the state layer styles into your project. To install every state token and ripple parameter, configure the module in master mode:

```CSS
@use "material-inspired-component-library/styles/statelayer" with ($master: true);
```

To install only the parts you need, use the three opt-in mixins:

```CSS
@use "material-inspired-component-library/styles/statelayer";
@include statelayer.token('hover-state-layer-opacity');
@include statelayer.token('focus-state-layer-opacity');
@include statelayer.property;    // typed-property registrations for animatable color/opacity
@include statelayer.keyframes;   // ripple @keyframes (only needed for the spreading ripple effect)
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
Import the typography styles into your project. The typeface and weight references are always installed. To additionally install all 31 typescale token sets, the narrow-typeface tracking overrides, and the `.md-sys-typescale-*` utility classes at once, configure the module in master mode:

```CSS
@use "material-inspired-component-library/styles/typography" with ($master: true);
```

To install only specific typescales, use the `scale` mixin:

```CSS
@use "material-inspired-component-library/styles/typography";
@include typography.scale('body-large');
@include typography.scale('title-medium');
```

There is also one selector-scope mixin per typescale (`display-large`, `display-medium`, …, `emphasized-label-small`) that emits the five `font-family`/`font-size`/`line-height`/`font-weight`/`letter-spacing` declarations at once, so you can apply a typescale to your own element without naming each variable:

```CSS
@use "material-inspired-component-library/styles/typography";
@include typography.scale('body-large');

.my-paragraph {
    @include typography.body-large;
}
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
