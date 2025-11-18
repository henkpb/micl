# Button
This component implements the [Material Design 3 Expressive Button](https://m3.material.io/components/buttons/overview) design. Buttons are interactive elements that enable users to trigger actions or navigate.

## Basic Usage

### HTML
To create a basic button, use the `<button>` element with a class that specifies its style and size. This example uses a small text-style button:

```HTML
<button type="button" class="micl-button-text-s">Save</button>
```

### CSS
Import the button styles into your project:

```CSS
@use "material-inspired-component-library/dist/button";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript for interactive features like the **toggle logic**:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Button component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Button component](https://henkpb.github.io/micl/button.html) is available to interact with.

## Variants
Buttons come in **five sizes**: extra small (`xs`), small (`s`), medium (`m`), large (`l`), and extra large (`xl`). To specify a size, append the appropriate postfix to the button's style class:

**Example: An extra-large text button**

```HTML
<button type="button" class="micl-button-text-xl>Save</button>
```

Material Design provides **five distinct styles**: `text`, `elevated`, `filled`, `tonal` and `outlined`. To use a style other than the `text` style used above, apply the corresponding class to the button:

**Example: A medium-sized elevated button**

```HTML
<button type="button" class="micl-button-elevated-m">Save</button>
```

By default, buttons have a **rounded shape**. For a more square-like appearance, add the `micl-button--square` class.

Adding the `disabled` boolean attribute to the button causes the button to be displayed in a disabled state.

### Toggle Button
A toggle button has two states: **on** (selected) and **off** (unselected). To create one, add the `micl-button--toggle` class.
- **Off state**: The button has the `micl-button--toggle` class.
- **On state**: The button has both the `micl-button--toggle` and `micl-button--selected` classes.

**Example: A selected toggle button**

```HTML
<button type="button" class="micl-button-tonal-s micl-button--toggle micl-button--selected">Selected</button>
```

## Icons
To add a leading icon to a button, include an element with the `micl-button__icon` class inside the `<button>`:

```HTML
<button type="button" class="micl-button-filled-m">
  <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">save</span>
  Save
</button>
```

This example uses a [Google Material Symbol](https://fonts.google.com/icons). For buttons using these icons, a fill-style of `1` is applied when the button is selected or hovered over. To enable this effect, ensure your `link` tag includes `FILL@0..1`.

```HTML
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1" rel="stylesheet">
```

You can also use other icon libraries. For example, with the [Bootstrap Icons library](https://icons.getbootstrap.com):

```HTML
<button type="button" class="micl-button-outlined-l">
  <i class="bi bi-gear"></i>
  Settings
</button>
```

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
