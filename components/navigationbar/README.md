# Navigation bar
This component implements the [Material Design 3 Expressive Navigation bar](https://m3.material.io/components/navigation-bar/overview) design. The navigation bar provides ergonomic access to primary application destinations on smaller devices, anchored to the bottom of the screen.

## Basic Usage

### HTML
To create a navigation bar, use a `<nav>` element with the `micl-navigationbar` class. Inside, use anchor elements `<a>` to create the selectable navigation items. An item is built like an item of the [Navigation rail](../navigationrail/README.md), which shares its anatomy, states and colors. Give the `<nav>` an `aria-label`, so that it can be told apart from the other navigation landmarks on the page.

Keep labels short. Labels are laid out on a single line; any overflowing text is truncated with an ellipsis.

```HTML
<nav id="mynavigationbar" class="micl-navigationbar" aria-label="Main">
  <div class="micl-navigationbar__content">
    <a href="#" class="micl-navigationbar__item" aria-current="page">
      <span class="micl-navigationbar__icon material-symbols-outlined" aria-hidden="true">inbox</span>
      <span class="micl-navigationbar__text">Inbox</span>
    </a>
    <a href="#" class="micl-navigationbar__item">
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
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/badge";
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

## Anatomy
A navigation bar consists of a root container and a row of three to five destinations. Unlike the navigation rail, it does not include a header.

| Element | Meaning |
| --- | --- |
| `nav.micl-navigationbar` | The container, which is also the navigation landmark. It is fixed to the bottom of the screen. |
| `.micl-navigationbar__content` | The row of destinations. |
| `a.micl-navigationbar__item` | A destination. Give the one for the current page `aria-current="page"`. |
| `.micl-navigationbar__icon` | The item's icon, and the anchor of any badge in the item. |
| `.micl-navigationbar__text` | The item's label. |
| `.micl-badge` | An optional [badge](../badge/README.md). |

## Variants

### Tall navigation bar
The **tall** navigation bar is 80px high instead of 64px, with the items vertically centered.

```HTML
<nav class="micl-navigationbar micl-navigationbar--tall">
  ...
</nav>
```

### Horizontal items
On wider compact devices (such as phones in landscape mode), items can display their icon and label side-by-side in a single 40px-high pill.

```HTML
<nav class="micl-navigationbar micl-navigationbar--horizontal">
  ...
</nav>
```

### Adaptive navigation
An **adaptive** navigation bar acts as a navigation bar on narrow screens and is displayed as a permanently visible, collapsed [Navigation rail](../navigationrail/README.md) on wide screens. Add one of the following modifier classes:

| Class | Acts as Bar (max-width) | Acts as Rail (min-width) |
| ----- | ----------------------- | ------------------------ |
| `micl-navigationbar--bar-to-medium` | `600px` | `600px` |
| `micl-navigationbar--bar-to-expanded` | `840px` | `840px` |

```HTML
<nav class="micl-navigationbar micl-navigationbar--bar-to-medium">
  ...
</nav>
```

Place the `<nav>` element before the main content, where a standard navigation rail would go, so that it occupies its usual position when the wide-screen layout applies. On wide screens the component is themed by the `--md-comp-nav-rail-*` custom properties of the Navigation rail component. Do not combine the adaptive classes with the `micl-navigationbar--tall` or `micl-navigationbar--horizontal` variants.

### Badges

Put a [Badge component](../badge/README.md) inside a navigation item. It anchors itself to the item's icon, so neither an `anchor-name` nor a `position-anchor` has to be supplied.

```HTML
<a href="#" class="micl-navigationbar__item" aria-label="Inbox, 97 new messages">
  <span class="micl-navigationbar__icon material-symbols-outlined" aria-hidden="true">inbox</span>
  <span class="micl-navigationbar__text">Inbox</span>
  <span class="micl-badge" aria-hidden="true">97</span>
</a>
```

A `micl-badge--trailing` badge follows the label when the items are laid out horizontally. All other variants stack the icon above the label. Because this leaves no room after the label, the badge anchors directly to the icon instead. A badge without the modifier stays on the icon in all variants.

## Accessibility
* **Mark the current destination:** Give the item for the current page the `aria-current="page"` attribute. The component does not infer it.
* **Name the navigation bar:** A `<nav>` is a navigation landmark; give it an `aria-label` so assistive technologies can distinguish it from other navigation landmarks on the page.
* **Keep the link semantics:** The destinations are ordinary links in a navigation landmark. Do not give them the ARIA `menuitem` role, or their container the `menu` role.
* **Keep the focus indicator:** A keyboard-focused item draws a focus ring inside its active indicator, on top of the focus state layer.
* **Respect motion preferences:** The item ripple is automatically disabled if the user has requested reduced motion at the OS level.

## Theming
Each navigation bar can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-nav-bar-container-color` | The background color of the navigation bar | `--md-sys-color-surface-container` |
| `--md-comp-nav-bar-container-elevation` | The shadow (elevation) of the navigation bar | `--md-sys-elevation-level2` |
| `--md-comp-nav-bar-container-height` | The height of the navigation bar (excluding any safe-area inset) | `64px` |
| `--md-comp-nav-bar-tall-container-height` | The height of the tall navigation bar. Material Design has no token of its own for it | `80px` |
| `--md-comp-nav-bar-container-shape` | The corner rounding of the navigation bar | `0px` |
| `--md-comp-nav-bar-item-icon-size` | The size of the item icons | `--md-sys-icon-size` |
| `--md-comp-nav-bar-item-active-indicator-shape` | The corner rounding of an item's active indicator | half the indicator height |
| `--md-comp-nav-bar-item-active-indicator-icon-label-space` | The space between the icon and the label, in either arrangement | `4px` |
| `--md-comp-nav-bar-item-vertical-active-indicator-icon-label-space` | The space between the icon and the label of a vertical item, when it has to differ from the one above | `--md-comp-nav-bar-item-active-indicator-icon-label-space` |
| `--md-comp-nav-bar-item-horizontal-active-indicator-icon-label-space` | The space between the icon and the label of a horizontal item, when it has to differ from the one above | `--md-comp-nav-bar-item-active-indicator-icon-label-space` |
| `--md-comp-nav-bar-item-between-space` | The minimum space between two items. The items are spread evenly across the navigation bar, which normally leaves more room than this, so it only takes effect when a narrow navigation bar holds many items | `0px` |
| `--md-comp-nav-bar-item-vertical-active-indicator-width` | The width of an item's active indicator | `56px` |
| `--md-comp-nav-bar-item-vertical-active-indicator-height` | The height of an item's active indicator | `32px` |
| `--md-comp-nav-bar-item-horizontal-active-indicator-height` | The height of an item's active indicator with horizontal items | `40px` |
| `--md-comp-nav-bar-item-horizontal-active-indicator-leading-space` | The space between the start edge of a horizontal item's active indicator and the icon | `16px` |
| `--md-comp-nav-bar-item-horizontal-active-indicator-trailing-space` | The space between the label and the end edge of a horizontal item's active indicator | `16px` |
| `--md-comp-nav-bar-item-active-indicator-color` | The background color of the current item's active indicator | `--md-sys-color-secondary-container` |
| `--md-comp-nav-bar-item-active-icon-color` | The color of the current item's icon | `--md-sys-color-on-secondary-container` |
| `--md-comp-nav-bar-item-active-label-text-color` | The color of the current item's label | `--md-sys-color-secondary` |
| `--md-comp-nav-bar-item-inactive-icon-color` | The color of the icon of every other item | `--md-sys-color-on-surface-variant` |
| `--md-comp-nav-bar-item-inactive-label-text-color` | The color of the label of every other item | `--md-sys-color-on-surface-variant` |
| `--md-comp-nav-bar-item-state-layer-color` | The color of an item's hover, focus and pressed state layer, and of its ripple | `--md-sys-color-on-secondary-container` |

**Example: Changing the background color of the navigation bar**

```HTML
<nav class="micl-navigationbar" style="--md-comp-nav-bar-container-color:var(--md-sys-color-surface)">
  ...
</nav>
```

The shadow of the navigation bar is drawn by the elevation of its container, and is colored by the `--md-sys-color-shadow` system token rather than by one of its own.

## Compatibility

A navigation bar relies on a few recent CSS features. Where support is missing the navigation bar still renders and its destinations remain usable; what degrades is noted below.

| Feature | Used for | Without it |
| --- | --- | --- |
| [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) | Reserving room for the navigation bar at the bottom of the page | The bar overlaps the end of the page content, which then needs its own bottom padding |
| [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) | Placing a badge on an item's icon | Badges fall back to their static position in the item |
| [`dvh` units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#dvh) | Sizing the adaptive navigation bar while it acts as a navigation rail | Fall back to `100vh`, which overshoots on mobile browsers with a retracting toolbar |
