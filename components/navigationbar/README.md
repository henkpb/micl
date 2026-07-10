# Navigation bar
This component implements the [Material Design 3 Expressive Navigation bar](https://m3.material.io/components/navigation-bar/overview) design. A navigation bar lets people switch between UI views on smaller devices, anchored to the bottom of the screen.

## Basic Usage

### HTML
To create a navigation bar, use a `<nav>` element with the `micl-navigationbar` class. Inside, use anchor elements `<a>` to create the selectable navigation items. The markup mirrors the Navigation rail component.

```HTML
<nav id="mynavigationbar" class="micl-navigationbar">
  <div class="micl-navigationbar__content" role="menu">
    <a href="#" class="micl-navigationbar__item" role="menuitem" aria-current="page">
      <span class="micl-navigationbar__icon material-symbols-outlined" aria-hidden="true">inbox</span>
      <span class="micl-navigationbar__text">Inbox</span>
    </a>
    <a href="#" class="micl-navigationbar__item" role="menuitem">
      <span class="micl-navigationbar__icon material-symbols-outlined" aria-hidden="true">outbox</span>
      <span class="micl-navigationbar__text">Outbox</span>
    </a>
  </div>
</nav>
```

Use three to five items. The navigation bar is fixed to the bottom of the screen (respecting any safe-area inset), and the component automatically reserves matching space at the bottom of the page so that the content is not obscured.

> [!WARNING]
> The navigation bar component adds a `padding-block-end` CSS rule to the `<body>` element to reserve space for the bar. It matches the height of the displayed variant (including any safe-area inset) and is removed while an adaptive navigation bar is displayed as a navigation rail. Overriding this rule may cause page content to be obscured by the bar.

### CSS
Import the navigation bar styles into your project:

```CSS
@use "material-inspired-component-library/dist/navigationbar";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Navigation bar component](https://henkpb.github.io/micl/navigationbar.html) is available to interact with.

## Variants

### Tall navigation bar
The **tall** navigation bar is 80px high instead of 64px, with the items vertically centered.

```HTML
<nav class="micl-navigationbar micl-navigationbar--tall">
  ...
</nav>
```

### Horizontal items
On wider compact devices (for example phones in landscape), the items can show the icon and label side by side in a single 40px-high pill.

```HTML
<nav class="micl-navigationbar micl-navigationbar--horizontal">
  ...
</nav>
```

### Adaptive navigation
An **adaptive** navigation bar acts as a navigation bar on narrow screens and is displayed as a permanently visible, collapsed [Navigation rail](../navigationrail/README.md) on wide screens. Add one of the following modifier classes:

| Class | Navigation bar below | Navigation rail from |
| ----- | -------------------- | -------------------- |
| micl-navigationbar--bar-to-medium | 600px | 600px |
| micl-navigationbar--bar-to-expanded | 840px | 840px |

```HTML
<nav class="micl-navigationbar micl-navigationbar--bar-to-medium">
  ...
</nav>
```

Place the `<nav>` element before the main content, where a standard navigation rail would go, so that it occupies its usual position when the wide-screen layout applies. On wide screens the component is themed by the `--md-comp-nav-rail-*` custom properties of the Navigation rail component. Do not combine the adaptive classes with the `micl-navigationbar--tall` or `micl-navigationbar--horizontal` variants.

## Theming
Each navigation bar can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-nav-bar-container-color` | The background color of the navigation bar | `--md-sys-color-surface-container` |
| `--md-comp-nav-bar-container-elevation` | The shadow (elevation) of the navigation bar | `--md-sys-elevation-level2` |
| `--md-comp-nav-bar-container-height` | The height of the navigation bar (excluding any safe-area inset) | 64px |
| `--md-comp-nav-bar-tall-container-height` | The height of the tall navigation bar | 80px |
| `--md-comp-nav-bar-container-shape` | The corner rounding of the navigation bar | 0px |
| `--md-comp-nav-bar-item-icon-size` | The size of the item icons | `--md-sys-icon-size` |
| `--md-comp-nav-bar-item-active-indicator-shape` | The corner rounding of an item's active indicator | half the indicator height |
| `--md-comp-nav-bar-item-active-indicator-icon-label-space` | The space between the icon and the label | 4px |
| `--md-comp-nav-bar-item-vertical-active-indicator-width` | The width of an item's active indicator | 56px |
| `--md-comp-nav-bar-item-vertical-active-indicator-height` | The height of an item's active indicator | 32px |
| `--md-comp-nav-bar-item-horizontal-active-indicator-height` | The height of an item's active indicator with horizontal items | 40px |
| `--md-comp-nav-bar-item-horizontal-active-indicator-leading-space` | The space between the start edge of a horizontal item's active indicator and the icon | 16px |
| `--md-comp-nav-bar-item-horizontal-active-indicator-trailing-space` | The space between the label and the end edge of a horizontal item's active indicator | 16px |

**Example: Changing the background color of the navigation bar**

```HTML
<nav class="micl-navigationbar" style="--md-comp-nav-bar-container-color:var(--md-sys-color-surface)">
  ...
</nav>
```
