# Card
This component implements the [Material Design 3 Expressive Card](https://m3.material.io/components/cards/overview) design. Cards display content and actions about a single subject.

## Basic Usage

### HTML
To add a basic card, use a `<div>` element with one of the primary card style classes: `micl-card-elevated`, `micl-card-filled` or `micl-card-outlined`.

```HTML
<div class="micl-card-elevated">
  <p>This is a basic elevated card.</p>
</div>
```

### CSS
Import the card styles into your project:

```CSS
@use "material-inspired-component-library/dist/card";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for the core functionality of this component.

### Live Demo
A live example of the [Card component](https://henkpb.github.io/micl/card.html) is available to interact with.

## Variants
Cards are available in **three distinct styles**:

- `micl-card-elevated`: A card with a subtle shadow, visually lifted from the background. This is the style shown in Basic Usage.

- `micl-card-filled`: A card with a solid background color, blending more seamlessly with its surroundings.
  ```HTML
  <div class="micl-card-filled">
    <p>This is a filled card.</p>
  </div>
  ```

- `micl-card-outlined`: A card with a clear border, often used for less prominent content or to indicate interactivity.

### Card Content Structure
While the card container is the only required element, the Card component provides several optional utility classes to help structure your card's content:

```HTML
<div class="micl-card-outlined" tabindex="0">
  <img alt="Descriptive image text" class="micl-card__image" src="/path/to/your/image.jpg">

  <div class="micl-card__headline-m">
    <h2>Card headline</h2>
  </div>

  <p class="micl-card__subhead">This is a sub-header</p>
  <p class="micl-card__supporting-text">This is supporting text that provides more details about the card's content.</p>

  <div class="micl-card__content">
    <p>Additional content</p>
  </div>
</div>
```

- **Headline Classes**: Use these classes for prominent text within the card. They expect a child heading element (`<h1>`-`<h6>`).
  - `micl-card__headline-s` (small)
  - `micl-card__headline-m` (medium) - *Used in the example above*
  - `micl-card__headline-l` (large)

- `micl-card__image`: Applies styling to an `<img>` element or an element with a `background-image` style used as the primary image for the card.

- `micl-card__subhead`: For secondary headings, displayed with a smaller font than the main headline.

- `micl-card__supporting-text`: Intended for short descriptions or supplementary information, displayed with a smaller font.

- `micl-card__content`: A flexible container for the main body of your card's content.

- `micl-card__actions`: A flexible container for any action buttons.

### Actionable Cards
For cards that are themselves clickable or interactive (e.g., to navigate to another page), specify the `tabindex="0"` attribute on the card container. Non-actionable cards, which contain interactive elements like buttons or links within their content, should *not* have a tabindex on the card container itself.

### Expandable Cards
Cards can also serve as containers for expandable detail areas using the `<details>` and `<summary>` elements. In this scenario, the `<summary>` element becomes the actionable part of the card.

```HTML
<details class="micl-card-elevated">
  <summary>
    <img alt="Image of a landscape" class="micl-card__image" src="/path/to/another/image.jpg">
    <span class="micl-card__headline-m">
      <span class="micl-heading">Expandable Card Title</span>
    </span>
    <span class="micl-card__supporting-text">Click to reveal more details.</span>
  </summary>
  <div class="micl-card__content">
    <p>This is the hidden content that appears when the summary is clicked.</p>
  </div>
</details>
```

### Compact Cards
Add the `micl-card--compact` to the main `<div>` element (or, the `<summary>` element for expandable cards) to create a compact version of the card header.

### States
- **Disabled Cards**: To visually indicate a disabled card (e.g., non-interactive), add the `inert` attribute to the card container.

- **Dragging State**: When implementing drag-and-drop functionality for cards, apply the `micl-card--dragging` class to the card container to provide visual feedback during the drag operation.

## Theming
Each card can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-card-margin | Sets the spacing between adjacent cards both horizontally and vertically | 8px |
| --md-comp-card-padding-inline | Defines the amount of space between the left and right edges of a card and its content | 16px |
| --md-comp-card-content-padding-block | The amount of vertical padding reserved for the content area | 16px |
| --md-comp-card-gap | Defines the amount of vertical space between structural elements inside the card | 8px |

Each card style additionally supports the following CSS custom properties, as defined in the [Material Design 3 Expressive Card Specification](https://m3.material.io/components/cards/specs). The hover, focus, pressed and dragged properties only apply to actionable cards.

### Elevated card

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-elevated-card-container-color | The background color of the card | --md-sys-color-surface-container-low |
| --md-comp-elevated-card-container-elevation | The shadow (elevation) of the card | --md-sys-elevation-level1 |
| --md-comp-elevated-card-container-shape | The corner rounding of the card | --md-sys-shape-corner-medium |
| --md-comp-elevated-card-disabled-container-elevation | The shadow of a disabled card | --md-sys-elevation-level1 |
| --md-comp-elevated-card-disabled-container-color | The background color of a disabled card | --md-sys-color-surface |
| --md-comp-elevated-card-disabled-container-opacity | The opacity of a disabled card | --md-sys-state-disabled-state-layer-opacity |
| --md-comp-elevated-card-hover-container-elevation | The shadow of the card while hovered | --md-sys-elevation-level2 |
| --md-comp-elevated-card-hover-state-layer-color | The state layer color of the card while hovered | --md-sys-color-on-surface |
| --md-comp-elevated-card-hover-state-layer-opacity | The state layer opacity of the card while hovered | --md-sys-state-hover-state-layer-opacity |
| --md-comp-elevated-card-focus-indicator-color | The color of the focus indicator ring | --md-sys-color-secondary |
| --md-comp-elevated-card-focus-indicator-thickness | The thickness of the focus indicator ring | --md-sys-state-focus-indicator-thickness |
| --md-comp-elevated-card-focus-indicator-outline-offset | The distance between the card and the focus indicator ring | --md-sys-state-focus-indicator-outer-offset |
| --md-comp-elevated-card-focus-container-elevation | The shadow of the card while focused | --md-sys-elevation-level1 |
| --md-comp-elevated-card-focus-state-layer-color | The state layer color of the card while focused | --md-sys-color-on-surface |
| --md-comp-elevated-card-focus-state-layer-opacity | The state layer opacity of the card while focused | --md-sys-state-focus-state-layer-opacity |
| --md-comp-elevated-card-pressed-container-elevation | The shadow of the card while pressed | --md-sys-elevation-level1 |
| --md-comp-elevated-card-pressed-state-layer-color | The state layer color of the card while pressed | --md-sys-color-on-surface |
| --md-comp-elevated-card-pressed-state-layer-opacity | The state layer opacity of the card while pressed | --md-sys-state-pressed-state-layer-opacity |
| --md-comp-elevated-card-dragged-container-elevation | The shadow of the card while dragged | --md-sys-elevation-level4 |
| --md-comp-elevated-card-dragged-state-layer-color | The state layer color of the card while dragged | --md-sys-color-on-surface |
| --md-comp-elevated-card-dragged-state-layer-opacity | The state layer opacity of the card while dragged | --md-sys-state-dragged-state-layer-opacity |

### Filled card

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-filled-card-container-color | The background color of the card | --md-sys-color-surface-container-highest |
| --md-comp-filled-card-container-elevation | The shadow (elevation) of the card | --md-sys-elevation-level0 |
| --md-comp-filled-card-container-shape | The corner rounding of the card | --md-sys-shape-corner-medium |
| --md-comp-filled-card-disabled-container-elevation | The shadow of a disabled card | --md-sys-elevation-level0 |
| --md-comp-filled-card-disabled-container-color | The background color of a disabled card | --md-sys-color-surface-variant |
| --md-comp-filled-card-disabled-container-opacity | The opacity of a disabled card | --md-sys-state-disabled-state-layer-opacity |
| --md-comp-filled-card-hover-container-elevation | The shadow of the card while hovered | --md-sys-elevation-level1 |
| --md-comp-filled-card-hover-state-layer-color | The state layer color of the card while hovered | --md-sys-color-on-surface |
| --md-comp-filled-card-hover-state-layer-opacity | The state layer opacity of the card while hovered | --md-sys-state-hover-state-layer-opacity |
| --md-comp-filled-card-focus-indicator-color | The color of the focus indicator ring | --md-sys-color-secondary |
| --md-comp-filled-card-focus-indicator-thickness | The thickness of the focus indicator ring | --md-sys-state-focus-indicator-thickness |
| --md-comp-filled-card-focus-indicator-outline-offset | The distance between the card and the focus indicator ring | --md-sys-state-focus-indicator-outer-offset |
| --md-comp-filled-card-focus-container-elevation | The shadow of the card while focused | --md-sys-elevation-level0 |
| --md-comp-filled-card-focus-state-layer-color | The state layer color of the card while focused | --md-sys-color-on-surface |
| --md-comp-filled-card-focus-state-layer-opacity | The state layer opacity of the card while focused | --md-sys-state-focus-state-layer-opacity |
| --md-comp-filled-card-pressed-container-elevation | The shadow of the card while pressed | --md-sys-elevation-level0 |
| --md-comp-filled-card-pressed-state-layer-color | The state layer color of the card while pressed | --md-sys-color-on-surface |
| --md-comp-filled-card-pressed-state-layer-opacity | The state layer opacity of the card while pressed | --md-sys-state-pressed-state-layer-opacity |
| --md-comp-filled-card-dragged-container-elevation | The shadow of the card while dragged | --md-sys-elevation-level3 |
| --md-comp-filled-card-dragged-state-layer-color | The state layer color of the card while dragged | --md-sys-color-on-surface |
| --md-comp-filled-card-dragged-state-layer-opacity | The state layer opacity of the card while dragged | --md-sys-state-dragged-state-layer-opacity |

### Outlined card

| Custom property | Meaning | Default |
|---|---|---|
| --md-comp-outlined-card-container-color | The background color of the card | --md-sys-color-surface |
| --md-comp-outlined-card-container-elevation | The shadow (elevation) of the card | --md-sys-elevation-level0 |
| --md-comp-outlined-card-container-shape | The corner rounding of the card | --md-sys-shape-corner-medium |
| --md-comp-outlined-card-outline-width | The thickness of the card's outline | 1px |
| --md-comp-outlined-card-outline-color | The color of the card's outline | --md-sys-color-outline-variant |
| --md-comp-outlined-card-disabled-container-color | The background color of a disabled card | --md-sys-color-surface |
| --md-comp-outlined-card-disabled-container-elevation | The shadow of a disabled card | --md-sys-elevation-level0 |
| --md-comp-outlined-card-disabled-container-opacity | The opacity of a disabled card | --md-sys-state-disabled-state-layer-opacity |
| --md-comp-outlined-card-disabled-outline-color | The outline color of a disabled card | --md-sys-color-outline |
| --md-comp-outlined-card-disabled-outline-opacity | The outline opacity of a disabled card | 12% |
| --md-comp-outlined-card-hover-container-elevation | The shadow of the card while hovered | --md-sys-elevation-level1 |
| --md-comp-outlined-card-hover-outline-color | The outline color of the card while hovered | --md-sys-color-outline-variant |
| --md-comp-outlined-card-hover-state-layer-color | The state layer color of the card while hovered | --md-sys-color-on-surface |
| --md-comp-outlined-card-hover-state-layer-opacity | The state layer opacity of the card while hovered | --md-sys-state-hover-state-layer-opacity |
| --md-comp-outlined-card-focus-indicator-color | The color of the focus indicator ring | --md-sys-color-secondary |
| --md-comp-outlined-card-focus-indicator-thickness | The thickness of the focus indicator ring | --md-sys-state-focus-indicator-thickness |
| --md-comp-outlined-card-focus-indicator-outline-offset | The distance between the card and the focus indicator ring | --md-sys-state-focus-indicator-outer-offset |
| --md-comp-outlined-card-focus-container-elevation | The shadow of the card while focused | --md-sys-elevation-level0 |
| --md-comp-outlined-card-focus-outline-color | The outline color of the card while focused | --md-sys-color-on-surface |
| --md-comp-outlined-card-focus-state-layer-color | The state layer color of the card while focused | --md-sys-color-on-surface |
| --md-comp-outlined-card-focus-state-layer-opacity | The state layer opacity of the card while focused | --md-sys-state-focus-state-layer-opacity |
| --md-comp-outlined-card-pressed-container-elevation | The shadow of the card while pressed | --md-sys-elevation-level0 |
| --md-comp-outlined-card-pressed-outline-color | The outline color of the card while pressed | --md-sys-color-outline-variant |
| --md-comp-outlined-card-pressed-state-layer-color | The state layer color of the card while pressed | --md-sys-color-on-surface |
| --md-comp-outlined-card-pressed-state-layer-opacity | The state layer opacity of the card while pressed | --md-sys-state-pressed-state-layer-opacity |
| --md-comp-outlined-card-dragged-container-elevation | The shadow of the card while dragged | --md-sys-elevation-level3 |
| --md-comp-outlined-card-dragged-outline-color | The outline color of the card while dragged | --md-sys-color-outline-variant |
| --md-comp-outlined-card-dragged-state-layer-color | The state layer color of the card while dragged | --md-sys-color-on-surface |
| --md-comp-outlined-card-dragged-state-layer-opacity | The state layer opacity of the card while dragged | --md-sys-state-dragged-state-layer-opacity |

**Example: Changing the card margins**

```HTML
<div style="--md-comp-card-margin:4px">
  <div class="micl-card-filled">
    <p>This is a filled card.</p>
  </div>
  <div class="micl-card-filled">
    <p>This is another filled card.</p>
  </div>
</div>
```

To change the amount of rounding of a filled card's corners, you could for example add a CSS rule to your stylesheet:

```CSS
.micl-card-filled {
  --md-comp-filled-card-container-shape: 24px;
}
```

## Compatibility
This component utilizes relative RGB color values, which may not be fully supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#browser_compatibility) for details.

The Card component uses the `interpolate-size` CSS property to smoothly open and close the detail area of a Details disclosure element, which might not be supported in your browser. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size#browser_compatibility) for details.
