# Checkbox
This component implements the the [Material Design 3 Expressive Checkbox](https://m3.material.io/components/checkbox/overview) design.

## Basic Usage

### HTML
To add a basic checkbox, use the `<input type="checkbox">` element with the `micl-checkbox` class, paired with a `<label>` element:

```HTML
<input type="checkbox" id="mycheckbox" class="micl-checkbox" value="foo">
<label for="mycheckbox">Bar</label>
```

### CSS
Import the checkbox styles into your project:

```CSS
@use "material-inspired-component-library/components/checkbox";
```

### TypeScript
This component requires a TypeScript module to support checking and unchecking using a keyboard. You can import the specific module or use the main MICL TypeScript library, which handles initialization automatically.

To manually initialize the component:

```TypeScript
import miclCheckbox from 'material-inspired-component-library/components/checkbox';

miclCheckbox.initialize(document.querySelector('.micl-checkbox'));
```

## Variants
Adding the `micl-checkbox--error` CSS class to the `<input>` element will create an error-checkbox as specified by the Material Design 3 specification.

A checkbox can be disabled by adding the `disabled` attribute to the `<input>` element.

The Checkbox component respects the `dir` global attribute, automatically adjusting its layout for right-to-left (RTL) languages when `dir="rtl"` is applied to an ancestor element.

## Customizations
You can customize the appearance of the Checkbox component by overriding its global CSS variables. These variables are declared on the :root pseudo-class and can be changed on any appropriate parent element to affect its child checkboxes.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-checkbox-border-width | 2px | Controls the thickness of the checkbox's border |
| --md-sys-checkbox-container-size | 18px | Defines the size of the checkbox itself |
| --md-sys-checkbox-selected-icon | \2A3D | The character used as the checkmark for the checkbox |
| --md-sys-checkbox-state-layer-radius | 20px | Sets the radius of the interactive area that indicates the component's current state (e.g., hover, focus, press) |

**Example: Changing the size of the interactive area**

```HTML
<div style="--md-sys-checkbox-state-layer-radius:24px">
  <input type="checkbox" id="mycheckbox" class="micl-checkbox">
  <label for="mycheckbox">Checkbox</label>
</div>
```

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
