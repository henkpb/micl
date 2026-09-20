# Button
This component implements the [Material Design 3 Expressive Button](https://m3.material.io/components/buttons/overview) specification. Buttons are interactive elements that enable users to trigger actions or navigate.

## Basic Usage

### HTML
To create a basic button, use the `<button>` element with a class that specifies its style and size. This example uses a small text-style button:

```HTML
<button type="button" class="micl-button-text-s">Save</button>
```

### CSS
Import the button styles into your project:

```CSS
@use "material-inspired-component-library/dist/button";
```

Or import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to handle **toggle logic**. Importing the module below automatically initializes all Button components, including those dynamically added to the DOM later:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

### Live Demo
A live example of the [Button component](https://henkpb.github.io/micl/button.html) is available to interact with.

## Variants
Buttons come in **five sizes**: extra small (`xs`), small (`s`), medium (`m`), large (`l`), and extra large (`xl`). To specify a size, append the appropriate suffix to the button's style class:

**Example: An extra-large text button**

```HTML
<button type="button" class="micl-button-text-xl">Save</button>
```

Material Design provides **five distinct styles**: `text`, `elevated`, `filled`, `tonal`, and `outlined`. To use a style other than the `text` style used above, apply the corresponding class:

**Example: A medium-sized elevated button**

```HTML
<button type="button" class="micl-button-elevated-m">Save</button>
```

By default, buttons have a **rounded shape**. For a more square-like appearance, add the `micl-button--square` class.

Adding the standard `disabled` boolean attribute displays the button in a disabled state.

### Toggle Button

A toggle button has two states: **on** (pressed) and **off** (unpressed). To create one, add the `micl-button--toggle` class and an `aria-pressed` attribute.

* **Off state**: `micl-button--toggle` is applied alongside `aria-pressed="false"`.
* **On state**: `micl-button--toggle` is applied alongside `aria-pressed="true"`.

**Example: A selected toggle button**

```HTML
<button
  type="button"
  id="id0"
  class="micl-button-tonal-s micl-button--toggle"
  aria-pressed="true"
  commandfor="id0"
  command="--micl-toggle"
>Selected</button>
```

The self-targeting `command` attribute (`--micl-toggle`) flips the `aria-pressed` state whenever the user interacts with the button. The button is also permanently assigned the `micl-button--toggled` class the first time it is activated. This marks a toggle button that the user has interacted with at least once (used by components like the [Navigation rail](../navigationrail/README.md) to distinguish untouched menu buttons from ones that have been toggled on and off again).

Selecting a toggle button **swaps its shape**: a rounded button becomes square-like, and a button carrying the `micl-button--square` class becomes rounded.

**Note:** Toggle buttons are **not available in the `text` style**. Material Design does not define a selected state for text buttons; adding `micl-button--toggle` to one will leave the user without any visual indication of its state.

## Icons
To add a leading icon to a button, include an element with the `micl-button__icon` class inside the `<button>`:

```HTML
<button type="button" class="micl-button-filled-m">
  <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">save</span>
  Save
</button>
```

To use different icons for the **on** and **off** states of a toggle button, remove the static icon name from the element. Instead, provide the `data-miclicon` (off state) and `data-micliconselected` (on state) attributes:

```HTML
  ...
  <span
    class="micl-button__icon material-symbols-outlined"
    data-miclicon="icon_for_off"
    data-micliconselected="icon_for_on"
    aria-hidden="true"
  ></span>
  ...
```

**Icon Library Compatibility:** This swapping mechanism works by replacing the text content of the `micl-button__icon` element (and updating its `class` attribute with the current icon name). Because it relies on text replacement, this feature only works with ligature-based icon fonts like Google Material Symbols. Class-based icon libraries, such as Bootstrap Icons, cannot swap icons this way and should be given a single, static icon.

For buttons using [Google Material Symbols](https://fonts.google.com/icons), a fill style of `1` is applied when the button is selected or hovered. To enable this effect, ensure your `<link>` tag includes the `FILL@0..1` axis:

```HTML
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1" rel="stylesheet">
```

You can still use other icon libraries normally. For example, using the [Bootstrap Icons library](https://icons.getbootstrap.com):

```HTML
<button type="button" class="micl-button-outlined-l">
  <i class="bi bi-gear"></i>
  Settings
</button>
```

## Theming
Each button style can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Note that the `selected-*` and `unselected-*` properties only apply to toggle buttons.

### Text
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-text-button-label-text-color` | Label & icon color | `--md-sys-color-primary` |
| `--md-comp-text-button-disabled-label-text-color` | Label & icon color when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-text-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

### Elevated
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-elevated-button-container-color` | Container background | `--md-sys-color-surface-container-low` |
| `--md-comp-elevated-button-container-elevation` | Container elevation (shadow) | `--md-sys-elevation-level1` |
| `--md-comp-elevated-button-label-text-color` | Label & icon color | `--md-sys-color-primary` |
| `--md-comp-elevated-button-selected-container-color` | Container background when selected | `--md-sys-color-primary` |
| `--md-comp-elevated-button-selected-label-text-color` | Label & icon color when selected | `--md-sys-color-on-primary` |
| `--md-comp-elevated-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-elevated-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-elevated-button-disabled-label-text-color` | Label & icon color when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-elevated-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

### Filled
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-filled-button-container-color` | Container background (also the selected state) | `--md-sys-color-primary` |
| `--md-comp-filled-button-label-text-color` | Label & icon color (also the selected state) | `--md-sys-color-on-primary` |
| `--md-comp-filled-button-unselected-container-color` | Container background when an unselected toggle | `--md-sys-color-surface-container` |
| `--md-comp-filled-button-unselected-label-text-color` | Label & icon color when an unselected toggle | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-filled-button-disabled-label-text-color` | Label & icon color when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

### Tonal
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-filled-tonal-button-container-color` | Container background | `--md-sys-color-secondary-container` |
| `--md-comp-filled-tonal-button-label-text-color` | Label & icon color | `--md-sys-color-on-secondary-container` |
| `--md-comp-filled-tonal-button-selected-container-color` | Container background when selected | `--md-sys-color-secondary` |
| `--md-comp-filled-tonal-button-selected-label-text-color` | Label & icon color when selected | `--md-sys-color-on-secondary` |
| `--md-comp-filled-tonal-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-tonal-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-filled-tonal-button-disabled-label-text-color` | Label & icon color when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-tonal-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

### Outlined
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-outlined-button-outline-color` | Outline (border) color | `--md-sys-color-outline-variant` |
| `--md-comp-outlined-button-label-text-color` | Label & icon color | `--md-sys-color-on-surface-variant` |
| `--md-comp-outlined-button-selected-container-color` | Container background when selected | `--md-sys-color-inverse-surface` |
| `--md-comp-outlined-button-selected-label-text-color` | Label & icon color when selected | `--md-sys-color-inverse-on-surface` |
| `--md-comp-outlined-button-selected-disabled-container-color` | Container background when selected and disabled | `--md-sys-color-on-surface` |
| `--md-comp-outlined-button-selected-disabled-container-opacity` | Container opacity when selected and disabled | `10%` |
| `--md-comp-outlined-button-disabled-label-text-color` | Label & icon color when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-outlined-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

### Motion
These properties apply to every button style. They drive the corner-shape swap, the elevation change, and the state-layer fade.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-button-motion-effects` | The easing function for shape, elevation, and state-layer changes | `--md-sys-motion-expressive-fast-spatial` |
| `--md-comp-button-motion-duration` | The duration of shape, elevation, and state-layer changes | `--md-sys-motion-expressive-fast-spatial-duration` |

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in all browser versions. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.

**Toggle buttons** are driven by the `command` and `commandfor` attributes, which require Chrome 135, Firefox 144, or Safari 26.2 and later. In an older browser, the button renders correctly but will not change state. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#browser_compatibility) for details.
