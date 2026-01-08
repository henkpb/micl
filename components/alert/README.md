# Alert
Alerts are used to inform the user of important changes in a prominent way. This component is inspired by [Material Design 3 Expressive](https://m3.material.io/components).

## Basic Usage

### HTML
To add a basic alert, use a `<div>` element with one of the primary alert style classes: `micl-alert-filled`, `micl-alert-tonal` or `micl-alert-outlined`.

```HTML
<div class="micl-alert-tonal" role="alert">
  <span class="micl-alert__icon material-symbols-outlined" aria-hidden="true">error</span>
  <div class="micl-alert__text">
    <h4>An error has occurred</h4>
    <span class="micl-alert__supporting-text">Keyboard not responding. Press any key to continue.</span>
  </div>
</div>
```

### CSS
Import the alert styles into your project:

```CSS
@use "material-inspired-component-library/dist/alert";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Alert component](https://henkpb.github.io/micl/alert.html) is available to interact with.

## Variants
Alerts are available in **three distinct styles**:

- `micl-alert-filled`: An alert with a solid background color that stands out prominently.
  ```HTML
  <div class="micl-alert-filled" role="alert">
    ...
  </div>
  ```

- `micl-alert-tonal`: An alert with a lighter background color. This is the style shown in the Basic Usage section.

- `micl-alert-outlined`: An alert with a clear border and a transparent background, typically used for less prominent content.

You can change the component's color to reflect different semantic meanings or states.

**By default, all alert styles use the error-style color scheme.**

To change the color, add one of the following modifier classes to the main `<div>` element.

| Class name | Description |
| ---------- | ----------- |
| micl-alert--primary | Uses the main color scheme of your application |
| micl-alert--secondary | Uses a color scheme that is less prominent than the main one |
| micl-alert--tertiary | Uses a color scheme that provides contrasting accents |

### Alert Content Structure
The Alert component is built with a few key structural elements.

- `micl-alert__icon` (optional): A container for an icon, typically from a library like Material Symbols. It appears before the alert text.

- `micl-alert__text`: A container for the main alert heading (`<h1>`-`<h6>`) and supporting text.

- `micl-alert__supporting-text` (optional): Used for a short description or supplementary information. It is displayed in a smaller font.

## Customizations
You can customize the appearance of the Alert component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child alert.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-alert-padding | 16px | The inner padding between the alert's edge and its content |
| --md-sys-alert-space | 16px | The spacing between the optional icon and the text container |

**Example: Changing the padding**

```HTML
<div style="--md-sys-alert-padding:24px">
  <div class="micl-alert-filled" role="alert">
    ...
  </div>
</div>
```
