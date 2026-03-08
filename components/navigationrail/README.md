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
@use "material-inspired-component-library/dist/navigationrail";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to support keyboard navigation. The library will automatically initialize new components as they're added to the DOM.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

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

When the user clicks the menu button, the navigation rail is expanded and the toggle button is given the `micl-button--selected` class and the `micl-button--toggled` class that indicates that the toggle button has been clicked at least once.

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

## Customizations
You can customize the appearance of the Navigation rail component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child navigation rails.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-comp-nav-rail-divider-thickness | 0px | The width of the vertical divider at the end of the rail |
| --md-comp-nav-rail-divider-color |  | The color of the vertical divider |

The Navigation rail component supports the following CSS variables, as defined in the [Material Design 3 Expressive Navigation rail Specification](https://m3.material.io/components/navigation-rail/specs):

```CSS
--md-comp-nav-rail-item-icon-size
--md-comp-nav-rail-item-active-indicator-leading-space
--md-comp-nav-rail-item-active-indicator-icon-label-space
--md-comp-nav-rail-item-active-indicator-trailing-space
--md-comp-nav-rail-item-container-height
--md-comp-nav-rail-item-short-container-height
--md-comp-nav-rail-item-container-shape
--md-comp-nav-rail-item-container-vertical-space
--md-comp-nav-rail-item-header-space-minimum
--md-comp-nav-rail-collapsed-container-width
--md-comp-nav-rail-collapsed-narrow-container-width
--md-comp-nav-rail-collapsed-container-elevation
--md-comp-nav-rail-collapsed-container-shape
--md-comp-nav-rail-collapsed-container-color
--md-comp-nav-rail-collapsed-item-vertical-space
--md-comp-nav-rail-collapsed-top-space
--md-comp-nav-rail-expanded-container-width-minimum
--md-comp-nav-rail-expanded-container-width-maximum
--md-comp-nav-rail-expanded-top-space
--md-comp-nav-rail-expanded-container-elevation
--md-comp-nav-rail-expanded-modal-container-elevation
--md-comp-nav-rail-expanded-container-color
--md-comp-nav-rail-expanded-modal-container-color
--md-comp-nav-rail-expanded-container-shape
--md-comp-nav-rail-expanded-modal-container-shape
--md-comp-nav-rail-item-vertical-active-indicator-height
--md-comp-nav-rail-item-vertical-active-indicator-width
--md-comp-nav-rail-item-horizontal-full-width-leading-space
```

**Example: Changing the width of the collapsed navigation rail**

```HTML
<div style="--md-comp-nav-rail-collapsed-container-width:80px">
  <nav id="mynavigationrail" class="micl-navigationrail">
    ...
  </nav>
</div>
```

To add a vertical divider of the to the navigation rail, set the following CSS variable:

```CSS
#mynavigationrail {
  --md-comp-nav-rail-divider-thickness: 1px;
}
```
