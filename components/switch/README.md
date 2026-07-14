# Switch
This component implements the [Material Design 3 Expressive Switch](https://m3.material.io/components/switch/overview) design. Switches toggle the state of a single setting on or off.

## Basic Usage

### HTML
To add a basic switch, use the `<input type="checkbox">` element with the `micl-switch` class, paired with a `<label>` element:

```HTML
<input type="checkbox" id="myswitch" class="micl-switch" role="switch" value="foo">
<label for="myswitch">My choice</label>
```

### CSS
Import the switch styles into your project:

```CSS
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
By default, the component displays an icon on the switch handle in both the selected and unselected state. To remove the icon in the unselected state, assign an empty string to the following CSS variable:

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

The component applies `cursor: pointer` and the color role **on surface** to the `<label>` element immediately preceding or following the `<input type="checkbox">` with the `micl-switch` class. You are encouraged to customize these CSS settings to match your design system.

## Theming
Each switch can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child switches.

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-switch-track-width | The width of the track | 52px |
| --md-comp-switch-track-height | The height of the track | 32px |
| --md-comp-switch-track-outline-width | The border width of the track | 2px |
| --md-comp-switch-handle-size | The diameter of the handle when the switch is "off" | 16px |
| --md-comp-switch-selected-handle-size | The diameter of the handle when the switch is "on" | 24px |
| --md-comp-switch-pressed-handle-size | The diameter of the handle when the switch is pressed | 28px |
| --md-comp-switch-unselected-track-color | The track color when the switch is "off" | --md-sys-color-surface-container-highest |
| --md-comp-switch-unselected-track-outline-color | The track border color when the switch is "off" | --md-sys-color-outline |
| --md-comp-switch-unselected-handle-color | The handle color when the switch is "off" | --md-sys-color-outline |
| --md-comp-switch-unselected-icon-color | The icon color when the switch is "off" | --md-sys-color-surface-container-highest |
| --md-comp-switch-selected-track-color | The track color when the switch is "on" | --md-sys-color-primary |
| --md-comp-switch-selected-handle-color | The handle color when the switch is "on" | --md-sys-color-on-primary |
| --md-comp-switch-selected-icon-color | The icon color when the switch is "on" | --md-sys-color-on-primary-container |

**Example: Changing the width of the switch**

```HTML
<div style="--md-comp-switch-track-width:64px">
  <input type="checkbox" id="myswitch" class="micl-switch" role="switch">
  <label for="myswitch">Long switch</label>
</div>
```

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
