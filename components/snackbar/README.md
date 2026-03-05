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

The Snackbar component respects the `dir` global attribute, automatically adjusting its layout for right-to-left (RTL) languages when `dir="rtl"` is applied to an ancestor element.

## Customizations
You can customize the appearance of the Snackbar component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child snackbars.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-comp-snackbar-margin | 24px | The distance between the snackbar and the bottom of the device |
| --md-comp-snackbar-padding | 16px | The inner padding of the snackbar |

The Snackbar component supports the following CSS variables, as defined in the [Material Design 3 Expressive Snackbar Specification](https://m3.material.io/components/snackbar/specs):

```CSS
--md-comp-snackbar-container-color
--md-comp-snackbar-container-elevation
--md-comp-snackbar-container-shape
--md-comp-snackbar-with-single-line-container-height
--md-comp-snackbar-with-two-lines-container-height
--md-comp-snackbar-action-label-text-color
--md-comp-snackbar-icon-size
--md-comp-snackbar-icon-color
--md-comp-snackbar-supporting-text-color
--md-comp-snackbar-action-hover-label-text-color
--md-comp-snackbar-action-focus-label-text-color
--md-comp-snackbar-action-pressed-label-text-color
--md-comp-snackbar-icon-hover-icon-color
--md-comp-snackbar-icon-focus-icon-color
--md-comp-snackbar-icon-pressed-icon-color
--md-comp-snackbar-action-hover-state-layer-color
--md-comp-snackbar-action-hover-state-layer-opacity
--md-comp-snackbar-action-focus-state-layer-color
--md-comp-snackbar-action-focus-state-layer-opacity
--md-comp-snackbar-action-pressed-state-layer-color
--md-comp-snackbar-action-pressed-state-layer-opacity
```

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
