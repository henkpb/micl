# Navigation rail
This component implements the [Material Design 3 Expressive Navigation rail](https://m3.material.io/components/navigation-rail/overview) design. The navigation rail provides ergonomic access to primary application destinations and actions.

## Basic Usage

### HTML
To create a simple navigation rail, use a `<nav>` element with the `micl-navigationrail` class. Inside, use anchor elements `<a>` to create the selectable navigation items. Give the `<nav>` an `aria-label`, so that it can be told apart from the other navigation landmarks on the page.

Keep labels short. Labels are laid out on a single line; any overflowing text is truncated with an ellipsis.

```HTML
<nav id="mynavigationrail" class="micl-navigationrail" aria-label="Main">
  <div class="micl-navigationrail__content">
    <a href="#" class="micl-navigationrail__item" aria-current="page">
      <span class="micl-navigationrail__icon material-symbols-outlined" aria-hidden="true">inbox</span>
      <span class="micl-navigationrail__text">Inbox</span>
    </a>
    <a href="#" class="micl-navigationrail__item">
      <span class="micl-navigationrail__icon material-symbols-outlined" aria-hidden="true">outbox</span>
      <span class="micl-navigationrail__text">Outbox</span>
    </a>
  </div>
</nav>
```

### CSS
Import the navigation rail styles into your project:

```CSS
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/badge";
@use "material-inspired-component-library/dist/navigationrail";
```

Or import all MICL styles:
```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
No custom JavaScript is required for a navigation rail that is only collapsed, only expanded, or modal.

> [!NOTE]
> Opening and closing a modal navigation rail is handled natively by the `<dialog>` element and its invoker buttons, and the navigation items are ordinary links, activated with <kbd>Enter</kbd> like any other link.
> 
> Marking the current destination is left to the application: give the item for the current page the `aria-current="page"` attribute.

The exception is a **togglable** navigation rail, which allows users to switch between collapsed and expanded views. Its menu button carries the `--micl-toggle` command, which the [Button component](../button/README.md) handles by maintaining the `aria-pressed` state and the `micl-button--toggled` class that the navigation rail styles react to. That variant therefore needs the script:

```JavaScript
import "material-inspired-component-library/dist/micl";
```

Or, when only the JavaScript of the components in use is loaded, the Button component on its own:

```JavaScript
import "material-inspired-component-library/dist/button";
```

### Live Demo
A live example of the [Navigation rail component](https://henkpb.github.io/micl/navigationrail.html) is available to interact with.

## Anatomy
A navigation rail consists of a root container, an optional header, and a list of destinations. Only the content container and its items are required.

| Element | Meaning |
| --- | --- |
| `nav.micl-navigationrail` | The container of a standard navigation rail, which is also its navigation landmark. |
| `dialog.micl-navigationrail` | The container of a modal or an adaptive navigation rail. It is a dialog rather than a landmark, so its content container carries the `<nav>`. |
| `.micl-navigationrail__headline` | The optional header, above the destinations. It holds the menu button that opens, closes or toggles the navigation rail, and centres whatever it holds on the column of icons below it. |
| `.micl-navigationrail__content` | The scrollable list of destinations. Make it a `<nav>` inside a `<dialog>` navigation rail, and a `<div>` inside a `<nav>` one. |
| `a.micl-navigationrail__item` | A destination. Give the one for the current page `aria-current="page"`. |
| `.micl-navigationrail__icon` | The item's icon, and the anchor of any badge in the item. |
| `.micl-navigationrail__text` | The item's label. |
| `.micl-badge` | An optional [badge](../badge/README.md). |

An item does not need to hold both an icon and a label:

| Item | Result |
| --- | --- |
| Icon and label | The label sits under the active indicator when collapsed, and after the icon when expanded. |
| Icon only | The active indicator is a `56px` square in both views, holding the icon alone. |
| Label only | The active indicator is as tall as an expanded item and holds the label alone: the full item width when collapsed, hugging the label when expanded. A badge in such an item has no icon to anchor to, so it stays in flow — under the label when collapsed, after it when expanded. |

```HTML
<a href="#" class="micl-navigationrail__item">
  <span class="micl-navigationrail__icon material-symbols-outlined" aria-hidden="true">inbox</span>
</a>
<a href="#" class="micl-navigationrail__item">
  <span class="micl-navigationrail__text">Inbox</span>
</a>
```

## Variants
The basic example creates a **collapsed** navigation rail. Add a menu button to allow the user to toggle between a **collapsed** and an **expanded** view.

```HTML
<nav id="mynavigationrail" class="micl-navigationrail" aria-label="Main">
  <div class="micl-navigationrail__headline">
    <button
      type="button"
      id="mybutton"
      class="micl-iconbutton-standard-s micl-button--toggle material-symbols-outlined"
      aria-pressed="false"
      command="--micl-toggle"
      commandfor="mybutton"
      data-miclicon="menu"
      data-micliconselected="menu_open"
      aria-label="Toggle navigation rail"
    ></button>
  </div>
  <div class="micl-navigationrail__content">
    ...
  </div>
</nav>
```

When the user clicks the menu button, the navigation rail is expanded and the toggle button is given `aria-pressed="true"` and the `micl-button--toggled` class that indicates that the toggle button has been clicked at least once.

### Modal navigation rail

A **modal** navigation rail is hidden until the user clicks a menu button. When shown, the **expanded** navigation rail is displayed on top of other page content. Use a `<dialog>` element instead of a `<nav>`. Add the `closedby="any"` attribute so that the navigation rail is dismissed when the user clicks the scrim.

Because a `<dialog>` acts as a dialog overlay rather than a navigation landmark, wrap your items in an inner `<nav>` element and assign an accessible name to the `<dialog>` itself:

```HTML
<dialog id="mynavigationrail" class="micl-navigationrail" closedby="any" aria-label="Navigation">
  <div class="micl-navigationrail__headline">
    <button
      type="button"
      class="micl-iconbutton-standard-s material-symbols-outlined"
      command="close"
      commandfor="mynavigationrail"
      aria-label="Close navigation rail"
      autofocus
    >menu_open</button>
  </div>
  <nav class="micl-navigationrail__content" aria-label="Main">
    ...
  </nav>
</dialog>

<button
  type="button"
  class="micl-iconbutton-standard-s material-symbols-outlined"
  command="show-modal"
  commandfor="mynavigationrail"
  aria-label="Open navigation rail"
>menu</button>
```

The button inside the navigation rail is used to hide the navigation rail, while the button outside is responsible for opening it.

### Adaptive navigation rail

An **adaptive** navigation rail is permanently visible as a standard (expanded) navigation rail on wide screens, and acts as a modal navigation rail on narrow screens. Add one of the following modifier classes to a modal navigation rail:

| Class | Acts as Modal (max-width) | Standard (min-width) |
| ----- | ------------------------- | -------------------- |
| `micl-navigationrail--modal-to-medium` | `600px` | `600px` |
| `micl-navigationrail--modal-to-expanded` | `840px` | `840px` |
| `micl-navigationrail--modal-to-large` | `1200px` | `1200px` |
| `micl-navigationrail--modal-to-extralarge` | `1600px` | `1600px` |

```HTML
<dialog id="mynavigationrail" class="micl-navigationrail micl-navigationrail--modal-to-expanded" closedby="any" aria-label="Navigation">
  <div class="micl-navigationrail__headline">
    ...
  </div>
  <nav class="micl-navigationrail__content" aria-label="Main">
    ...
  </nav>
</dialog>
```

Place the `<dialog>` element where a standard `<nav>` navigation rail would go, so that it occupies its usual position when the wide-screen layout applies. The open and close buttons only serve the modal behaviour, so hide them on wide screens, for example:

```CSS
@media (min-width: 840px) {
  [commandfor="mynavigationrail"] {
    display: none;
  }
}
```

> [!NOTE]
> If the modal navigation rail is open while the window is resized across the breakpoint, it remains modal until dismissed, after which it becomes the permanently visible standard rail.

### Badges

Put a [Badge component](../badge/README.md) inside a navigation item. It anchors itself to the item's icon, so neither an `anchor-name` nor a `position-anchor` has to be supplied.

```HTML
<a href="#" class="micl-navigationrail__item" aria-label="Inbox, 97 new messages">
  <span class="micl-navigationrail__icon material-symbols-outlined" aria-hidden="true">inbox</span>
  <span class="micl-navigationrail__text">Inbox</span>
  <span class="micl-badge micl-badge--trailing" aria-hidden="true">97</span>
</a>
```

A `micl-badge--trailing` badge follows the label in an expanded navigation rail. A collapsed item stacks its icon above its label and has no room after it, so the badge is placed on the icon for as long as the rail is collapsed. A badge without the modifier stays on the icon in both views.

## Accessibility
* **Mark the current destination:** Give the item for the current page the `aria-current="page"` attribute. The component does not infer it.
* **Expose a navigation landmark:** A `<nav>` navigation rail is a navigation landmark in its own right; give it an `aria-label` so that it can be told apart from the other navigation landmarks on the page. A `<dialog>` navigation rail is *not* — it is exposed as a dialog — so make its content container a `<nav>` with its own `aria-label`, and give the dialog an accessible name as well. In the adaptive variant the element remains a `<dialog>` even while it renders as a permanently visible standard rail, so the inner `<nav>` is what carries the landmark at every window size.
* **Leave `aria-modal` to the browser:** `showModal()` already exposes the dialog as modal. A hard-coded `aria-modal="true"` is redundant while the rail is modal, and wrong once the adaptive variant is showing as a standard rail.
* **Name the icon buttons:** Always provide a descriptive `aria-label` for the menu, open and close buttons, as they carry no text content.
* **Keep the focus indicator:** A keyboard-focused item draws a focus ring inside its active indicator, on top of the focus state layer. The state layer alone does not meet the contrast required of a focus indicator, so do not suppress the ring with `outline: none`.
* **Leave both escape routes open:** A modal navigation rail declared with `closedby="any"` is dismissed by the <kbd>Esc</kbd> key *and* by a click on the scrim, in addition to its close button. `closedby="closerequest"` removes the scrim route and `closedby="none"` removes the <kbd>Esc</kbd> key as well; neither is appropriate for navigation, which the user must always be able to leave.
* **Respect motion preferences:** All motion — the modal slide-in, the collapsed-to-expanded morph and the item ripple — is automatically disabled if the user has requested reduced motion at the OS level. The navigation rail will open, morph and close instantly.

## Theming
Each navigation rail can be themed with CSS custom properties that follow the Material Design 3 component-token naming convention.

| Custom property | Meaning | Default |
|---|---|---|
| `--md-comp-nav-rail-divider-thickness` | The width of the vertical divider at the end of the rail | `0px` |
| `--md-comp-nav-rail-divider-color` | The color of the vertical divider | `--md-comp-divider-color` |
| `--md-comp-nav-rail-collapsed-container-width` | The width of the collapsed navigation rail | `96px` |
| `--md-comp-nav-rail-collapsed-container-color` | The background color of the collapsed navigation rail | `--md-sys-color-surface` |
| `--md-comp-nav-rail-collapsed-container-elevation` | The shadow (elevation) of the collapsed navigation rail | `--md-sys-elevation-level0` |
| `--md-comp-nav-rail-collapsed-container-shape` | The corner rounding of the collapsed navigation rail | `0px` |
| `--md-comp-nav-rail-collapsed-top-space` | The space between the top edge and the header of the collapsed navigation rail | `44px` |
| `--md-comp-nav-rail-collapsed-item-vertical-space` | The space between the active indicator and the label of a collapsed item | `4px` |
| `--md-comp-nav-rail-expanded-container-width-minimum` | The smallest allowed width of the expanded navigation rail | `220px` |
| `--md-comp-nav-rail-expanded-container-width-maximum` | The largest allowed width of the expanded navigation rail | `360px` |
| `--md-comp-nav-rail-expanded-container-color` | The background color of the expanded navigation rail | `--md-sys-color-surface` |
| `--md-comp-nav-rail-expanded-container-elevation` | The shadow (elevation) of the expanded navigation rail | `--md-sys-elevation-level0` |
| `--md-comp-nav-rail-expanded-container-shape` | The corner rounding of the expanded navigation rail | `0px` |
| `--md-comp-nav-rail-expanded-top-space` | The space between the top edge and the header of the expanded navigation rail | `44px` |
| `--md-comp-nav-rail-expanded-modal-container-color` | The background color of the modal navigation rail | `--md-sys-color-surface-container` |
| `--md-comp-nav-rail-expanded-modal-container-elevation` | The shadow (elevation) of the modal navigation rail | `--md-sys-elevation-level2` |
| `--md-comp-nav-rail-expanded-modal-container-shape` | The corner rounding of the modal navigation rail, applied to the two corners facing the content | `--md-sys-shape-corner-large` |
| `--md-comp-nav-rail-item-icon-size` | The size of the item icons | `--md-sys-icon-size` |
| `--md-comp-nav-rail-item-active-indicator-shape` | The corner rounding of an item's active indicator | half the item height |
| `--md-comp-nav-rail-item-container-vertical-space` | The vertical space between two item containers | `4px` |
| `--md-comp-nav-rail-item-container-height` | The height of a labelled item's container in a collapsed navigation rail. The active indicator sits at the top of it and the label below, so the remainder is the room the item reserves under its indicator | `64px` |
| `--md-comp-nav-rail-item-header-space-minimum` | The minimum space between the header and the first item. It is only applied when the navigation rail has a `micl-navigationrail__headline` | `40px` |
| `--md-comp-nav-rail-item-short-container-height` | The height of items in an expanded navigation rail, and of items without a label | `56px` |
| `--md-comp-nav-rail-item-vertical-active-indicator-width` | The width of an item's active indicator in a collapsed navigation rail | `56px` |
| `--md-comp-nav-rail-item-vertical-active-indicator-height` | The height of an item's active indicator in a collapsed navigation rail | `32px` |
| `--md-comp-nav-rail-item-active-indicator-leading-space` | The space between the start edge of the active indicator and the icon | `16px` |
| `--md-comp-nav-rail-item-active-indicator-trailing-space` | The space between the icon and the end edge of the active indicator | `16px` |
| `--md-comp-nav-rail-item-active-indicator-icon-label-space` | The space between the icon and the label of an expanded item | `8px` |
| `--md-comp-nav-rail-item-horizontal-full-width-trailing-space` | The space between the end of an expanded item's click target and the container edge | `16px` |
| `--md-comp-nav-rail-item-active-indicator-color` | The background color of the current item's active indicator | `--md-sys-color-secondary-container` |
| `--md-comp-nav-rail-item-active-icon-color` | The color of the current item's icon | `--md-sys-color-on-secondary-container` |
| `--md-comp-nav-rail-item-active-label-text-color` | The color of the current item's label | `--md-sys-color-secondary` |
| `--md-comp-nav-rail-item-inactive-icon-color` | The color of the icon of every other item | `--md-sys-color-on-surface-variant` |
| `--md-comp-nav-rail-item-inactive-label-text-color` | The color of the label of every other item | `--md-sys-color-on-surface-variant` |
| `--md-comp-nav-rail-item-state-layer-color` | The color of an item's hover, focus and pressed state layer, and of its ripple | `--md-sys-color-on-secondary-container` |
| `--md-comp-nav-rail-spring-buffer` | The width of the off-screen margin that hides the overshoot of a modal navigation rail's spring animation | `100px` |
| `--md-comp-nav-rail-motion-spatial` | The easing function used when a modal navigation rail slides in (a spring animation that slightly overshoots before settling) | `--md-sys-motion-expressive-slow-spatial` |
| `--md-comp-nav-rail-motion-duration` | Animation duration for opening a modal navigation rail | `650ms` |
| `--md-comp-nav-rail-motion-duration-reverse` | Animation duration for closing a modal navigation rail | `500ms` |
| `--md-comp-nav-rail-morph-duration` | Animation duration for morphing from the collapsed to the expanded view | `350ms` |
| `--md-comp-nav-rail-morph-duration-reverse` | Animation duration for morphing back to the collapsed view | `350ms` |

**Example: Changing the width of the collapsed navigation rail**

```HTML
<div style="--md-comp-nav-rail-collapsed-container-width:80px">
  <nav id="mynavigationrail" class="micl-navigationrail">
    ...
  </nav>
</div>
```

To add a vertical divider to the navigation rail, set the following CSS variable:

```CSS
#mynavigationrail {
  --md-comp-nav-rail-divider-thickness: 1px;
}
```

> [!TIP]
> Material Design also describes a **narrow** collapsed navigation rail of `80px`. Setting `--md-comp-nav-rail-collapsed-container-width` to that value is all that is needed: the items, their labels and the header control stay centred, because the horizontal inset of a collapsed navigation rail follows its width.

## Compatibility

A navigation rail leans on a number of recent CSS and HTML features. Where support is missing the navigation rail still renders and its destinations remain usable; what degrades is noted below.

| Feature | Used for | Without it |
| --- | --- | --- |
| [`interpolate-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size) | Morphing an item between its collapsed width and `fit-content` | The morph jumps between the two views instead of animating |
| [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) | Placing a badge on an item's icon | Badges fall back to their static position in the item |
| [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) and [`transition-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior) | Animating a modal navigation rail in and out of the top layer | It appears and disappears instantly |
| [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) | The `command` and `commandfor` attributes on the menu buttons | Call `showModal()` and `close()` from JavaScript instead |
| [`closedby`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby) | Dismissing a modal navigation rail by clicking the scrim | The <kbd>Esc</kbd> key and the close button still dismiss it |
| [`dvh` units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#dvh) | Sizing the navigation rail to the viewport | Fall back to `100vh`, which overshoots on mobile browsers with a retracting toolbar |
