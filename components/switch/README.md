# Switch
This component implements the [Material Design 3 Expressive Switch](https://m3.material.io/components/switch/overview) design. Switches toggle the state of a single setting on or off.

## Basic Usage

### HTML
To add a basic switch, use the `<input type="checkbox">` element with the `micl-switch` class, paired with a `<label>` element:

```HTML
<input type="checkbox" id="myswitch" class="micl-switch" role="switch" value="foo">
<label for="myswitch">My choice</label>
```

**Note on labels**: The component applies `cursor: pointer` and the color role **on surface** to the `<label>` element immediately preceding, immediately following, or wrapping the `<input type="checkbox">` with the `micl-switch` class. You are encouraged to customize these CSS settings to match your design system.

### CSS
Import the switch styles into your project:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/switch";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Switch component](https://henkpb.github.io/micl/switch.html) is available to interact with.

## Variants
By default, the component displays an icon on the switch handle in both the selected and unselected state. To remove the icon in the unselected state, set the corresponding CSS custom property to an empty string:

```CSS
#myswitch {
  --md-comp-switch-unselected-icon: "";
}
```
To remove the icon in the selected state:
```CSS
#myswitch {
  --md-comp-switch-selected-icon: "";
}
```

A switch can be disabled by adding the `disabled` attribute to the `<input>` element.

The Switch component respects the element's computed direction, automatically adjusting its layout for right-to-left (RTL) languages — whether the `dir` attribute (including `dir="auto"`) is set on the element itself or inherited from an ancestor.

## Accessibility
* The component styles a native `<input type="checkbox">`. Add `role="switch"` to it, as in the examples, so that assistive technologies announce it as a switch that is on or off rather than as a checkbox.
* Always associate a `<label>` with the switch, either with `for`/`id` or by wrapping the input; clicking the label toggles the switch as well.
* The icons on the handle are decorative and are not announced.
* The `disabled` attribute removes a switch from the tab order.

## Theming
Each switch can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child switches.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-switch-track-width` | The width of the track | `52px` |
| `--md-comp-switch-track-height` | The height of the track | `32px` |
| `--md-comp-switch-track-outline-width` | The border width of the track | `2px` |
| `--md-comp-switch-handle-size` | The diameter of the handle when the switch is "off" | `16px` |
| `--md-comp-switch-selected-handle-size` | The diameter of the handle when the switch is "on" | `24px` |
| `--md-comp-switch-pressed-handle-size` | The diameter of the handle when the switch is pressed | `28px` |
| `--md-comp-switch-unselected-track-color` | The track color when the switch is "off" | `--md-sys-color-surface-container-highest` |
| `--md-comp-switch-unselected-track-outline-color` | The track border color when the switch is "off" | `--md-sys-color-outline` |
| `--md-comp-switch-unselected-handle-color` | The handle color when the switch is "off" | `--md-sys-color-outline` |
| `--md-comp-switch-unselected-icon-color` | The icon color when the switch is "off" | `--md-sys-color-surface-container-highest` |
| `--md-comp-switch-selected-track-color` | The track color when the switch is "on" | `--md-sys-color-primary` |
| `--md-comp-switch-selected-handle-color` | The handle color when the switch is "on" | `--md-sys-color-on-primary` |
| `--md-comp-switch-selected-icon-color` | The icon color when the switch is "on" | `--md-sys-color-on-primary-container` |
| `--md-comp-switch-unselected-hover-handle-color` | The handle color when the switch is "off" and hovered | `--md-sys-color-on-surface-variant` |
| `--md-comp-switch-unselected-focus-handle-color` | The handle color when the switch is "off" and focused | `--md-sys-color-on-surface-variant` |
| `--md-comp-switch-unselected-pressed-handle-color` | The handle color when the switch is "off" and pressed | `--md-sys-color-on-surface-variant` |
| `--md-comp-switch-selected-hover-handle-color` | The handle color when the switch is "on" and hovered | `--md-sys-color-primary-container` |
| `--md-comp-switch-selected-focus-handle-color` | The handle color when the switch is "on" and focused | `--md-sys-color-primary-container` |
| `--md-comp-switch-selected-pressed-handle-color` | The handle color when the switch is "on" and pressed | `--md-sys-color-primary-container` |
| `--md-comp-switch-unselected-state-layer-color` | The state layer color around the handle when the switch is "off" | `--md-sys-color-on-surface` |
| `--md-comp-switch-selected-state-layer-color` | The state layer color around the handle when the switch is "on" | `--md-sys-color-primary` |
| `--md-comp-switch-focus-indicator-color` | The color of the focus indicator | `--md-sys-color-secondary` |
| `--md-comp-switch-disabled-unselected-track-color` | The track color when the switch is disabled and "off" | `--md-sys-color-surface-container-highest` |
| `--md-comp-switch-disabled-unselected-track-outline-color` | The track border color when the switch is disabled and "off" | `--md-sys-color-on-surface` |
| `--md-comp-switch-disabled-unselected-handle-color` | The handle color when the switch is disabled and "off" | `--md-sys-color-on-surface` |
| `--md-comp-switch-disabled-unselected-icon-color` | The icon color when the switch is disabled and "off" | `--md-sys-color-surface-container-highest` |
| `--md-comp-switch-disabled-selected-track-color` | The track color when the switch is disabled and "on" | `--md-sys-color-on-surface` |
| `--md-comp-switch-disabled-selected-handle-color` | The handle color when the switch is disabled and "on" | `--md-sys-color-surface` |
| `--md-comp-switch-disabled-selected-icon-color` | The icon color when the switch is disabled and "on" | `--md-sys-color-on-surface` |
| `--md-comp-switch-disabled-track-opacity` | The opacity of the track when the switch is disabled | `12%` |
| `--md-comp-switch-motion-effects` | The easing function for the handle moving and resizing | `--md-sys-motion-expressive-slow-effects` |
| `--md-comp-switch-motion-duration` | The duration of the handle moving and resizing, and of the color changes | `--md-sys-motion-expressive-slow-effects-duration` |

Because this component follows the Material Design 3 token set, the handle requires distinct colors for each interaction state. Modifying `--md-comp-switch-selected-handle-color` only changes the *resting* state. To ensure a consistent theme, remember to also override the matching `-hover-`, `-focus-`, and `-pressed-` properties.

**Example: Changing the width of the switch**

```HTML
<div style="--md-comp-switch-track-width:64px">
  <input type="checkbox" id="myswitch" class="micl-switch" role="switch">
  <label for="myswitch">Long switch</label>
</div>
```

## Compatibility
This component relies on several recent CSS features, which may not be fully supported in your browser:

| Feature | Used for |
|---|---|
| [Relative RGB color values](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) | Dimming the icon of a disabled, selected switch |
| [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) | The state layer around the handle |
| [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) | Styling a `<label>` that precedes its switch |
| [`:dir()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir) | Mirroring the icon for right-to-left languages |

Please check the linked browser-compatibility tables for details.
