# Progress Indicator
This component implements the [Material Design 3 Expressive Progress indicators](https://m3.material.io/components/progress-indicators/overview) specification. Progress indicators show the status of a process in real time, either as a determinate value or as an indeterminate, looping animation.

## Basic Usage

### HTML
The flat linear variant and the circular variant use the native `<progress>` element. A **determinate** indicator has a known value: provide the `value` and (optionally) `max` attributes. An **indeterminate** indicator has an unknown value: omit the `value` attribute entirely.

```HTML
<label for="download">Downloading…</label>
<progress id="download" class="micl-linear-progress" value="0.6"></progress>
<progress class="micl-circular-progress" value="60" max="100" aria-label="Upload progress"></progress>

<progress class="micl-linear-progress" aria-label="Loading"></progress>
<progress class="micl-circular-progress" aria-label="Loading"></progress>
```

**Wavy indicators**: The signature Expressive wavy indicators cannot be rendered inside a native `<progress>` element. Instead, construct them using a `<div>` with `role="progressbar"` and a decorative wave child. A determinate wavy indicator reads its fraction from the `aria-valuenow`, `aria-valuemin` and `aria-valuemax` attributes. As in ARIA, `aria-valuemin` defaults to 0 and `aria-valuemax` to 100:

```HTML
<span id="download-label">Downloading…</span>
<div role="progressbar" class="micl-linear-progress" aria-labelledby="download-label"
     aria-valuemin="0" aria-valuemax="1" aria-valuenow="0.6">
  <div class="micl-linear-progress__wave" aria-hidden="true"></div>
</div>

<div role="progressbar" class="micl-circular-progress" aria-label="Upload progress"
     aria-valuemin="0" aria-valuemax="1" aria-valuenow="0.6">
  <div class="micl-circular-progress__wave" aria-hidden="true"></div>
</div>
```

The indeterminate wavy indicators take a modifier class and, per the ARIA `progressbar` pattern, simply omit `aria-valuenow`:

```HTML
<div role="progressbar" class="micl-linear-progress micl-linear-progress--indeterminate" aria-label="Loading">
  <div class="micl-linear-progress__wave" aria-hidden="true"></div>
</div>

<div role="progressbar" class="micl-circular-progress micl-circular-progress--indeterminate" aria-label="Loading">
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

To update progress dynamically, modify the underlying attribute. The component will automatically animate to the new value:
- Native `<progress>`: Update the DOM property directly (`element.value = 0.7`).
- Wavy `<div>`: Update the ARIA attribute (`element.setAttribute('aria-valuenow', 0.7)`).

### Live Demo
A live example of the [Progress Indicator component](https://henkpb.github.io/micl/progressindicator.html) is available to interact with.

## Variants
The Progress Indicator component offers the following variants:

| CSS class | Element | Description |
| --------- | ------- | ----------- |
| `micl-linear-progress` | `<progress>` | A flat horizontal progress bar |
| `micl-linear-progress` | `<div role="progressbar">` | The Expressive wavy progress bar |
| `micl-linear-progress--indeterminate` | `<div role="progressbar">` | Modifier for the indeterminate wavy bar |
| `micl-linear-progress--thick` | both | Modifier for the thick bar (flat and wavy) |
| `micl-circular-progress` | `<progress>` | A flat circular progress ring |
| `micl-circular-progress` | `<div role="progressbar">` | The Expressive wavy progress ring |
| `micl-circular-progress--indeterminate` | `<div role="progressbar">` | Modifier for the indeterminate wavy ring |
| `micl-circular-progress--thick` | both | Modifier for the thick ring (flat and wavy) |

- **Right-to-left (RTL)**: RTL layouts mirror the linear indicators automatically - fill direction, wave travel, gap and stop dot follow inherited direction with no extra classes needed. Circular indicators always run clockwise.
- Under `prefers-reduced-motion` the decorative wave travel is disabled; the functional progress animations are kept.

## Accessibility
A `<progress>` element and a `progressbar`-role element are both announced as progress bars, with their current value. They still need an accessible name that tells the user what is progressing:

* **Native `<progress>`:** Associate a visible `<label>` using `for`, or provide an `aria-label`.
* **Wavy indicators:** Because `<label for>` only works with form inputs, point `aria-labelledby` to a visible caption ID, or provide an `aria-label`.
* **Custom value text:** Screen readers default to announcing percentages. If another unit is more descriptive (e.g., "3 of 12 files"), apply `aria-valuetext` to wavy indicators and keep it synced with `aria-valuenow`.
* **Indeterminate indicators:** Omit `value` (`<progress>`) or `aria-valuenow` (wavy), so that assistive technology reports the progress as unknown.
* **Loading regions:** When a page region is loading, apply `aria-busy="true"` to the region and link it to the indicator using `aria-describedby`. Remove `aria-busy` once content loads.
* **The wave child** is decoration: keep `aria-hidden="true"` on `micl-linear-progress__wave` and `micl-circular-progress__wave`.
* **Respect motion preferences:** When the user has requested reduced motion, the wave stops travelling. The progress itself keeps animating, because it carries information.

  ```HTML
  <progress id="results-progress" class="micl-linear-progress" aria-label="Loading results"></progress>
  <section aria-busy="true" aria-describedby="results-progress">
    …
  </section>
  ```

## Theming
Each progress indicator can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

### Linear (flat and wavy)

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-linear-progress-active-indicator-color` | Colour of the active indicator | `--md-sys-color-primary` |
| `--md-comp-linear-progress-track-color` | Colour of the remaining track | `--md-sys-color-secondary-container` |
| `--md-comp-linear-progress-stop-color` | Colour of the stop indicator dot | `--md-sys-color-primary` |
| `--md-comp-linear-progress-track-thickness` | Thickness of the track | `4px` |
| `--md-comp-linear-progress-active-thickness` | Thickness of the active indicator (see the note below for the wavy bar) | `4px` |
| `--md-comp-linear-progress-track-active-space` | Gap between the active indicator and the track | `4px` |
| `--md-comp-linear-progress-stop-size` | Diameter of the stop indicator dot | `4px` |
| `--md-comp-linear-progress-stop-trailing-space` | Inset of the stop dot from the trailing edge | `0px` |

### Wavy only

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-linear-progress-active-wave-amplitude` | Maximum wave amplitude; set to `0px` for a flat (pre-Expressive) bar | `3px` |
| `--md-comp-linear-progress-active-wave-wavelength` | Wavelength of the determinate wave | `40px` |
| `--md-comp-linear-progress-indeterminate-active-wave-wavelength` | Wavelength of the indeterminate wave | `20px` |
| `--md-comp-linear-progress-wave-image` | The repeating wave mask tile (advanced) | built-in |

### Circular

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-circular-progress-active-indicator-color` | Colour of the active arc | `--md-sys-color-primary` |
| `--md-comp-circular-progress-track-color` | Colour of the remaining track ring | `--md-sys-color-secondary-container` |
| `--md-comp-circular-progress-size` | Diameter of the indicator | `40px` |
| `--md-comp-circular-progress-active-thickness` | Stroke thickness of **both** the active arc and the track ring (see the note below for the wavy ring) | `4px` |
| `--md-comp-circular-progress-track-active-space` | Arc-length gap between the active arc and the track | `4px` |
| `--md-comp-circular-progress-wave-image` | The wavy ring mask (advanced, wavy variant) | built-in |

**Example: A calmer wavy indicator**

```HTML
<div role="progressbar" class="micl-linear-progress" aria-label="Upload progress" aria-valuenow="0.4" aria-valuemax="1"
     style="--md-comp-linear-progress-active-wave-amplitude:2px;--md-comp-linear-progress-active-wave-wavelength:60px">
  <div class="micl-linear-progress__wave" aria-hidden="true"></div>
</div>
```

## Compatibility
- CSS `attr()` requirement: Determinate indicators dynamically read values using typed `attr()`. While fully supported in Chromium and Firefox, browsers lacking support will fall back to native unstyled browser bars (for `<progress>`) or the zero-progress state (for wavy indicators).
- Firefox & style queries: Firefox currently lacks container style query support, which wavy linear indicators use to transition to a flat bar at 100%. In Firefox, the 100% state is flattened but retains a square, rather than rounded, end.
