# Accordion
This component implements the [Material Design 3 Expressive Expandable Lists](https://m3.material.io/components/lists/guidelines#b5697cef-6e9f-4699-ae10-c3f49649593e) specification. Accordions are vertically stacked lists that allow you to show and hide sections of content.

## Basic Usage

### HTML
The Accordion component is an extension of the [**List** component](../list/README.md), using `<details>` and `<summary>` elements for its interactive behaviour. To create a basic accordion, use a `<div>` with the `micl-list` class and nest individual `<details>` elements for each collapsible item. Apply the appropriate `micl-list-item-` class to the `summary` element.

```HTML
<div class="micl-list">
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

The `micl-list-item__content` class styles the collapsible area. It automatically aligns the expanded content with the header text using the item's leading space token (`--md-comp-list-item-leading-space`). You are responsible for applying your own padding, typography, and colors to the content itself.

### CSS
The accordion styles are part of the List component, so import the list styles into your project:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/list";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to support arrow-key navigation and to take disabled headers out of the tab order:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This initializes all Accordion components, including those added dynamically to the DOM.

The accordion behavior is part of the List component. If you load individual JavaScript files instead of the main bundle, load `dist/list`.

### Live Demo
A live example of the [Accordion component](https://henkpb.github.io/micl/accordion.html) is available to interact with.

## Variants
To ensure only one item opens at a time, apply a matching `name` attribute across a group of `<details>` elements. This leverages native browser behavior to close previously opened items automatically—no JavaScript required.

```HTML
<div class="micl-list">
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
  <hr class="micl-divider-inset">
  <details name="mygroup">
    <summary class="micl-list-item-two">
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

**Expander icon**: Add a trailing icon to visually indicate expandability. Applying the `micl-list-item__icon--expander` class places the icon in a round container that highlights and automatically rotates 180 degrees when toggled. An open accordion item keeps its normal colors; only the expander shows its state.

```HTML
<div class="micl-list">
  <details>
    <summary class="micl-list-item-one">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Heading</span>
      </span>
      <span class="micl-list-item__icon micl-list-item__icon--expander material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span>
    </summary>
    <div class="micl-list-item__content">
      ...content...
    </div>
  </details>
</div>
```

**Disabled state**: Add the `micl-list-item--disabled` class to the `<summary>` element to visually disable the accordion item.

Use a [Divider component](../divider/README.md) to separate neighbouring accordion items by a divider.

Since the Accordion is based on the List component, you can use the same utility classes for content structure and styling. Refer to the [List component documentation](../list/README.md) for details on how to add icons, avatars, images, and other features to your accordion items.

## Accessibility
* Each `<summary>` is a native disclosure control: the browser exposes its expanded or collapsed state to assistive technologies, so no ARIA attributes are required. Its text serves as the accessible name.
* Keep `aria-hidden="true"` on the expander icon; it is purely decorative.
* Items sharing a `name` form an exclusive accordion natively; opening one closes the others without JavaScript.

Each `<summary>` acts as a tab stop in document order. Disabled headers (`micl-list-item--disabled`) are skipped and receive `aria-disabled="true"`.

| Key | Action |
|---|---|
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Moves focus through the accordion headers. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Toggles the focused panel open or closed. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Optional enhancement: Moves focus to the next or previous header within the same list, wrapping at the ends. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Optional enhancement: Moves focus to the first or last header. |

## Theming
You can customize the appearance of the Accordion component by overriding its own CSS custom properties and those of the [List](../list/README.md) component. Set them on any appropriate parent element to affect its child accordions.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-accordion-item-space` | The space between an opened accordion item and its next neighbour. | `0px` |
| `--md-comp-accordion-icon-container-size` | The size of the round container of the expander icon | `40px` |
| `--md-comp-accordion-collapsed-icon-container-color` | The container color of the expander icon of a closed item | `--md-comp-list-item-container-color` (transparent) |
| `--md-comp-accordion-expanded-icon-container-color` | The container color of the expander icon of an open item | `--md-sys-color-surface-container` |
| `--md-comp-accordion-icon-color` | The color of the expander icon | `--md-sys-color-on-surface` |
| `--md-comp-accordion-motion-spatial` | The easing function used when an accordion item opens or closes | `--md-sys-motion-expressive-default-spatial` |
| `--md-comp-accordion-motion-duration` | The duration of opening or closing an accordion item | `--md-sys-motion-expressive-default-spatial-duration` |

The opening and closing are not animated when the user prefers reduced motion.

**Example: Changing the margin between an opened item and the next**

```HTML
<div class="micl-list" style="--md-comp-accordion-item-space:4px">
  <details>
    ...
  </details>
  <details>
    ...
  </details>
</div>
```

## Compatibility
The Accordion component animates the opening and closing of an item with the `::details-content` pseudo-element and the `interpolate-size` CSS property. In browsers lacking `interpolate-size` support, the accordion remains fully functional but instantly snaps open and closed without animation. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size#browser_compatibility) for details.
