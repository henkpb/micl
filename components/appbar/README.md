# App Bar
This component implements the [Material Design 3 Expressive App Bar](https://m3.material.io/components/app-bars/overview) design. The app bar serves as the top container for a page, displaying the page title, primary actions, and navigation options.

## Basic Usage

### HTML
To add a basic (small) app bar, use the `<header>` element with the `micl-appbar` class. The `<h1>` and `<p>` elements within the `.micl-appbar__headline` `<div>` define the main headline and an optional subtitle.

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
@use "material-inspired-component-library/dist/appbar";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [App Bar component](https://henkpb.github.io/micl/index.html) is available to interact with.

## Variants
The app bar component supports three sizes: **small**, **medium** (flexible), and **large** (flexible). Use a modifier class to specify a size other than the default small size.

- **Small** (default): `<header class="micl-appbar">`
- **Medium**: `<header class="micl-appbar micl-appbar--medium">`
- **Large**: `<header class="micl-appbar micl-appbar--large">`

To center the headline and subtitle, add the `micl-appbar__headline--center` class to the headline container.

**Example: A medium-sized app bar with centered text**

```HTML
<header class="micl-appbar micl-appbar--medium">
  <div class="micl-appbar__headline micl-appbar__headline--center">
    <h1>Headline</h1>
    <p class="micl-appbar__subtitle">Subtitle</p>
  </div>
</header>
```

### Leading content
Use the `micl-appbar__leading` (or: `micl-appbar__leading-icon`) class for an element (or: icon) placed before the headline.

**Example: An app bar with a home link**

```HTML
<header class="micl-appbar">
  <a href="index.html" class="micl-appbar__leading-icon micl-link micl-iconbutton-standard-m" aria-label="Home">
    <span class="material-symbols-outlined" aria-hidden="true">home</span>
  </a>
  <div class="micl-appbar__headline">
    <h1>Headline</h1>
  </div>
</header>
```

### Trailing content
Use the `micl-appbar__trailing` (or: `micl-appbar__trailing-icon`) class for elements (or: icons) placed after the headline.

**Example: An app bar with a settings-button**

```HTML
<header class="micl-appbar">
  <div class="micl-appbar__headline">
    <h1>Headline</h1>
  </div>
  <button type="button" class="micl-appbar__trailing micl-iconbutton-tonal-s micl-iconbutton--wide material-symbols-outlined" aria-hidden="true">settings</button>
</header>
```

### Sticky app bar
The app bar is 'glued' to the top of the page when one of the following conditions is met:

- The [body region](../../foundations/layout/README.md) contains only one pane.
- The body region contains two or more panes and the page has a compact size.
- The body region contains two or more panes, has the `micl-body--stacked-to-expanded` class and the page has a compact or medium size.
- The body region contains two or more panes, has the `micl-body--stacked-to-large` class and the page has a compact, medium or expanded size.
- The body region contains two or more panes, has the `micl-body--stacked-to-extralarge` class and the page has a compact, medium, expanded or large size.
- The app bar has the `micl-appbar--sticky` class.

Adding the `micl-appbar--not-sticky` class to the app bar will prohibit gluing the app bar to the top of the page.

## Theming
Each app bar can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child app bars.

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-app-bar-container-color | The background color of the app bar | inherited from the page |
| --md-comp-app-bar-on-scroll-container-color | The background color while the page is scrolled | --md-sys-color-surface-container |
| --md-comp-app-bar-title-color | The text color of the headline | --md-sys-color-on-surface |
| --md-comp-app-bar-subtitle-color | The text color of the subtitle | --md-sys-color-on-surface-variant |
| --md-comp-app-bar-leading-icon-color | The color of the leading icon | --md-sys-color-on-surface |
| --md-comp-app-bar-trailing-icon-color | The color of the trailing icons | --md-sys-color-on-surface-variant |

## Compatibility
This component uses the `animation-timeline` CSS property for the scroll-effect, which may not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline#browser_compatibility) for details.
