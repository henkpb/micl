# Alert
This component is an Alert component inspired by [Material Design 3 Expressive](https://m3.material.io/components). Alerts are used to inform the user of important changes in a prominent way.

## Basic Usage

### HTML
To add a basic alert, use a `<div>` element with one of the primary alert style classes: `micl-alert-filled`, `micl-alert-tonal` or `micl-alert-outlined`.

```HTML
<div class="micl-alert-tonal" role="alert">
  <span class="micl-alert__icon material-symbols-outlined">error</span>
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

- `micl-alert-outlined`: An alert with a clear border, typically used for less prominent content.

### Alert Content Structure
The alert in the Basic Usage section shows all available structural elements:

- `micl-alert__icon`: An optional icon that appears before the alert text.

- `micl-alert__text`: A container for the main alert heading (`<h1>`-`<h6>`) and the supporting text.

- `micl-alert__supporting-text`: Intended for a short description or supplementary information, and displayed in a smaller font.

## Customizations
You can customize the appearance of the Alert component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child alert.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-alert-padding | 16px | The inner padding between the alert's edge and its content |
| --md-sys-alert-space | 16px | Sets the spacing between the icon and the text |

**Example: Changing the padding**

```HTML
<div style="--md-sys-alert-padding:24px">
  <div class="micl-alert-filled" role="alert">
    ...
  </div>
</div>
```
