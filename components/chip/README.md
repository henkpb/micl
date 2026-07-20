# Chip
This component implements the [Material Design 3 Chips](https://m3.material.io/components/chips/overview) design. Chips help people enter information, make selections, filter content, or trigger actions.

## Basic Usage

### HTML
The Chip component is an extension of the [**Button** component](../button/README.md). Chips are placed in a `micl-chips` container. To create a basic chip, use the `<button>` element with a class that specifies its type. This example uses two assist chips:

```HTML
<fieldset class="micl-chips">
  <button type="button" class="micl-chip-assist">Turn on lights</button>
  <button type="button" class="micl-chip-assist">Set alarm</button>
</fieldset>
```

### CSS
Import the chip styles into your project:

```CSS
@use "material-inspired-component-library/dist/chip";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Chip component](https://henkpb.github.io/micl/chip.html) is available to interact with.

## Variants
Material Design provides **four types** of chips, each with its own class:

| Type | Class | Purpose |
|---|---|---|
| Assist | `micl-chip-assist` | Trigger a smart or automated action |
| Filter | `micl-chip-filter` | Select from a set of options |
| Input | `micl-chip-input` | Represent discrete pieces of information entered by the user |
| Suggestion | `micl-chip-suggestion` | Present dynamically generated suggestions |

By default, chips have an **outlined** appearance. For an elevated appearance without an outline, add the `micl-chip--elevated` class:

```HTML
<button type="button" class="micl-chip-assist micl-chip--elevated">Turn on lights</button>
```

Adding the `disabled` boolean attribute causes the chip to be displayed in a disabled state. **Exceptions**: for filter chips, the attribute is placed on the nested `<input>` element instead, and for input chips on both nested `<button>` elements (see below).

### Filter Chip
A filter chip is a `<label>` wrapping an `<input type="checkbox">` (multiple selection) or `<input type="radio">` (single selection), followed by the label text. The leading element with the checkmark icon is required; it is revealed with an animation when the chip is selected:

```HTML
<fieldset class="micl-chips">
  <label class="micl-chip-filter">
    <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">check</span>
    <input type="checkbox" name="amenities" value="parking">
    <span>Parking</span>
  </label>
  <label class="micl-chip-filter">
    <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">check</span>
    <input type="checkbox" name="amenities" value="garden" disabled>
    <span>Garden</span>
  </label>
</fieldset>
```

The selected state follows the `:checked` state of the input, and the disabled state its `disabled` attribute.

A filter chip may additionally carry a **leading icon**, placed before the checkmark icon. It is visible while the chip is unselected and hidden while it is selected.

```HTML
<label class="micl-chip-filter">
  <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">elevator</span>
  <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">check</span>
  <input type="checkbox" name="amenities" value="elevator">
  <span>Elevator</span>
</label>
```

### Input Chip
An input chip carries **two actions** — activating the chip and removing it. The chip itself is a non-interactive `<span>` container holding two sibling `<button>` elements: the primary action with the label, and the trailing remove action.

```HTML
<span class="micl-chip-input">
  <button type="button" class="micl-chip__primary">Avocado</button>
  <button type="button" class="micl-chip__remove material-symbols-outlined"
          aria-label="Remove Avocado">close</button>
</span>
```

To disable an input chip, place the `disabled` attribute on **both** buttons.

An input chip may represent a person with a leading avatar — an `<img>`, or an element with a monogram — placed inside the primary action before the label.

```HTML
<span class="micl-chip-input">
  <button type="button" class="micl-chip__primary">
    <img src="jonas.webp" alt="" class="micl-chip__avatar">
    <span>Jonas</span>
  </button>
  <button type="button" class="micl-chip__remove material-symbols-outlined"
          aria-label="Remove Jonas">close</button>
</span>
```

For a collection of input chips presented like a form field, add the `micl-chips--input` class to the container:

```HTML
<fieldset class="micl-chips micl-chips--input">
  <legend class="md-sys-typescale-label-large">Recipients</legend>
  ...
</fieldset>
```

## Icons
To add a leading icon to a chip, include an element with the `micl-button__icon` class before the label text:

```HTML
<button type="button" class="micl-chip-suggestion">
  <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">music_note</span>
  <span>What song is this?</span>
</button>
```

These examples use [Google Material Symbols](https://fonts.google.com/icons), but other icon libraries can be used just as well.

## Theming
Each chip type can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

### Assist
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-assist-chip-label-text-color` | Label colour | `--md-sys-color-on-surface` |
| `--md-comp-assist-chip-leading-icon-color` | Icon colour | `--md-sys-color-primary` |
| `--md-comp-assist-chip-outline-color` | Outline (border) colour | `--md-sys-color-outline-variant` |
| `--md-comp-assist-chip-elevated-container-color` | Container background when elevated | `--md-sys-color-surface-container-low` |
| `--md-comp-assist-chip-disabled-label-text-color` | Label & icon colour when disabled | `--md-sys-color-on-surface` at `38%` |
| `--md-comp-assist-chip-disabled-outline-color` | Outline colour when disabled | `--md-sys-color-on-surface` at `12%` |

### Filter
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-filter-chip-label-text-color` | Label colour | `--md-sys-color-on-surface-variant` |
| `--md-comp-filter-chip-leading-icon-color` | Icon colour | `--md-sys-color-primary` |
| `--md-comp-filter-chip-outline-color` | Outline (border) colour | `--md-sys-color-outline-variant` |
| `--md-comp-filter-chip-elevated-container-color` | Container background when elevated | `--md-sys-color-surface-container-low` |
| `--md-comp-filter-chip-selected-container-color` | Container background when selected | `--md-sys-color-secondary-container` |
| `--md-comp-filter-chip-selected-label-text-color` | Label colour when selected | `--md-sys-color-on-secondary-container` |
| `--md-comp-filter-chip-selected-leading-icon-color` | Checkmark colour when selected | `--md-sys-color-on-secondary-container` |
| `--md-comp-filter-chip-disabled-label-text-color` | Label & icon colour when disabled | `--md-sys-color-on-surface` at `38%` |
| `--md-comp-filter-chip-disabled-outline-color` | Outline colour when disabled | `--md-sys-color-on-surface` at `12%` |
| `--md-comp-filter-chip-disabled-selected-container-color` | Container background when selected and disabled | `--md-sys-color-on-surface` |
| `--md-comp-filter-chip-disabled-selected-container-opacity` | Container opacity when selected and disabled | `12%` |

### Input
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-input-chip-label-text-color` | Label colour | `--md-sys-color-on-surface-variant` |
| `--md-comp-input-chip-leading-icon-color` | Icon colour | the label colour |
| `--md-comp-input-chip-trailing-icon-color` | Trailing (remove) icon colour | the leading icon colour |
| `--md-comp-input-chip-outline-color` | Outline (border) colour | `--md-sys-color-outline-variant` |
| `--md-comp-input-chip-disabled-label-text-color` | Label & icon colour when disabled | `--md-sys-color-on-surface` at `38%` |
| `--md-comp-input-chip-disabled-outline-color` | Outline colour when disabled | `--md-sys-color-on-surface` at `12%` |
| `--md-comp-input-chip-avatar-size` | Avatar diameter | `24px` |
| `--md-comp-input-chip-avatar-shape` | Avatar corner shape | `--md-sys-shape-corner-full` |
| `--md-comp-input-chip-disabled-avatar-opacity` | Avatar opacity when disabled | `38%` |
| `--md-comp-input-chip-avatar-color` | Monogram avatar background colour ¹ | `--md-sys-color-primary-container` |
| `--md-comp-input-chip-avatar-label-color` | Monogram avatar text colour ¹ | `--md-sys-color-on-primary-container` |

¹ MICL extension: monogram avatars are not part of the Material Design token set, which only covers image avatars.

### Suggestion
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-suggestion-chip-label-text-color` | Label colour | `--md-sys-color-on-surface-variant` |
| `--md-comp-suggestion-chip-leading-icon-color` | Icon colour | `--md-sys-color-primary` |
| `--md-comp-suggestion-chip-outline-color` | Outline (border) colour | `--md-sys-color-outline-variant` |
| `--md-comp-suggestion-chip-elevated-container-color` | Container background when elevated | `--md-sys-color-surface-container-low` |
| `--md-comp-suggestion-chip-disabled-label-text-color` | Label & icon colour when disabled | `--md-sys-color-on-surface` at `38%` |
| `--md-comp-suggestion-chip-disabled-outline-color` | Outline colour when disabled | `--md-sys-color-on-surface` at `12%` |

## Compatibility
This component utilizes relative RGB color values and the `:has()` pseudo-class, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
