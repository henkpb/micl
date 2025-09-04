# Navigation rail
This component implements the the [Material Design 3 Expressive Navigation rail](https://m3.material.io/components/navigation-rail/overview) design.

## Basic Usage

### HTML
To create a simple navigation rail, use a `<div>` element with the `micl-navigationrail` class. Inside, use an `input type="radio"` group to create the selectable navigation items. The `input` elements must share the same `name` attribute to ensure that only one item can be selected at a time. The `label` elements are associated with their respective inputs using the `for` attribute.

```HTML
<div id="mynavigationrail" class="micl-navigationrail">
  <div class="micl-navigationrail__content">
    <input type="radio" id="item1" name="navitem" value="email_inbox" checked>
    <label for="item1" class="micl-navigationrail__item" tabindex="0">
      <span class="micl-navigationrail__icon material-symbols-outlined" aria-hidden="true">inbox</span>
      <span class="micl-navigationrail__text">Inbox</span>
    </label>
    <input type="radio" id="item2" name="navitem" value="email_outbox">
    <label for="item2" class="micl-navigationrail__item" tabindex="0">
      <span class="micl-navigationrail__icon material-symbols-outlined" aria-hidden="true">outbox</span>
      <span class="micl-navigationrail__text">Outbox</span>
    </label>
  </div>
</div>
```

### CSS
Import the navigation rail styles into your project:

```CSS
@use "material-inspired-component-library/dist/navigationrail";
```

### JavaScript
This component requires JavaScript to support keyboard navigation. The library will automatically initialize new components as they're added to the DOM.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

### Demo
A live example of the [Navigation rail component](https://henkpb.github.io/micl/navigationrail.html) is available for you to interact with.

## Variants
The basic example creates a **collapsed** navigation rail. Add a menu button to allow the user to toggle between a **collapsed** and an **expanded** view.

```HTML
<div id="mynavigationrail" class="micl-navigationrail">
  <div class="micl-navigationrail__headline">
    <button
      type="button"
      class="micl-iconbutton-standard-s micl-button--toggle material-symbols-outlined"
      data-miclalt="menu_open"
      aria-label="Toggle navigation rail"
    >menu</button>
  </div>
  <div class="micl-navigationrail__content">
    ...
  </div>
</div>
```

When the user clicks the menu button, the navigation rail is expanded and the toggle button is given the `micl-button--selected` class and the `micl-button--toggled` class that indicates that the toggle button has been clicked at least once.

### Popover expanded navigation rail

Add the `popover` attribute to the navigation rail, and the `popovertarget` attribute to the menu button. The value of the `popovertarget` attribute must be the `id` of the navigation rail.

```HTML
<div id="mynavigationrail" class="micl-navigationrail" popover="manual">
  <div class="micl-navigationrail__headline">
    <button
      type="button"
      class="micl-iconbutton-standard-s micl-button--toggle material-symbols-outlined"
      popovertarget="mynavigationrail"
      data-miclalt="menu_open"
      aria-label="Toggle navigation rail"
    >menu</button>
  </div>
  <div class="micl-navigationrail__content">
    ...
  </div>
</div>
```

[!WARNING]
The **popover** navigation rail component adds CSS rules to the `<body>` element to properly resize the main content area when the navigation rail is collapsed. Overriding these rules may cause the component to behave unexpectedly. The rules that are applied are:

  ```CSS
  margin-inline-start: var(--md-sys-navigationrail-collapsed-width);
  ```

### Modal navigation rail

A **modal** navigation rail is hidden until the user clicks a menu button. When shown, the **expanded** navigation rail is displayed on top of other page content. Use a `<dialog>` element instead of a `<div>`.

```HTML
<dialog id="mynavigationrail" class="micl-navigationrail" closedby="closerequest">
  <div class="micl-navigationrail__headline">
    <button
      type="button"
      class="micl-iconbutton-standard-s micl-button--toggle material-symbols-outlined"
      popovertarget="mynavigationrail"
      data-miclalt="menu_open"
      aria-label="Toggle navigation rail"
    >menu</button>
  </div>
  <div class="micl-navigationrail__content">
    ...
  </div>
</dialog>

<button
  type="button"
  class="micl-iconbutton-standard-s micl-button--toggle material-symbols-outlined"
  popovertarget="mynavigationrail"
  aria-label="Toggle navigation rail"
>menu</button>
```

The button inside the navigation rail is used to hide the navigation rail, while the button outside is responsible for opening it.

## Customizations
You can customize the appearance of the Navigation rail component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child navigation rails.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-navigationrail-collapsed-width | 96px | The width of the collapsed navigation rail |
| --md-sys-navigationrail-expanded-maxwidth | 360px | The largest allowed width of the expanded navigation rail |
| --md-sys-navigationrail-expanded-minwidth | 220px | The smallest allowed width of the expanded navigation rail |

**Example: Changing the width of the collapsed navigation rail**

```HTML
<div style="--md-sys-navigationrail-collapsed-width:80px">
  <div id="mynavigationrail" class="micl-navigationrail">
    ...
  </div>
</div>
```

To add a vertical divider of the to the navigation rail, assign one to the following CSS variable:

```CSS
#mynavigationrail {
  --md-sys-divider-thickness: 1;
}
```

## Compatibility
This component uses the Popover API, which might not be supported in all browsers. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#api.htmlelement.popover) for details.
