# Layout
This guide explains how to use Material-Inspired Component Library (MICL) CSS classes to implement the [Material Design 3 Layout](https://m3.material.io/foundations/layout/understanding-layout/overview) guidelines.

## Basic Layout Structure

### HTML
A standard layout is comprised of a **navigation region** and a **body region**. The body region itself is divided into one or more **panes**.

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

## Layout Components Explained

### Window
The **window** is the entire viewport of your application. Add the `micl-window` class to the `<body>` element to apply fundamental layout styles, such as horizontal margins and the background color.

For **spatial environments** where the main layout parts are visually separated, add the `micl-window--spatial` class. This makes the `<body>` background visible, allowing you to use a custom background image or color.

```HTML
<body class="micl-window micl-window--spatial" style="background-image:url('landscape.webp')">
  ...
</body>
```

### Navigation region
Use the dedicated [Navigation Rail](../components/navigationrail/README.md) component to display the main destinations in your application.

### Body region
The body region holds the majority of your app's content. Use the `<main>` element with the `micl-body` class to define this area.

#### Panes
Panes divide the body region into 1 to 3 distinct vertical areas. Use an element like the `<section>` element with the `micl-pane` class to create a pane with a **flexible width** that adapts to its content. To create a pane with a **fixed width**, add the `micl-pane--fixed` class.

To ensure that flexible panes distribute space evenly among themselves, add the `micl-body--evenly` class to the `micl-body` container.

##### Responsive pane behavior
Panes respond to window width changes by either stacking or becoming hidden. The following classes control this behavior:

###### Hiding panes
These classes hide a pane based on the window's size, following Material Design's responsive breakpoints.

| CSS class | Description |
| --------- | ----------- |
| micl-pane--hidden-to-medium | Hides the pane in compact-sized windows. |
| micl-pane--hidden-to-expanded | Hides the pane in compact and medium-sized windows. |
| micl-pane--hidden-to-large | Hides the pane in compact, medium and expanded-sized windows. |
| micl-pane--hidden-to-extralarge | Hides the pane in all sizes except extra-large. |

###### Stacking panes
Add one of these classes to the `micl-body` container to determine when panes should stack vertically instead of aligning horizontally.

| CSS class | Description |
| --------- | ----------- |
| micl-body--stacked-to-medium | Panes stack vertically in compact-sized windows. |
| micl-body--stacked-to-expanded | Panes stack vertically in compact and medium-sized windows. |
| micl-body--stacked-to-large | Panes stack vertically in compact, medium, and expanded-sized windows. |
| micl-body--stacked-to-extralarge | Panes stack vertically in all sizes except extra-large. |

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
| micl-pane__columns--stacked-to-medium | Columns stack vertically in compact-sized windows. |
| micl-pane__columns--stacked-to-expanded | Columns stack vertically in compact and medium-sized windows. |
| micl-pane__columns--stacked-to-large | Columns stack vertically in compact, medium, and expanded-sized windows. |
| micl-pane__columns--stacked-to-extralarge | Columns stack vertically in all sizes except extra-large. |

## Customizations
You can customize the layout settings by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-layout-pane-spacer | 24px |  |

**Example: Changing the space between panes**

```HTML
<body style="--md-sys-layout-pane-spacer:32px">
  <main class="micl-body">
    ...
  </main>
</body>
```
