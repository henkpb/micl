# MICL — Material Design 3 Expressive for the plain web

[![npm](https://img.shields.io/npm/v/material-inspired-component-library)](https://www.npmjs.com/package/material-inspired-component-library)
[![license](https://img.shields.io/github/license/henkpb/micl)](LICENSE)
![zero dependencies](https://img.shields.io/badge/runtime%20dependencies-0-brightgreen)

**MICL (Material-Inspired Component Library)** is a free, open-source implementation of [Material Design 3](https://m3.material.io/) — including the current **M3 Expressive** update — built from native HTML elements and modern CSS. No custom elements, no framework, no runtime dependencies, and for most components no JavaScript at all.

**[Live showcase](https://henkpb.github.io/micl/)** · **[Component documentation](components/README.md)** · **[Quick start](#quick-start-)**

## Why MICL exists

When Google wound down [material-web](https://github.com/material-components/material-web), the web platform lost its reference implementation of Material Design 3 — and the design system's newest chapter, **M3 Expressive**, never reached the open web at all.

MICL picks up that torch with the opposite architecture. Where material-web wrapped every component in a JavaScript custom element, MICL styles the HTML you already write: a progress bar is a `<progress>`, a dialog is a `<dialog>`, a menu is a popover, a navigation rail is a `<nav>`. The heavy lifting is done by modern CSS — registered custom properties, container style queries, typed `attr()`, `clip-path: shape()`, anchor positioning — so components render on first paint, keep their native semantics and accessibility, and never fight your framework—or your decision to skip one entirely.

## Highlights

- **The M3 Expressive catalog, first to the web.** 31 components, the Material shape library, adaptive pane layouts — and the signature Expressive details, like wavy progress indicators drawn and animated entirely in CSS, with the wave motion running on the compositor.
- **Native HTML first.** Components are your own markup plus a class. Forms post, dialogs trap focus, `<progress>` announces its state automatically. The platform handles the heavy lifting, not a JavaScript abstraction.
- **(Almost) no JavaScript.** Most components need none. All interactive behaviour for the entire library fits in one dependency-free ~14 kB minified and gzipped file — or import per-component slices and let your bundler tree-shake the rest.
- **Theming per the spec.** Ready-made colour themes with light and dark variants in standard, medium and high contrast, and every component themeable through spec-named `--md-comp-*` custom properties.
- **À la carte delivery.** Full bundle or per-component CSS/JS pairs, npm or CDN ([jsDelivr](https://cdn.jsdelivr.net/npm/material-inspired-component-library/dist/micl.css)).
- **International and accessible by default.** Right-to-left layouts mirror automatically, `prefers-reduced-motion` is respected throughout, and every component stays legible in Windows High Contrast (`forced-colors`).

## How MICL compares

| | **MICL** | material-web | Beer CSS | MUI | Angular Material |
|---|---|---|---|---|---|
| Design spec | **M3 Expressive** | M3 | M3 | Material-influenced (M2 heritage) | M3 |
| Actively developed | ✅ | ❌ development wound down | ✅ | ✅ | ✅ |
| Framework required | none | none (Lit runtime) | none | React | Angular |
| Component model | native HTML + CSS | custom elements | HTML + CSS classes | React components | Angular components |
| Usable without JavaScript | ✅ most components | ❌ | partly | ❌ | ❌ |
| Runtime dependencies | **0** | Lit | 0 | several | Angular |
| Server-side rendering | plain HTML + CSS, nothing to hydrate | needs SSR shims | ✅ | hydration | hydration |

<sup>Comparison reflects the situation at the time of writing (September 2026); corrections welcome.</sup>

## Trade-offs — when MICL might not fit

- **Modern browsers only.** MICL leans on current CSS. Chromium-based browsers get the full experience today; Firefox degrades gracefully where a feature hasn't shipped yet (e.g. accordions open without animation until `interpolate-size` arrives, and a wavy progress indicator at 100 % keeps a square end without container style queries). Legacy browser support is a non-goal.
- **CSS-first philosophy.** If your team expects components as framework objects with props and events, MICL's markup-plus-classes approach will feel different — that difference is the point, but it is a real difference.
- **Not a Bootstrap look-alike.** MICL implements Material Design 3 faithfully rather than offering a neutral, endlessly re-skinnable base.

## Quick start 🚀

### 1. Install via NPM
```shell
npm install material-inspired-component-library
```

### 2. Add the CSS

**Sass/SCSS**

To import the styles for a single component (e.g., the [Card component](components/card/README.md)), import the shared base styles once, followed by the component:
```SCSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/card";
```
The base file contains the foundation design tokens and the `@property` registrations required by the ripple effect. It is small, needed only once, and already included in the full `micl.css`.

Some components build on other MICL components; when importing them individually, import their companions as well (each component's README shows the complete list):

| Component | Also import |
| --------- | ----------- |
| accordion | list (the accordion has no files of its own) |
| appbar | iconbutton |
| buttongroup | button, iconbutton |
| datepicker | dialog, textfield, button, iconbutton, divider |
| dialog | button, iconbutton |
| menu | list |
| navigationbar | badge |
| navigationrail | button, iconbutton, badge |
| select | textfield, menu, list, divider |
| sidesheet | button, iconbutton, divider |
| snackbar | button, iconbutton |
| splitbutton | button, menu, list |
| stepper | button |
| timepicker | dialog, button, iconbutton |

To import all MICL styles:
```SCSS
@use "material-inspired-component-library/styles";
```

Remember to import a [theme](themes/README.md) as well, either one of the themes in the package or your own:
```SCSS
@use "material-inspired-component-library/themes/olivegreen/theme.css";
```

**Plain CSS**

Copy the main `micl.css` file to your distribution folder and include it in your application. Include a [theme](themes/README.md) as well:
```HTML
<link rel="stylesheet" type="text/css" href="path/to/themes/olivegreen/theme.css">
<link rel="stylesheet" type="text/css" href="path/to/dist/micl.css">
```

The per-component stylesheets can be included the same way; include `base.css` once before them (`<link rel="stylesheet" type="text/css" href="path/to/dist/base.css">`).

The main MICL CSS file can also be found on CDN networks, like on jsDelivr: `https://cdn.jsdelivr.net/npm/material-inspired-component-library/dist/micl.css`

### 3. Add the HTML
The theme's colours apply inside an element that carries one of its scheme classes — `light`, `dark`, or a medium- or high-contrast variant such as `dark-high-contrast`. Put the class on the `<body>`:

```HTML
<body class="light">
```

Here is a simple example of a [Card component](components/card/README.md).

```HTML
<div class="micl-card-outlined">
  <img src="your-image.jpg" alt="A beautiful image" class="micl-card__image">
  <div class="micl-card__headline-s">
    <h2>Card Title</h2>
  </div>
  <p class="micl-card__supporting-text">This is a simple card component.</p>
</div>
```

And here is the Expressive circular progress indicator — note that updating `value` is all it takes; the 500 ms Material-motion transition, the size adjustments, and the track gap are all CSS:

```HTML
<progress class="micl-circular-progress" value="0.6"></progress>
```

### 4. Add the JavaScript
Some components, like the [List](components/list/README.md), require a small amount of JavaScript to handle interactive behaviour. Because MICL's JavaScript footprint is so small, you can safely import the entire library at once.
```JavaScript
import "material-inspired-component-library/dist/micl";
```
This will initialize all MICL components, including those that will be added to the DOM later on.

To load only the JavaScript for the components you use, import their files individually. Each component registers itself with a shared runtime, so any combination works:
```JavaScript
import "material-inspired-component-library/dist/list";
import "material-inspired-component-library/dist/textfield";
```

**Plain JavaScript**

Copy the main `micl.js` file to your distribution folder and include it in your application:
```HTML
<script src="path/to/dist/micl.js"></script>
```
The per-component files can be included the same way (`<script src="path/to/dist/list.js"></script>`). Components that need no JavaScript, such as the Divider, only have a stylesheet.

The main MICL JavaScript file can also be found on CDN networks, like on jsDelivr: `https://cdn.jsdelivr.net/npm/material-inspired-component-library/dist/micl.js`

### 5. Add a font
MICL uses the [**Google Sans**](https://fonts.google.com/specimen/Google+Sans) as its default font. Include a reference to this font in your application.

```HTML
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap">
```

The [Styles guide](styles/README.md) describes how to change the default font.

## JavaScript API 🧩
MICL requires no manual setup. Upon loading, it initializes every component on the page and sets up a mutation observer. Components added dynamically later—even when the entire `<body>` is replaced by tools like Turbo or htmx—are initialized automatically, and removed components are garbage-collected. Every script shares one runtime, so `micl.js` and any combination of per-component scripts can be loaded together.

The main file exposes a small runtime object — the default export of `dist/micl`, or the `micl` global when loaded with a `<script>` tag:

| Member | Description |
| --- | --- |
| `micl.initialize()` | Initializes every component in the document that has not been initialized yet. Call it after changing an existing element in a way that turns it into a component, such as adding a `micl-slider-m` class to an `<input type="range">`: the page is watched for added and removed elements, not for changed attributes. |
| `micl.cleanup()` | Cleans up the components in the document, as if they were removed: the bottom sheets, snackbars and checkbox groups release their event listeners. The page is still watched afterwards. |

```JavaScript
import micl from "material-inspired-component-library/dist/micl";

document.querySelector("input[type=range]").classList.add("micl-slider-m");
micl.initialize();
```

The per-component scripts register their component as `miclComponents.<name>` (for example `miclComponents.list`) when loaded with a `<script>` tag, and the [Form foundation](foundations/form/README.md) is exposed as `miclForm`.

The JavaScript works in the main document only: components inside a shadow root are not initialized. The scripts can be imported outside a browser, for example during server-side rendering or in tests, where they do nothing.

## Under the hood 🔬

MICL doubles as a working tour of what production CSS can do in 2026. A few of the techniques in the codebase:

- **Typed `attr()`** turns `<progress value>` and `aria-valuenow` into animatable CSS values — determinate indicators transition per the Material motion spec with zero JavaScript.
- **Registered `@property` custom properties** drive interpolable gradients: carved progress tracks, conic arcs, trigonometric cap positioning.
- **Compositor-only animation**: the Expressive wave travel is a transform over a static mask — no per-frame repaints, no matter how many indicators run.
- **`clip-path: shape()`** clips progress rings to geometrically antialiased annuli, with a gradient-mask fallback.
- **Container style queries** switch components at exact computed states (a wave collapsing to a mathematically flat bar at 100 %).
- **Anchor positioning** places menus and submenus without measurement code.

Each component's README documents its approach and its graceful-degradation story.

## Foundations 🪟
Separate CSS files, based on the [Material Design Layout Foundation](https://m3.material.io/foundations/layout/layout-overview), provide foundational styles that are not tied to a single component. The **Layout** foundation includes styles for the **window frame**, **rail region** and **panes** that adapt to the available screen space, ensuring your layout follows Material Design's adaptive design guidelines. The **Field** foundation arranges form fields in a grid with the standard Material vertical rhythm, optionally led by an icon column. The **Form** foundation ships no CSS: it validates a form with the browser's own Constraint Validation API and renders the result as MICL error styling. The **Scrollbar** foundation gives every scrollbar a thin, theme-colored appearance.

- [x] [Field](foundations/field/README.md)
- [x] [Form](foundations/form/README.md)
- [x] [Layout](foundations/layout/README.md)
- [x] [Scrollbar](foundations/scrollbar/README.md)

## Available components ✅
The library currently consists of the following components:
- [x] [Accordion](components/accordion/README.md)
- [x] [Alert](components/alert/README.md)
- [x] [App Bar](components/appbar/README.md)
- [x] [Badge](components/badge/README.md)
- [x] [Bottom sheet](components/bottomsheet/README.md)
- [x] [Button](components/button/README.md)
- [x] [Button group](components/buttongroup/README.md)
- [x] [Card](components/card/README.md)
- [x] [Checkbox](components/checkbox/README.md)
- [x] [Chip](components/chip/README.md)
- [x] [Date picker](components/datepicker/README.md)
- [x] [Date range picker](components/datepicker/README.md)
- [x] [Dialog](components/dialog/README.md)
- [x] [Divider](components/divider/README.md)
- [x] [Icon button](components/iconbutton/README.md)
- [x] [List](components/list/README.md)
- [x] [Menu](components/menu/README.md)
- [x] [Navigation bar](components/navigationbar/README.md)
- [x] [Navigation rail](components/navigationrail/README.md)
- [x] [Progress indicator](components/progressindicator/README.md)
- [x] [Radio button](components/radio/README.md)
- [x] [Select](components/select/README.md)
- [x] [Shapes](components/shapes/README.md)
- [x] [Side sheet](components/sidesheet/README.md)
- [x] [Slider](components/slider/README.md)
- [x] [Snackbar](components/snackbar/README.md)
- [x] [Split button](components/splitbutton/README.md)
- [x] [Stepper](components/stepper/README.md)
- [x] [Switch](components/switch/README.md)
- [x] [Text field](components/textfield/README.md)
- [x] [Time picker](components/timepicker/README.md)

## Change Log ↪️

### 10.0.0 (26.09.2026)
**Breaking changes**
- **BREAKING**: Removed the `micl-textfield--error` and `micl-checkbox--error` classes; set `aria-invalid="true"` on the input instead.
- **BREAKING**: Set `aria-description` on the `<option>` element of a Select instead of its `micl-list-item__text` element.
- **BREAKING**: Renamed the theming tokens for the Progress Indicator to the `md.comp.progress-indicator.*` scheme.
- **BREAKING**: The wavy Progress Indicators take `aria-valuemin` into account and, as ARIA specifies, default `aria-valuemax` to 100 instead of 1; a wavy indicator whose value runs from 0 to 1 needs `aria-valuemax="1"`.
- **BREAKING**: The `micl-scrollbar` opt-in class is gone; every scrollbar gets the MICL appearance.
- **BREAKING**: When loaded with a `<script>` tag, `dist/micl.js` exposes the runtime object itself as the `micl` global (previously `micl.default`), the Form foundation is exposed as `miclForm` instead of overwriting `micl`, and the per-component scripts register under `miclComponents.<name>`.
- **Button group**: New component.
- **Split button**: New component.
- **Menu**: <kbd>Home</kbd>/<kbd>End</kbd> move to the first or last item.
- **Time picker**: <kbd>Home</kbd> and <kbd>End</kbd> set the hour or minute field to its lowest or highest value.
- **Progress indicator**: New `micl-linear-progress--thick` and `micl-circular-progress--thick` modifiers for the M3 thick style, for both the flat and the wavy indicators.
- **Reduced motion**: Supported by all components
- **Forced colors**: Support for Windows High Contrast and other forced-colors modes.
- Major accessibility improvements.

### 9.1.0 (05.09.2026)
- **Navigation rail**: Dropped the JavaScript.

### 9.0.0 (20.07.2026)
- **BREAKING**: Renamed all CSS custom properties from --md-sys- to --md-comp-.
- **BREAKING**: Renamed the layout class `micl-body` and its `micl-body--*` modifiers to `micl-panes`/`micl-panes--*`, aligning with the M3 Expressive layout terminology.
- **BREAKING**: Per-component CSS files no longer embed the shared foundation styles; load `dist/base.css` once before them. The full `micl.css` is unaffected.
- **Chip**: New component.
- **Progress indicator**: New component.
- **Navigation bar**: New component.
- **Navigation rail**: Support for adaptive behaviour.
- **Date Range picker**: Select two dates in the Date picker to return a date range.
- **Field**: The `micl-grid-field` and `micl-grid-iconfield` classes are now the 'Field' layout foundation with its own stylesheet (`dist/field.css`).
- **Layout**: The window now reserves the safety regions (`env(safe-area-inset-*)`) around the content, and sticky app bars and navigation rails stay below the top safety region.

### 8.1.0 (24.06.2026)
- **Shapes**: The Material shape library supported as the 'Shapes' component.

### 8.0.0 (05.05.2026)
- **BREAKING**: Renamed many CSS custom properties from --md-sys- to --md-comp-.
- **List, Menu, Accordion, Select**: Aligned with latest MD3 spec.
- **Ripple**: Now starts on pointer-down.
- **Text field**: Outlined version uses CSS variable instead of inherited background.

### 7.0.0 (08.03.2026)
- **BREAKING**: Use `<a>` instead of `<label>` inside Navigation rail.
- **BREAKING**: Use `inert` for disabled cards instead of `micl-card--disabled`.
- **Snackbar**: New component.
- **Toggle buttons**: Support for toggling icons.

### 6.0.0 (23.12.2025)
- **BREAKING**: Use command-attribute to control toggle buttons.
- **Date picker**: New component.

### 5.0.0 (02.12.2025)
- **Time picker**: New component.

### 4.0.0 (27.10.2025)
- **BREAKING**: Moved layout.scss to subfolder.
- **Alert**: New component.
- **Stepper**: New component.

### 3.1.0 (19.10.2025)
- **Checkbox**: Refactoring + added support for checkbox groups.

### 3.0.0 (24.09.2025)
- **BREAKING:** Use `<nav>` instead of `<div>` for Navigation rail.
- **App Bar**: New component.
- **Layout**: Support for adaptive layout.
- **Buttons**: Improved handling of target area for small buttons.

### 2.0.0 (04.09.2025)
- **Navigation rail**: New component.
- **Badge**: New component.
- **Ripple**: Now uses custom CSS properties.

### 1.3.0 (23.08.2025)
- **Menu**: Added support for submenus.
- **Ripple**: The ripple-effect does not use a pseudo-element anymore.
- **State layer**: Rewrite for simpler styling.

### 1.2.0 (17.08.2025)
- **List**: Added support for switches inside list items.

### 1.1.0 (12.08.2025)
- **Text field**: Added support for multi-line text fields.
