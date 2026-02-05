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
