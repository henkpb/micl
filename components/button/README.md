# Button
This component implements the [Material Design 3 Expressive Button](https://m3.material.io/components/buttons/overview) design. Buttons are interactive elements that enable users to trigger actions or navigate.

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

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to support the **toggle logic**:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Button component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Button component](https://henkpb.github.io/micl/button.html) is available to interact with.

## Variants
Buttons come in **five sizes**: extra small (`xs`), small (`s`), medium (`m`), large (`l`), and extra large (`xl`). To specify a size, append the appropriate postfix to the button's style class:

**Example: An extra-large text button**

```HTML
<button type="button" class="micl-button-text-xl">Save</button>
```

Material Design provides **five distinct styles**: `text`, `elevated`, `filled`, `tonal` and `outlined`. To use a style other than the `text` style used above, apply the corresponding class to the button:

**Example: A medium-sized elevated button**

```HTML
<button type="button" class="micl-button-elevated-m">Save</button>
```

By default, buttons have a **rounded shape**. For a more square-like appearance, add the `micl-button--square` class.

Adding the `disabled` boolean attribute to the button causes the button to be displayed in a disabled state.

### Toggle Button
A toggle button has two states: **on** (pressed) and **off** (unpressed). To create one, add the `micl-button--toggle` class and an `aria-pressed` attribute.
- **Off state**: The button has the `micl-button--toggle` class and `aria-pressed="false"`.
- **On state**: The button has the `micl-button--toggle` class and `aria-pressed="true"`.

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

The self-targeting `command` property (`--micl-toggle`) flips `aria-pressed` whenever the user interacts with the button.

## Icons
To add a leading icon to a button, include an element with the `micl-button__icon` class inside the `<button>`:

```HTML
<button type="button" class="micl-button-filled-m">
  <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">save</span>
  Save
</button>
```

To use different icons for the **on** state and the **off** state in a toggle button, remove the icon name from the `micl-button__icon` element and add the `data-miclicon` (the name of the **off** icon) and `data-micliconselected` (the name of the **on** icon) attributes:

```HTML
  ...
  <span
    class="micl-button__icon material-symbols-outlined"
    data-miclicon="icon_for_off"
    data-micliconselected="icon_for_on"
    aria-hidden="true"
  ><span>
  ...
```

Note that the name of the currently used icon is also added to the `class` attribute to support icon libraries using class names to identify icons.

These examples use [Google Material Symbols](https://fonts.google.com/icons). For buttons using these icons, a fill-style of `1` is applied when the button is selected or hovered over. To enable this effect, ensure your `link` tag includes `FILL@0..1`.

```HTML
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1" rel="stylesheet">
```

You can also use other icon libraries. For example, with the [Bootstrap Icons library](https://icons.getbootstrap.com):

```HTML
<button type="button" class="micl-button-outlined-l">
  <i class="bi bi-gear"></i>
  Settings
</button>
```

## Theming
Each button style can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Note that the `selected-*` and `unselected-*` properties only apply to [toggle buttons](#toggle-button).

### Text
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-text-button-label-text-color` | Label & icon colour | `--md-sys-color-primary` |
| `--md-comp-text-button-disabled-label-text-color` | Label & icon colour when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-text-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

### Elevated
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-elevated-button-container-color` | Container background | `--md-sys-color-surface-container-low` |
| `--md-comp-elevated-button-container-elevation` | Container elevation (shadow) | `--md-sys-elevation-level1` |
| `--md-comp-elevated-button-label-text-color` | Label & icon colour | `--md-sys-color-primary` |
| `--md-comp-elevated-button-selected-container-color` | Container background when selected | `--md-sys-color-primary` |
| `--md-comp-elevated-button-selected-label-text-color` | Label & icon colour when selected | `--md-sys-color-on-primary` |
| `--md-comp-elevated-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-elevated-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-elevated-button-disabled-label-text-color` | Label & icon colour when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-elevated-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

### Filled
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-filled-button-container-color` | Container background (also the selected state) | `--md-sys-color-primary` |
| `--md-comp-filled-button-label-text-color` | Label & icon colour (also the selected state) | `--md-sys-color-on-primary` |
| `--md-comp-filled-button-unselected-container-color` | Container background when an unselected toggle | `--md-sys-color-surface-container` |
| `--md-comp-filled-button-unselected-label-text-color` | Label & icon colour when an unselected toggle | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-filled-button-disabled-label-text-color` | Label & icon colour when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

### Tonal
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-filled-tonal-button-container-color` | Container background | `--md-sys-color-secondary-container` |
| `--md-comp-filled-tonal-button-label-text-color` | Label & icon colour | `--md-sys-color-on-secondary-container` |
| `--md-comp-filled-tonal-button-selected-container-color` | Container background when selected | `--md-sys-color-secondary` |
| `--md-comp-filled-tonal-button-selected-label-text-color` | Label & icon colour when selected | `--md-sys-color-on-secondary` |
| `--md-comp-filled-tonal-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-tonal-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-filled-tonal-button-disabled-label-text-color` | Label & icon colour when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-tonal-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

### Outlined
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-outlined-button-outline-color` | Outline (border) colour | `--md-sys-color-outline-variant` |
| `--md-comp-outlined-button-label-text-color` | Label & icon colour | `--md-sys-color-on-surface-variant` |
| `--md-comp-outlined-button-selected-container-color` | Container background when selected | `--md-sys-color-inverse-surface` |
| `--md-comp-outlined-button-selected-label-text-color` | Label & icon colour when selected | `--md-sys-color-inverse-on-surface` |
| `--md-comp-outlined-button-selected-disabled-container-color` | Container background when selected and disabled | `--md-sys-color-on-surface` |
| `--md-comp-outlined-button-selected-disabled-container-opacity` | Container opacity when selected and disabled | `10%` |
| `--md-comp-outlined-button-disabled-label-text-color` | Label & icon colour when disabled | `--md-sys-color-on-surface-variant` |
| `--md-comp-outlined-button-disabled-label-text-opacity` | Label & icon opacity when disabled | `38%` |

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
