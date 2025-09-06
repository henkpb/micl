# Badge
This component implements the the [Material Design 3 Expressive Badge](https://m3.material.io/components/badges/overview) design. Badges are small status indicators that can show a count or simply signal new information.

## Basic Usage

### HTML
To add a large badge, use a `<span>` element with the `micl-badge` class and add a short text inside. For a small badge, which is a simple dot, add the `micl-badge--small` class and leave the element empty.

```HTML
<span class="micl-badge">57</span>

<span class="micl-badge micl-badge--small"></span>
```

### CSS
Import the badge styles into your project:

```CSS
@use "material-inspired-component-library/dist/badge";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Demo
A live example of the [Badge component](https://henkpb.github.io/micl/index.html) is available for you to interact with.

## Anchoring
Badges are typically placed on top of other elements, like icons. To anchor a badge to a specific element, use CSS `anchor positioning`.

1. Assign a unique `anchor-name` to the element you want to anchor the badge to. The value should start with `--`.
2. Use the `position-anchor` CSS property on the badge and set its value to the `anchor-name` of the target element.

```HTML
<span class="material-symbols-outlined" style="anchor-name:--inbox">inbox</span>
<span class="micl-badge" style="position-anchor:--inbox">57</span>
```

You can fine-tune the badge's position relative to its anchor using the following CSS variables:

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-badge-inline-offset | 0px | Adjusts the horizontal position of the badge |
| --md-sys-badge-block-offset | 0px | Adjusts the vertical position of the badge |


## Customizations
You can customize the appearance of the Badge component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child badges.

| Variable name | Default Value | Description |
| ------------- | ------------- | ----------- |
| --md-sys-badge-small-size | 6px | The height and width of the small badge |
| --md-sys-badge-large-size | 16px | The height and minimum width of the large badge |
| --md-sys-badge-large-padding | 4px | The horizontal padding used for the large badge |

**Example: Changing the size of the small badge**

```HTML
<div style="--md-sys-badge-small-size:8px">
  <span class="micl-badge micl-badge--small"></span>
</div>
```

## Compatibility
This component uses **anchor positioning**, a modern CSS feature that may not be fully supported in all browsers. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor#browser_compatibility) for details.
