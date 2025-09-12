# Layout
This guide explains how the [Material Design 3 Layout](https://m3.material.io/foundations/layout/understanding-layout/overview) guidelines can be implemented using MICL CSS classes.

## Basic Layout

### HTML
A basic layout contains a navigation region and a body region, which in turn consists of one or more panes.

```HTML
<body class="micl-window">
  <nav id="micl-navigationrail">
    ...
  </nav>
  <main class="micl-body">
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

## Parts of a Layout

### Window
Add the `micl-window` class to the `<body>` element to set basic styles for the main area of the product. For example, it sets the horizontal margins of the window and its background color.

If you are creating a layout in spatial environments where the main parts of the layout are separated, add the `micl-window--spatial` to the `<body>` element as well. This will cause the background you have specified for the `<body>` element to become visible.

### Navigation region
Use the [**Navigation Rail** component](../components/navigationrail/README.md) to display the destinations in the product.

### Body region
The body region contains most of the content. Use the `<main>` element with the `micl-body` class.

#### Panes
The body region is divided into 1-3 panes of various widths. Use an element like the `<section>` element with the `micl-pane` class to define a pane with flexible width. Add the `micl-pane--fixed` to define a pane with fixed width.

Use a `<div>` element with the `micl-pane__columns` class to divide the content in a pane in multiple columns.

```HTML
<section class="micl-pane">
  <header class="micl-appbar">
    ...
  </header>
  <div class="micl-pane__columns">
    <div class="micl-pane__column">
      ...
    </div>
    <div class="micl-pane__column">
      ...
    </div>
  </div>
</section>
```

When horizontal space allows, panes are presented next to each other. When the window width changes, panes may be hidden, depending on the CSS class defined on the pane.

| CSS class | Description |
| --------- | ----------- |
| micl-pane--hidden-to-medium | The pane is hidden in a compact sized window only. |
| micl-pane--hidden-to-expanded | The pane is hidden in a compact or medium sized window. |
| micl-pane--hidden-to-large | The pane is hidden in a compact, medium or expanded sized window. |
| micl-pane--hidden-to-extralarge | The pane is visible in an extra-large sized window only. |

Panes may also change position when the window width changes, depending on the CSS class defined on the element with the `micl-body` class.

| CSS class | Description |
| --------- | ----------- |
| micl-body--reflow-to-medium | Reflow panes in a compact sized window only. |
| micl-body--reflow-to-expanded | Reflow panes in a compact or medium sized window only. |
| micl-body--reflow-to-large | Reflow panes in a compact, medium or expanded sized window only. |
| micl-body--reflow-to-extralarge | Always reflow panes, except in a extra-large sized window. |

