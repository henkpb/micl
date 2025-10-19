# Checkbox
This component implements the the [Material Design 3 Expressive Checkbox](https://m3.material.io/components/checkbox/overview) design. A checkbox allows a user to select one or more options from a number of choices.

## Basic Usage

### HTML
To add a basic checkbox, use the `<input type="checkbox">` element with the `micl-checkbox` class, paired with a `<label>` element:

```HTML
<input type="checkbox" id="mycheckbox" class="micl-checkbox">
<label for="mycheckbox">Bar</label>
```

### CSS
Import the checkbox styles into your project:

```CSS
@use "material-inspired-component-library/dist/checkbox";
```

### JavaScript
This component requires JavaScript to support checkbox groups:

`import micl from "material-inspired-component-library/dist/micl";`

This will initialize any checkbox group, including those that will be added to the DOM later on.

### Demo
A live example of the [Checkbox component](https://henkpb.github.io/micl/checkbox.html) is available for you to interact with.

## Variants
Adding the `micl-checkbox--error` CSS class to the `<input>` element will create an error-checkbox as specified by the Material Design 3 specification.

A checkbox can be disabled by adding the `disabled` attribute to the `<input>` element.

The Checkbox component respects the `dir` global attribute, automatically adjusting its layout for right-to-left (RTL) languages when `dir="rtl"` is applied to an ancestor element.

The component applies `cursor: pointer` and the color role **on surface** to the `<label>` element immediately preceding or following an `<input type="checkbox">` with the `micl-checkbox` class. You are encouraged to customize these CSS settings to match your design system.

## Checkbox group
You can establish a parent-child relationship among checkboxes. To do this, wrap the entire set of related checkboxes in an element using the `micl-checkbox-group` class. The designated parent checkbox must also include the `micl-checkbox__parent` class.

```HTML
<div class="micl-checkbox-group">
  <input type="checkbox" id="cb0" class="micl-checkbox micl-checkbox__parent" value="c0">
  <label for="cb0">Choices</label>
  <input type="checkbox" id="cb1" class="micl-checkbox" value="c1">
  <label for="cb1">First Choice</label>
  <input type="checkbox" id="cb2" class="micl-checkbox" checked value="c2">
  <label for="cb2">Second Choice</label>
  ...
</div>
```

To visually improve the layout, such as by indenting child checkboxes, use wrapper elements and utility classes:

```HTML
<div class="micl-checkbox-group">
  <div class="micl-flex--vcenter">
    <input type="checkbox" id="cb0" class="micl-checkbox micl-checkbox__parent" value="c0">
    <label for="cb0">Choices</label>
  </div>
  <div style="padding-inline-start:16px">
    <div class="micl-flex--vcenter">
      <input type="checkbox" id="cb1" class="micl-checkbox" value="c1">
      <label for="cb1">First Choice</label>
    </div>
    <div class="micl-flex--vcenter">
      <input type="checkbox" id="cb2" class="micl-checkbox" checked value="c2">
      <label for="cb2">Second Choice</label>
    </div>
    ...
  </div>
</div>
```

Note that checkbox groups support **nesting**, allowing a `micl-checkbox-group` to contain other `micl-checkbox-group` elements for multi-level hierarchies.

## Customizations
You can customize the appearance of the Checkbox component by overriding its global CSS variables. These variables are declared on the :root pseudo-class and can be changed on any appropriate parent element to affect its child checkboxes.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-checkbox-border-width | 2px | Controls the thickness of the checkbox's border |
| --md-sys-checkbox-check-thickness | 2px | The thickness of the checkmark |
| --md-sys-checkbox-container-size | 18px | Defines the size of the checkbox itself |

**Example: Changing the border width of a checkbox**

```HTML
<div style="--md-sys-checkbox-border-width:1px">
  <input type="checkbox" id="mycheckbox" class="micl-checkbox">
  <label for="mycheckbox">Checkbox</label>
</div>
```

To vertically align a checkbox with its label, wrap both in an element that has the `micl-flex--vcenter` class.

```HTML
<div class="micl-flex--vcenter">
  <input type="checkbox" id="mycheckbox" class="micl-checkbox">
  <label for="mycheckbox">Checkbox</label>
</div>
```

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
