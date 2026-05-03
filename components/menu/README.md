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
      <label for="cb" class="micl-list-item__text">
        <span class="micl-list-item__headline">Person</span>
        <span class="micl-list-item__supporting-text">This person is an administrator</span>
      </label>
      <input type="checkbox" id="cb" class="micl-checkbox">
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
          <li role="separator" class="micl-divider"></li>
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

Adding the `micl-list-item--disabled` class to a menu item causes the item to be displayed in a disabled state.

Use a [Divider component](../divider/README.md) to separate neighbouring menu items by a divider.

## Customizations
You can customize the appearance of the Menu component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child menus.

| Variable name | Default Value | Description |
| ------------- | ----- | ----------- |
| --md-sys-menu-width-max | 280px | The maximum width allowed for a menu |
| --md-sys-menu-width-min | 112px | The minimum allowed width for a menu |

--md-comp-menu-gap

--md-comp-menu-container-elevation
--md-comp-menu-container-shape
--md-comp-menu-active-container-shape
--md-comp-menu-inactive-container-shape
--md-comp-menu-group-padding
--md-comp-menu-group-shape
--md-comp-menu-item-first-child-inner-corner-corner-size
--md-comp-menu-item-first-child-shape
--md-comp-menu-item-last-child-inner-corner-corner-size
--md-comp-menu-item-last-child-shape
--md-comp-menu-item-focus-indicator-color
--md-comp-menu-item-focus-indicator-offset
--md-comp-menu-item-focus-indicator-thickness
--md-comp-menu-item-height
--md-comp-menu-item-selected-shape
--md-comp-menu-item-shape
--md-comp-menu-item-leading-space
--md-comp-menu-item-leading-icon-size
--md-comp-menu-item-trailing-space
--md-comp-menu-item-trailing-icon-size

--md-comp-menu-standard-container-color
--md-comp-menu-standard-menu-item-container-color
--md-comp-menu-standard-menu-item-focused-label-text-color
--md-comp-menu-standard-menu-item-focused-leading-icon-color
--md-comp-menu-standard-menu-item-focused-state-layer-color
--md-comp-menu-standard-menu-item-focused-state-layer-opacity
--md-comp-menu-standard-menu-item-focused-supporting-text-color
--md-comp-menu-standard-menu-item-focused-trailing-icon-color
--md-comp-menu-standard-menu-item-focused-trailing-supporting-text-color
--md-comp-menu-standard-menu-item-hovered-label-text-color
--md-comp-menu-standard-menu-item-hovered-leading-icon-color
--md-comp-menu-standard-menu-item-hovered-state-layer-color
--md-comp-menu-standard-menu-item-hovered-state-layer-opacity
--md-comp-menu-standard-menu-item-hovered-supporting-text-color
--md-comp-menu-standard-menu-item-hovered-trailing-icon-color
--md-comp-menu-standard-menu-item-hovered-trailing-supporting-text-color
--md-comp-menu-standard-menu-item-pressed-label-text-color
--md-comp-menu-standard-menu-item-pressed-leading-icon-color
--md-comp-menu-standard-menu-item-pressed-state-layer-color
--md-comp-menu-standard-menu-item-pressed-state-layer-opacity
--md-comp-menu-standard-menu-item-pressed-supporting-text-color
--md-comp-menu-standard-menu-item-pressed-trailing-icon-color
--md-comp-menu-standard-menu-item-pressed-trailing-supporting-text-color
--md-comp-menu-standard-menu-item-label-text-color
--md-comp-menu-standard-menu-item-leading-icon-color
--md-comp-menu-standard-menu-item-supporting-text-color
--md-comp-menu-standard-menu-item-trailing-icon-color
--md-comp-menu-standard-menu-item-trailing-supporting-text-color
--md-comp-menu-standard-section-label-text-color

--md-comp-menu-vibrant-container-color
--md-comp-menu-vibrant-menu-item-container-color
--md-comp-menu-vibrant-menu-item-focused-label-text-color
--md-comp-menu-vibrant-menu-item-focused-leading-icon-color
--md-comp-menu-vibrant-menu-item-focused-state-layer-color
--md-comp-menu-vibrant-menu-item-focused-state-layer-opacity
--md-comp-menu-vibrant-menu-item-focused-supporting-text-color
--md-comp-menu-vibrant-menu-item-focused-trailing-icon-color
--md-comp-menu-vibrant-menu-item-focused-trailing-supporting-text-color
--md-comp-menu-vibrant-menu-item-hovered-label-text-color
--md-comp-menu-vibrant-menu-item-hovered-leading-icon-color
--md-comp-menu-vibrant-menu-item-hovered-state-layer-color
--md-comp-menu-vibrant-menu-item-hovered-state-layer-opacity
--md-comp-menu-vibrant-menu-item-hovered-supporting-text-color
--md-comp-menu-vibrant-menu-item-hovered-trailing-icon-color
--md-comp-menu-vibrant-menu-item-hovered-trailing-supporting-text-color
--md-comp-menu-vibrant-menu-item-pressed-label-text-color
--md-comp-menu-vibrant-menu-item-pressed-leading-icon-color
--md-comp-menu-vibrant-menu-item-pressed-state-layer-color
--md-comp-menu-vibrant-menu-item-pressed-state-layer-opacity
--md-comp-menu-vibrant-menu-item-pressed-supporting-text-color
--md-comp-menu-vibrant-menu-item-pressed-trailing-icon-color
--md-comp-menu-vibrant-menu-item-pressed-trailing-supporting-text-color
--md-comp-menu-vibrant-menu-item-label-text-color
--md-comp-menu-vibrant-menu-item-leading-icon-color
--md-comp-menu-vibrant-menu-item-supporting-text-color
--md-comp-menu-vibrant-menu-item-trailing-icon-color
--md-comp-menu-vibrant-menu-item-trailing-supporting-text-color
--md-comp-menu-vibrant-section-label-text-color

--md-comp-menu-standard-menu-item-selected-container-color
--md-comp-menu-standard-menu-item-selected-label-text-color
--md-comp-menu-standard-menu-item-selected-leading-icon-color
--md-comp-menu-standard-menu-item-selected-supporting-text-color
--md-comp-menu-standard-menu-item-selected-trailing-icon-color
--md-comp-menu-standard-menu-item-selected-trailing-supporting-text-color

--md-comp-menu-standard-menu-item-selected-disabled-container-color
--md-comp-menu-standard-menu-item-selected-disabled-container-opacity
--md-comp-menu-standard-menu-item-selected-disabled-label-text-color
--md-comp-menu-standard-menu-item-selected-disabled-label-text-opacity
--md-comp-menu-standard-menu-item-selected-disabled-leading-icon-color
--md-comp-menu-standard-menu-item-selected-disabled-leading-icon-opacity
--md-comp-menu-standard-menu-item-selected-disabled-trailing-icon-color
--md-comp-menu-standard-menu-item-selected-disabled-trailing-icon-opacity
--md-comp-menu-standard-menu-item-selected-disabled-trailing-supporting-text-color
--md-comp-menu-standard-menu-item-selected-focused-label-text-color
--md-comp-menu-standard-menu-item-selected-focused-leading-icon-color
--md-comp-menu-standard-menu-item-selected-focused-state-layer-color
--md-comp-menu-standard-menu-item-selected-focused-state-layer-opacity
--md-comp-menu-standard-menu-item-selected-focused-supporting-text-color
--md-comp-menu-standard-menu-item-selected-focused-trailing-icon-color
--md-comp-menu-standard-menu-item-selected-focused-trailing-supporting-text-color
--md-comp-menu-standard-menu-item-selected-hovered-label-text-color
--md-comp-menu-standard-menu-item-selected-hovered-leading-icon-color
--md-comp-menu-standard-menu-item-selected-hovered-state-layer-color
--md-comp-menu-standard-menu-item-selected-hovered-state-layer-opacity
--md-comp-menu-standard-menu-item-selected-hovered-supporting-text-color
--md-comp-menu-standard-menu-item-selected-hovered-trailing-icon-color
--md-comp-menu-standard-menu-item-selected-hovered-trailing-supporting-text-color
--md-comp-menu-standard-menu-item-selected-pressed-label-text-color
--md-comp-menu-standard-menu-item-selected-pressed-leading-icon-color
--md-comp-menu-standard-menu-item-selected-pressed-state-layer-color
--md-comp-menu-standard-menu-item-selected-pressed-state-layer-opacity
--md-comp-menu-standard-menu-item-selected-pressed-supporting-text-color
--md-comp-menu-standard-menu-item-selected-pressed-trailing-icon-color
--md-comp-menu-standard-menu-item-selected-pressed-trailing-supporting-text-color

--md-comp-menu-vibrant-menu-item-selected-container-color
--md-comp-menu-vibrant-menu-item-selected-label-text-color
--md-comp-menu-vibrant-menu-item-selected-leading-icon-color
--md-comp-menu-vibrant-menu-item-selected-supporting-text-color
--md-comp-menu-vibrant-menu-item-selected-trailing-icon-color
--md-comp-menu-vibrant-menu-item-selected-trailing-supporting-text-color
--md-comp-menu-vibrant-menu-item-selected-focused-state-layer-color

--md-comp-menu-vibrant-menu-item-selected-disabled-label-text-opacity
--md-comp-menu-vibrant-menu-item-selected-disabled-leading-icon-opacity
--md-comp-menu-vibrant-menu-item-selected-disabled-supporting-text-opacity
--md-comp-menu-vibrant-menu-item-selected-disabled-trailing-icon-opacity
--md-comp-menu-vibrant-menu-item-selected-disabled-trailing-supporting-text-opacity
--md-comp-menu-vibrant-menu-item-selected-focused-state-layer-opacity
--md-comp-menu-vibrant-menu-item-selected-focused-label-text-color
--md-comp-menu-vibrant-menu-item-selected-hovered-state-layer-color
--md-comp-menu-vibrant-menu-item-selected-hovered-state-layer-opacity
--md-comp-menu-vibrant-menu-item-selected-hovered-label-text-color
--md-comp-menu-vibrant-menu-item-selected-pressed-state-layer-color
--md-comp-menu-vibrant-menu-item-selected-pressed-state-layer-opacity
--md-comp-menu-vibrant-menu-item-selected-pressed-label-text-color

**Example: Changing the maximum width**

```HTML
<div style="--md-sys-menu-width-max:320px">
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
