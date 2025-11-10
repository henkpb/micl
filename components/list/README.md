# List
This component implements the [Material Design 3 Expressive List](https://m3.material.io/components/lists/overview) design. Lists are continuous, vertical groups of text or images, representing a set of data.

## Basic Usage

### HTML
To create a basic list, use the `<ul>` element with the `micl-list` class and individual `<li>` elements for each list item. For a basic single-line item, use the `micl-list-item-one` class:

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
The List component offers three CSS classes to control the height and content capacity of individual list items:

| CSS class | Description |
| --------- | ----------- |
| micl-list-item-one | For single-line items, accommodating one line of text. |
| micl-list-item-two | For two-line items, accommodating up to two lines of text. |
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
    <a href="https://www.thetimes.com" tabindex="-1">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">The Times</span>
      </span>
    </a>
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
      <span class="micl-list-item__headline">Bill Jones</span>
      <span class="micl-list-item__supporting-text">bill.jones@email.com</span>
    </span>
  </li>
  ```

- **Avatar**: Use `micl-list-item__avatar` with a text.
  ```HTML
  <li class="micl-list-item-two">
    <span class="micl-list-item__avatar">BJ</span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Bill Jones</span>
      <span class="micl-list-item__supporting-text">bill.jones@email.com</span>
    </span>
  </li>
  ```

- **Image**: Use `micl-list-item__image` with a background image.
  ```HTML
  <li class="micl-list-item-two">
    <span class="micl-list-item__image" style="background-image:url(https://...jpg)"></span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Bill Jones</span>
      <span class="micl-list-item__supporting-text">bill.jones@email.com</span>
    </span>
  </li>
  ```

- **Thumbnail (Video)**: Use `micl-list-item__thumbnail` for video previews with a background-image.
  ```HTML
  <li class="micl-list-item-two">
    <span class="micl-list-item__thumbnail" style="background-image:url(https://...mp4)"></span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Bill Jones</span>
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
  <li class="micl-list-item-two" tabindex="0">
    <label>
      <span class="micl-list-item__text">
        <span id="hd1" class="micl-list-item__headline">Blue car</span>
        <span class="micl-list-item__supporting-text">A blue car with four wheels.</span>
      </label>
      <input type="checkbox" id="mycheckbox" class="micl-checkbox" value="cb1" tabindex="-1" aria-labelledby="hd1">
    </span>
  </li>
  <li role="separator" class="micl-divider"></li>
  <li class="micl-list-item-two">
    <label>
      <span class="micl-list-item__text">
        <span id="hd2" class="micl-list-item__headline">Red car</span>
        <span class="micl-list-item__supporting-text">A red car with tinted windows.</span>
      </label>
      <input type="checkbox" id="checkbox2" class="micl-switch" value="cb2" tabindex="-1" aria-labelledby="hd2">
    </label>
  </li>
</ul>
```

- `tabindex="-1"` on the `input` is important here, as the `<li>` should handle the focus for accessibility.

- The `role="listbox"` is used for accessibility, indicating a selectable list.

## Customizations
You can customize the appearance of the List component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child lists.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-list-padding | 8px | The vertical padding of a list. |
| --md-sys-list-item-one-height | 56px | The height for a single-line list item. |
| --md-sys-list-item-two-height | 72px | The height for a two-line list item. |
| --md-sys-list-item-three-height | 88px | The height for a three-line list item. |
| --md-sys-list-item-one-padding | 8px | The vertical padding of a single-line list item. |
| --md-sys-list-item-two-padding | 8px | The vertical padding of a two-line list item. |
| --md-sys-list-item-three-padding | 12px | The vertical padding of a three-line list item. |
| --md-sys-list-item-space | 16px | The horizontal spacing between the elements within a list item. |

**Example: Changing the height of single-line list items**

```HTML
<div style="--md-sys-list-item-one-height:60px">
  <ul class="micl-list">
    <li class="micl-list-item-one">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">A single-line item</span>
      </span>
    </li>
  </ul>
</div>
```
