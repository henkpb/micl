# Snackbar
This component implements the [Material Design 3 Expressive Snackbar](https://m3.material.io/components/snackbar/overview) design. Snackbars are short, temporary notifications that appear at the bottom of the screen.

## Basic Usage

### HTML
To create a simple snackbar, use a `<div>` element with the `micl-snackbar` class. Inside, use a `<span>` element with the `micl-snackbar__supporting-text` class to contain the snackbar's notification.

```HTML
<div class="micl-snackbar" popover="manual" data-micldelay="3000" role="status" aria-atomic="true">
  <span class="micl-snackbar__supporting-text">All changes saved</span>
</div>
```

The `data-micldelay` attribute contains the number of milliseconds the snackbar remains visible.

### CSS
Import the snackbar styles into your project:

```CSS
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/snackbar";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript to enable auto-dismissing the snackbar.

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Snackbar component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Snackbar component](https://henkpb.github.io/micl/snackbar.html) is available to interact with.

## Variants
You can add an action to the snackbar by including a [MICL button](../button/README.md) to the markup:

```HTML
<div class="micl-snackbar" popover="manual" data-micldelay="3000" role="status" aria-atomic="true">
  <span class="micl-snackbar__supporting-text">Your document has been saved</span>
  <button type="button" class="micl-button-text-s">Undo</button>
</div>
```

You can also add a close button that dismisses the snackbar when pressed:

```HTML
<div id="mysnackbar" class="micl-snackbar" popover="manual" data-micldelay="7000" role="status" aria-atomic="true">
  <span class="micl-snackbar__supporting-text">Your document has been saved</span>
  <button type="button" class="micl-iconbutton-standard-s material-symbols-outlined" popovertarget="mysnackbar" popovertargetaction="hide">close</button>
</div>
```

Add the `micl-snackbar--two` class to the snackbar to increase its height so that it can accommodate two lines of text.

```HTML
<div class="micl-snackbar micl-snackbar--two" popover="manual" data-micldelay="5000" role="status" aria-atomic="true">
  <span>
    <span class="micl-snackbar__supporting-text">Message sent</span>
    <span class="micl-snackbar__supporting-text">An email has been sent to Alice</span>
  </span>
</div>
```

The Snackbar component respects the element's computed direction, automatically adjusting its layout for right-to-left (RTL) languages — whether the `dir` attribute (including `dir="auto"`) is set on the element itself or inherited from an ancestor.

## Theming
Each snackbar can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child snackbars.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-comp-snackbar-margin | 24px | The distance between the snackbar and the bottom of the device |
| --md-comp-snackbar-padding | 16px | The inner padding of the snackbar |

The Snackbar component supports the following CSS variables, as defined in the [Material Design 3 Expressive Snackbar Specification](https://m3.material.io/components/snackbar/specs):

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-snackbar-container-color | The background color of the snackbar | --md-sys-color-inverse-surface |
| --md-comp-snackbar-container-elevation | The shadow (elevation) of the snackbar | --md-sys-elevation-level3 |
| --md-comp-snackbar-container-shape | The corner rounding of the snackbar | --md-sys-shape-corner-extra-small |
| --md-comp-snackbar-with-single-line-container-height | The height of a single-line snackbar | 48px |
| --md-comp-snackbar-with-two-lines-container-height | The height of a two-line snackbar | 68px |
| --md-comp-snackbar-supporting-text-color | The text color of the notification | --md-sys-color-inverse-on-surface |
| --md-comp-snackbar-action-label-text-color | The label color of the action button | --md-sys-color-inverse-primary |
| --md-comp-snackbar-action-hover-label-text-color | The label color of the hovered action button | --md-sys-color-inverse-primary |
| --md-comp-snackbar-action-focus-label-text-color | The label color of the focused action button | --md-sys-color-inverse-primary |
| --md-comp-snackbar-action-pressed-label-text-color | The label color of the pressed action button | --md-sys-color-inverse-primary |
| --md-comp-snackbar-icon-size | The size of the close icon | 24px |
| --md-comp-snackbar-icon-color | The color of the close icon | --md-sys-color-inverse-on-surface |
| --md-comp-snackbar-icon-hover-icon-color | The color of the hovered close icon | --md-sys-color-inverse-on-surface |
| --md-comp-snackbar-icon-focus-icon-color | The color of the focused close icon | --md-sys-color-inverse-on-surface |
| --md-comp-snackbar-icon-pressed-icon-color | The color of the pressed close icon | --md-sys-color-inverse-on-surface |
| --md-comp-snackbar-action-hover-state-layer-color | The state layer tinting the snackbar while hovered (the auto-dismiss timer pauses) | --md-sys-color-inverse-primary |
| --md-comp-snackbar-action-hover-state-layer-opacity | The opacity of the hover state layer | 8% |
| --md-comp-snackbar-action-focus-state-layer-color | The state layer tinting the snackbar while focused | --md-sys-color-inverse-primary |
| --md-comp-snackbar-action-focus-state-layer-opacity | The opacity of the focus state layer | 10% |
| --md-comp-snackbar-action-pressed-state-layer-color | The state layer tinting the snackbar while pressed | --md-sys-color-inverse-primary |
| --md-comp-snackbar-action-pressed-state-layer-opacity | The opacity of the pressed state layer | 10% |

**Example: Changing the padding of the snackbar**

```HTML
<div style="--md-comp-snackbar-padding:24px">
  <div class="micl-snackbar" popover="manual" data-micldelay="3000" role="status" aria-atomic="true">
    <span class="micl-snackbar__supporting-text">All changes saved</span>
  </div>
</div>
```

To change the amount of rounding of the snackbar's corners, you could for example add a CSS rule to your stylesheet:

```CSS
.micl-snackbar {
  --md-comp-snackbar-container-shape: 24px;
}
```

## Compatibility
This component uses the Popover API, which might not be supported in all browsers. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#api.htmlelement.popover) for details.
