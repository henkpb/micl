# Select
This component implements the [Material Design 3 Expressive Select](https://m3.material.io/components/menus/guidelines#ee2f3664-c926-47ab-acbf-2ab675506932) design. A Select component presents users with a list of options from which to choose.

## Basic Usage

### HTML
The Select component is an extension of the [Text Field](../textfield/README.md) and [Menu](../menu/README.md) components. It can be either `filled` or `outlined`. To create a basic Select, use the following HTML and swap the class name to change the style.

```HTML
<div class="micl-textfield-filled">
  <label for="myselect">Country</label>
  <select id="myselect">
    <option class="micl-list-item-one" value="AR">
      <span class="micl-list-item__text">Argentina</span>
    </option>
    <option class="micl-list-item-one" value="BO">
      <span class="micl-list-item__text">Bolivia</span>
    </option>
  </select>
</div>
```

### CSS
The Select component relies on styles from the Text Field, Menu, and List components. Import the shared base styles once, followed by these and the Select styles. Add the divider styles if you use [Dividers](../divider/README.md) between the options:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/list";
@use "material-inspired-component-library/dist/menu";
@use "material-inspired-component-library/dist/textfield";
@use "material-inspired-component-library/dist/select";
@use "material-inspired-component-library/dist/divider";
```

Alternatively, import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
The Select component is fully functional without JavaScript. However, importing the script adds two progressive enhancements:

* The pick-list grows from the edge of the field it opens on, above or below.
* For browsers lacking customizable select support, clicking an option in a multiple select toggles it rather than resetting the entire selection.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

When loading individual JavaScript files, the Select behavior is included in `dist/textfield`.

This initializes all Select components, including those added to the DOM dynamically.

### Live Demo
A live example of the [Select component](https://henkpb.github.io/micl/select.html) is available to interact with.

## Variants
A Select component can be disabled by adding the `disabled` attribute to the `<select>` element. An option within the component can be disabled by adding the `disabled` attribute to the `<option>` element.

The label rests inside the field only when the selected option is completely empty (e.g., `<option value="" aria-label="None"></option>`). Ensure this tag contains no whitespace between its opening and closing tags. Its `aria-label` gives screen readers a name to announce instead of "blank", without adding visible text. When the selected option shows text, even with an empty value (e.g., `<option value="" label="(none)"></option>`), the text is displayed and the label floats above it.

You can add [Dividers](../divider) into the list of options, which will appear as separators to help visually break up the options.

**Example: A select with a divider**

```HTML
<div class="micl-textfield-outlined">
  <label for="myselect">Country</label>
  <select id="myselect">
    <option class="micl-list-item-two" value="" label="(none)"></option>
    <option class="micl-list-item-two" value="AR">
      <span class="micl-list-item__text">Argentina</span>
    </option>
    <hr class="micl-divider-inset">
    <option class="micl-list-item-two" value="BO">
      <span class="micl-list-item__text">Bolivia</span>
    </option>
  </select>
</div>
```

To display extra information, add the `aria-description` attribute to the `<option>` element. Do not nest separate text elements inside the `<option>`, as this corrupts the selected text value. In a two-line list item (`micl-list-item-two`), the `aria-description` content renders as supporting text and is announced by screen readers after the option's name.

**Example: A select with supporting text**

```HTML
<div class="micl-textfield-outlined">
  <label for="myselect">Country</label>
  <select id="myselect">
    <option class="micl-list-item-two" value="AR" aria-description="Country code: AR">
      <span class="micl-list-item__text">Argentina</span>
    </option>
    <option class="micl-list-item-two" value="BO" aria-description="Country code: BO">
      <span class="micl-list-item__text">Bolivia</span>
    </option>
  </select>
</div>
```

The text content of an option can be preceded by various media elements. Apply these classes to empty `<span>` tags inside the `<option>`:

* **Image**: Use `micl-list-item__image` with a background image.
```HTML
<option class="micl-list-item-two" value="AR" aria-description="Country code: AR">
  <span class="micl-list-item__image" style="background-image:url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/330px-Flag_of_Argentina.svg.png)"></span>
  <span class="micl-list-item__text">Argentina</span>
</option>
```

* **Thumbnail**: Use `micl-list-item__thumbnail` for thumbnail imagery (e.g. video previews or photos).
```HTML
<option class="micl-list-item-two" value="AR" aria-description="Country code: AR">
  <span class="micl-list-item__thumbnail" style="background-image:url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/330px-Flag_of_Argentina.svg.png)"></span>
  <span class="micl-list-item__text">Argentina</span>
</option>
```

**Example: Grouping options**

Options can be grouped by using the `<optgroup>` element. Add a `<legend>` element with the `micl-menu__section` class to provide a label for the option group.

```HTML
<div class="micl-textfield-outlined">
  <label for="myselect">Country</label>
  <select id="myselect">
    <option class="micl-list-item-one" value="" aria-label="None"></option>
    <optgroup>
      <legend class="micl-menu__section">North American Countries</legend>
      <option class="micl-list-item-one" value="CA">
        <span class="micl-list-item__text">Canada</span>
      </option>
    </optgroup>
    <hr class="micl-divider-inset">
    <optgroup>
      <legend class="micl-menu__section">South American Countries</legend>
      <option class="micl-list-item-two" value="CL">
        <span class="micl-list-item__text">Chile</span>
      </option>
    </optgroup>
  </select>
</div>
```

### Text field features
A Select supports the features of the [Text Field](../textfield/README.md) that apply to it: a leading icon, supporting text, the `required` attribute, the error state, and form reset. A required Select typically starts with an empty option so that the user must choose a value. The [Form foundation](../../foundations/form/README.md) sets `aria-invalid="true"` on a required Select that has no value, showing the browser's validation message in the supporting text.

**Example: A required select with supporting text, in an error state**

```HTML
<div class="micl-textfield-filled">
  <span class="micl-textfield__icon-leading material-symbols-outlined" aria-hidden="true">public</span>
  <label for="myselect">Country<span aria-hidden="true">*</span></label>
  <select id="myselect" required aria-invalid="true" aria-describedby="myselect-support">
    <option class="micl-list-item-one" value="" aria-label="None"></option>
    <option class="micl-list-item-one" value="AR">
      <span class="micl-list-item__text">Argentina</span>
    </option>
    <option class="micl-list-item-one" value="BO">
      <span class="micl-list-item__text">Bolivia</span>
    </option>
  </select>
  <span id="myselect-support" class="micl-textfield__supporting-text">Select your country of residence</span>
</div>
```

## Multiple selection
Adding the `multiple` attribute turns the Select into an in-page listbox in which several options can be chosen at once.

By default, the listbox grows with its options. To give it a fixed height with internal scrolling, set the `--md-comp-text-field-container-height` custom property.

**Example: A multiple select with a fixed height**

```HTML
<div class="micl-textfield-outlined" style="--md-comp-text-field-container-height:230px">
  <label for="myselect">Countries</label>
  <select id="myselect" multiple>
    <option class="micl-list-item-one" value="AR" selected>
      <span class="micl-list-item__text">Argentina</span>
    </option>
    <option class="micl-list-item-one" value="BO">
      <span class="micl-list-item__text">Bolivia</span>
    </option>
    <option class="micl-list-item-one" value="CL" selected>
      <span class="micl-list-item__text">Chile</span>
    </option>
  </select>
</div>
```

Options support the same content as in a single Select: supporting text, dividers, media elements, and option groups.

## Accessibility
* **Field**: The `<select>` element is announced with the name of its `<label>`, like a Text Field. See the [Text Field accessibility](../textfield/README.md#accessibility) notes for connecting supporting text and indicating an error state.
* **Options**: Supporting text is announced when it is set with `aria-description` on the `<option>` element. Provide an `aria-label` for empty options to prevent screen readers from announcing them as "blank".
* **Motion preferences**: All motion is automatically disabled if the user has requested reduced motion at the OS level. The pick-list opens and closes, and the arrow turns, instantly.

## Theming
The Select component has no tokens of its own: the field is themed with the CSS custom properties of the [Text Field](../textfield/README.md) component, and the option pick-list with those of the [Menu](../menu/README.md) and [List](../list/README.md) components. Set them on any appropriate parent element to affect its child Selects.

**Example: A select with a compact field and a wider pick-list**

```HTML
<div class="micl-textfield-outlined" style="--md-comp-text-field-container-height:48px;--md-comp-menu-width-max:400px">
  <label for="myselect">Country</label>
  <select id="myselect">
    ...
  </select>
</div>
```

## Compatibility

This component uses customizable selects (`appearance: base-select`) to style the pick-list, which may not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/::picker#browser_compatibility) for details. You do not need to write fallbacks manually; the component gracefully degrades to standard browser behavior. Browsers without support still display the field as a text field, but open the browser's own pick-list, which ignores the option styling (media elements, supporting text, and dividers are not shown).

In those browsers, a multiple select is displayed as a scrolling in-page listbox. Some browsers reserve room for four options, regardless of the number of options; set `--md-comp-text-field-container-height` to give the listbox an exact height.
