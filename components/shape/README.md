# Shape
The Shape component renders Material Design 3 [Expressive Shapes](https://m3.material.io/styles/shape/overview-principles) — circle, square, pill, oval, heart, cookie, clover, sunny, and so on — as inline SVGs whose `d` attribute is supplied by CSS. Because the path data is set with `d:` rather than baked into the SVG markup, swapping a shape's class triggers a smooth `transition: d` morph between the old and new outline.

## Basic Usage

### HTML
A shape is an empty `<svg>` with the base class `micl-shape` plus one of the shape modifier classes:

```HTML
<svg class="micl-shape micl-shape-heart" viewBox="0 0 100 100"><path /></svg>
```

Optional modifier classes:

| Class | Effect |
| --- | --- |
| `micl-shape--outlined` | Renders the shape as a stroked outline instead of a filled fill |
| `micl-shape--shadowed` | Adds a soft drop-shadow filter |

### CSS

The Shape component is **opt-in** — it is not included in the master `micl.css` bundle, because most apps don't need 35 decorative shapes. Pick one of three integration paths:

**1. Import only the shapes you actually use (recommended for production):**

```SCSS
@use "material-inspired-component-library/components/shape" as shape;

@include shape.base;
@include shape.use("circle", "heart", "pill");
```

`shape.base` emits the shared `.micl-shape`, `.micl-shape--outlined`, and `.micl-shape--shadowed` rules. `shape.use(<names>...)` emits one `.micl-shape-<name> > path { d: … }` rule per name. Unknown names raise a Sass error at compile time.

**2. Import the whole gallery via Sass:**

```SCSS
@use "material-inspired-component-library/components/shape" with ($master: true);
```

Equivalent to calling `shape.base` plus `shape.use(…)` with every shape.

**3. Drop in the prebuilt CSS:**

```HTML
<link rel="stylesheet" href="material-inspired-component-library/dist/shape.css">
```

The prebuilt bundle contains all 35 shapes plus the base styles.

### JavaScript
No JavaScript is required. Morphing between shapes is a pure CSS animation: when you replace `micl-shape-heart` with `micl-shape-pill` on the element, the browser interpolates the `d:` value automatically. The morph timing can be customised via two CSS custom properties on the element:

| Custom property | Default | Description |
| --- | --- | --- |
| `--morph-duration` | `0ms` | Length of the morph transition |
| `--morph-easing` | `ease-in-out` | Easing curve of the transition |

### Live Demo
A live example of the [Shape component](https://henkpb.github.io/micl/shapes.html) is available, with a button per shape that morphs the demo SVG.

## Variants
The available shape names (use these as the `micl-shape-<name>` class and as arguments to `shape.use(...)`):

```
circle, square, slanted, arch, semicircle, oval, pill,
triangle, arrow, fan, diamond, clamshell, pentagon, gem,
very-sunny, sunny, cookie-4, cookie-6, cookie-7, cookie-9,
cookie-12, clover-4, clover-8, burst, soft-burst, boom,
soft-boom, flower, puffy, puffy-diamond, ghost-ish,
pixel-circle, pixel-triangle, bun, heart
```

## Customizations
The base styles size the SVG to 100 × 100 px, fill it with `green`, and let it overflow its viewBox horizontally (so wide shapes like *pill* and *fan* are not clipped). Override these on the element or on a parent:

```HTML
<svg class="micl-shape micl-shape-heart"
     viewBox="0 0 100 100"
     style="inline-size:64px;block-size:64px;fill:var(--md-sys-color-primary)">
    <path />
</svg>
```

For `micl-shape--outlined`, the stroke colour and width are controlled by the standard SVG `stroke` and `stroke-width` properties:

```HTML
<svg class="micl-shape micl-shape--outlined micl-shape-pill"
     viewBox="0 0 100 100"
     style="stroke:var(--md-sys-color-outline);stroke-width:3"><path /></svg>
```

## Contributing — regenerating the path data
The 35 SVG path strings live in [`_paths.generated.scss`](./_paths.generated.scss) and are produced by [`tools/shapes/generate.mjs`](../../tools/shapes/generate.mjs). The Sass partial does no math at compile time — it only looks shapes up by name in the generated map. **Do not edit `_paths.generated.scss` by hand.**

When you change a shape's vertex coordinates, repeat count, mirror flag, vertex count, or any of the underlying math:

```bash
npm run gen:shapes      # regenerate components/shape/_paths.generated.scss
npm run check:shapes    # verify the file is up to date (CI runs this too)
```

Commit the regenerated `_paths.generated.scss` together with the change to the generator. CI fails if a PR modifies the generator without also updating the committed paths.
