# Icon button
This component implements the [Material Design 3 Expressive Icon button](https://m3.material.io/components/icon-buttons/overview) design. Icon buttons allow users to perform a single action with a minimal visual footprint.

## Basic Usage

### HTML
To create a basic icon button, use the `<button>` element with a class that specifies its style and size. This example uses a small standard icon button with a Material Symbol:

```HTML
<button type="button" class="micl-iconbutton-standard-s material-symbols-outlined" aria-label="Control Panel">settings</button>
```

**Important**: The `aria-label` attribute is crucial for accessibility, as it provides a descriptive text for screen readers.

### CSS
Import the icon button styles into your project:

```CSS
@use "material-inspired-component-library/dist/iconbutton";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript for to support the **toggle logic**:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Icon button component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Icon button component](https://henkpb.github.io/micl/iconbutton.html) is available to interact with.

## Variants
Icon buttons come in **five sizes**: extra small (`xs`), small (`s`), medium (`m`), large (`l`), and extra large (`xl`). To specify a size, append the appropriate postfix to the button's style class:

**Example: An extra-large icon button**

```HTML
<button type="button" class="micl-iconbutton-standard-xl material-symbols-outlined" aria-label="Control Panel">settings</button>
```

Material Design provides **four distinct styles**: `standard`, `filled`, `tonal` and `outlined`. To use a style other than the `standard` style used above, apply the corresponding class to the button:

**Example: A medium-sized filled icon button**

```HTML
<button type="button" class="micl-iconbutton-filled-m material-symbols-outlined" aria-label="Control Panel">settings</button>
```

By default, icon buttons have a **rounded shape**. For a more square-like appearance, add the `micl-button--square` class.

To reduce the width of an icon button, add the `micl-iconbutton--narrow` class. For an increased width, use the `micl-iconbutton--wide` class.

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
  class="micl-iconbutton-outlined-l micl-button--toggle material-symbols-outlined"
  aria-pressed="true"
  commandfor="id0"
  command="--micl-toggle"
  aria-label="Control Panel"
>settings</button>
```

The self-targeting `command` property (`--micl-toggle`) flips `aria-pressed` whenever the user interacts with the button.

To use different icons for the **on** state and the **off** state, remove the icon name from the button and add the `data-miclicon` (the name of the **off** icon) and `data-micliconselected` (the name of the **on** icon) attributes:

```HTML
  ...
  data-miclicon="icon_for_off"
  data-micliconselected="icon_for_on"
></button>
```

Note that the name of the currently used icon is also added to the `class` attribute to support icon libraries using class names to identify icons.

## Icons
The examples above use [Google Material Symbols](https://fonts.google.com/icons). For buttons using these icons, a fill-style of `1` is applied when the button is active or hovered over. To enable this effect, ensure your `link` tag includes `FILL@0..1`.

```HTML
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1" rel="stylesheet" />
```

You can also use other icon libraries. For example, with the [Bootstrap Icons library](https://icons.getbootstrap.com):

```HTML
<button type="button" class="micl-iconbutton-tonal-m" aria-label="Control Panel">
  <i class="bi bi-gear"></i>
</button>
```

## Theming
Each icon button style can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Note that the `selected-*` and `unselected-*` properties only apply to [toggle buttons](#toggle-button).

### Standard
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-icon-button-icon-color` | Icon colour | `--md-sys-color-on-surface-variant` |
| `--md-comp-icon-button-selected-icon-color` | Icon colour when selected | `--md-sys-color-primary` |
| `--md-comp-icon-button-disabled-icon-color` | Icon colour when disabled | `--md-sys-color-on-surface` |
| `--md-comp-icon-button-disabled-icon-opacity` | Icon opacity when disabled | `38%` |

### Filled
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-filled-icon-button-container-color` | Container background (also the selected state) | `--md-sys-color-primary` |
| `--md-comp-filled-icon-button-icon-color` | Icon colour (also the selected state) | `--md-sys-color-on-primary` |
| `--md-comp-filled-icon-button-unselected-container-color` | Container background when an unselected toggle | `--md-sys-color-surface-container` |
| `--md-comp-filled-icon-button-unselected-icon-color` | Icon colour when an unselected toggle | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-icon-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-icon-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-filled-icon-button-disabled-icon-color` | Icon colour when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-icon-button-disabled-icon-opacity` | Icon opacity when disabled | `38%` |

### Tonal
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-filled-tonal-icon-button-container-color` | Container background | `--md-sys-color-secondary-container` |
| `--md-comp-filled-tonal-icon-button-icon-color` | Icon colour | `--md-sys-color-on-secondary-container` |
| `--md-comp-filled-tonal-icon-button-selected-container-color` | Container background when selected | `--md-sys-color-secondary` |
| `--md-comp-filled-tonal-icon-button-selected-icon-color` | Icon colour when selected | `--md-sys-color-on-secondary` |
| `--md-comp-filled-tonal-icon-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-tonal-icon-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-filled-tonal-icon-button-disabled-icon-color` | Icon colour when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-tonal-icon-button-disabled-icon-opacity` | Icon opacity when disabled | `38%` |

### Outlined
| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-outlined-icon-button-icon-color` | Icon colour | `--md-sys-color-on-surface-variant` |
| `--md-comp-outlined-icon-button-outline-color` | Outline (border) colour | `--md-sys-color-outline-variant` |
| `--md-comp-outlined-icon-button-selected-container-color` | Container background when selected | `--md-sys-color-inverse-surface` |
| `--md-comp-outlined-icon-button-selected-icon-color` | Icon colour when selected | `--md-sys-color-inverse-on-surface` |
| `--md-comp-outlined-icon-button-disabled-icon-color` | Icon colour when disabled | `--md-sys-color-on-surface` |
| `--md-comp-outlined-icon-button-disabled-icon-opacity` | Icon opacity when disabled | `38%` |

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
