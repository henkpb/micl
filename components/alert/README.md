# Alert
Use alerts to prominently inform users of important changes. This component implements the [Material Design 3 Expressive](https://m3.material.io/components) guidelines.

## Basic Usage

### HTML
To add a basic alert, use a `<div>` element with one of the primary alert style classes: `micl-alert-filled`, `micl-alert-tonal`, or `micl-alert-outlined`.

```HTML
<div class="micl-alert-tonal">
  <span class="micl-alert__icon material-symbols-outlined" aria-hidden="true">error</span>
  <div class="micl-alert__text">
    <h2>An error has occurred</h2>
    <p class="micl-alert__supporting-text">Keyboard not responding. Press any key to continue.</p>
  </div>
</div>
```

An alert present when the page initially loads requires no ARIA role. See [Accessibility](#accessibility) for handling alerts added dynamically while the user is on the page.

### CSS
Import the shared base styles once, followed by the alert styles:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/alert";
```

Alternatively, import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript

No custom JavaScript is required for the core functionality of this component.

### Live Demo

[Interact with a live example](https://henkpb.github.io/micl/alert.html) of the Alert component.

## Anatomy
The alert container holds an optional icon followed by a text container.

* `micl-alert__icon` (optional): A container for an icon, typically from a library like Material Symbols. It precedes the alert text and maintains its size even when the text wraps.
* `micl-alert__text`: A container for the alert heading and supporting text. It occupies the remaining space in the alert, forcing long words or URLs to wrap rather than overflow.
* **Heading** (optional): Any `<h1>` through `<h6>` element inside the text container renders as the alert heading. To use a non-heading element, apply the `micl-heading` class.
* `micl-alert__supporting-text` (optional): Use this for short descriptions or supplementary information. It renders in a smaller font than the heading. You can use both `<span>` and `<p>` elements.

Links inside the text container automatically inherit the alert's text color to ensure sufficient contrast across all alert styles. They retain the browser's default underline so users immediately recognize them as links.

## Variants
Alerts are available in **three distinct styles**:

* `micl-alert-filled`: An alert with a solid background color that stands out prominently.
  ```HTML
  <div class="micl-alert-filled">
    ...
  </div>
  ```

* `micl-alert-tonal`: An alert with a lighter background color. (This is the style shown in the Basic Usage section).
* `micl-alert-outlined`: An alert with a transparent background, a colored border (1px by default), and text matching the alert color. It allows the underlying surface to show through.

Because all three styles share the same dimensions, mixed alert types align perfectly when stacked.

You can change the component's color to reflect different semantic meanings or states.

**By default, all alert styles use the error color scheme.**
To change the color, add one of the following modifier classes to the main `<div>` element:

| Class name | Description |
| --- | --- |
| `micl-alert--primary` | Uses the main color scheme of your application |
| `micl-alert--secondary` | Uses a color scheme that is less prominent than the main one |
| `micl-alert--tertiary` | Uses a color scheme that provides contrasting accents |

## Accessibility
* **Select the role based on how the alert enters the DOM:**
* Static alerts rendered with the initial page load require no role. Screen readers read them as standard page content.
* Urgent messages inserted or revealed dynamically (e.g., a failed save) should use `role="alert"`. Screen readers announce them immediately, interrupting current tasks.
* Non-urgent messages inserted dynamically (e.g., a success confirmation) should use `role="status"`. Screen readers announce them when the user is idle.

  ```HTML
  <div class="micl-alert-filled" role="alert">
    ...
  </div>
  ```

* **Use `role="alert"` sparingly:** Triggering multiple alerts at once overwhelms screen-reader users. Never apply it to alerts present on the initial page load.
* **Do not rely on color alone:** Color schemes (error, primary, secondary, tertiary) carry no meaning for users with color vision deficiencies. Because icons are decorative (`aria-hidden="true"`), the heading text must clearly state the nature of the alert.
* **Match the page outline:** Choose a heading level that fits your document's logical outline. The component styles all heading levels identically, so pick the semantically correct tag.
* **Manage focus:** When an alert summarizes errors after a failed form submission, move focus to it by adding `tabindex="-1"` and calling `focus()` in JavaScript. The browser's focus indicator will remain visible.

## Theming
Each alert can be themed using CSS custom properties. Apply them to any appropriate parent element to affect its child alerts.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-alert-padding` | The inner padding between the alert's edge and its content | `16px` |
| `--md-comp-alert-space` | The spacing between the optional icon and the text container | `16px` |
| `--md-comp-alert-text-space` | The spacing between the heading and the supporting text | `8px` |
| `--md-comp-alert-container-shape` | The corner radius of the alert | `var(--md-sys-shape-corner-small)` |
| `--md-comp-alert-outline-width` | The border width of the alert. The border is transparent on filled and tonal alerts, so all styles keep the same size | `1px` |

**Example: Changing the padding**

```HTML
<div style="--md-comp-alert-padding: 24px">
  <div class="micl-alert-filled">
    ...
  </div>
</div>
```

## Compatibility
This component relies exclusively on widely supported CSS. Every alert style includes a border—which remains transparent on filled and tonal variants. If an operating system enforces high-contrast themes (such as Windows Contrast Themes) that strip away background colors, this transparent border becomes visible. This ensures filled and tonal alerts maintain a clear, discernible boundary even in strict contrast modes.
