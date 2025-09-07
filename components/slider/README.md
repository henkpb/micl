# Slider
This component implements the the [Material Design 3 Expressive Slider](https://m3.material.io/components/sliders/overview) design.

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

### JavaScript
This component requires JavaScript for functionality:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

This will initialize any Slider component, including those that will be added to the DOM later on.

### Demo
A live example of the [Slider component](https://henkpb.github.io/micl/slider.html) is available for you to interact with.

## Variants
Sliders come in **five different sizes**: extra small (`xs`), small (`s`), medium (`m`), large (`l`), and extra large (`xl`). To set a specific size, append the appropriate postfix to the `micl-slider` CSS class name:

```HTML
<input type="range" class="micl-slider-s" min="1" max="10" step="1" value="6">
```

Add a `<datalist>` element to suggest predefined values. The slider will show tick marks for these values.
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

By default, the slider is displayed **horizontally**. To display the slider **vertically**, add the `micl-slider--vertical` CSS class.

For displaying an icon inside a medium-, large- or extra large-sized slider, wrap the icon and the slider inside a slider container:

```HTML
<div class="micl-slider__container">
  <span class="micl-slider__icon material-symbols-outlined" aria-hidden="true">volume_up</span>
  <input type="range" class="micl-slider-l" min="3.5" max="12.5" value="9.5" step="0.5">
</div>
```

Adding the `disabled` boolean attribute to the `input` element causes the slider to be displayed in a disabled state.

The Slider component is aware of the `dir` global attribute that indicates the directionality of text.

## Compatibility
This component uses the `color-mix` CSS functional notation, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix#browser_compatibility) for details.

> [!NOTE]
> **Gecko browsers** The Slider component uses the `::after` pseudo-element to display the value indicator. For this to work on **Gecko** browsers, like Mozilla Firefox, wrap the Slider component inside a slider container:
> ```HTML
> <div class="micl-slider__container">
>   <input type="range" class="micl-slider-l" value="0">
> </div>
> ```
