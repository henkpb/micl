# List
This component implements the [Material Design 3 Expressive List](https://m3.material.io/components/lists/overview) design. Lists are continuous, vertical groups of text or images, representing a set of data.

## Basic Usage

### HTML
To create a standard list, use the `<ul>` element with the `micl-list` class and individual `<li>` elements for each list item. For a single-line item, use the `micl-list-item-one` class:

```HTML
<ul class="micl-list">
  <li class="micl-list-item-one" tabindex="0">
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">A single-line item</span>
    </span>
  </li>
</ul>
```

- `tabindex="0"` on the `<li>` makes the list item focusable and allows keyboard navigation.

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
A live example of the [List component](https://henkpb.github.io/micl/list.html) is available to interact with.

## Variants
Adding the `micl-list--segmented` class to the `<ul>` element gives the list a segmented style with a distinct visible background and physical gaps.

The List component offers three CSS classes to control the height and content capacity of individual list items:

| CSS class            | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| micl-list-item-one   | For single-line items, accommodating one line of text.         |
| micl-list-item-two   | For two-line items, accommodating up to two lines of text.     |
| micl-list-item-three | For three-line items, accommodating up to three lines of text. |

```HTML
<ul class="micl-list">
  <li class="micl-list-item-three">
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">A three-line item</span>
      <span class="micl-list-item__supporting-text">Supporting text that is long enough to fill up multiple lines of text with words and sentences.</span>
    </span>
  </li>
</ul>
```

Use the anchor element to convert a list item into a hyperlink:

```HTML
<ul class="micl-list">
  <li class="micl-list-item-one" tabindex="0">
    <a href="https://www.thetimes.com">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">The Times</span>
      </span>
    </a>
  </li>
</ul>
```

Use the button element to convert a list item into an action item:

```HTML
<ul class="micl-list">
  <li class="micl-list-item-one" tabindex="0">
    <button type="button" onclick="Hello World!">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">The Times</span>
      </span>
    </button>
  </li>
</ul>
```

Adding the `micl-list-item--disabled` class to the `<li>` element causes the list item to be displayed in a disabled state.

Use a [Divider component](../divider/README.md) to separate neighbouring list items by a divider.

### Leading Content
The text content of a list item can be preceded by various media elements:

- **Icon**: Use `micl-list-item__icon` with a (Material Symbols) icon.
  ```HTML
  <li class="micl-list-item-two">
    <span class="material-symbols-outlined micl-list-item__icon" aria-hidden="true">person</span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__overline">Senior consultant</span>
      <span class="micl-list-item__headline">Bill Radmore</span>
    </span>
  </li>
  ```

- **Avatar**: Use `micl-list-item__avatar` with a text.
  ```HTML
  <li class="micl-list-item-two">
    <span class="micl-list-item__avatar">BR</span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__overline">Our man</span>
      <span class="micl-list-item__headline">Bill Radmore</span>
    </span>
  </li>
  ```

- **Image**: Use `micl-list-item__image` with a background image.
  ```HTML
  <li class="micl-list-item-two">
    <span class="micl-list-item__image" style="background-image:url(https://...jpg)"></span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Bill Radmore</span>
      <span class="micl-list-item__supporting-text">bill.radmore@email.com</span>
    </span>
  </li>
  ```

- **Thumbnail (Video)**: Use `micl-list-item__thumbnail` for video previews with a background-image.
  ```HTML
  <li class="micl-list-item-two">
    <span class="micl-list-item__thumbnail" style="background-image:url(https://...mp4)"></span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Bill Radmore</span>
      <span class="micl-list-item__supporting-text">Short clip of Bill</span>
    </span>
  </li>
  ```

### Trailing Content
The text of a list item may be followed by a trailing text, imagery or other elements (like a checkbox).

- **Icon**: Use `micl-list-item__icon` with a (Material Symbols) icon.
  ```HTML
  <li class="micl-list-item-two" tabindex="0">
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Date and time</span>
      <span class="micl-list-item__supporting-text">Timezones, calendar display</span>
    </span>
    <span class="material-symbols-outlined micl-list-item__icon" aria-hidden="true">more_horiz</span>
  </li>
  ```

- **Text**: Use `micl-list-item__trailing-text` with a short text.
  ```HTML
  <li class="micl-list-item-one">
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">To-do items</span>
    </span>
    <span class="micl-list-item__trailing-text">100+</span>
  </li>
  ````

### Selecting List Items
To enable selection of list items, integrate a Checkbox or Switch component within the `<li>` element.

```HTML
<ul class="micl-list" role="listbox">
  <li role="option" class="micl-list-item-two" tabindex="0" aria-selected="true">
    <label>
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Blue car</span>
        <span class="micl-list-item__supporting-text">A blue car with four wheels.</span>
      </span>
      <input
        type="checkbox"
        id="mycheckbox"
        class="micl-checkbox"
        value="cb1"
        checked
        aria-label="Blue car"
      >
    </label>
  </li>
  <li role="separator" class="micl-divider"></li>
  <li role="option" class="micl-list-item-two">
    <label>
      <input
        type="checkbox"
        id="checkbox2"
        class="micl-switch"
        value="cb2"
        aria-label="Red car"
      >
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Red car</span>
        <span class="micl-list-item__supporting-text">A red car with tinted windows.</span>
      </span>
    </label>
  </li>
</ul>
```

- The `role="listbox"` is used for accessibility, indicating a selectable list.

## Customizations
The List component supports the following CSS variables, as defined in the [Material Design 3 Expressive List Specification](https://m3.material.io/components/lists/specs):

```CSS
--md-comp-list-container-color
--md-comp-list-container-shape
--md-comp-list-container-space
--md-comp-list-item-container-color
--md-comp-list-item-container-expressive-shape
--md-comp-list-item-container-disabled-expressive-shape
--md-comp-list-item-container-dragged-expressive-shape
--md-comp-list-item-container-focused-expressive-shape
--md-comp-list-item-container-hovered-expressive-shape
--md-comp-list-item-container-pressed-expressive-shape
--md-comp-list-item-container-selected-expressive-shape
--md-comp-list-item-container-selected-disabled-expressive-shape
--md-comp-list-item-container-selected-dragged-expressive-shape
--md-comp-list-item-container-selected-focused-expressive-shape
--md-comp-list-item-container-selected-hovered-expressive-shape
--md-comp-list-item-container-selected-pressed-expressive-shape
--md-comp-list-item-between-space
--md-comp-list-item-bottom-space
--md-comp-list-item-disabled-label-text-color
--md-comp-list-item-disabled-label-text-opacity
--md-comp-list-item-disabled-leading-icon-color
--md-comp-list-item-disabled-leading-icon-opacity
--md-comp-list-item-disabled-opacity
--md-comp-list-item-disabled-overline-color
--md-comp-list-item-disabled-overline-opacity
--md-comp-list-item-disabled-state-layer-color
--md-comp-list-item-disabled-state-layer-opacity
--md-comp-list-item-disabled-supporting-text-color
--md-comp-list-item-disabled-supporting-text-opacity
--md-comp-list-item-disabled-trailing-icon-color
--md-comp-list-item-disabled-trailing-icon-opacity
--md-comp-list-item-disabled-trailing-supporting-text-color
--md-comp-list-item-disabled-trailing-supporting-text-opacity
--md-comp-list-item-dragged-container-elevation
--md-comp-list-item-dragged-label-text-color
--md-comp-list-item-dragged-leading-icon-color
--md-comp-list-item-dragged-state-layer-color
--md-comp-list-item-dragged-state-layer-opacity
--md-comp-list-item-dragged-trailing-icon-color
--md-comp-list-item-focus-indicator-color
--md-comp-list-item-focus-indicator-offset
--md-comp-list-item-focus-indicator-thickness
--md-comp-list-item-focus-label-text-color
--md-comp-list-item-focus-leading-icon-color
--md-comp-list-item-focus-state-layer-color
--md-comp-list-item-focus-state-layer-opacity
--md-comp-list-item-focus-trailing-icon-color
--md-comp-list-item-hover-label-text-color
--md-comp-list-item-hover-leading-icon-color
--md-comp-list-item-hover-state-layer-color
--md-comp-list-item-hover-state-layer-opacity
--md-comp-list-item-hover-trailing-icon-color
--md-comp-list-item-label-text-color
--md-comp-list-item-leading-avatar-color
--md-comp-list-item-leading-avatar-label-color
--md-comp-list-item-leading-avatar-shape
--md-comp-list-item-leading-avatar-size
--md-comp-list-item-leading-icon-color
--md-comp-list-item-leading-icon-expressive-size
--md-comp-list-item-leading-image-height
--md-comp-list-item-leading-image-expressive-shape
--md-comp-list-item-leading-image-width
--md-comp-list-item-leading-space
--md-comp-list-item-leading-video-height
--md-comp-list-item-leading-video-shape
--md-comp-list-item-one-line-container-height
--md-comp-list-item-overline-color
--md-comp-list-item-pressed-label-text-color
--md-comp-list-item-pressed-leading-icon-color
--md-comp-list-item-pressed-state-layer-color
--md-comp-list-item-pressed-state-layer-opacity
--md-comp-list-item-pressed-trailing-icon-color
--md-comp-list-item-segmented-container-color
--md-comp-list-item-selected-container-color
--md-comp-list-item-selected-disabled-label-text-color
--md-comp-list-item-selected-disabled-label-text-opacity
--md-comp-list-item-selected-disabled-leading-icon-color
--md-comp-list-item-selected-disabled-leading-icon-opacity
--md-comp-list-item-selected-disabled-opacity
--md-comp-list-item-selected-disabled-overline-color
--md-comp-list-item-selected-disabled-overline-opacity
--md-comp-list-item-selected-disabled-state-layer-color
--md-comp-list-item-selected-disabled-state-layer-opacity
--md-comp-list-item-selected-disabled-supporting-text-color
--md-comp-list-item-selected-disabled-supporting-text-opacity
--md-comp-list-item-selected-disabled-trailing-icon-color
--md-comp-list-item-selected-disabled-trailing-icon-opacity
--md-comp-list-item-selected-disabled-trailing-supporting-text-color
--md-comp-list-item-selected-disabled-trailing-supporting-text-opacity
--md-comp-list-item-selected-dragged-container-elevation
--md-comp-list-item-selected-dragged-label-text-color
--md-comp-list-item-selected-dragged-leading-icon-color
--md-comp-list-item-selected-dragged-state-layer-color
--md-comp-list-item-selected-dragged-state-layer-opacity
--md-comp-list-item-selected-dragged-trailing-icon-color
--md-comp-list-item-selected-focus-label-text-color
--md-comp-list-item-selected-focus-leading-icon-color
--md-comp-list-item-selected-focus-state-layer-color
--md-comp-list-item-selected-focus-state-layer-opacity
--md-comp-list-item-selected-focus-trailing-icon-color
--md-comp-list-item-selected-hover-label-text-color
--md-comp-list-item-selected-hover-leading-icon-color
--md-comp-list-item-selected-hover-state-layer-color
--md-comp-list-item-selected-hover-state-layer-opacity
--md-comp-list-item-selected-hover-trailing-icon-color
--md-comp-list-item-selected-label-text-color
--md-comp-list-item-selected-leading-icon-color
--md-comp-list-item-selected-overline-color
--md-comp-list-item-selected-pressed-label-text-color
--md-comp-list-item-selected-pressed-leading-icon-color
--md-comp-list-item-selected-pressed-state-layer-color
--md-comp-list-item-selected-pressed-state-layer-opacity
--md-comp-list-item-selected-pressed-trailing-icon-color
--md-comp-list-item-selected-trailing-supporting-text-color
--md-comp-list-item-selected-supporting-text-color
--md-comp-list-item-selected-trailing-icon-color
--md-comp-list-item-supporting-text-color
--md-comp-list-item-three-line-container-height
--md-comp-list-item-top-space
--md-comp-list-item-trailing-icon-color
--md-comp-list-item-trailing-icon-expressive-size
--md-comp-list-item-trailing-space
--md-comp-list-item-trailing-supporting-text-color
--md-comp-list-item-two-line-container-height
--md-comp-list-segment-gap
```

**Example: Changing the height of single-line list items**

```HTML
<div style="--md-comp-list-item-one-line-container-height:60px">
  <ul class="micl-list">
    <li class="micl-list-item-one">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">A single-line item</span>
      </span>
    </li>
  </ul>
</div>
```
