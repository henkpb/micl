# Text field
This component implements the [Material Design 3 Expressive Text field](https://m3.material.io/components/text-fields/overview) design.

## Basic Usage

### HTML
A basic text field can be either `filled` or `outlined`. To create one, use the following HTML and simply swap the class name to change the style.

```HTML
<div class="micl-textfield-filled">
  <label for="mytextfield">Label text</label>
  <input type="text" id="mytextfield">
</div>
```

### CSS
Import the text field styles into your project:

```CSS
@use "material-inspired-component-library/dist/textfield";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript for interactive features like the **character counter**:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Text field component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Text field component](https://henkpb.github.io/micl/textfield.html) is available to interact with.

## Variants
The following example shows a text field with every available feature. You can include any combination of these elements. The order of elements inside the `<div>` does not change the layout.

```HTML
<div class="micl-textfield-filled">
  <span class="micl-textfield__icon-leading material-symbols-outlined" aria-hidden="true">search</span>
  <label for="mytextfield">Label text</label>
  <span class="micl-textfield__prefix" aria-label="US dollars">$</span>
  <input type="text" id="mytextfield" maxlength="20" aria-describedby="mysupport">
  <span class="micl-textfield__suffix" aria-label="kilograms">kg</span>
  <span class="micl-textfield__icon-trailing material-symbols-outlined" aria-hidden="true">cancel</span>
  <span id="mysupport" class="micl-textfield__supporting-text">Supporting text</span>
  <span class="micl-textfield__character-counter"></span>
</div>
```

The `<input>` element can have the following types: `text`, `date`, `datetime-local`, `email`, `month`, `number`, `password`, `tel`, `time`, `url` and `week`.

Adding the `disabled` boolean attribute to the `<input>` element causes the text field to be displayed in a disabled state.

Adding the `micl-textfield--error` class to the text field displays it in an error state.

### Leading Content
The data-input element can be preceded by various elements:

- **Icon**: Use `micl-textfield__icon-leading` with a (Material Symbols) icon. When using a different icon set, the icon element must have `direction: ltr` (Material Symbols sets this itself) for the icons to keep their positions in a right-to-left context.

- **Prefix**: A prefix (e.g., "$", "NOK") can be included to provide additional context. You can customize the spacing by overriding CSS variables on the text field element:
  ```HTML
  <div class="micl-textfield-filled" style="--md-comp-text-field-prefix-space:20px">
    ...
    <span class="micl-textfield__prefix">USD</span>
    ...
  </div>
  ```

### Trailing Content
The data-input element may be followed by a trailing text or other element:

- **Icon**: Use `micl-textfield__icon-trailing` with a (Material Symbols) icon.

- **Suffix**: A suffix (e.g., "kg", "@gmail.com") can be included to provide additional context. You can customize the spacing by overriding CSS variables on the text field element:
  ```HTML
  <div class="micl-textfield-outlined" style="--md-comp-text-field-suffix-space:10em">
    ...
    <span class="micl-textfield__suffix">@gmail.com</span>
    ...
  </div>
  ```

### Supporting Content
Use an element with the `micl-textfield__supporting-text` class to add extra information about the text field. If you want this element only to be visible when the text field is focused, add the `micl-textfield__supporting-text--focus` as well.

If the `<input>` element includes the `maxlength` attribute, the **character counter** will display automatically in the element with the `micl-textfield__character-counter` class.

### Multi-line Text Field
Replace the `<input>` element with the `<textarea>` element to create a multi-line text field:

```HTML
<div class="micl-textfield-outlined">
  <label for="mytextfield">Label text</label>
  <textarea id="mytextfield"></textarea>
</div>
```

Add a value to the `rows` attribute of the `<textarea>` element to create a text field of fixed height:

```HTML
<div class="micl-textfield-outlined">
  <label for="mytextfield">Label text</label>
  <textarea id="mytextfield" rows="4"></textarea>
</div>
```

## Theming
Each text field can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child text fields.

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-text-field-container-height | The height of the text field (excluding supporting text) | 56px |
| --md-comp-text-field-icon-size | The size of the leading and trailing icons | 24px |
| --md-comp-text-field-icon-space | The spacing between an icon and the text field's edge | 12px |
| --md-comp-text-field-input-space | The inline padding around the input text | 16px |
| --md-comp-text-field-prefix-space | The width reserved for the prefix | 1em |
| --md-comp-text-field-suffix-space | The width reserved for the suffix | 1em |
| --md-comp-text-field-input-color | The text color of the input text | --md-sys-color-on-surface |
| --md-comp-text-field-input-placeholder-color | The text color of the placeholder | --md-sys-color-on-surface-variant |
| --md-comp-text-field-caret-color | The color of the text cursor | --md-sys-color-primary |
| --md-comp-text-field-label-color | The text color of the label | --md-sys-color-on-surface-variant |
| --md-comp-text-field-focus-label-color | The text color of the label when focused | --md-sys-color-primary |
| --md-comp-text-field-supporting-text-color | The text color of the supporting text and character counter | --md-sys-color-on-surface-variant |
| --md-comp-text-field-icon-color | The color of the leading and trailing icons | --md-sys-color-on-surface-variant |
| --md-comp-filled-text-field-container-color | The background color of a filled text field | --md-sys-color-surface-container-highest |
| --md-comp-filled-text-field-active-indicator-color | The bottom line color of a filled text field | --md-sys-color-on-surface-variant |
| --md-comp-filled-text-field-focus-active-indicator-color | The bottom line color of a filled text field when focused | --md-sys-color-primary |
| --md-comp-outlined-text-field-outline-color | The outline color of an outlined text field | --md-sys-color-outline |
| --md-comp-outlined-text-field-focus-outline-color | The outline color of an outlined text field when focused | --md-sys-color-primary |

**Example: Compact text fields with a brand-colored focus indicator**

```HTML
<form style="--md-comp-text-field-container-height:48px;--md-comp-outlined-text-field-focus-outline-color:var(--md-sys-color-tertiary)">
  <div class="micl-textfield-outlined">
    <label for="myfield">Label text</label>
    <input type="text" id="myfield">
  </div>
</form>
```

## Compatibility
This component uses relative RGB colors, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.

The multi-line text field variant uses the `field-sizing` CSS property, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing#browser_compatibility) for details.
