# List
This component implements the [Material Design 3 Expressive List](https://m3.material.io/components/lists/overview). Lists are continuous, vertical groups of text or images, representing a set of data.

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

`tabindex="0"` on the `<li>` makes the list item focusable and allows keyboard navigation. Only one item should be marked with a `tabindex="0"`.

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

This initializes all List components, including those added dynamically to the DOM.

### Live Demo
A live example of the [List component](https://henkpb.github.io/micl/list.html) is available to interact with.

## Anatomy
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

### Leading Content
The text content of a list item can be preceded by various media elements:

- **Icon**: Apply `micl-list-item__icon` to a (Material Symbols) icon element.
  ```HTML
  <li class="micl-list-item-two">
    <span class="material-symbols-outlined micl-list-item__icon" aria-hidden="true">person</span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__overline">Senior consultant</span>
      <span class="micl-list-item__headline">Bill Radmore</span>
    </span>
  </li>
  ```

- **Avatar**: Apply `micl-list-item__avatar` to an element containing text initials.
  ```HTML
  <li class="micl-list-item-two">
    <span class="micl-list-item__avatar">BR</span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__overline">Our man</span>
      <span class="micl-list-item__headline">Bill Radmore</span>
    </span>
  </li>
  ```

- **Image**: Apply `micl-list-item__image` to an element with an inline background image.
  ```HTML
  <li class="micl-list-item-two">
    <span class="micl-list-item__image" style="background-image:url(https://...jpg)"></span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Bill Radmore</span>
      <span class="micl-list-item__supporting-text">bill.radmore@email.com</span>
    </span>
  </li>
  ```

- **Thumbnail (Video)**: Use `micl-list-item__thumbnail` for thumbnail-sized imagery (e.g. video previews or photos).
  ```HTML
  <li class="micl-list-item-two">
    <span class="micl-list-item__thumbnail" style="background-image:url(https://...mp4)"></span>
    <span class="micl-list-item__text">
      <span class="micl-list-item__headline">Bill Radmore</span>
      <span class="micl-list-item__supporting-text">Short clip of Bill</span>
    </span>
  </li>
  ```
  Add the `micl-list-item__thumbnail--large` class for a large thumbnail. A thumbnail never grows taller than the content area of its item, so a large thumbnail needs a three-line item to reach its full height.

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
  ```

Use a [Divider component](../divider/README.md) to separate neighbouring list items by a divider. Remember to add the role `separator` to the divider element.

## Variants
To make a list item navigable, wrap its content in an `<a>` tag:

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

To make a list item clickable, wrap its content in a `<button>` tag:

```HTML
<ul class="micl-list">
  <li class="micl-list-item-one" tabindex="0">
    <button type="button" onclick="alert('Hello World!')">
      <span class="micl-list-item__text">
        <span class="micl-list-item__headline">Show details</span>
      </span>
    </button>
  </li>
</ul>
```

**Disabled state**: Add the `micl-list-item--disabled` class to the `<li>` element to visually disable the item.

Add the `micl-list--segmented` class to the `<ul>` element to apply a distinct visible background and physical gaps between items.

### Selecting List Items
To enable selection of list items, integrate a Checkbox or Switch component within the `<li>` element.

```HTML
<ul class="micl-list">
  <li class="micl-list-item-two" tabindex="0">
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
  <li role="separator" class="micl-divider-inset"></li>
  <li class="micl-list-item-two">
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

- If a focusable list (`tabindex="0"`) contains checkboxes or switches, the JavaScript automatically upgrades it to a selectable list. It applies `role="listbox"` to the container, `role="option"` to the items, and sets `aria-multiselectable`. It also automatically syncs the `aria-selected` state with each checkbox, so you don't need to manually manage these attributes.
- A listbox may only contain options, so the JavaScript turns a divider inside it into a purely visual element (`role="none"`).

## Keyboard and accessibility
A list becomes interactive when one of its items has `tabindex="0"`. The list is then a single tab stop, and the JavaScript manages the `tabindex` of its items:

| Key | Action |
|---|---|
| <kbd>↓</kbd> / <kbd>↑</kbd> | Moves focus to the next or previous item; focus wraps around at the ends |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves focus to the first or last item |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Toggles the checkbox or switch of the item, or activates its link or button; an item without any of these is clicked |
| <kbd>Tab</kbd> | Leaves the list; returning to it focuses the first selected item, or the first item |

Disabled items (`micl-list-item--disabled`) are skipped by the keyboard and get `aria-disabled="true"`.

## Theming
Each list style can be themed with CSS custom properties that follow the component-token naming convention, as defined in the [Material Design 3 Expressive List Specification](https://m3.material.io/components/lists/specs). Set them on any appropriate parent element to affect its child lists.

### Container

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-list-container-color` | The background color of the list | `transparent` |
| `--md-comp-list-container-shape` | The corner rounding of the list, shared by its first and last items | `--md-sys-shape-corner-large` |
| `--md-comp-list-container-space` | The vertical margin around the list | `0px` |
| `--md-comp-list-segment-gap` | The gap between the items of a segmented list | `2px` |
| `--md-comp-list-item-segmented-container-color` | The background color of the items of a segmented list | `--md-sys-color-surface` |
| `--md-comp-list-divider-space` | The space above and below a [Divider](../divider/README.md) inside the list | `0px` |
| `--md-comp-list-motion-effects` | The easing function of the state changes of an item | `--md-sys-motion-expressive-fast-spatial` |
| `--md-comp-list-motion-duration` | The duration of the state changes of an item | `200ms` |

The state changes are not animated when the user prefers reduced motion.

### Item layout

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-list-item-one-line-container-height` | The minimum height of a single-line item | `56px` |
| `--md-comp-list-item-two-line-container-height` | The minimum height of a two-line item | `72px` |
| `--md-comp-list-item-three-line-container-height` | The minimum height of a three-line item | `88px` |
| `--md-comp-list-item-top-space` | The padding above the item content | `10px` |
| `--md-comp-list-item-bottom-space` | The padding below the item content | `10px` |
| `--md-comp-list-item-leading-space` | The padding before the item content | `16px` |
| `--md-comp-list-item-trailing-space` | The padding after the item content | `16px` |
| `--md-comp-list-item-between-space` | The gap between the elements of an item | `12px` |

### Item shapes
The expressive corner rounding of an item follows its interaction state:

| Custom property | Item state | Default |
|---|---|---|
| `--md-comp-list-item-container-expressive-shape` | Resting | `--md-sys-shape-corner-extra-small` |
| `--md-comp-list-item-container-hovered-expressive-shape` | Hovered | `--md-sys-shape-corner-medium` |
| `--md-comp-list-item-container-focused-expressive-shape` | Focused | `--md-sys-shape-corner-large` |
| `--md-comp-list-item-container-pressed-expressive-shape` | Pressed | `--md-sys-shape-corner-large` |
| `--md-comp-list-item-container-dragged-expressive-shape` | Dragged | `--md-sys-shape-corner-large` |
| `--md-comp-list-item-container-disabled-expressive-shape` | Disabled | `--md-sys-shape-corner-extra-small` |
| `--md-comp-list-item-container-selected-expressive-shape` | Selected | `--md-sys-shape-corner-large` |

For selected items, every state also has its own token — `--md-comp-list-item-container-selected-<state>-expressive-shape` with `<state>` one of `hovered`, `focused`, `pressed`, `dragged` or `disabled` — all defaulting to `--md-sys-shape-corner-large`.

### Leading and trailing media

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-list-item-leading-icon-color` | The color of a leading icon | `--md-sys-color-on-surface-variant` |
| `--md-comp-list-item-leading-icon-expressive-size` | The size of a leading icon | `20px` |
| `--md-comp-list-item-trailing-icon-color` | The color of a trailing icon | `--md-sys-color-on-surface-variant` |
| `--md-comp-list-item-trailing-icon-expressive-size` | The size of a trailing icon | `20px` |
| `--md-comp-list-item-leading-avatar-color` | The background color of an avatar | `--md-sys-color-primary-container` |
| `--md-comp-list-item-leading-avatar-label-color` | The text color of an avatar | `--md-sys-color-on-primary-container` |
| `--md-comp-list-item-leading-avatar-shape` | The corner rounding of an avatar | `--md-sys-shape-corner-full` |
| `--md-comp-list-item-leading-avatar-size` | The size of an avatar | `40px` |
| `--md-comp-list-item-leading-image-width` | The width of an image | `56px` |
| `--md-comp-list-item-leading-image-height` | The maximum height of an image | `56px` |
| `--md-comp-list-item-leading-image-expressive-shape` | The corner rounding of an image | `--md-sys-shape-corner-small` |
| `--md-comp-list-item-leading-video-width` | The width of a video thumbnail | `100px` |
| `--md-comp-list-item-leading-video-height` | The maximum height of a video thumbnail | `56px` |
| `--md-comp-list-item-large-leading-video-width` | The width of a large video thumbnail | `114px` |
| `--md-comp-list-item-large-leading-video-height` | The maximum height of a large video thumbnail | `64px` |
| `--md-comp-list-item-leading-video-shape` | The corner rounding of a video thumbnail | `--md-sys-shape-corner-small` |

### Focus indicator

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-list-item-focus-indicator-color` | The color of the keyboard focus indicator | `--md-sys-color-secondary` |
| `--md-comp-list-item-focus-indicator-thickness` | The thickness of the keyboard focus indicator | `3px` |
| `--md-comp-list-item-focus-indicator-offset` | The offset of the keyboard focus indicator | `-3px` |

### Item colors
List item colors follow a naming pattern combining the item's selection state, interaction state, and the specific UI part:

```
--md-comp-list-item[-selected][-<state>]-<part>-color
```

- `selected` targets items that are checked options or contain a checked checkbox or switch.
- `<state>` is one of `hover`, `focus`, `pressed`, `dragged` or `disabled`; omit it for the resting state.
- `<part>` is one of `container`, `overline`, `label-text`, `supporting-text`, `leading-icon`, `trailing-icon`, `trailing-supporting-text` or `state-layer`.

Every `state-layer` color has an `-opacity` companion, and so does every color of a `disabled` state. The `container` part exists for the resting, `dragged`, `selected` and `selected-disabled` combinations only, and the `overline` part has no hover, focus or pressed tokens. Add the `micl-list-item--dragging` class to an item while it is being dragged (for example while reordering the list); its elevation can be set with `--md-comp-list-item-dragged-container-elevation` and `--md-comp-list-item-selected-dragged-container-elevation`. The defaults per part:

| Part | Resting | Hover, focus, pressed | Dragged | Selected | Selected + state | Disabled |
|---|---|---|---|---|---|---|
| container | transparent | | --md-sys-color-tertiary-container | --md-sys-color-secondary-container | | selected: --md-sys-color-on-surface at 38% |
| overline | --md-sys-color-on-surface-variant | | --md-sys-color-on-tertiary-container | --md-sys-color-on-secondary-container | | --md-sys-color-on-surface at 38% |
| label-text | --md-sys-color-on-surface | --md-sys-color-on-surface | --md-sys-color-on-tertiary-container | --md-sys-color-on-secondary-container | --md-sys-color-on-secondary-container | --md-sys-color-on-surface at 38% |
| supporting-text, trailing-supporting-text | --md-sys-color-on-surface-variant | --md-sys-color-on-surface-variant | --md-sys-color-on-tertiary-container | --md-sys-color-on-secondary-container | --md-sys-color-on-surface | --md-sys-color-on-surface at 38% |
| leading-icon, trailing-icon | --md-sys-color-on-surface-variant | --md-sys-color-on-surface-variant | --md-sys-color-on-tertiary-container | --md-sys-color-on-secondary-container | --md-sys-color-on-surface | --md-sys-color-on-surface at 38% |
| state-layer | | --md-sys-color-on-surface | --md-sys-color-on-tertiary-container | | --md-sys-color-on-surface | --md-sys-color-on-surface at 0% |

The M3 specification gives list items a `surface` container. MICL list items are transparent by default so that a list blends into the component it is placed in (a card, sheet or dialog); set `--md-comp-list-item-container-color` to `var(--md-sys-color-surface)` for the specification look.

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
