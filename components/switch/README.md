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

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Switch component](https://henkpb.github.io/micl/switch.html) is available to interact with.

## Variants
By default, the component displays an icon on the switch handle in both the selected and unselected state. To remove the icon in the unselected state, assign an empty string to the following CSS variable:

```CSS
#myswitch {
  --md-sys-switch-unselected-icon: "";
}
```
To remove the icon in the selected state:
```CSS
#myswitch {
  --md-sys-switch-selected-icon: "";
}
```

A switch can be disabled by adding the `disabled` attribute to the `<input>` element.

The Switch component respects the `dir` global attribute, automatically adjusting its layout for right-to-left (RTL) languages when `dir="rtl"` is applied to an ancestor element.

The component applies `cursor: pointer` and the color role **on surface** to the `<label>` element immediately preceding or following the `<input type="checkbox">` with the `micl-switch` class. You are encouraged to customize these CSS settings to match your design system.

## Customizations
You can customize the appearance of the Switch component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child switches.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-switch-handle-size | 16px | The diameter of the handle when the switch is "off" |
| --md-sys-switch-handle-selected-size | 24px | The diameter of the handle when the switch is "on" |
| --md-sys-switch-handle-pressed-size | 28px | The diameter of the handle when the switch is pressed |
| --md-sys-switch-outline-width | 2px | The width of the border |
| --md-sys-switch-state-layer-size | 40px | Sets the size of the area that indicates the component's current state (e.g., hover, focus, press) |
| --md-sys-switch-target-height | 32px | The height of the track |
| --md-sys-switch-target-width | 52px | The width of the track |

**Example: Changing the width of the switch**

```HTML
<div style="--md-sys-switch-target-width:64px">
  <input type="checkbox" id="myswitch" class="micl-switch" role="switch">
  <label for="myswitch">Long switch</label>
</div>
```

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
