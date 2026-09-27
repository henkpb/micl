# Badge
This component implements the [Material Design 3 Expressive Badge](https://m3.material.io/components/badges/overview) design. Badges are small status indicators that can show a count or simply signal new information.

## Basic Usage

### HTML
To add a large badge, use a `<span>` element with the `micl-badge` class and add a short string of text inside. Keep the text to four characters at most, including a `+` (for example `999+`); anything longer is clipped. For a small badge, which is a simple dot, add the `micl-badge--small` class and leave the element empty.

```HTML
<span class="micl-badge">57</span>

<span class="micl-badge micl-badge--small"></span>
```

### CSS
Import the badge styles into your project:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/badge";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Badge component](https://henkpb.github.io/micl/badge.html) is available to interact with. Badges are also shown on the navigation items of the [Navigation bar](https://henkpb.github.io/micl/navigationbar.html) and [Navigation rail](https://henkpb.github.io/micl/navigationrail.html) pages, and on the [MICL home page](https://henkpb.github.io/micl/index.html).

## Anchoring
Badges are placed on top of other elements, typically icons, using CSS anchor positioning:

1. Give the element the badge belongs to an `anchor-name`. The value must start with `--`.
2. Put the badge after that element in the markup and set its `position-anchor` to the same name.

```HTML
<span class="material-symbols-outlined" style="anchor-name:--inbox" aria-hidden="true">inbox</span>
<span class="micl-badge" style="position-anchor:--inbox" aria-hidden="true">57</span>
```

The badge is positioned relative to the center of its anchor, assuming a `--md-sys-icon-size` (24px) icon glyph is centered in it.

Because the badge is absolutely positioned, its anchor must exist within the badge's containing block (the nearest positioned ancestor, or the document root). For naturally positioned elements like navigation items, the anchor name only needs to be unique within that specific item. Elsewhere, use a unique name per page or limit the names' reach with `anchor-scope` on a common ancestor.

### Trailing placement
When the icon is followed by text, a large badge on the icon would overlap the label. Following the Material Design guidance, place it after the label instead by adding the `micl-badge--trailing` class. The badge then needs no anchor: it is laid out in the item's flow, vertically centered, with a small gap after the label.

```HTML
<a href="#" class="micl-navigationrail__item" aria-label="Favorites, 84 new">
  <span class="micl-navigationrail__icon material-symbols-outlined" aria-hidden="true">favorite</span>
  <span class="micl-navigationrail__text">Favorites</span>
  <span class="micl-badge micl-badge--trailing" aria-hidden="true">84</span>
</a>
```

Small badges keep their place on the icon in these layouts.

### Fine-tuning
You can fine-tune the position of an anchored badge using the following custom properties:

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-badge-inline-offset` | Moves the badge along the inline (horizontal) axis | `0px` |
| `--md-comp-badge-block-offset` | Moves the badge along the block (vertical) axis | `0px` |

## Accessibility
Badges are purely visual. To ensure screen readers interpret them correctly, hide the badge itself using `aria-hidden="true"` and update the destination's accessible name to include the badge's information (e.g., the number for a large badge, or "New notification" for a small one):

```HTML
<a href="#" class="micl-navigationbar__item" aria-label="Inbox, 57 new messages">
  <span class="micl-navigationbar__icon material-symbols-outlined" style="anchor-name:--inbox" aria-hidden="true">inbox</span>
  <span class="micl-navigationbar__text">Inbox</span>
  <span class="micl-badge" style="position-anchor:--inbox" aria-hidden="true">57</span>
</a>
```

Update the accessible name whenever the badge content changes.

## Theming
Each badge can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention. Set them on any appropriate parent element to affect its child badges.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-badge-size` | The height and width of the small badge | `6px` |
| `--md-comp-badge-large-size` | The height and minimum width of the large badge | `16px` |
| `--md-comp-badge-large-padding` | The horizontal padding used for the large badge | `4px` |
| `--md-comp-badge-trailing-space` | The gap between the label and a trailing badge | `4px` |
| `--md-comp-badge-color` | The background color of the badge | `--md-sys-color-error` |
| `--md-comp-badge-large-label-text-color` | The text color of the large badge | `--md-sys-color-on-error` |

**Example: Changing the size of the small badge**

```HTML
<div style="--md-comp-badge-size:8px">
  <span class="micl-badge micl-badge--small"></span>
</div>
```

## Compatibility
This component uses **anchor positioning**, a modern CSS feature that may not be supported in older browsers; without it the badge is placed where it occurs in the markup. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor#browser_compatibility) for details.
