# Layout
This guide explains how to use Material-Inspired Component Library (MICL) CSS classes to implement the [Material Design 3 Layout](https://m3.material.io/foundations/layout/layout-overview) guidelines.

## Basic Layout Structure

### HTML
A standard layout follows the Material layout scaffold: a **rail region** that holds the navigation, and a pane area that is divided into one or more **panes** holding the content.

```HTML
<body class="micl-window">
  <nav id="micl-navigationrail">
    ...
  </nav>
  <main class="micl-panes">
    <section class="micl-pane">
      <header class="micl-appbar">
        ...
      </header>
      <div>
        ...app content...
      </div>
    </section>
  </main>
</body>
```

### CSS
Import the layout styles into your project:

```CSS
@use "material-inspired-component-library/dist/layout";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

## Layout Components Explained

### Window
The **window** is the entire viewport of your application. Add the `micl-window` class to the `<body>` element to apply fundamental layout styles, such as horizontal margins and the background color.

For **spatial environments** where the main layout parts are visually separated, add the `micl-window--spatial` class. This makes the `<body>` background visible, allowing you to use a custom background image or color.

```HTML
<body class="micl-window micl-window--spatial" style="background-image:url('landscape.webp')">
  ...
</body>
```

#### Safety regions
The window reserves the **safety regions** — the zones occupied by system UI such as the status bar, display cutouts, and the gesture bar — in addition to its margins, so that no content is covered by system UI. Sticky elements like the app bar and the navigation rail stay below the top safety region while scrolling.

Safety regions only exist when the page spans the full screen. To opt in, extend the viewport meta tag with `viewport-fit=cover`:

```HTML
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Components that attach to a screen edge, such as the [Navigation Bar](../../components/navigationbar/README.md) and the Snackbar, handle their own safety insets.

### Rail region
Use the dedicated [Navigation Rail](../../components/navigationrail/README.md) component in the rail region to display the main destinations in your application.

### Pane area
The pane area holds the majority of your app's content. Use the `<main>` element with the `micl-panes` class to define this area.

#### Panes
Panes divide the pane area into 1 to 3 distinct vertical areas. Use an element like the `<section>` element with the `micl-pane` class to create a pane with a **flexible width** that adapts to its content. To create a pane with a **fixed width**, add the `micl-pane--fixed` class.

Following the Material guidelines, a fixed pane is 360px wide at the expanded breakpoint and 412px wide at the large and extra-large breakpoints. At the compact and medium breakpoints — where fixed-and-flexible layouts are not recommended — a fixed pane is sized by its content. Override the default width with the `--md-sys-layout-pane-fixed-width` variable. When panes are stacked vertically, fixed panes span the full width like any other pane.

To ensure that flexible panes distribute space evenly among themselves, add the `micl-panes--evenly` class to the `micl-panes` container.

##### Split-pane layout
To create a split-pane layout with two flexible panes, add the `micl-panes--split` class to the `micl-panes` container. The panes then meet at the horizontal center of the window, keeping the spacer between them visually centered — ideal for foldable devices, where the spacer aligns with the hinge. A navigation rail only reduces the width of the first pane; the second pane always spans half of the window.

```HTML
<main class="micl-panes micl-panes--split micl-panes--stacked-to-expanded">
  <section class="micl-pane">...</section>
  <section class="micl-pane">...</section>
</main>
```

The split sizing only applies while the panes are side by side; when a `micl-panes--stacked-to-*` class stacks the panes vertically, they revert to their natural height.

##### Adaptive pane behavior
Panes adapt to window width changes by either stacking or becoming hidden. The following classes control this behavior:

###### Hiding panes
These classes hide a pane based on the window's width, following Material Design's breakpoints.

| CSS class | Description |
| --------- | ----------- |
| `micl-pane--hidden-to-medium` | Hides the pane at the compact breakpoint. |
| `micl-pane--hidden-to-expanded` | Hides the pane at the compact and medium breakpoints. |
| `micl-pane--hidden-to-large` | Hides the pane at the compact, medium, and expanded breakpoints. |
| `micl-pane--hidden-to-extralarge` | Hides the pane at all breakpoints except extra-large. |

###### Stacking panes
Add one of these classes to the `micl-panes` container to determine when panes should stack vertically instead of aligning horizontally.

| CSS class | Description |
| --------- | ----------- |
| `micl-panes--stacked-to-medium` | Panes stack vertically at the compact breakpoint. |
| `micl-panes--stacked-to-expanded` | Panes stack vertically at the compact and medium breakpoints. |
| `micl-panes--stacked-to-large` | Panes stack vertically at the compact, medium, and expanded breakpoints. |
| `micl-panes--stacked-to-extralarge` | Panes stack vertically at all breakpoints except extra-large. |

###### Columns within panes
You can further divide the content within a pane into multiple columns by using a `<div>` with the `micl-pane__columns` class. Use the `micl-pane__column` class for each column.

```HTML
<section class="micl-pane">
  <header class="micl-appbar">
    ...
  </header>
  <div class="micl-pane__columns">
    <div class="micl-pane__column">...</div>
    <div class="micl-pane__column">...</div>
  </div>
</section>
```

To evenly distribute space between columns, add the `micl-pane__columns--evenly` class to the `micl-pane__columns` container.

Add one of these classes to the `micl-pane__columns` container to determine when columns should stack vertically instead of aligning horizontally.

| CSS class | Description |
| --------- | ----------- |
| `micl-pane__columns--stacked-to-medium` | Columns stack vertically at the compact breakpoint. |
| `micl-pane__columns--stacked-to-expanded` | Columns stack vertically at the compact and medium breakpoints. |
| `micl-pane__columns--stacked-to-large` | Columns stack vertically at the compact, medium, and expanded breakpoints. |
| `micl-pane__columns--stacked-to-extralarge` | Columns stack vertically at all breakpoints except extra-large. |

## Theming
You can customize the layout settings by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| `--md-sys-layout-pane-spacer` | The space between two panes. | 24px |
| `--md-sys-layout-pane-fixed-width` | The width of `micl-pane--fixed` panes at the expanded (360px) and larger (412px) breakpoints. Unset at smaller breakpoints, where fixed panes are sized by their content. | 360px / 412px |

**Example: Changing the space between panes**

```HTML
<body style="--md-sys-layout-pane-spacer:32px">
  <main class="micl-panes">
    ...
  </main>
</body>
```
