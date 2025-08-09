# Menu
This component implements the [Material Design 3 Expressive Menu](https://m3.material.io/components/menus/overview) design. Menus provide a list of choices on a temporary surface that appears when a user interacts with a control element.

## Basic Usage

### HTML
The Menu component is an extension of the [List component](../list/README.md). It consists of a `<nav>` element with the `micl-menu` class, which acts as the container for a `<ul>` with the `micl-list` class. The menu can be opened and closed using a control element with the `popovertarget` attribute.

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

<button type="button" popovertarget="mymenu">Open Basic Menu</button>
```

### CSS
Import the styles for both the menu and list components into your project:

```CSS
@use "micl/components/list";
@use "micl/components/menu";
```

### TypeScript
This component requires the **Menu** TypeScript module for functionality. You can import the specific module and handle initialization manually, or use the main MICL library for automatic initialization.

To manually initialize the component:

```TypeScript
import miclMenu from 'micl/components/menu';

miclMenu.initialize(document.querySelector('.micl-menu'));
```

### Demo
A live example of the [Menu component]() is available for you to interact with.

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
      <input type="checkbox" id="cb" class="micl-checkbox" tabindex="-1">
    </li>
  </ul>
</nav>
```

**Example: A menu with a link**
To make a menu item function as a link, wrap its content in an `<a>` tag and set the `tabindex` to `-1`. This ensures the link is clickable but does not interfere with menu navigation.

```HTML
<nav id="mymenu" class="micl-menu" popover>
  <ul class="micl-list">
    <li class="micl-list-item-two micl-list-item__divider">
      <a href="https://www.nytimes.com" tabindex="-1">
        <span class="micl-list-item__icon material-symbols-outlined" aria-hidden="true">newspaper</span>
        <span class="micl-list-item__text">
          <span class="micl-list-item__headline">The New York Times</span>
          <span class="micl-list-item__supporting-text">Clicking this item opens the front page of The New York Times</span>
        </span>
      </a>
    </li>
  </ul>
</nav>
```

Adding the `micl-list-item--disabled` class to a menu item causes the item to be displayed in a disabled state.

Add the `micl-list-item__divider` class to a menu item to create a divider between the item and the previous menu item.

## Compatibility
This component uses **popover anchor positioning** to place the menu next to its invoker. This is a modern CSS feature that may not be fully supported in all browsers. To ensure the menu works in browsers that do not support anchor positioning, wrap the menu and its invoker in a `<div>` element with `position:relative`. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor#browser_compatibility) for details.
