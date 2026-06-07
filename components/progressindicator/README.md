# Progress Indicator
This component implements the [Material Design 3 Expressive Progress indicators](https://m3.material.io/components/progress-indicators/overview) design. Progress indicators show the status of a process in real time, either as a determinate value or as an indeterminate, looping animation.

## Basic Usage

### HTML
Progress indicators use the native `<progress>` element. Add the `micl-progress-linear` class for the linear (bar) variant or `micl-progress-circular` for the circular (ring) variant.

A **determinate** indicator has a known value. Provide the `value` and (optionally) `max` attributes:

```HTML
<progress class="micl-progress-linear" value="0.6" max="1"></progress>
<progress class="micl-progress-circular" value="60" max="100"></progress>
```

An **indeterminate** indicator has an unknown value. Omit the `value` attribute entirely:

```HTML
<progress class="micl-progress-linear"></progress>
<progress class="micl-progress-circular"></progress>
```

### CSS
Import the progress indicator styles into your project:

```CSS
@use "material-inspired-component-library/dist/progressindicator";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for indeterminate indicators — the looping animation is driven entirely by CSS via the native `:indeterminate` state.

For determinate indicators, the bundled handler mirrors the `value` and `max` attributes into the CSS custom properties that drive the fill, the active/track gap and the Expressive wave amplitude. It also flattens the wave into a straight line over the final 10% of progress.

> **Updating progress at runtime:** the handler observes the `value` and `max` *attributes*. When you update progress dynamically, set the attribute (`element.setAttribute('value', 0.7)`) rather than only the IDL property (`element.value = 0.7`), so the indicator stays in sync. Alternatively, you may set the `--md-comp-progress-fraction` custom property (a number between `0` and `1`) directly for pure-CSS control without the handler.

### Live Demo
A live example of the [Progress Indicator component](https://henkpb.github.io/micl/progressindicator.html) is available to interact with.

## Variants
The Progress Indicator component offers the following variants:

| CSS class | Description |
| --------- | ----------- |
| micl-progress-linear | A horizontal linear progress bar |
| micl-progress-circular | A circular progress ring |
| micl-progress-circular--s | Small circular ring (28px) |
| micl-progress-circular--m | Medium circular ring (48px, default) |
| micl-progress-circular--l | Large circular ring (64px) |

Each variant is **determinate** when a `value` attribute is present and **indeterminate** when it is omitted.

The signature Expressive *wavy active indicator* is applied to the linear variant as a static shape (rasterised once, so any number of determinate indicators cost nothing per frame). Its amplitude eases to zero as the indicator reaches completion, and setting `--md-comp-progress-wave-amplitude` to `0` produces a flat (pre-Expressive) active indicator. Only the transient loading states animate: the linear indeterminate comet, and the circular indeterminate spinner (a GPU-composited rotation). The circular variant renders a smooth ring.

The component respects the `dir` global attribute, automatically mirroring the linear sweep direction for right-to-left (RTL) languages when `dir="rtl"` is applied to an ancestor element. It also honours the user's `prefers-reduced-motion` setting by disabling the travelling wave and looping animations.

## Customizations
You can customize the appearance of the Progress Indicator component by overriding its global CSS variables. Following the MICL convention, these `--md-comp-progress-*` variables can be set on `:root` or on any appropriate parent element to affect its child progress indicators. The colour roles default to the Material Design system colour tokens per the M3 progress-indicator specification.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-comp-progress-active-color | var(--md-sys-color-primary) | Colour of the active (filled) indicator |
| --md-comp-progress-track-color | var(--md-sys-color-secondary-container) | Colour of the remaining track |
| --md-comp-progress-stop-color | var(--md-sys-color-primary) | Colour of the linear end stop indicator dot |
| --md-comp-progress-thickness | 4px | Thickness of the linear track and circular ring stroke |
| --md-comp-progress-track-gap | 4px | Gap between the active indicator and the remaining track (linear) |
| --md-comp-progress-stop-size | 4px | Diameter of the linear end stop indicator dot |
| --md-comp-progress-linear-width | 100% | Default width of the linear indicator |
| --md-comp-progress-wave-wavelength | 40px | Wavelength of the Expressive active wave |
| --md-comp-progress-wave-amplitude | 3px | Amplitude of the Expressive active wave (set to `0` to disable) |
| --md-comp-progress-indeterminate-duration | var(--md-sys-motion-duration-extra-long4) | Period of the indeterminate loop |
| --md-comp-progress-circular-size | 48px | Diameter of the circular indicator |
| --md-comp-progress-wave-image | (inline SVG) | The sine-ribbon mask used for the wavy active indicator |

**Example: A thicker linear indicator with a calmer wave**

```HTML
<progress class="micl-progress-linear" value="0.4"
  style="--md-comp-progress-thickness:8px;--md-comp-progress-wave-amplitude:2px"></progress>
```

## Compatibility
This component utilizes relative RGB color values, CSS `mask`, `conic-gradient` and registered `@property` custom properties, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.
