# Shapes
The Shapes component renders [Material Design 3 Expressive Shapes](https://m3.material.io/styles/shape/overview-principles) as inline SVGs whose `d` attribute is supplied by CSS. Because the path data is set with `d:` rather than baked into the SVG markup, swapping a shape's class triggers a smooth `transition: d` morph between the old and new outline.

## Basic Usage

### HTML
A shape is an empty `<svg>` with the base class `micl-shapes` plus one of the shape modifier classes:

```HTML
<svg class="micl-shapes micl-shapes--diamond"><path /></svg>
```

### CSS

The Shapes component is **opt-in** — it is not included in the master `micl.css` bundle, because most apps don't need 35 decorative shapes. Pick one of three integration paths:

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
<link rel="stylesheet" href="material-inspired-component-library/dist/shapes.css">
```

The prebuilt bundle contains all 35 shapes plus the base styles.

### JavaScript
No JavaScript is required. Morphing between shapes is a pure CSS animation: when you replace `micl-shapes--diamond` with `micl-shapes--pill` on the element, the browser interpolates the `d:` value automatically. The morph timing can be customised via two CSS custom properties on the element:

| Custom property | Default | Description |
| --------------- | ------- | ----------- |
| `--micl-shapes-morph-duration` | `0ms` | Length of the morph transition |
| `--micl-shapes-morph-easing` | `ease-in-out` | Easing curve of the transition |

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
| `micl-shapes--outlined` | Renders the shape as a stroked outline instead of a filled fill |
| `micl-shapes--shadowed` | Adds a soft drop-shadow filter |


## Customizations
The base styles size the SVG to 100 × 100 px, fill it with the application's primary color, and let it overflow its viewBox horizontally (so wide shapes like *pill* and *fan* are not clipped). Override these on the element or on a parent:

```HTML
<svg class="micl-shape micl-shape--diamond"
    viewBox="0 0 100 100"
    style="inline-size:64px;block-size:64px;fill:var(--md-sys-color-secondary)">
  <path />
</svg>
```

For `micl-shape--outlined`, the stroke colour and width are controlled by the standard SVG `stroke` and `stroke-width` properties:

```HTML
<svg class="micl-shape micl-shape--outlined micl-shape--pill"
    viewBox="0 0 100 100"
    style="stroke:var(--md-sys-color-outline);stroke-width:3">
  <path />
</svg>
```
