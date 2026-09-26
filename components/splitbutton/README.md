# Split button

This component implements the [Material Design 3 Split button](https://m3.material.io/components/split-button) specification. A split button acts as a single control serving two purposes: a wide **leading** half that performs the primary action, and a narrow **trailing** half that opens a menu of secondary actions.

Both halves are standard [Buttons](../button/README.md); the split button serves as the container that spaces and shapes them.

## Basic Usage

### HTML
Wrap two buttons and a [Menu](../menu/README.md) inside an element carrying the `micl-splitbutton` class. The trailing half opens the menu via the native `popovertarget` attribute. The menu must be nested **inside** the container.

```html
<div class="micl-splitbutton" role="group" aria-label="Save">
  <button type="button" class="micl-button-filled-s">Save</button>
  <button type="button" class="micl-button-filled-s" popovertarget="save-menu" aria-label="More save options">
    <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span>
  </button>
  <nav id="save-menu" class="micl-menu" popover>
    <ul class="micl-list">
      <li class="micl-list-item-one" tabindex="0">
        <span class="micl-list-item__text">
          <span class="micl-list-item__headline">Save as&hellip;</span>
        </span>
      </li>
    </ul>
  </nav>
</div>
```

DOM order matters: place the leading half first, the trailing half second, and the menu last. A closed menu is `display: none` and an open one lives in the browser's top layer. Because the menu never takes part in the container's layout, the split button maintains a consistent width in both states.

### CSS
Import the split button styles into your project:

```css
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/menu";
@use "material-inspired-component-library/dist/list";
@use "material-inspired-component-library/dist/splitbutton";
```

Or import all MICL styles at once:

```css
@use "material-inspired-component-library/styles";
```

### JavaScript
The split button itself carries no behavior: the trailing half opens the menu natively through `popovertarget`. The embedded [Menu](../menu/README.md), however, needs JavaScript for its ARIA roles and keyboard navigation:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

If you load individual JavaScript files instead of the main bundle, load `dist/menu` and `dist/list`.

### Live Demo
A live example of the [Split button component](https://henkpb.github.io/micl/splitbutton.html) is available to interact with.

## Variants
Material Design defines split buttons in **four styles**: `filled`, `tonal`, `elevated`, and `outlined`. Both halves take the same style and size class, exactly as they would standing alone.

**Example: A medium-sized outlined split button**

```html
<div class="micl-splitbutton" role="group" aria-label="Edit">
  <button type="button" class="micl-button-outlined-m">Edit</button>
  <button type="button" class="micl-button-outlined-m" popovertarget="edit-menu" aria-label="More edit options">
    <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span>
  </button>
  <nav id="edit-menu" class="micl-menu" popover>
    …
  </nav>
</div>
```

> **Note:** The `text` style is **not** supported. Without a container background there is no visible seam, causing the two halves to read as completely unrelated buttons.

The five sizes (`xs`, `s`, `m`, `l`, and `xl`) are dictated by the **leading half**, which is why both halves must carry the identical size suffix.

### The Open State
While the menu is open, the trailing half **morphs into a pill**, applies a state layer at the pressed opacity, rotates its chevron, and returns that chevron to the true centre. All four visual changes follow directly from the menu's open state via CSS, requiring no script toggling.

The trailing half requires **no `aria-expanded` attribute**. The browser derives the expanded state natively from `popovertarget` and reports it to assistive technology. Do not add this attribute manually; a static `aria-expanded="false"` will not update and actively misleads users.

## Icons
The trailing half carries a single icon, conventionally a downward chevron (`keyboard_arrow_down` in [Google Material Symbols](https://fonts.google.com/icons)), marked up with the Button's native `micl-button__icon` class.

The leading half accepts a leading icon like any standard button:

```html
<button type="button" class="micl-button-tonal-m">
  <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">print</span>
  Print
</button>
```

## Accessibility
* **Assign the container** `role="group"` and an `aria-label` naming the pair, ensuring the two halves are announced together as one unified control.
* **Provide the trailing half** its own `aria-label`. It contains no text, and a generic "More options" is insufficient if a page contains multiple split buttons. Apply `aria-hidden="true"` to its icon.
* **Rely on the browser** for the expanded state, as described in the Open State section.
* **Disable halves independently** using the standard `disabled` attribute. A disabled half maintains its structural footprint and shape, but opts out of hover and press morphing.
* **Keyboard navigation** seamlessly reaches the menu via the native popover invoker. Menu items are navigated via arrow keys using the [List](../list/README.md) component.

## Theming
Theme the split button using CSS custom properties aligned with the Material Design 3 component-token naming convention. The button halves are themed through the [Button](../button/README.md) properties, and the menu through the [Menu](../menu/README.md) properties.

| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-split-button-between-space` | Width of the seam between the halves | `2px` |
| `--md-comp-split-button-<size>-leading-button-trailing-space` | Space between the leading label and the seam | see below |
| `--md-comp-split-button-<size>-inner-corner-corner-size` | Radius of the two corners facing the seam | see below |
| `--md-comp-split-button-<size>-inner-hovered-corner-corner-size` | The radius while that half is hovered | see below |
| `--md-comp-split-button-<size>-inner-pressed-corner-corner-size` | The radius while that half is pressed | see below |

Replace `<size>` with `xsmall`, `small`, `medium`, `large`, or `xlarge` (corresponding to the `xs`, `s`, `m`, `l`, and `xl` classes):

| `<size>` | leading trailing space | inner corner | hovered & pressed |
| --- | --- | --- | --- |
| `xsmall` | `10px` | `4px` | `8px` |
| `small` | `12px` | `4px` | `12px` |
| `medium` | `24px` | `4px` | `12px` |
| `large` | `48px` | `8px` | `20px` |
| `xlarge` | `64px` | `12px` | `20px` |

### Motion
Both corner morphing and chevron rotation hook into the Button's native motion properties (`--md-comp-button-motion-duration` and `--md-comp-button-motion-effects`). This ensures the split button animates in perfect sync with surrounding buttons.

## Compatibility
The open state is evaluated using `:has()` and `:popover-open`, while the menu utilizes CSS anchor positioning. Popovers are natively supported in Chrome 114, Safari 17, and Firefox 125+. The `:has()` pseudo-class is supported in Chrome 105, Safari 15.4, and Firefox 121+.

Where anchor positioning is not yet supported, the menu will still open and close, safely falling back to the browser's default popover placement rather than anchoring strictly under the trailing half.
