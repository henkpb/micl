# Styles
This guide covers the fundamental visual settings used by components, all based on the [Material Design 3 Styles](https://m3.material.io/styles) specifications.

## Elevation
Elevation represents the distance between surfaces on the z-axis, creating a sense of depth and hierarchy. It's a realization of the [Material Design 3 Elevation](https://m3.material.io/styles/elevation/overview) system.

### CSS
Import the elevation styles into your project:

```CSS
@use "material-inspired-component-library/styles/elevation";
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


## Shapes
Shapes add decorative flair and help emphasize elements. These styles adhere to the [Material Design 3 Shape](https://m3.material.io/styles/shape/overview-principles) principles.

### CSS
Import the shape styles into your project:

```CSS
@use "material-inspired-component-library/styles/shapes";
```

### Customizations
You can customize a component's shape by overriding its global CSS variables, such as adjusting the corner radius.

**Example: Changing the corner radius of a card:**

```HTML
<div style="--md-sys-shape-corner-medium: 14px">
  <div class="micl-card-outlined">
  </div>
</div>
```


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
You can customize font settings by overriding their global CSS variables.

**Changing the brand style font:**

```HTML
<div style="--md-ref-typeface-brand:Helvetica, Arial, sans-serif">
</div>
