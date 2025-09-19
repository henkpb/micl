# App Bar
This component implements the the [Material Design 3 Expressive App Bar](https://m3.material.io/components/app-bars/overview) design.

## Basic Usage

### HTML
To add a basic (small) app bar, use the `<header>` element with the `micl-appbar` class:

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

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Demo
A live example of the [App Bar component](https://henkpb.github.io/micl/index.html) is available for you to interact with.

## Variants
There are three types of app bars: **small**, **medium** (flexible) and **large** (flexible). To specify a type, add the appropriate class:

**Example: A large app bar**

```HTML
<header class="micl-appbar micl-appbar--large">
  ...
</header>
```

To center-align the text in an app bar, include the `micl-appbar__headline--center` class:

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
Use the `micl-appbar__leading` (or: `micl-appbar__leading-icon`) class for an element (or: icon) that is positioned before the text area of the app bar.

**Example: An app bar with a home-link**

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
Use the `micl-appbar__trailing` (or: `micl-appbar__trailing-icon`) class for an element (or: icon) that is positioned after the text area of the app bar.

**Example: An app bar with a settings-button**

```HTML
<header class="micl-appbar">
  <div class="micl-appbar__headline">
    <h1>Headline</h1>
  </div>
  <button type="button" class="micl-appbar__trailing micl-iconbutton-tonal-s micl-iconbutton--wide material-symbols-outlined">settings</button>
</header>
```

### Sticky app bar
The app bar is 'glued' to the top of the page when one of the following conditions is met:

- The [body region](../../layout/README.md) contains only one pane.
- The body region contains two or more panes and the page has a compact size.
- The body region contains two or more panes, has the `micl-body--stacked-to-expanded` class and the page has a compact or medium size.
- The body region contains two or more panes, has the `micl-body--stacked-to-large` class and the page has a compact, medium or expanded size.
- The body region contains two or more panes, has the `micl-body--stacked-to-extralarge` class and the page has a compact, medium, expanded or large size.
- The app bar has the `micl-appbar--sticky` class.

Adding the `micl-appbar--not-sticky` class to the app bar will avoid gluing the app bar to the top of the page.

## Compatibility
This component uses the `animation-timeline` CSS property for the scroll-effect, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline#browser_compatibility) for details.
