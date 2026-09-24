# App Bar
This component implements the [Material Design 3 Expressive App Bar](https://m3.material.io/components/app-bars/overview) design. The app bar serves as the top container for a page, displaying the page title, primary actions, and navigation options.

## Basic Usage

### HTML
To add a basic (small) app bar, use the `<header>` element with the `micl-appbar` class. The `<h1>` and `<p>` elements within the `<div class="micl-appbar__headline">` container define the main headline and an optional subtitle. Any heading level works, as does applying the `micl-heading` class to a non-heading element.

```HTML
<header class="micl-appbar">
  <div class="micl-appbar__headline">
    <h1>Headline</h1>
    <p class="micl-appbar__subtitle">Subtitle</p>
  </div>
</header>
```

### CSS
Import the app bar styles into your project:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/appbar";
```

The app bar is designed to sit at the top of a [pane](../../foundations/layout/README.md), which dictates its sticky behavior. Add `dist/layout` as well if your page uses the `micl-window` / `micl-panes` / `micl-pane` structure.

Alternatively, import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
[Interact with a live example](https://henkpb.github.io/micl/appbar.html) of the App Bar component.

## Anatomy
Within the [layout foundation](../../foundations/layout/README.md)'s `micl-window` / `micl-panes` / `micl-pane` structure, the app bar uses a negative inline margin to offset the window margin. This allows its background color to span the full width of the window while keeping its content aligned with the margin. When the window contains a `<nav class="micl-navigationrail">`, the app bar aligns its leading edge against the rail instead. Both rules are managed by the layout foundation, not this component.

### Leading content
Use the `micl-appbar__leading` class for an element (or `micl-appbar__leading-icon` for an icon) placed before the headline. An app bar without leading content aligns its headline directly with the window margin.

Because the *icon* itself is aligned to the window margin rather than the button boundary around it, the `micl-appbar__leading-icon` and `micl-appbar__trailing-icon` classes pull an icon button outward by half the difference between its container and its icon size.

**Example: An app bar with a home link**

```HTML
<header class="micl-appbar">
  <a href="index.html" class="micl-appbar__leading-icon micl-iconbutton-standard-s" aria-label="Home">
    <span class="material-symbols-outlined" aria-hidden="true">home</span>
  </a>
  <div class="micl-appbar__headline">
    <h1>Headline</h1>
  </div>
</header>
```

### Trailing content
Use the `micl-appbar__trailing` class for elements (or `micl-appbar__trailing-icon` for icons) placed after the headline.

**Example: An app bar with a settings button**

```HTML
<header class="micl-appbar">
  <div class="micl-appbar__headline">
    <h1>Headline</h1>
  </div>
  <button type="button" class="micl-appbar__trailing-icon micl-iconbutton-standard-s material-symbols-outlined" aria-label="Settings">settings</button>
</header>
```

You can place up to five trailing elements side by side. They are laid out in document order and end at the window margin.

**Example: An app bar with three actions**

```HTML
<header class="micl-appbar">
  <div class="micl-appbar__headline">
    <h1>Headline</h1>
  </div>
  <button type="button" class="micl-appbar__trailing-icon micl-iconbutton-standard-s material-symbols-outlined" aria-label="Search">search</button>
  <button type="button" class="micl-appbar__trailing-icon micl-iconbutton-standard-s material-symbols-outlined" aria-label="Share">share</button>
  <button type="button" class="micl-appbar__trailing-icon micl-iconbutton-standard-s material-symbols-outlined" aria-label="More options">more_vert</button>
</header>
```

> [!NOTE]
> An icon button whose only content is a ligature has no accessible name of its own, so you must provide an `aria-label`. Do not use `aria-hidden` on a focusable element; this leaves the button in the tab order while hiding it from assistive technologies.

## Variants
The app bar component supports three sizes: **small**, **medium** (flexible), and **large** (flexible). Use a modifier class to specify a size other than the default small.

* **Small** (default): `<header class="micl-appbar">`
* **Medium**: `<header class="micl-appbar micl-appbar--medium">`
* **Large**: `<header class="micl-appbar micl-appbar--large">`

To center the headline and subtitle, add the `micl-appbar__headline--center` class to the headline container. Because it centers based on the full width of the app bar, leading and trailing content of varying widths will not pull the text off center.

In a small app bar, the headline and subtitle remain on a single line and truncate with an ellipsis if they exceed the available space. A medium or large app bar allows its headline to wrap and grow taller—unless it [collapses on scroll](#collapsing-on-scroll).

**Example: A medium-sized app bar with centered text**

```HTML
<header class="micl-appbar micl-appbar--medium">
  <div class="micl-appbar__headline micl-appbar__headline--center">
    <h1>Headline</h1>
    <p class="micl-appbar__subtitle">Subtitle</p>
  </div>
</header>
```

### Sticky app bar
The app bar is "glued" to the top of the page when any of the following conditions are met:

* The [pane area](../../foundations/layout/README.md) contains only one pane.
* The pane area contains two or more panes and the window is at the compact breakpoint.
* The pane area contains two or more panes, has the `micl-panes--stacked-to-expanded` class, and the window is at the compact or medium breakpoint.
* The pane area contains two or more panes, has the `micl-panes--stacked-to-large` class, and the window is at the compact, medium, or expanded breakpoint.
* The pane area contains two or more panes, has the `micl-panes--stacked-to-extralarge` class, and the window is at the compact, medium, expanded, or large breakpoint.
* The app bar has the `micl-appbar--sticky` class.

Adding the `micl-appbar--not-sticky` class prevents the app bar from sticking to the top of the page. This opts out of the automatic conditions listed above, but it will not override an explicit `micl-appbar--sticky` class.

A sticky app bar swaps its background color as soon as the page content moves underneath it. This change is driven by the page's scroll position and completes within the first 8px of scrolling.

### Collapsing on scroll
A sticky medium or large app bar collapses to the height of a small app bar as the page scrolls. Because the bar must calculate its height before laying out the headline, a collapsing app bar forces the headline onto a single line and truncates it with an ellipsis, mimicking a small app bar. A medium or large app bar that is *not* sticky wraps its headline and grows instead.

> [!NOTE]
> Collapsing is part of the same scroll-driven effect as the background color change. Browsers without support for this feature (see [Compatibility](#compatibility)) will simply maintain the app bar at its expanded height.

## Theming
Each app bar can be themed using CSS custom properties that follow the Material Design 3 component-token naming convention. Apply them to any appropriate parent element to affect its child app bars.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-app-bar-container-color` | The background color of the app bar | inherited from the page |
| `--md-comp-app-bar-on-scroll-container-color` | The background color while the page is scrolled | `--md-sys-color-surface-container` |
| `--md-comp-app-bar-title-color` | The text color of the headline | `--md-sys-color-on-surface` |
| `--md-comp-app-bar-subtitle-color` | The text color of the subtitle | `--md-sys-color-on-surface-variant` |
| `--md-comp-app-bar-leading-icon-color` | The color of the leading icon | `--md-sys-color-on-surface` |
| `--md-comp-app-bar-trailing-icon-color` | The color of the trailing icons | `--md-sys-color-on-surface-variant` |

## Compatibility
This component uses the `animation-timeline` CSS property for the scroll effect, which may not be supported in all browsers. Check [MDN Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline#browser_compatibility) for details.

Because the effect is wrapped in an `@supports` rule, it degrades gracefully. Browsers without scroll-driven animations still stick the app bar to the top of the page, but the app bar retains its unscrolled background color, and medium/large bars remain at their expanded height rather than collapsing.

Collapsing also relies on [anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) to allow the headline to calculate its target inline position without relying on JavaScript to measure the leading element. This has its own `@supports` rule: a browser that supports scroll-driven animations but lacks anchor positioning will still swap the container color on scroll, but will leave medium and large bars at their expanded height. No other component features depend on these APIs.
```
