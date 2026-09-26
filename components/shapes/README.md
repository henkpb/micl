# Shapes
This component implements the [Material Design 3 Expressive shape library](https://m3.material.io/styles/shape/overview-principles) using inline SVGs powered by the CSS [`d` property](https://developer.mozilla.org/en-US/docs/Web/CSS/d). By storing path data in the stylesheet rather than the markup, swapping a shape's class triggers a smooth, native browser morph between outlines.

## Basic Usage

### HTML
A shape is an `<svg>` with a `viewBox` of `0 0 100 100`, the base class `micl-shapes` plus one of the shape modifier classes, and exactly one `<path>` as its direct child:

```HTML
<svg class="micl-shapes micl-shapes--diamond" viewBox="0 0 100 100" aria-hidden="true"><path /></svg>
```

Every shape is drawn in a 100 × 100 coordinate system and fills that square along its longer side, so the `viewBox` is what makes the shape scale with the size of the SVG.

### CSS
To prevent bloating the master `micl.css` bundle, the Shapes component is **opt-in**. Choose one of three integration paths depending on how many shapes you need:

**1. Import only the shapes you actually use:**

```SCSS
@use "material-inspired-component-library/components/shapes" as shapes;

@include shapes.base;
@include shapes.use("circle", "heart", "pill");
```

`shapes.base` emits the shared `.micl-shapes`, `.micl-shapes--outlined`, and `.micl-shapes--shadowed` rules. `shapes.use(<names>...)` emits one `.micl-shapes--<name> > path { d: … }` rule per name.

**2. Import the whole gallery via Sass:**

```SCSS
@use "material-inspired-component-library/components/shapes" with ($master: true);
```

Equivalent to calling `shapes.base` plus `shapes.use(…)` with every shape.

**3. Drop in the prebuilt CSS:**

```HTML
<link rel="stylesheet" href="path/to/dist/shapes.css">
```

The prebuilt bundle contains all 35 shapes plus the base styles.

### JavaScript
No JavaScript is required. Morphing between shapes is a pure CSS transition: when you replace `micl-shapes--diamond` with `micl-shapes--pill` on the element, the browser interpolates the `d` value. The morph uses the M3 expressive default spatial motion; see [Theming](#theming) to change it.

```JavaScript
shape.classList.replace('micl-shapes--diamond', 'micl-shapes--pill');
```

### Live Demo
A live example of the [Shapes component](https://henkpb.github.io/micl/shapes.html) is available, with a button per shape that morphs the demo SVGs.

## Variants
The available shape names (use these as the `micl-shapes--<name>` class and as arguments to `shapes.use(...)`):

```
circle, square, slanted, arch, semicircle, oval, pill,
triangle, arrow, fan, diamond, clamshell, pentagon, gem,
very-sunny, sunny, cookie-4, cookie-6, cookie-7, cookie-9,
cookie-12, clover-4, clover-8, burst, soft-burst, boom,
soft-boom, flower, puffy, puffy-diamond, ghost-ish,
pixel-circle, pixel-triangle, bun, heart
```

Optional modifier classes:

| Class | Effect |
| --- | --- |
| `micl-shapes--outlined` | Renders the shape as a stroked outline instead of a filled shape |
| `micl-shapes--shadowed` | Adds a soft drop shadow in the theme's shadow color |

**Image fills**: To display an image instead of a flat color (like a profile picture), fill the shape's path with an SVG `<pattern>`:

```HTML
<svg class="micl-shapes micl-shapes--cookie-9" viewBox="0 0 100 100" role="img" aria-label="Profile picture">
  <defs>
    <pattern id="avatar" patternUnits="userSpaceOnUse" width="100" height="100">
      <image href="avatar.jpg" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
    </pattern>
  </defs>
  <path fill="url(#avatar)" />
</svg>
```

## Accessibility
An SVG is exposed to assistive technology by default, so tell it what the shape means:

* **Decorative shapes:** Apply `aria-hidden="true"` to shapes that are purely visual.
* **Meaningful shapes:** Apply `role="img"` and a descriptive `aria-label` (e.g., for profile pictures or status indicators).
* **Respect motion preferences:** The morphing animation automatically disables itself and snaps instantly to the new shape if the user has requested reduced motion at the OS level.

## Theming
The shapes can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. The tokens are resolved on the SVG itself, so they can be set on the element directly or inherited from any ancestor.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-shapes-size` | The width and height of the SVG | `100px` |
| `--md-comp-shapes-color` | The fill color | `--md-sys-color-primary` |
| `--md-comp-shapes-outline-color` | The stroke color of an outlined shape | `--md-sys-color-primary` |
| `--md-comp-shapes-outline-width` | The stroke width of an outlined shape, in `viewBox` units | `2` |
| `--md-comp-shapes-shadow` | The `filter` of a shadowed shape | Two drop shadows in `--md-sys-color-shadow` |
| `--md-comp-shapes-motion-duration` | The duration of the morph | `--md-sys-motion-expressive-default-spatial-duration` |
| `--md-comp-shapes-motion-spatial` | The easing curve of the morph | `--md-sys-motion-expressive-default-spatial` |

**Layout note (Overflow)**: The SVG's `overflow` property is set to `visible` by default. Because SVG strokes are drawn centered on the path, half of an outlined shape's stroke (and its drop shadow) extends beyond the `viewBox` boundary. This visible overflow prevents clipping.

**Example: A small secondary shape that morphs faster**

```HTML
<svg class="micl-shapes micl-shapes--sunny" viewBox="0 0 100 100" aria-hidden="true"
    style="--md-comp-shapes-size: 48px; --md-comp-shapes-color: var(--md-sys-color-secondary); --md-comp-shapes-motion-duration: 350ms;">
  <path />
</svg>
```

**Example: An outlined shape**

```HTML
<svg class="micl-shapes micl-shapes--outlined micl-shapes--pill" viewBox="0 0 100 100" aria-hidden="true"
    style="--md-comp-shapes-outline-color: var(--md-sys-color-outline); --md-comp-shapes-outline-width: 3;">
  <path />
</svg>
```

## Compatibility
These shapes rely on the CSS [`d` property](https://developer.mozilla.org/en-US/docs/Web/CSS/d) property. While supported in Chromium and Firefox, browsers lacking support (like Safari) will render an empty SVG. Review the MDN browser compatibility table if you target a broad user base.
