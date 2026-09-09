# Checkbox
This component implements the [Material Design 3 Expressive Checkbox](https://m3.material.io/components/checkbox/overview) design. A checkbox allows a user to select one or more options from a set of choices.

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
This component only requires JavaScript when using checkbox groups:

`import micl from "material-inspired-component-library/dist/micl";`

This will initialize any checkbox group, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Checkbox component](https://henkpb.github.io/micl/checkbox.html) is available to interact with.

## Variants
A checkbox can be disabled by adding the `disabled` attribute to the `<input>` element.

The Checkbox component respects the element's computed direction, automatically adjusting its layout for right-to-left (RTL) languages — whether the `dir` attribute is set on the element itself or inherited from an ancestor.

The component automatically applies `cursor: pointer` and the **on surface** color role to any `<label>` immediately preceding or following a `micl-checkbox` input. You are encouraged to customize these CSS settings to match your design system.

Adding the `micl-checkbox--error` CSS class to the `<input>` element will create an error-checkbox as specified by the Material Design 3 specification. You only need to set the class yourself when you drive the error state by hand — see [Validation](#validation) for letting the form foundation add and remove it from the checkbox's own validity.

To vertically align a checkbox with its label, wrap both in an element that has a styling like suggested below:

```CSS
.my-valign-class {
  display: flex;
  flex-direction: row;
  align-items: center;
} 
```

```HTML
<div class="my-valign-class">
  <input type="checkbox" id="mycheckbox" class="micl-checkbox">
  <label for="mycheckbox">Checkbox</label>
</div>
```

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
  <div class="my-valign-class">
    <input type="checkbox" id="cb0" class="micl-checkbox micl-checkbox__parent" value="c0">
    <label for="cb0">Choices</label>
  </div>
  <div role="group" style="padding-inline-start:16px">
    <div class="my-valign-class">
      <input type="checkbox" id="cb1" class="micl-checkbox" value="c1">
      <label for="cb1">First Choice</label>
    </div>
    <div class="my-valign-class">
      <input type="checkbox" id="cb2" class="micl-checkbox" checked value="c2">
      <label for="cb2">Second Choice</label>
    </div>
    ...
  </div>
</div>
```

Note that checkbox groups support **nesting**, allowing a `micl-checkbox-group` to contain other `micl-checkbox-group` elements for multi-level hierarchies. Each group must contain exactly one `micl-checkbox__parent`; a nested group without one is not tracked by its ancestor.

The parent checkbox reflects the state of its descendants: **checked** when all of them are selected, **unchecked** when none are, and **indeterminate** when the selection is partial — including when that partial selection sits inside a nested group. Because an indeterminate parent is not itself checked, it is left out of form submission until everything below it is selected, and clicking it selects the whole group.

Disabled checkboxes take no part in this. The parent neither changes them nor counts them, so a group whose only unselected checkbox is disabled still reports as fully selected, and a disabled checkbox that is checked does not by itself make its parent indeterminate. A nested group containing nothing but disabled checkboxes is skipped entirely rather than counting as an unselected branch.

## Validation
A single checkbox is made mandatory with the standard `required` attribute. On top of that, the form foundation adds **count validation** for a set of related checkboxes, so you can express rules such as "pick at least two" or "pick exactly three".

### Error state
Whenever the form foundation validates a checkbox, it adds the `micl-checkbox--error` class to any `<input type="checkbox">` carrying the `micl-checkbox` class that has a validation message, and removes the class again once the checkbox becomes valid. If you are using the form foundation, there is no need to toggle this class manually.

### Counting checkboxes in a fieldset
Wrap the related checkboxes in a `<fieldset>` and describe the rule with data attributes:

| Attribute | Meaning |
|---|---|
| `data-miclvalidate-checkboxes-name` | The `name` shared by the checkboxes to count. Required. |
| `data-miclvalidate-message` | The message shown when the rule is broken. Required — without it the fieldset is skipped. |
| `data-miclvalidate-checkboxes-count-min` | The smallest allowed number of checked checkboxes. |
| `data-miclvalidate-checkboxes-count-max` | The largest allowed number of checked checkboxes. |
| `data-miclvalidate-checkboxes-count-equal` | The exact number of checked checkboxes required. |

At least one of the three `count` attributes must be present. They may be combined, and the fieldset is invalid as soon as any one of them is violated.

```HTML
<form id="myform">
  <fieldset
    data-miclvalidate-checkboxes-name="topping"
    data-miclvalidate-checkboxes-count-min="2"
    data-miclvalidate-checkboxes-count-max="3"
    data-miclvalidate-message="Please choose two or three toppings.">
    <legend>Toppings</legend>
    <input type="checkbox" id="t1" class="micl-checkbox" name="topping" value="olives">
    <label for="t1">Olives</label>
    <input type="checkbox" id="t2" class="micl-checkbox" name="topping" value="capers">
    <label for="t2">Capers</label>
    ...
  </fieldset>
</form>
```

### JavaScript
Count validation must be triggered manually. Import the form foundation and call it, typically within a submit handler:

```JavaScript
import form from "material-inspired-component-library/dist/foundations/form";

document.getElementById("myform").addEventListener("submit", event => {
    if (!form.validateForm(event.currentTarget, true)) {
        event.preventDefault();
    }
});
```

`validateForm(form, doReport)` checks every fieldset and every control in the form and returns `true` when all of them are valid. `validateFieldSet(fieldset, doReport)` does the same for a single `<fieldset>`. When `doReport` is `true` the browser additionally shows its own validation bubble; omit it to apply the error state silently.

The message is attached to the **first** checkbox of the named set — that is the control that reports as invalid — and is cleared again as soon as that checkbox changes.

Note that the counted set is defined by the `name` attribute, independently of the checkbox-group classes. If you combine count validation with a [checkbox group](#checkbox-group), give the `micl-checkbox__parent` checkbox a **different** `name` or none at all, otherwise it is counted alongside its children once they are all selected.

## Theming
Each checkbox can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child checkboxes.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-checkbox-container-size` | The size of the checkbox itself | `18px` |
| `--md-comp-checkbox-container-shape` | The corner radius of the checkbox | `2px` |
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

## Compatibility
This component relies on several recent CSS features, which may not be fully supported in your browser:

| Feature | Used for |
|---|---|
| [Relative RGB color values](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) | The state layer and the ripple |
| [`clip-path: rect()`](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/rect) | Revealing the check mark — without it the mark does not draw correctly |
| [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) | Styling a `<label>` that precedes its checkbox |
| [`:dir()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir) | Mirroring the check mark for right-to-left languages |

Please check the linked browser-compatibility tables for details.
