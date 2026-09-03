# Navigation rail
This component implements the [Material Design 3 Expressive Navigation rail](https://m3.material.io/components/navigation-rail/overview) design. A navigation rail houses destinations and functionality for the application.

## Basic Usage

### HTML
To create a simple navigation rail, use a `<nav>` element with the `micl-navigationrail` class. Inside, use anchor elements `<a>` to create the selectable navigation items.

```HTML
<nav id="mynavigationrail" class="micl-navigationrail">
  <div class="micl-navigationrail__content" role="menu">
    <a href="#" class="micl-navigationrail__item" role="menuitem" aria-current="page">
      <span class="micl-navigationrail__icon material-symbols-outlined" aria-hidden="true">inbox</span>
      <span class="micl-navigationrail__text">Inbox</span>
    </a>
    <a href="#" class="micl-navigationrail__item" role="menuitem">
      <span class="micl-navigationrail__icon material-symbols-outlined" aria-hidden="true">outbox</span>
      <span class="micl-navigationrail__text">Outbox</span>
    </a>
  </div>
</nav>
```

### CSS
Import the navigation rail styles into your project:

```CSS
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/navigationrail";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Navigation rail component](https://henkpb.github.io/micl/navigationrail.html) is available to interact with.

## Variants
The basic example creates a **collapsed** navigation rail. Add a menu button to allow the user to toggle between a **collapsed** and an **expanded** view.

```HTML
<nav id="mynavigationrail" class="micl-navigationrail">
  <div class="micl-navigationrail__headline">
    <button
      type="button"
      id="mybutton"
      class="micl-iconbutton-standard-s micl-button--toggle material-symbols-outlined"
      aria-pressed="false"
      command="--micl-toggle"
      commandfor="mybutton"
      data-miclicon="menu"
      data-micliconselected="menu_open"
      aria-label="Toggle navigation rail"
    ></button>
  </div>
  <div class="micl-navigationrail__content" role="menu">
    ...
  </div>
</nav>
```

When the user clicks the menu button, the navigation rail is expanded and the toggle button is given `aria-pressed="true"` and the `micl-button--toggled` class that indicates that the toggle button has been clicked at least once.

### Modal navigation rail

A **modal** navigation rail is hidden until the user clicks a menu button. When shown, the **expanded** navigation rail is displayed on top of other page content. Use a `<dialog>` element instead of a `<nav>`.

```HTML
<dialog id="mynavigationrail" class="micl-navigationrail" closedby="closerequest" aria-modal="true">
  <div class="micl-navigationrail__headline">
    <button
      type="button"
      class="micl-iconbutton-standard-s material-symbols-outlined"
      command="close"
      commandfor="mynavigationrail"
      aria-label="Close navigation rail"
      autofocus
    >menu_open</button>
  </div>
  <div class="micl-navigationrail__content" role="menu">
    ...
  </div>
</dialog>

<button
  type="button"
  class="micl-iconbutton-standard-s material-symbols-outlined"
  command="show-modal"
  commandfor="mynavigationrail"
  aria-label="Open navigation rail"
>menu</button>
```

The button inside the navigation rail is used to hide the navigation rail, while the button outside is responsible for opening it.

### Adaptive navigation rail

An **adaptive** navigation rail is permanently visible as a standard (expanded) navigation rail on wide screens, and acts as a modal navigation rail on narrow screens. Add one of the following modifier classes to a modal navigation rail:

| Class | Modal below | Standard from |
| ----- | ----------- | ------------- |
| `micl-navigationrail--modal-to-medium` | `600px` | `600px` |
| `micl-navigationrail--modal-to-expanded` | `840px` | `840px` |
| `micl-navigationrail--modal-to-large` | `1200px` | `1200px` |
| `micl-navigationrail--modal-to-extralarge` | `1600px` | `1600px` |

```HTML
<dialog id="mynavigationrail" class="micl-navigationrail micl-navigationrail--modal-to-expanded" closedby="closerequest">
  ...
</dialog>
```

Place the `<dialog>` element where a standard `<nav>` navigation rail would go, so that it occupies its usual position when the wide-screen layout applies. The open and close buttons only serve the modal behaviour, so hide them on wide screens, for example:

```CSS
@media (min-width: 840px) {
  [commandfor="mynavigationrail"] {
    display: none;
  }
}
```

> [!NOTE]
> If the modal navigation rail is open while the window is resized across the breakpoint, it remains modal until dismissed, after which it becomes the permanently visible standard rail.

## Theming
Each navigation rail can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-nav-rail-divider-thickness` | The width of the vertical divider at the end of the rail | `0px` |
| `--md-comp-nav-rail-divider-color` | The color of the vertical divider | `--md-comp-divider-color` |
| `--md-comp-nav-rail-collapsed-container-width` | The width of the collapsed navigation rail | `96px` |
| `--md-comp-nav-rail-collapsed-container-color` | The background color of the collapsed navigation rail | `--md-sys-color-surface` |
| `--md-comp-nav-rail-collapsed-container-elevation` | The shadow (elevation) of the collapsed navigation rail | `--md-sys-elevation-level0` |
| `--md-comp-nav-rail-collapsed-container-shape` | The corner rounding of the collapsed navigation rail | `0px` |
| `--md-comp-nav-rail-collapsed-top-space` | The space between the top edge and the header of the collapsed navigation rail | `44px` |
| `--md-comp-nav-rail-collapsed-item-vertical-space` | The space between the icon and the label of a collapsed item | `4px` |
| `--md-comp-nav-rail-expanded-container-width-minimum` | The smallest allowed width of the expanded navigation rail | `220px` |
| `--md-comp-nav-rail-expanded-container-width-maximum` | The largest allowed width of the expanded navigation rail | `360px` |
| `--md-comp-nav-rail-expanded-container-color` | The background color of the expanded navigation rail | `--md-sys-color-surface` |
| `--md-comp-nav-rail-expanded-container-elevation` | The shadow (elevation) of the expanded navigation rail | `--md-sys-elevation-level0` |
| `--md-comp-nav-rail-expanded-container-shape` | The corner rounding of the expanded navigation rail | `0px` |
| `--md-comp-nav-rail-expanded-top-space` | The space between the top edge and the header of the expanded navigation rail | `44px` |
| `--md-comp-nav-rail-expanded-modal-container-color` | The background color of the modal navigation rail | `--md-sys-color-surface-container` |
| `--md-comp-nav-rail-expanded-modal-container-elevation` | The shadow (elevation) of the modal navigation rail | `--md-sys-elevation-level2` |
| `--md-comp-nav-rail-expanded-modal-container-shape` | The corner rounding of the modal navigation rail, applied to the two corners facing the content | `--md-sys-shape-corner-large` |
| `--md-comp-nav-rail-item-icon-size` | The size of the item icons | `--md-sys-icon-size` |
| `--md-comp-nav-rail-item-container-shape` | The corner rounding of an item's active indicator | half the item height |
| `--md-comp-nav-rail-item-container-vertical-space` | The vertical space between items | `6px` |
| `--md-comp-nav-rail-item-header-space-minimum` | The minimum space between the header and the first item | `40px` |
| `--md-comp-nav-rail-item-short-container-height` | The height of items in an expanded navigation rail, and of items without a label | `56px` |
| `--md-comp-nav-rail-item-vertical-active-indicator-width` | The width of an item's active indicator in a collapsed navigation rail | `56px` |
| `--md-comp-nav-rail-item-vertical-active-indicator-height` | The height of an item's active indicator in a collapsed navigation rail | `32px` |
| `--md-comp-nav-rail-item-active-indicator-leading-space` | The space between the start edge of the active indicator and the icon | `16px` |
| `--md-comp-nav-rail-item-active-indicator-trailing-space` | The space between the icon and the end edge of the active indicator | `16px` |
| `--md-comp-nav-rail-item-active-indicator-icon-label-space` | The space between the icon and the label of an expanded item | `8px` |
| `--md-comp-nav-rail-item-horizontal-full-width-trailing-space` | The space between the end of an expanded item's click target and the container edge | `16px` |

**Example: Changing the width of the collapsed navigation rail**

```HTML
<div style="--md-comp-nav-rail-collapsed-container-width:80px">
  <nav id="mynavigationrail" class="micl-navigationrail">
    ...
  </nav>
</div>
```

To add a vertical divider to the navigation rail, set the following CSS variable:

```CSS
#mynavigationrail {
  --md-comp-nav-rail-divider-thickness: 1px;
}
```
