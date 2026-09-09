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

The Radio button component respects the element's computed direction, automatically adjusting its layout for right-to-left (RTL) languages — whether the `dir` attribute is set on the element itself or inherited from an ancestor.

The component automatically applies `cursor: pointer` and the **on-surface** color role to any `<label>` immediately preceding or following a `micl-radio` input. You are encouraged to customize these CSS settings to match your design system.

To vertically align a radio button with its label, wrap both in an element with styling similar to the following:

```CSS
.my-valign-class {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

```HTML
<div class="my-valign-class">
  <input type="radio" id="myradio" class="micl-radio" name="foo">
  <label for="myradio">First choice</label>
</div>
```

## Radio group
Radio buttons are only meaningful as a group. Give every radio button for a given question the same `name`, and the browser makes the choices mutually exclusive for you — selecting one clears the others, and only the selected value is submitted.

The group is also a single stop in the tab order: <kbd>Tab</kbd> moves into and out of it, while the arrow keys move the selection between the buttons inside it. This behaviour is native, so it needs no JavaScript and no `role` attributes.

Wrap the group in a `<fieldset>` with a `<legend>` so that assistive technology announces the question along with each of the options:

```HTML
<fieldset>
  <legend>Delivery</legend>
  <div class="my-valign-class">
    <input type="radio" id="ship1" class="micl-radio" name="delivery" value="standard" checked>
    <label for="ship1">Standard</label>
  </div>
  <div class="my-valign-class">
    <input type="radio" id="ship2" class="micl-radio" name="delivery" value="express">
    <label for="ship2">Express</label>
  </div>
</fieldset>
```

Always mark one option as `checked`, unless leaving the question unanswered is a valid state. A group with no preselected option cannot be returned to its initial state by the user once a choice has been made.

Adding the `required` attribute to a radio button makes the whole group mandatory — the browser will not submit the form until one of the buttons carrying that `name` is selected. The [Form foundation](../../foundations/form/README.md) leaves radio buttons to the browser's own reporting, so no MICL-specific error class is involved.

## Theming
Each radio button can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child radio buttons.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-radio-button-icon-size` | The diameter of the radio button itself | `20px` |
| `--md-comp-radio-button-outline-width` | The thickness of the radio button's ring | `2px` |
| `--md-comp-radio-button-unselected-icon-color` | The ring color of an unselected radio button | `--md-sys-color-on-surface-variant` |
| `--md-comp-radio-button-selected-icon-color` | The ring and dot color of a selected radio button | `--md-sys-color-primary` |

**Example: Changing the size of the radio button**

```HTML
<div style="--md-comp-radio-button-icon-size:28px">
  <input type="radio" id="myradio" class="micl-radio" name="foo">
  <label for="myradio">Large radio button</label>
</div>
```

## Compatibility
This component relies on a few recent CSS features, which may not be fully supported in your browser:

| Feature | Used for |
|---|---|
| [Relative RGB color values](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) | The state layer and the ripple |
| [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) | Styling a `<label>` that precedes its radio button |

Please check the linked browser-compatibility tables for details.
