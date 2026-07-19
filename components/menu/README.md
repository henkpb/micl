# Menu
This component implements the [Material Design 3 Expressive Menu](https://m3.material.io/components/menus/overview) design. Menus provide a list of choices on a temporary surface that appears when a user interacts with a control element.

## Basic Usage

### HTML
The Menu component is an extension of the [List component](../list/README.md). It consists of a `<nav>` element with the `micl-menu` class, which acts as the container for a `<ul>` with the `micl-list` class. The menu can be opened and closed using a control element with the `popovertarget` attribute, where the value of the attribute matches the `id` of the menu's `<nav>` element.

```HTML
<nav id="mymenu" class="micl-menu" popover>
  <ul class="micl-list">
    <li class="micl-list-item-one" tabindex="0">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Menu item</span>
      </span>
    </li>
  </ul>
</nav>

<button type="button" popovertarget="mymenu">Open Menu</button>
```

Adding the `micl-list-item--disabled` class to a menu item causes the item to be displayed in a disabled state.

### CSS
Import the styles for both the menu and list components into your project:

```CSS
@use "material-inspired-component-library/dist/list";
@use "material-inspired-component-library/dist/menu";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript for functionality:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```
When loading individual JavaScript files, also load `dist/list` — it provides the keyboard navigation of the menu items.

This will initialize any Menu component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Menu component](https://henkpb.github.io/micl/menu.html) is available to interact with.

## Variants
Since the Menu component is based on the **List component**, all of its list item variants and content features can be used. You can incorporate icons, avatars, images, multiple lines of text, and more.

**Example: A menu with graphics and supporting text**

```HTML
<nav id="mymenu" class="micl-menu" popover>
  <ul class="micl-list">
    <li class="micl-list-item-two" tabindex="0">
      <span class="micl-list-item__icon material-symbols-outlined" aria-hidden="true">home</span>
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Home</span>
        <span class="micl-list-item__supporting-text">Click here to go home</span>
      </span>
    </li>
    <li class="micl-list-item-two">
      <span class="micl-list-item__image" style="background-image:url(https://...jpg)"></span>
      <label class="micl-list-item__text">
        <span class="micl-list-item__headline">Person</span>
        <span class="micl-list-item__supporting-text">This person is an administrator</span>
        <input type="checkbox" id="cb" class="micl-checkbox">
      </label>
    </li>
  </ul>
</nav>
```

**Example: A menu with a link**

To make a menu item function as a link, wrap its content in an `<a>` tag. This ensures the link is clickable but does not interfere with menu navigation.

```HTML
<nav id="mymenu" class="micl-menu" popover>
  <ul class="micl-list">
    <li class="micl-list-item-two" tabindex="0">
      <a href="https://www.nytimes.com" target="_blank">
        <span class="micl-list-item__icon material-symbols-outlined" aria-hidden="true">newspaper</span>
        <span class="micl-list-item__text">
          <span class="micl-list-item__headline">The New York Times</span>
          <span class="micl-list-item__supporting-text">Open the front page of The New York Times</span>
        </span>
      </a>
    </li>
  </ul>
</nav>
```

**Example: A menu with a submenu**

A menu item may trigger opening a submenu when invoked by a button. Wrap the menu item content in a `<button>` tag and add the `popovertarget` attribute that points to the submenu. The button acts then as the control element for the submenu.

```HTML
<nav id="mymenu" class="micl-menu" popover>
  <ul class="micl-list">
    <li class="micl-list-item-one" tabindex="0">
      <button popovertarget="mysubmenu">
        <span class="micl-list-item__text">
          <span class="micl-list-item__headline">Item 1</span>
        </span>
        <span class="micl-list-item__icon material-symbols-outlined">arrow_right</span>
      </button>
      <nav id="mysubmenu" class="micl-menu" popover>
        <ul class="micl-list">
          <li class="micl-list-item-one" tabindex="0">
            <span class="micl-list-item__text">
              <span class="micl-list-item__headline">Item 1-1</span>
            </span>
          </li>
          <li role="separator" class="micl-divider-inset"></li>
          <li class="micl-list-item-one">
            <span class="micl-list-item__text">
              <span class="micl-list-item__headline">Item 1-2</span>
            </span>
          </li>
        </ul>
      </nav>
    </li>
    <li class="micl-list-item-one">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Item 2</span>
      </span>
    </li>
  </ul>
</nav>
```

**Example: A vibrant menu**

Add the `micl-menu--vibrant` class to render the menu in a high-emphasis variant.

```HTML
<nav id="mymenu" class="micl-menu micl-menu--vibrant" popover>
  <ul class="micl-list">
    <li class="micl-list-item-one" tabindex="0">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Menu item</span>
      </span>
    </li>
  </ul>
</nav>
```

**Example: Grouping menu items**

Menu items can be grouped by including a [Divider component](../divider/README.md) or a small gap. To create a gap between groups of menu items, bundle similar menu items in different lists.

```HTML
<nav id="mymenu" class="micl-menu" popover>
  <ul class="micl-list">
    <li role="separator" class="micl-menu__section">File</li>
    <li class="micl-list-item-one" tabindex="0">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">New</span>
      </span>
    </li>
  </ul>
  <ul class="micl-list">
    <li role="separator" class="micl-menu__section">Edit</li>
    <li class="micl-list-item-one">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Cut</span>
      </span>
    </li>
  </ul>
</nav>
```

You may include an `<li>` with the `micl-menu__section` class to give the menu item group a descriptive title.

## Theming
Each menu can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention, as defined in the [Material Design 3 Expressive Menu Specification](https://m3.material.io/components/menus/specs). Set them on any appropriate parent element to affect its child menus.

### Container

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-menu-width-min` | The minimum width of a menu | `112px` |
| `--md-comp-menu-width-max` | The maximum width of a menu | `320px` |
| `--md-comp-menu-container-elevation` | The shadow (elevation) of the menu surface | `--md-sys-elevation-level2` |
| `--md-comp-menu-container-shape` | The corner rounding of the menu surface | `--md-sys-shape-corner-large` |
| `--md-comp-menu-active-container-shape` | The corner rounding while the menu is the frontmost menu | `--md-comp-menu-container-shape` |
| `--md-comp-menu-inactive-container-shape` | The corner rounding while one of its submenus is open | `--md-sys-shape-corner-small` |
| `--md-comp-menu-standard-container-color` | The background color of a standard menu | `--md-sys-color-surface-container-low` |
| `--md-comp-menu-vibrant-container-color` | The background color of a vibrant menu | `--md-sys-color-tertiary-container` |

### Item groups and section labels

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-menu-gap` | The gap between the item groups (the lists) of a menu | `2px` |
| `--md-comp-menu-group-padding` | The vertical padding inside an item group | `4px` |
| `--md-comp-menu-group-shape` | The corner rounding of the edges where two item groups meet | `--md-sys-shape-corner-small` |
| `--md-comp-menu-section-label-top-space` | The padding above a section label | `8px` |
| `--md-comp-menu-section-label-bottom-space` | The padding below a section label | `8px` |
| `--md-comp-menu-standard-section-label-text-color` | The text color of a section label in a standard menu | `--md-sys-color-on-surface-variant` |
| `--md-comp-menu-vibrant-section-label-text-color` | The text color of a section label in a vibrant menu | `--md-sys-color-on-tertiary-container` |

### Item layout

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-menu-item-height` | The height of a menu item | `44px` |
| `--md-comp-menu-item-top-space` | The padding above the item content | `8px` |
| `--md-comp-menu-item-bottom-space` | The padding below the item content | `8px` |
| `--md-comp-menu-item-leading-space` | The padding before the item content | `16px` |
| `--md-comp-menu-item-trailing-space` | The padding after the item content | `16px` |
| `--md-comp-menu-item-leading-icon-size` | The size of a leading icon | `20px` |
| `--md-comp-menu-item-trailing-icon-size` | The size of a trailing icon | `20px` |
| `--md-comp-menu-item-shape` | The corner rounding of a menu item | `--md-sys-shape-corner-small` |
| `--md-comp-menu-item-selected-shape` | The corner rounding of a selected menu item | `--md-sys-shape-corner-large` |
| `--md-comp-menu-item-focus-indicator-color` | The color of the keyboard focus indicator | `--md-sys-color-secondary` |
| `--md-comp-menu-item-focus-indicator-thickness` | The thickness of the keyboard focus indicator | `3px` |
| `--md-comp-menu-item-focus-indicator-offset` | The offset of the keyboard focus indicator | `-3px` |

### Item colors
The colors of menu items follow a naming pattern that combines the menu variant, the item's selection and interaction state, and the colored part:

```
--md-comp-menu-<variant>-menu-item[-selected][-<state>]-<part>-color
```

- `<variant>` is `standard` or `vibrant`.
- `selected` targets items that are checked or contain a checked checkbox or switch.
- `<state>` is one of `hovered`, `focused`, `pressed` or `disabled`; omit it for the resting state.
- `<part>` is one of `container`, `label-text`, `leading-icon`, `supporting-text`, `trailing-icon`, `trailing-supporting-text` or `state-layer`.

Every `state-layer` color has an `-opacity` companion (defaults: hovered 8%, focused 10%, pressed 10%), and so does every color of a `disabled` state (default: --md-sys-state-disabled-state-layer-opacity, 38%). The `container` part exists for the resting, `selected` and `selected-disabled` combinations only. For example, `--md-comp-menu-standard-menu-item-selected-hovered-label-text-color` is the label color of a hovered selected item in a standard menu.

Inside a menu these tokens take precedence over the item color tokens of the [List component](../list/README.md). The defaults per part:

**Standard menu**

| Part | Resting | Hovered, focused, pressed | Selected (all states) | Disabled |
|---|---|---|---|---|
| container | `--md-sys-color-surface-container-low` | | `--md-sys-color-tertiary-container` | selected colors at `38%` |
| label-text | `--md-sys-color-on-surface-variant` | `--md-sys-color-on-surface` | `--md-sys-color-on-tertiary-container` | `--md-sys-color-on-surface` at `38%` |
| leading-icon, trailing-icon | `--md-sys-color-on-surface-variant` | `--md-sys-color-on-surface-variant` | `--md-sys-color-on-tertiary-container` | `--md-sys-color-on-surface` at `38%` |
| supporting-text, trailing-supporting-text | `--md-sys-color-on-surface-variant` | `--md-sys-color-on-surface-variant` | `--md-sys-color-on-tertiary-container | --md-sys-color-on-surface` at `38%` |
| state-layer | | --md-sys-color-on-surface | `--md-sys-color-on-tertiary-container` | |

**Vibrant menu**

| Part | Resting | Hovered, focused, pressed | Selected (all states) | Disabled |
|---|---|---|---|---|
| container | `--md-sys-color-tertiary-container` | | `--md-sys-color-tertiary` | selected colors at `38%` |
| label-text | `--md-sys-color-on-tertiary-container` | `--md-sys-color-on-tertiary-container` | `--md-sys-color-on-tertiary` | `--md-sys-color-on-tertiary-container` at `38%` |
| leading-icon, trailing-icon | `--md-sys-color-on-tertiary-container` | `--md-sys-color-tertiary` | `--md-sys-color-on-tertiary` | `--md-sys-color-on-tertiary-container` at `38%` |
| supporting-text, trailing-supporting-text | `--md-sys-color-on-tertiary-container` | `--md-sys-color-on-tertiary-container` | `--md-sys-color-on-tertiary` | `--md-sys-color-on-tertiary-container` at `38%` |
| state-layer | | `--md-sys-color-on-tertiary-container` | `--md-sys-color-on-tertiary` | |

**Example: Changing the maximum width**

```HTML
<div style="--md-comp-menu-width-max:360px">
  <nav id="mymenu" class="micl-menu" popover>
    <ul class="micl-list">
      <li class="micl-list-item-one" tabindex="0">
        <span class="micl-list-item__text">
          <span class="micl-list-item__headline">Menu item</span>
        </span>
      </li>
    </ul>
  </nav>
</div>
```

## Compatibility
This component uses **popover anchor positioning** to place the menu next to its invoker. This is a modern CSS feature that may not be fully supported in all browsers. To ensure the menu works in browsers that do not support anchor positioning, wrap the menu and its invoker in a `<div>` element with `position:relative`. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor#browser_compatibility) for details.
