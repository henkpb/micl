# Text field
This component implements the the [Material Design 3 Expressive Text field](https://m3.material.io/components/text-fields/overview) design.

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
@use "material-inspired-component-library/components/textfield";
```

### TypeScript
This component requires a TypeScript module for interactive features like the **character counter**. You can import the specific module and handle initialization manually, or use the main MICL library for automatic initialization.

To manually initialize the component and attach an event listener for the `input` event:

```TypeScript
import miclTextField from 'material-inspired-component-library/components/textfield';

miclTextField.initialize(document.querySelector('.micl-textfield-filled'));

document.querySelector('.micl-textfield-outlined').addEventListener('input', miclTextField.input);
```

### Demo
A live example of the [Text field component](https://henkpb.github.io/micl/textfield.html) is available for you to interact with.

## Variants
The following example shows a text field with every available feature. You can include any combination of these elements. The order of elements inside the `<div>` does not change the layout.

```HTML
<div class="micl-textfield-filled">
  <span class="micl-textfield__icon-leading material-symbols-outlined" aria-hidden="true">search</span>
  <label for="mytextfield">Label text</label>
  <span class="micl-textfield__prefix">$</span>
  <input type="text" id="mytextfield" maxlength="20">
  <span class="micl-textfield__suffix">kg</span>
  <span class="micl-textfield__icon-trailing material-symbols-outlined" aria-hidden="true">cancel</span>
  <span class="micl-textfield__supporting-text">Supporting text</span>
  <span class="micl-textfield__character-counter"></span>
</div>
```

The `<input>` element can have the following types: `text`, `date`, `datetime-local`, `email`, `month`, `number`, `password`, `tel`, `time`, `url` and `week`.

Two icons may be included in the layout: a **leading icon** (an element containing the `micl-textfield__icon-leading` class), and a **trailing icon** (an element containing the `micl-textfield__icon-trailing` class).

A **prefix** (e.g., "$") and a **suffix** (e.g., "kg") can be included to provide additional context. You can customize the spacing by overriding CSS variables:

```HTML
<span class="micl-textfield__prefix" style="--md-sys-textfield-prefix-space:20px">USD</span>
<span class="micl-textfield__suffix" style="--md-sys-textfield-suffix-space:10em">@gmail.com</span>
```

Use an element with the `micl-textfield__supporting-text` class to add extra information about the text field.

If the `<input>` element includes the `maxlength` attribute, the **character counter** will display automatically in the element with the `micl-textfield__character-counter` class.

Adding the `disabled` boolean attribute to the `<input>` element causes the text field to be displayed in a disabled state.

Adding the `micl-textfield--error` class to the text field displays it in an error state.

## Compatibility
This component uses relative RGB colors, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
