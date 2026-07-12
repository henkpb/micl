# Radio button
This component implements the [Material Design 3 Expressive Radio button](https://m3.material.io/components/radio-button/overview) design. A radio button allows a user to select only one option from a group of mutually exclusive choices.

## Basic Usage

### HTML
To add a basic radio button, use the `<input type="radio">` element with the `micl-radio` class, paired with a `<label>` element:

```HTML
<input type="radio" id="myradio" class="micl-radio" name="foo" value="bar">
<label for="myradio">First choice</label>
```

### CSS
Import the radio button styles into your project:

```CSS
@use "material-inspired-component-library/dist/radio";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Radio button component](https://henkpb.github.io/micl/radio.html) is available to interact with.

## Variants
A radio button can be disabled by adding the `disabled` attribute to the `<input>` element.

The Radio Button component respects the `dir` global attribute, automatically adjusting its layout for right-to-left (RTL) languages when `dir="rtl"` is applied to an ancestor element.

The component applies `cursor: pointer` and the color role **on surface** to the `<label>` element immediately preceding or following an `<input type="radio">` with the `micl-radio` class. You are encouraged to customize these CSS settings to match your design system.

## Theming
Each radio button can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child radio buttons.

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-radio-button-icon-size | The diameter of the radio button itself | 20px |
| --md-comp-radio-button-outline-width | The thickness of the radio button's ring | 2px |
| --md-comp-radio-button-unselected-icon-color | The ring color of an unselected radio button | --md-sys-color-on-surface-variant |
| --md-comp-radio-button-selected-icon-color | The ring and dot color of a selected radio button | --md-sys-color-primary |

**Example: Changing the size of the radio button**

```HTML
<div style="--md-comp-radio-button-icon-size:28px">
  <input type="radio" id="myradio" class="micl-radio">
  <label for="myradio">Large radio button</label>
</div>
```

To vertically align a radio button with its label, wrap both in an element that has the `micl-flex--vcenter` class.

```HTML
<div class="micl-flex--vcenter">
  <input type="radio" id="myradio" class="micl-radio">
  <label for="myradio">Large radio button</label>
</div>
```

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
