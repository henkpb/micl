# Progress Indicator
This component implements the [Material Design 3 Expressive Progress indicators](https://m3.material.io/components/progress-indicators/overview) design. Progress indicators show the status of a process in real time, either as a determinate value or as an indeterminate, looping animation.

## Basic Usage

### HTML
The flat linear variant and the circular variant use the native `<progress>` element. A **determinate** indicator has a known value: provide the `value` and (optionally) `max` attributes. An **indeterminate** indicator has an unknown value: omit the `value` attribute entirely.

```HTML
<progress class="micl-linear-progress" value="0.6"></progress>
<progress class="micl-circular-progress" value="60" max="100"></progress>

<progress class="micl-linear-progress"></progress>
<progress class="micl-circular-progress"></progress>
```

The signature Expressive **wavy** indicators cannot be drawn inside a native `<progress>`, so they use a `progressbar`-role element with a wave child instead. A determinate wavy indicator reads its fraction from the `aria-valuenow` / `aria-valuemax` attributes:

```HTML
<div role="progressbar" class="micl-linear-progress"
     aria-valuemin="0" aria-valuemax="1" aria-valuenow="0.6">
  <div class="micl-linear-progress__wave" aria-hidden="true"></div>
</div>

<div role="progressbar" class="micl-circular-progress"
     aria-valuemin="0" aria-valuemax="1" aria-valuenow="0.6">
  <div class="micl-circular-progress__wave" aria-hidden="true"></div>
</div>
```

The indeterminate wavy indicators take a modifier class and, per the ARIA `progressbar` pattern, simply omit `aria-valuenow`:

```HTML
<div role="progressbar" class="micl-linear-progress micl-linear-progress--indeterminate">
  <div class="micl-linear-progress__wave" aria-hidden="true"></div>
</div>

<div role="progressbar" class="micl-circular-progress micl-circular-progress--indeterminate">
  <div class="micl-circular-progress__wave" aria-hidden="true"></div>
</div>
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
No custom JavaScript is required for the core functionality of this component.

To update progress at runtime, set the `value` attribute (`<progress>`) or the `aria-valuenow` attribute (wavy) and the indicator animates to the new value. Note that setting only the IDL property (`element.value = 0.7`) does not change the attribute; use `element.setAttribute(…)`.

### Live Demo
A live example of the [Progress Indicator component](https://henkpb.github.io/micl/progressindicator.html) is available to interact with.

## Variants
The Progress Indicator component offers the following variants:

| CSS class | Element | Description |
| --------- | ------- | ----------- |
| `micl-linear-progress` | `<progress>` | A flat horizontal progress bar |
| `micl-linear-progress` | `<div role="progressbar">` | The Expressive wavy progress bar |
| `micl-linear-progress--indeterminate` | `<div role="progressbar">` | Modifier for the indeterminate wavy bar |
| `micl-circular-progress` | `<progress>` | A flat circular progress ring |
| `micl-circular-progress` | `<div role="progressbar">` | The Expressive wavy progress ring |
| `micl-circular-progress--indeterminate` | `<div role="progressbar">` | Modifier for the indeterminate wavy ring |

- Right-to-left layouts mirror the sweep direction, the wave travel, the gap and the stop dot automatically — via the inherited direction, no extra classes.
- Under `prefers-reduced-motion` the decorative wave travel is disabled; the functional progress animations are kept.

## Theming
Each progress indicator can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

### Linear (flat and wavy)

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-linear-progress-active-indicator-color` | Colour of the active indicator | `--md-sys-color-primary` |
| `--md-comp-linear-progress-track-color` | Colour of the remaining track | `--md-sys-color-secondary-container` |
| `--md-comp-linear-progress-stop-color` | Colour of the stop indicator dot | `--md-sys-color-primary` |
| `--md-comp-linear-progress-track-thickness` | Thickness of the track | 4px |
| `--md-comp-linear-progress-active-thickness` | Thickness of the active indicator | 4px |
| `--md-comp-linear-progress-track-active-space` | Gap between the active indicator and the track | 4px |
| `--md-comp-linear-progress-stop-size` | Diameter of the stop indicator dot | 4px |
| `--md-comp-linear-progress-stop-trailing-space` | Inset of the stop dot from the trailing edge | 0px |

### Wavy only

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-linear-progress-active-wave-amplitude` | Maximum wave amplitude; set to `0px` for a flat (pre-Expressive) bar | 3px |
| `--md-comp-linear-progress-active-wave-wavelength` | Wavelength of the determinate wave | 40px |
| `--md-comp-linear-progress-indeterminate-active-wave-wavelength` | Wavelength of the indeterminate wave | 20px |
| `--md-comp-linear-progress-wave-image` | The repeating wave mask tile (advanced) | built-in |

### Circular

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-circular-progress-active-indicator-color` | Colour of the active arc | `--md-sys-color-primary` |
| `--md-comp-circular-progress-track-color` | Colour of the remaining track ring | `--md-sys-color-secondary-container` |
| `--md-comp-circular-progress-size` | Diameter of the indicator | 40px |
| `--md-comp-circular-progress-active-thickness` | Stroke thickness of **both** the active arc and the track ring | 4px |
| `--md-comp-circular-progress-track-active-space` | Arc-length gap between the active arc and the track | 4px |
| `--md-comp-circular-progress-wave-image` | The wavy ring mask (advanced, wavy variant) | built-in |

**Example: A thicker wavy indicator with a calmer wave**

```HTML
<div role="progressbar" class="micl-linear-progress" aria-valuenow="0.4" aria-valuemax="1"
     style="--md-comp-linear-progress-active-thickness:6px;--md-comp-linear-progress-active-wave-amplitude:2px">
  <div class="micl-linear-progress__wave" aria-hidden="true"></div>
</div>
```

## Compatibility
Determinate indicators read the `value`/`max` (or `aria-valuenow`/`aria-valuemax`) attributes from CSS using typed [`attr()`](https://developer.mozilla.org/en-US/docs/Web/CSS/attr) (CSS Values Level 5). This is supported in Chromium-based browsers; Firefox has the feature implemented behind the `layout.css.attr.enabled` preference (about:config) and is expected to ship it soon.
