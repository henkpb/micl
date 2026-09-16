# Slider
This component implements the [Material Design 3 Expressive Slider](https://m3.material.io/components/sliders/overview) design.

## Basic Usage

### HTML
To add a basic slider, use the `<input type="range">` element with one of the primary slider style classes: `micl-slider-xs`, `micl-slider-s`, `micl-slider-m`, `micl-slider-l` or `micl-slider-xl`.

```HTML
<input type="range" class="micl-slider-m">
```

### CSS
Import the slider styles into your project:

```CSS
@use "material-inspired-component-library/dist/slider";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
This component requires JavaScript for functionality:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Slider component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Slider component](https://henkpb.github.io/micl/slider.html) is available to interact with.

## Variants
Sliders come in **five different sizes**: extra small (`xs`), small (`s`), medium (`m`), large (`l`), and extra large (`xl`). To set a specific size, append the appropriate size suffix to the `micl-slider` CSS class name:

```HTML
<input type="range" class="micl-slider-s" min="1" max="10" step="1" value="6">
```

By default, the slider is displayed **horizontally**. To display the slider **vertically**, add the `micl-slider--vertical` CSS class.

Adding the `disabled` boolean attribute to the `input` element causes the slider to be displayed in a disabled state.

Every slider shows a **stop indicator** at the end of its track. Add a `<datalist>` element and reference it with the `list` attribute to get a discrete slider, which shows a stop indicator at each listed value. The values do not have to be evenly spaced.

```HTML
<input type="range" class="micl-slider-l" min="0" max="100" value="25" step="25" list="markers">
<datalist id="markers">
  <option value="0"></option>
  <option value="25"></option>
  <option value="50"></option>
  <option value="75"></option>
  <option value="100"></option>
</datalist>
```

> [!NOTE]
> The listed values are suggestions, not stopping points: browsers move the value by `step` and do not snap to the datalist. Give the slider a `step` that matches the listed values if users should only be able to select those.
> The datalist is read once, when the slider is initialized. The script mirrors the slider's value on every `input` event. When a slider's value is changed programmatically or via a form reset, you must manually dispatch an `input` event so the track and value indicator update to reflect the new value:
>
> ```JavaScript
> slider.value = 40;
> slider.dispatchEvent(new Event("input", { bubbles: true }));
> ```

By default, a slider relies on the browser's default dimensions. You can adjust its length by setting the CSS `inline-size` property (this controls the width of a horizontal slider or the height of a vertical one).

```HTML
<input type="range" class="micl-slider-m micl-slider--vertical" style="inline-size:240px" aria-label="Volume">
```

For displaying an icon inside a medium-, large- or extra large-sized slider, wrap the icon and the slider inside a slider container:

```HTML
<div class="micl-slider__container">
  <span class="micl-slider__icon material-symbols-outlined" aria-hidden="true">volume_up</span>
  <input type="range" class="micl-slider-l" min="3.5" max="12.5" value="9.5" step="0.5">
</div>
```

The Slider component is aware of the `dir` global attribute that indicates the directionality of text.

## Theming
Each slider can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. The size properties default to the values of the chosen size class.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-slider-track-height` | The height of the slider track | `16px` / `24px` / `40px` / `56px` / `96px` per size |
| `--md-comp-slider-handle-height` | The height of the slider handle | `44px` / `44px` / `52px` / `68px` / `108px` per size |
| `--md-comp-slider-track-shape` | The corner rounding of the track | `small` / `small` / `medium` / `large` / `extra-large` per size |
| `--md-comp-slider-active-track-color` | The color of the active (filled) part of the track | `--md-sys-color-primary` |
| `--md-comp-slider-inactive-track-color` | The color of the inactive part of the track | `--md-sys-color-secondary-container` |
| `--md-comp-slider-handle-color` | The color of the handle | `--md-sys-color-primary` |
| `--md-comp-slider-active-stop-indicator-container-color` | The color of the stop indicators on the active track | `--md-sys-color-on-primary` |
| `--md-comp-slider-inactive-stop-indicator-container-color` | The color of the stop indicators on the inactive track | `--md-sys-color-on-secondary-container` |
| `--md-comp-slider-value-indicator-container-color` | The background color of the value indicator | `--md-sys-color-inverse-surface` |
| `--md-comp-slider-value-indicator-label-text-color` | The text color of the value indicator | `--md-sys-color-inverse-on-surface` |

**Example: Changing the track colors**

```HTML
<input type="range" class="micl-slider-m" style="--md-comp-slider-active-track-color:var(--md-sys-color-tertiary)">
```

## Accessibility
The slider is a native `<input type="range">`, so keyboard operation and the announced value come from the browser. Give every slider an accessible name, either with a `<label for>` element or with an `aria-label` attribute. The value indicator is purely visual; if the raw value is not meaningful to users, add `aria-valuetext` and keep it updated.

```HTML
<label for="volume">Volume</label>
<input type="range" class="micl-slider-m" id="volume" min="0" max="100" value="60">
```

## Compatibility
This component relies on the `:has()` pseudo-class, typed `attr()` values, CSS anchor positioning, the `color-mix()` function, and `writing-mode: sideways-lr` for vertical sliders. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/attr#browser_compatibility) for details.

> [!NOTE]
> **Gecko browsers** The value indicator of a standalone slider is drawn with the `::after` pseudo-element, which **Gecko** browsers like Mozilla Firefox do not render on `<input>` elements. To show the value indicator in these browsers, wrap the slider inside a slider container; the indicator then works in every browser and any layout:
> ```HTML
> <div class="micl-slider__container">
>   <input type="range" class="micl-slider-l" value="0" aria-label="Brightness">
> </div>
> ```
> The container positions the value indicator from the size custom properties, so set `--md-comp-slider-track-height` and `--md-comp-slider-handle-height` on the container or an ancestor rather than on the `input` element.
