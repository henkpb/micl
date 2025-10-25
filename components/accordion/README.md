# Accordion
This component implements the [Material Design 3 Expressive Expandable Lists](https://m3.material.io/components/lists/overview) design. Accordions are vertically stacked lists that allow you to show and hide sections of content.

## Basic Usage

### HTML
The Accordion component is an extension of the [**List** component](../list/README.md), using `<details>` and `<summary>` elements for its interactive behaviour. To create a basic accordion, use a `<div>` with the `micl-list` class and nest individual `<details>` elements for each collapsible item. Apply the appropriate `micl-list-item-` class to the `summary` element.

```HTML
<div class="micl-list" role="listbox">
  <details>
    <summary class="micl-list-item-one">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">A single-line accordion item</span>
      </span>
    </summary>
    <div class="micl-list-item__content">
      <p class="md-sys-typescale-body-medium">
        This is the content that is revealed when the accordion item is expanded.
      </p>
    </div>
  </details>
</div>
```

- The `role="listbox"` is used for accessibility, indicating a selectable list.

- The `micl-list-item__content` class styles the collapsible area of the accordion item.

### CSS
Import the list styles into your project:

```CSS
@use "material-inspired-component-library/dist/list";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to support keyboard navigation:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any List component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Accordion component](https://henkpb.github.io/micl/accordion.html) is available to interact with.

## Variants
To ensure that only one accordion item within a group can be open at a time, add a matching `name` attribute to all the `<details>` elements you want to group together.

```HTML
<div class="micl-list" role="listbox">
  <details name="mygroup">
    <summary class="micl-list-item-two">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Marie Curie</span>
        <span class="micl-list-item__supporting-text">The name of the employee.</span>
      </span>
    </summary>
    <div class="micl-list-item__content">
      <div class="micl-textfield-filled">
        <label for="tf1">Name</label>
        <input type="text" id="tf1" value="Marie Curie">
      </div>
    </div>
  </details>
  <details name="mygroup">
    <summary class="micl-list-item-two" tabindex="-1">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Country</span>
        <span class="micl-list-item__supporting-text">The country of residence.</span>
      </span>
    </summary>
    <div class="micl-list-item__content">
      <div class="micl-textfield-filled">
        <label for="tf2">Country</label>
        <input type="text" id="tf2" value="France">
      </div>
    </div>
  </details>
</div>
```

Adding the `micl-list-item--disabled` class to the `<summary>` element causes the accordion item to be displayed in a disabled state.

Add the `micl-list__divider` class to the `<div class="micl-list">` element to automatically place a divider between each accordion item.

Since the Accordion is based on the List component, you can use the same utility classes for content structure and styling. Refer to the [List component documentation](../list/README.md) for details on how to add icons, avatars, images, and other features to your accordion items.

## Compatibility
The Card component uses the `interpolate-size` CSS property to smoothly open and close the detail area of a Details disclosure element, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size#browser_compatibility) for details.
