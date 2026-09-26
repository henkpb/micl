# Icon button
This component implements the [Material Design 3 Expressive Icon button](https://m3.material.io/components/icon-buttons/overview) specification. Icon buttons allow users to perform a single action with a minimal visual footprint.

## Basic Usage

### HTML
To create a basic icon button, use the `<button>` element with a class that specifies its style and size. This example uses a small standard icon button with a Material Symbol:

```HTML
<button type="button" class="micl-iconbutton-standard-s material-symbols-outlined"
        aria-label="Control Panel">settings</button>
```

**Important**: The `aria-label` attribute is crucial for accessibility, as it provides a descriptive text for screen readers.

### CSS
Import the icon button styles into your project:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/iconbutton";
```

Or import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to handle the **toggle logic** of the `aria-pressed` form (the [label form](#toggle-button-without-javascript) of a toggle button needs none). Importing the module below automatically initializes all Icon button components, including those dynamically added to the DOM later:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

### Live Demo
A live example of the [Icon button component](https://henkpb.github.io/micl/iconbutton.html) is available to interact with.

## Variants
Icon buttons come in **five sizes**: extra small (`xs`), small (`s`), medium (`m`), large (`l`), and extra large (`xl`). To specify a size, append the appropriate suffix to the button's style class:

**Example: An extra-large icon button**

```HTML
<button type="button" class="micl-iconbutton-standard-xl material-symbols-outlined"
        aria-label="Control Panel">settings</button>
```

Material Design provides **four distinct styles**: `standard`, `filled`, `tonal`, and `outlined`. To use a style other than the `standard` style used above, apply the corresponding class:

**Example: A medium-sized filled icon button**

```HTML
<button type="button" class="micl-iconbutton-filled-m material-symbols-outlined"
        aria-label="Control Panel">settings</button>
```

By default, icon buttons have a **rounded shape**. For a more square-like appearance, add the `micl-button--square` class.

To reduce the width of an icon button, add the `micl-iconbutton--narrow` class. For an increased width, use the `micl-iconbutton--wide` class.

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
  class="micl-iconbutton-outlined-l micl-button--toggle material-symbols-outlined"
  aria-pressed="true"
  commandfor="id0"
  command="--micl-toggle"
  aria-label="Control Panel"
>settings</button>
```

The self-targeting `command` attribute (`--micl-toggle`) flips the `aria-pressed` state whenever the user interacts with the button. The button is also permanently assigned the `micl-button--toggled` class the first time it is activated, which marks a toggle button that the user has interacted with at least once.

Selecting a toggle button **swaps its shape**: a rounded button becomes square-like, and a button carrying the `micl-button--square` class becomes rounded.

To use different icons for the **on** and **off** states, remove the static icon name from the button text. Instead, provide the `data-miclicon` (off state) and `data-micliconselected` (on state) attributes:

```HTML
  ...
  data-miclicon="icon_for_off"
  data-micliconselected="icon_for_on"
></button>
```

The swap is done in CSS: the button's `::before` pseudo-element shows `attr(data-miclicon)` while the button is off and `attr(data-micliconselected)` while it is on. The script additionally toggles a class named after the current icon on the button.

**Icon Library Compatibility:** Because the icon name is rendered as text, this feature only works with ligature-based icon fonts like Google Material Symbols. Class-based icon libraries, such as Bootstrap Icons, cannot swap icons this way and should be given a single, static icon.

#### Toggle Button without JavaScript
A toggle icon button can also be built as a `<label>` that wraps a checkbox or a radio button. The `<input>` must be a direct child of the label; it is stretched invisibly over the whole button, and its `checked` state selects the button. The browser handles the state natively, so this form needs **no JavaScript** and posts its value with a surrounding form:

```HTML
<label class="micl-iconbutton-tonal-l micl-button--toggle material-symbols-outlined" aria-label="Microphone">
  <input type="checkbox" name="microphone" checked>
  <span aria-hidden="true">mic</span>
</label>
```

The `aria-label` on the label names the checkbox; wrapping the icon name in an `aria-hidden` element keeps the ligature text out of the accessibility tree. To swap icons, put `data-miclicon` and `data-micliconselected` on the label instead of an icon element; the checked state drives the swap without JavaScript. To disable this form, place the `disabled` attribute on the `<input>`, not on the label. The [Button group](../buttongroup/README.md) component shows checkbox and radio examples in a group.

## Icons
The examples above use [Google Material Symbols](https://fonts.google.com/icons). For buttons using these icons, a fill style of `1` is applied when the button is active or hovered. To enable this effect, ensure your `<link>` tag includes the `FILL@0..1` axis:

```HTML
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1" rel="stylesheet" />
```

You can still use other icon libraries normally. For example, using the [Bootstrap Icons library](https://icons.getbootstrap.com):

```HTML
<button type="button" class="micl-iconbutton-tonal-m" aria-label="Control Panel">
  <i class="bi bi-gear"></i>
</button>
```

## Accessibility
* An icon button has no visible text, so it always needs an `aria-label`. Without it, assistive technologies announce the ligature text (such as "settings") as the name.
* An `aria-pressed` toggle button is announced as a toggle button with its pressed state, which the script keeps in sync. Keep the `aria-label` the same in both states; the icons set with `data-miclicon` and `data-micliconselected` are visual only.
* In the [label form](#toggle-button-without-javascript), the input is announced as a checkbox or radio button with its checked state. An `aria-label` on the `<label>` names the input; wrap the icon name in an `aria-hidden="true"` element so that it is not read as text.

## Theming
Each icon button style can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Note that the `selected-*` and `unselected-*` properties only apply to [toggle buttons](#toggle-button).

### Standard
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-icon-button-icon-color` | Icon color | `--md-sys-color-on-surface-variant` |
| `--md-comp-icon-button-selected-icon-color` | Icon color when selected | `--md-sys-color-primary` |
| `--md-comp-icon-button-disabled-icon-color` | Icon color when disabled | `--md-sys-color-on-surface` |
| `--md-comp-icon-button-disabled-icon-opacity` | Icon opacity when disabled | `38%` |

### Filled
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-filled-icon-button-container-color` | Container background (also the selected state) | `--md-sys-color-primary` |
| `--md-comp-filled-icon-button-icon-color` | Icon color (also the selected state) | `--md-sys-color-on-primary` |
| `--md-comp-filled-icon-button-unselected-container-color` | Container background when an unselected toggle | `--md-sys-color-surface-container` |
| `--md-comp-filled-icon-button-unselected-icon-color` | Icon color when an unselected toggle | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-icon-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-icon-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-filled-icon-button-disabled-icon-color` | Icon color when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-icon-button-disabled-icon-opacity` | Icon opacity when disabled | `38%` |

### Tonal
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-filled-tonal-icon-button-container-color` | Container background | `--md-sys-color-secondary-container` |
| `--md-comp-filled-tonal-icon-button-icon-color` | Icon color | `--md-sys-color-on-secondary-container` |
| `--md-comp-filled-tonal-icon-button-selected-container-color` | Container background when selected | `--md-sys-color-secondary` |
| `--md-comp-filled-tonal-icon-button-selected-icon-color` | Icon color when selected | `--md-sys-color-on-secondary` |
| `--md-comp-filled-tonal-icon-button-disabled-container-color` | Container background when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-tonal-icon-button-disabled-container-opacity` | Container opacity when disabled | `10%` |
| `--md-comp-filled-tonal-icon-button-disabled-icon-color` | Icon color when disabled | `--md-sys-color-on-surface` |
| `--md-comp-filled-tonal-icon-button-disabled-icon-opacity` | Icon opacity when disabled | `38%` |

### Outlined
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-outlined-icon-button-icon-color` | Icon color | `--md-sys-color-on-surface-variant` |
| `--md-comp-outlined-icon-button-outline-color` | Outline (border) color | `--md-sys-color-outline-variant` |
| `--md-comp-outlined-icon-button-selected-container-color` | Container background when selected | `--md-sys-color-inverse-surface` |
| `--md-comp-outlined-icon-button-selected-icon-color` | Icon color when selected | `--md-sys-color-inverse-on-surface` |
| `--md-comp-outlined-icon-button-selected-disabled-container-color` | Container background when selected and disabled | `--md-sys-color-on-surface` |
| `--md-comp-outlined-icon-button-selected-disabled-container-opacity` | Container opacity when selected and disabled | `10%` |
| `--md-comp-outlined-icon-button-disabled-icon-color` | Icon color when disabled | `--md-sys-color-on-surface` |
| `--md-comp-outlined-icon-button-disabled-icon-opacity` | Icon opacity when disabled | `38%` |

### Motion
These properties apply to every icon button style. They drive the corner-shape swap, the icon fill, and the state-layer fade.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-icon-button-motion-effects` | The easing function for shape, icon-fill, and state-layer changes | `--md-sys-motion-expressive-fast-spatial` |
| `--md-comp-icon-button-motion-duration` | The duration of shape, icon-fill, and state-layer changes | `--md-sys-motion-expressive-fast-spatial-duration` |

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in all browser versions. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.

Toggle buttons are driven by the `command` and `commandfor` attributes, which require Chrome 135, Firefox 144, or Safari 26.2 and later. In an older browser, the button renders correctly but will not change state. The [label form](#toggle-button-without-javascript) has no such requirement. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#browser_compatibility) for details.
