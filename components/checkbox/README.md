# Checkbox
This component implements the [Material Design 3 Expressive Checkbox](https://m3.material.io/components/checkbox/overview) design. A checkbox allows a user to select one or more options from a number of choices.

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

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to support checkbox groups:

`import micl from "material-inspired-component-library/dist/micl";`

This will initialize any checkbox group, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Checkbox component](https://henkpb.github.io/micl/checkbox.html) is available to interact with.

## Variants
Adding the `micl-checkbox--error` CSS class to the `<input>` element will create an error-checkbox as specified by the Material Design 3 specification.

A checkbox can be disabled by adding the `disabled` attribute to the `<input>` element.

The Checkbox component respects the element's computed direction, automatically adjusting its layout for right-to-left (RTL) languages — whether the `dir` attribute (including `dir="auto"`) is set on the element itself or inherited from an ancestor.

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

```CSS
  .my-utility-class {
    display: flex;
    flex-direction: row;
    align-items: center;
  } 
```

```HTML
<div class="micl-checkbox-group">
  <div class="my-utility-class">
    <input type="checkbox" id="cb0" class="micl-checkbox micl-checkbox__parent" value="c0">
    <label for="cb0">Choices</label>
  </div>
  <div style="padding-inline-start:16px">
    <div class="my-utility-class">
      <input type="checkbox" id="cb1" class="micl-checkbox" value="c1">
      <label for="cb1">First Choice</label>
    </div>
    <div class="my-utility-class">
      <input type="checkbox" id="cb2" class="micl-checkbox" checked value="c2">
      <label for="cb2">Second Choice</label>
    </div>
    ...
  </div>
</div>
```

Note that checkbox groups support **nesting**, allowing a `micl-checkbox-group` to contain other `micl-checkbox-group` elements for multi-level hierarchies.

## Theming
Each checkbox can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child checkboxes.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-checkbox-container-size` | The size of the checkbox itself | `18px` |
| `--md-comp-checkbox-outline-width` | The thickness of the checkbox's border | `2px` |
| `--md-comp-checkbox-check-thickness` | The thickness of the check mark | `2px` |
| `--md-comp-checkbox-unselected-outline-color` | The border color of an unselected checkbox | `--md-sys-color-on-surface-variant` |
| `--md-comp-checkbox-selected-container-color` | The fill color of a selected checkbox | `--md-sys-color-primary` |
| `--md-comp-checkbox-selected-icon-color` | The color of the check mark | `--md-sys-color-on-primary` |

**Example: Changing the border width of a checkbox**

```HTML
<div style="--md-comp-checkbox-outline-width:1px">
  <input type="checkbox" id="mycheckbox" class="micl-checkbox">
  <label for="mycheckbox">Checkbox</label>
</div>
```

To vertically align a checkbox with its label, wrap both in an element that has a styling like suggested below:

```HTML
<div style="display:flex;flex-direction:row;align-items:center">
  <input type="checkbox" id="mycheckbox" class="micl-checkbox">
  <label for="mycheckbox">Checkbox</label>
</div>
```

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
