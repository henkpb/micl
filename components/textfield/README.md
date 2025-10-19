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
  <span class="micl-textfield__icon-leading material-symbols-outlined">search</span>
  <label for="mytextfield">Label text</label>
  <span class="micl-textfield__prefix" aria-label="US dollars">$</span>
  <input type="text" id="mytextfield" maxlength="20" aria-describedby="mysupport">
  <span class="micl-textfield__suffix" aria-label="kilograms">kg</span>
  <span class="micl-textfield__icon-trailing material-symbols-outlined">cancel</span>
  <span id="mysupport" class="micl-textfield__supporting-text">Supporting text</span>
  <span class="micl-textfield__character-counter"></span>
</div>
```

The `<input>` element can have the following types: `text`, `date`, `datetime-local`, `email`, `month`, `number`, `password`, `tel`, `time`, `url` and `week`.

Adding the `disabled` boolean attribute to the `<input>` element causes the text field to be displayed in a disabled state.

Adding the `micl-textfield--error` class to the text field displays it in an error state.

### Leading Content
The data-input element can be preceded by various elements:

- **Icon**: Use `micl-textfield__icon-leading` with a (Material Symbols) icon.

- **Prefix**: A prefix (e.g., "$", "NOK") can be included to provide additional context. You can customize the spacing by overriding CSS variables:
  ```HTML
  <span class="micl-textfield__prefix" style="--md-sys-textfield-prefix-space:20px">USD</span>
  ```

### Trailing Content
The data-input element may be followed by a trailing text or other element:

- **Icon**: Use `micl-textfield__icon-trailing` with a (Material Symbols) icon.

- **Suffix**: A suffix (e.g., "kg", "@gmail.com") can be included to provide additional context. You can customize the spacing by overriding CSS variables:
  ```HTML
  <span class="micl-textfield__suffix" style="--md-sys-textfield-suffix-space:10em">@gmail.com</span>
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

## Compatibility
This component uses relative RGB colors, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.

The multi-line text field variant uses the `field-sizing` CSS property, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing#browser_compatibility) for details.
