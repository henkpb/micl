# Icon button
This component implements the [Material Design 3 Expressive Icon button](https://m3.material.io/components/icon-buttons/overview) design. Icon buttons allow users to perform a single action with a minimal visual footprint.

## Basic Usage

### HTML
To create a basic icon button, use the `<button>` element with a class that specifies its style and size. This example uses a small standard icon button with a Material Symbol:

```HTML
<button type="button" class="micl-iconbutton-standard-s material-symbols-outlined" aria-label="Control Panel">settings</button>
```

**Important**: The `aria-label` attribute is crucial for accessibility, as it provides a descriptive text for screen readers.

### CSS
Import the icon button styles into your project:

```CSS
@use "material-inspired-component-library/dist/iconbutton";
```

### JavaScript
This component requires JavaScript for interactive features like the **toggle logic**:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Icon button component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Icon button component](https://henkpb.github.io/micl/iconbutton.html) is available to interact with.

## Variants
Icon buttons come in **five sizes**: extra small (`xs`), small (`s`), medium (`m`), large (`l`), and extra large (`xl`). To specify a size, append the appropriate postfix to the button's style class:

**Example: An extra-large icon button**

```HTML
<button type="button" class="micl-iconbutton-standard-xl material-symbols-outlined" aria-label="Control Panel">settings</button>
```

Material Design provides **four distinct styles**: `standard`, `filled`, `tonal` and `outlined`. To use a style other than the `standard` style used above, apply the corresponding class to the button:

**Example: A medium-sized filled icon button**

```HTML
<button type="button" class="micl-iconbutton-filled-m material-symbols-outlined" aria-label="Control Panel">settings</button>
```

By default, icon buttons have a **rounded shape**. For a more square-like appearance, add the `micl-button--square` class.

To reduce the width of an icon button, add the `micl-iconbutton--narrow` class. For an increased width, use the `micl-iconbutton--wide` class.

Adding the `disabled` boolean attribute to the button causes the button to be displayed in a disabled state.

### Toggle Button
A toggle button has two states: **on** (selected) and **off** (unselected). To create one, add the `micl-button--toggle` class.
- **Off state**: The button has the `micl-button--toggle` class.
- **On state**: The button has both the `micl-button--toggle` and `micl-button--selected` classes.

**Example: A selected toggle button**

```HTML
<button type="button" class="micl-iconbutton-outlined-l micl-button--toggle micl-button--selected material-symbols-outlined" aria-label="Control Panel">settings</button>
```

## Icons
The examples above use [Google Material Symbols](https://fonts.google.com/icons). For buttons using these icons, a fill-style of `1` is applied when the button is active or hovered over. To enable this effect, ensure your `link` tag includes `FILL@0..1`.

```HTML
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1" rel="stylesheet" />
```

You can also use other icon libraries. For example, with the [Bootstrap Icons library](https://icons.getbootstrap.com):

```HTML
<button type="button" class="micl-iconbutton-tonal-m" aria-label="Control Panel">
  <i class="bi bi-gear"></i>
</button>
```

## Compatibility
This component uses the `color-mix` CSS functional notation, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix#browser_compatibility) for details.
