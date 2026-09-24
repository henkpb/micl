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

This initializes all Text field components, including those added to the DOM dynamically.

The label floats above the field when the field has a value. Values entered by the user, autofilled by the browser or restored by a form reset are detected automatically. When you change the value from a script, dispatch an `input` event so that the text field can update itself:

```JavaScript
field.value = 'New value';
field.dispatchEvent(new Event('input', { bubbles: true }));
```

### Live Demo
A live example of the [Text field component](https://henkpb.github.io/micl/textfield.html) is available to interact with.

## Variants
The following example shows a text field with every available feature. You can include any combination of these elements. The order of elements inside the `<div>` does not change the layout.

```HTML
<div class="micl-textfield-filled">
  <span class="micl-textfield__icon-leading material-symbols-outlined" aria-hidden="true">search</span>
  <label for="mytextfield">Label text</label>
  <span id="myprefix" class="micl-textfield__prefix">$</span>
  <input type="text" id="mytextfield" maxlength="20" aria-describedby="myprefix mysuffix mysupport mycounter">
  <span id="mysuffix" class="micl-textfield__suffix">kg</span>
  <span class="micl-textfield__icon-trailing material-symbols-outlined" aria-hidden="true">cancel</span>
  <span id="mysupport" class="micl-textfield__supporting-text">Supporting text</span>
  <span id="mycounter" class="micl-textfield__character-counter"></span>
</div>
```

The `<input>` element can have the following types: `text`, `date`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `time`, `url` and `week`. Some browsers add their own controls to certain types, such as a clear button in a `search` field.

Icons, prefixes, and suffixes pass pointer events through to the <input> element, meaning clicks will seamlessly focus the text field. (This does not apply to interactive icons wrapped in `<button>` or `<a>` tags).

Adding the `disabled` boolean attribute to the `<input>` element renders the text field in its disabled state.

To mark a text field as required, add the `required` attribute to the `<input>` element and an asterisk to the label text. Screen readers already announce the field as required because of the attribute, so hide the asterisk from them:

```HTML
<label for="amount">Amount<span aria-hidden="true">*</span></label>
<input type="text" id="amount" required>
```

Adding the `aria-invalid="true"` attribute to the `<input>` element displays the text field in an error state. The same attribute tells assistive technologies that the value is invalid; see [Accessibility](#accessibility) for how to connect the error message. The [Form foundation](../../foundations/form/README.md) can set and remove the attribute for you, based on the browser's own validation.

### Leading Content
The `<input>` element can be preceded by various elements:

- **Icon**: Use `micl-textfield__icon-leading` with a (Material Symbols) icon. When using a different icon set, the icon element must have `direction: ltr` (Material Symbols sets this itself) for the icons to keep their positions in a right-to-left context.

- **Prefix**: A prefix (e.g., "$", "NOK") can be included to provide additional context. Like the suffix, it is shown while the label floats above the field, which is when the field has focus or a value; in a text field without a label, it is always shown. The input text starts after the space reserved for the prefix, which is `1em` wide by default. For a prefix longer than a single character, widen that space by overriding a CSS variable on the text field element:
  ```HTML
  <div class="micl-textfield-filled" style="--md-comp-text-field-prefix-space:2.5em">
    ...
    <span class="micl-textfield__prefix">USD</span>
    ...
  </div>
  ```

### Trailing Content
The `<input>` element may be followed by various elements:

- **Icon**: Use `micl-textfield__icon-trailing` with a (Material Symbols) icon.

- **Suffix**: A suffix (e.g., "kg", "@gmail.com") can be included to provide additional context. As with the prefix, the space reserved for the suffix is `1em` wide by default, and can be widened by overriding a CSS variable on the text field element:
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

### Accessibility
Screen readers announce the `<label>` as the name of the field. A text field without a `<label>` needs an `aria-label` attribute on the `<input>` element instead, and a `placeholder` or the surrounding content should make its purpose visible. Supplementary visual elements around the field are only announced if you explicitly connect them to the `<input>` element: give each element an `id` and list those ids in the `aria-describedby` attribute of the `<input>` element. They are read in the order listed, when the field receives focus.

- **Supporting text**: Always connect it. A supporting text with the `micl-textfield__supporting-text--focus` class is announced as well, even while it is hidden.
- **Prefix and suffix**: Connect them when they carry information that is not already in the label or the supporting text. Do not use `aria-label` on the prefix or suffix element; a `<span>` may not have an accessible name, and screen readers ignore it. A screen reader reads the text as written, so if an abbreviation or symbol might not be pronounced well, add the full wording to the label or the supporting text instead.
- **Character counter**: Connect it to let users know how much text is allowed. The counter is announced when the field receives focus, not on every keystroke.
- **Motion preferences**: All motion is automatically disabled if the user has requested reduced motion at the OS level. The label moves, and the prefix and suffix appear, instantly.
- **Error state**: `aria-invalid="true"` on the `<input>` element both shows the error styling and announces the field as invalid. Put the error message in the connected supporting text:

  ```HTML
  <div class="micl-textfield-outlined">
    <label for="weight">Weight</label>
    <input type="number" id="weight" value="17800" aria-invalid="true" aria-describedby="weightunit weighterror">
    <span id="weightunit" class="micl-textfield__suffix">kg</span>
    <span id="weighterror" class="micl-textfield__supporting-text">Too heavy</span>
  </div>
  ```

### Multi-line Text Field
Replace the `<input>` element with the `<textarea>` element to create a multi-line text field:

```HTML
<div class="micl-textfield-outlined">
  <label for="mytextfield">Label text</label>
  <textarea id="mytextfield"></textarea>
</div>
```

Add a value to the `rows` attribute of the `<textarea>` element to create a text field of fixed height. Text that does not fit scrolls vertically:

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
| `--md-comp-text-field-container-height` | The height of the text field's container, excluding the supporting text. An outlined text field with a label also reserves space above the container for the floating label (10px by default) | `56px` |
| `--md-comp-text-field-icon-size` | The size of the leading and trailing icons | `24px` |
| `--md-comp-text-field-icon-space` | The spacing between an icon and the text field's edge | `12px` |
| `--md-comp-text-field-input-space` | The inline padding around the input text | `16px` |
| `--md-comp-text-field-prefix-space` | The width reserved for the prefix | `1em` |
| `--md-comp-text-field-suffix-space` | The width reserved for the suffix | `1em` |
| `--md-comp-text-field-input-color` | The text color of the input text | `--md-sys-color-on-surface` |
| `--md-comp-text-field-input-placeholder-color` | The text color of the placeholder | `--md-sys-color-on-surface-variant` |
| `--md-comp-text-field-input-prefix-color` | The text color of the prefix | `--md-sys-color-on-surface-variant` |
| `--md-comp-text-field-input-suffix-color` | The text color of the suffix | `--md-sys-color-on-surface-variant` |
| `--md-comp-text-field-caret-color` | The color of the text cursor | `--md-sys-color-primary` |
| `--md-comp-text-field-label-color` | The text color of the label | `--md-sys-color-on-surface-variant` |
| `--md-comp-text-field-focus-label-color` | The text color of the label when focused | `--md-sys-color-primary` |
| `--md-comp-text-field-supporting-text-color` | The text color of the supporting text and character counter | `--md-sys-color-on-surface-variant` |
| `--md-comp-text-field-icon-color` | The color of the leading and trailing icons | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-text-field-container-color` | The background color of a filled text field | `--md-sys-color-surface-container-highest` |
| `--md-comp-filled-text-field-active-indicator-color` | The bottom line color of a filled text field | `--md-sys-color-on-surface-variant` |
| `--md-comp-filled-text-field-focus-active-indicator-color` | The bottom line color of a filled text field when focused | `--md-sys-color-primary` |
| `--md-comp-outlined-text-field-outline-color` | The outline color of an outlined text field | `--md-sys-color-outline` |
| `--md-comp-outlined-text-field-focus-outline-color` | The outline color of an outlined text field when focused | `--md-sys-color-primary` |
| `--md-comp-text-field-motion-effects` | The easing function for the floating label's movement | `--md-sys-motion-expressive-slow-effects` |
| `--md-comp-text-field-motion-duration` | The duration of the floating label's movement and of the state-layer fade. Ignored when the user prefers reduced motion | `--md-sys-motion-expressive-slow-effects-duration` |
| `--md-comp-text-field-motion-duration-reverse` | The duration of the prefix and suffix fading in and out. Ignored when the user prefers reduced motion | `--md-sys-motion-expressive-default-effects-duration` |

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
