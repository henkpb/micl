# Switch
This component implements the the [Material Design 3 Expressive Switch](https://m3.material.io/components/switch/overview) design.

## Basic Usage

### HTML
To add a basic switch, use the `<input type="checkbox">` element with the `micl-switch` class, paired with a `<label>` element:

```HTML
<input type="checkbox" id="myswitch" class="micl-switch" role="switch" value="foo">
<label for="myswitch">My choice</label>
```

### CSS
Import the switch styles into your project:

```CSS
@use "micl/components/switch";
```

### TypeScript
No custom TypeScript is required for the core functionality of this component.

### Demo
A live example of the [Switch component](https://henkpb.github.io/micl/switch.html) is available for you to interact with.

## Variants
By default, the component displays an icon on the switch handle in both the selected and unselected state. To remove the icon in the unselected state, assign an empty string to the following CSS variable:

```CSS
#myswitch {
  --md-sys-switch-unselected-icon: "";
}
```
To remove the icon in the selected state:
```CSS
#myswitch {
  --md-sys-switch-selected-icon: "";
}
```

A switch can be disabled by adding the `disabled` attribute to the `<input>` element.

The switch component is aware of the `dir` global attribute that indicates the directionality of text.

Note that the component assigns a default color and `cursor: pointer` to the `<label>` element immediately preceding or immediately following the `<input>` element. Of course, you may change these CSS settings to something more appropriate.

## Compatibility
This component uses the `color-mix` CSS functional notation, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix#browser_compatibility) for details.
