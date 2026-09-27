# Button group
A button group gathers a small set of related buttons into a single cohesive unit. The [Material Design 3 specification](https://m3.material.io/components/button-groups) defines two variants: 
* A **standard** group, where spaced buttons each trigger their own action or toggle on and off. Pressing a button briefly widens it while its neighbors smoothly make room.
* A **connected** group, where buttons are pushed together into a segmented control with a single selected state. 

The group acts purely as a container—its children are standard [Buttons](../button/README.md) and [Icon buttons](../iconbutton/README.md) utilizing all their respective styles and sizes.

## Basic Usage

### HTML
Wrap the buttons in an element carrying the `micl-buttongroup` class. A plain `<div>` requires `role="group"` and an `aria-label`; a `<fieldset>` already acts as a group natively and only requires a label (or a `<legend>`).

```HTML
<div class="micl-buttongroup" role="group" aria-label="Playback">
  <button type="button" class="micl-button-tonal-m">Previous</button>
  <button type="button" class="micl-button-tonal-m">Play</button>
  <button type="button" class="micl-button-tonal-m">Next</button>
</div>

```

### CSS
Import the button group styles into your project. Note that the group relies on the base, button, and icon button styles:

```CSS
@use "material-inspired-component-library/dist/base";
@use "material-inspired-component-library/dist/button";
@use "material-inspired-component-library/dist/iconbutton";
@use "material-inspired-component-library/dist/buttongroup";
```

Or import all MICL styles at once:

```CSS
@use "material-inspired-component-library/styles";
```

### JavaScript
The button group itself carries no inherent behavior. JavaScript is only required if you are using the `aria-pressed` **toggle button** form in either variant (described below). Importing the module initializes this logic automatically:

```JavaScript
import micl from "material-inspired-component-library/dist/micl";
```

### Live Demo
A live example of the [Button group component](https://henkpb.github.io/micl/buttongroup.html) is available to interact with.

## Variants

### Standard
This is the default variant. Buttons keep their own shapes, sit a fixed distance apart, and act independently. The group holds no shared selection of its own, but each button may be a toggle in its own right (see [Selection](#selection) below).

```HTML
<div class="micl-buttongroup" role="group" aria-label="Call controls">
  <button type="button" class="micl-iconbutton-tonal-l material-symbols-outlined" aria-label="Camera">videocam</button>
  <button type="button" class="micl-iconbutton-tonal-l material-symbols-outlined" aria-label="Microphone">mic</button>
  <button type="button" class="micl-iconbutton-filled-l material-symbols-outlined" aria-label="End call">call_end</button>
</div>
```

Pressing a button dynamically **widens it by 15%** of its height. Its neighbors simultaneously give back exactly as much space as the pressed button takes, ensuring the group's total width never changes. A button on either end takes space from its single neighbor, while a button in the middle takes half from each. This effect is capped by the neighbors' own padding. Set `--md-comp-button-group-standard-expanded-ratio` to `0` to disable this effect.

#### Selection
Buttons in a standard group can be selected. Add the `micl-button--toggle` class to a child and you are done; the group contributes no styling of its own, and the widening effect keeps working on press.

Each button carries its own on/off state, so the `<label>`-and-checkbox form is the natural fit:

```HTML
<fieldset class="micl-buttongroup">
  <legend>Call controls</legend>
  <label class="micl-iconbutton-tonal-l micl-button--toggle material-symbols-outlined" aria-label="Camera">
    <input type="checkbox" name="camera" checked>
    <span aria-hidden="true">videocam</span>
  </label>
  <label class="micl-iconbutton-tonal-l micl-button--toggle material-symbols-outlined" aria-label="Microphone">
    <input type="checkbox" name="microphone" checked>
    <span aria-hidden="true">mic</span>
  </label>
  <label class="micl-iconbutton-tonal-l micl-button--toggle material-symbols-outlined" aria-label="Raise hand">
    <input type="checkbox" name="hand">
    <span aria-hidden="true">front_hand</span>
  </label>
</fieldset>
```

The `aria-pressed` **toggle button** form works here as well and behaves identically—it simply needs JavaScript. Both forms are described in detail under [Connected](#connected) below.

A round button squares off when selected, while a button with the `micl-button--square` class becomes round. For visual consistency, maintain a single morphing direction across the entire group. All unselected buttons should share the same base size and shape, reserving the alternate shape strictly to indicate selection.

Radio buttons are possible too, but a standard group spaces its buttons apart and gives no visual hint that the options are mutually exclusive. For a one-of-N control, use a **connected** group instead.

### Connected
To create a connected group, add the `micl-buttongroup--connected` class. The buttons are separated by a 2px hairline, the outer corners of the group stay fully round, and the inner corners square off.

Unlike a standard group, a connected group acts as a fluid flex container that spans the full width of its parent surface, distributing extra space equally among its buttons. Set `--md-comp-button-group-connected-maximum-width` to stop it growing too wide in large windows; the group still shrinks below that cap when the surface is narrower. Dropping a connected group into a flex or grid container that sizes its items by content makes it hug its buttons instead.

Connected groups do not use the widening effect; instead, pressing a button tightens its inner corners further, and the **selected button morphs back into a full pill**.

Each child must carry the `micl-button--toggle` class. There are three ways to structure the HTML for selection, all styled identically:

**1. Single selection (Radio Buttons)**
Uses a `<label>` wrapping a radio button. This requires no custom JavaScript, and the browser natively handles arrow-key navigation through the group:

```HTML
<fieldset class="micl-buttongroup micl-buttongroup--connected" aria-label="Alignment">
  <label class="micl-iconbutton-outlined-m micl-button--toggle material-symbols-outlined" aria-label="Align left">
    <input type="radio" name="align" value="left" checked><span aria-hidden="true">format_align_left</span>
  </label>
  <label class="micl-iconbutton-outlined-m micl-button--toggle material-symbols-outlined" aria-label="Align center">
    <input type="radio" name="align" value="center"><span aria-hidden="true">format_align_center</span>
  </label>
</fieldset>
```

**2. Multiple selection (Checkboxes)**
Uses the same markup, but swaps radio buttons for checkboxes:

```HTML
<fieldset class="micl-buttongroup micl-buttongroup--connected" aria-label="Text style">
  <label class="micl-button-outlined-s micl-button--toggle">
    <input type="checkbox" name="style" value="bold" checked>
    <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">format_bold</span>
    <span>Bold</span>
  </label>
  <label class="micl-button-outlined-s micl-button--toggle">
    <input type="checkbox" name="style" value="italic">
    <span class="micl-button__icon material-symbols-outlined" aria-hidden="true">format_italic</span>
    <span>Italic</span>
  </label>
</fieldset>
```

**3. Toggle buttons (Command Attribute)**
Uses the standard Button component's `aria-pressed` toggle logic. This is ideal when there is no native form to submit to, but it **requires JavaScript** to handle the toggle state:

```HTML
<div class="micl-buttongroup micl-buttongroup--connected" role="group" aria-label="View">
  <button type="button" id="view-day" class="micl-button-tonal-s micl-button--toggle"
          commandfor="view-day" command="--micl-toggle" aria-pressed="true">Day</button>
  <button type="button" id="view-week" class="micl-button-tonal-s micl-button--toggle"
          commandfor="view-week" command="--micl-toggle" aria-pressed="false">Week</button>
</div>
```

In this toggle format, each button acts independently. If you need strict single-selection behavior, use the radio button implementation instead.

**Note on Text Buttons:** The Material Design `text` button style has no defined selected state and should not be used inside a connected group.

## Adaptive design
A button group moves through layouts **as a single line** and never wraps onto a second one. To keep it from pushing past the surface it sits on, the group is capped at the width of its container and its buttons give up space in a fixed order.

**What yields, and in what order.** Buttons surrender their inline padding first. The text label itself is never truncated, meaning the label's width acts as the strict min-width for the button:

* **Icon buttons** shrink from their default width down to the `narrow` width for their size, which is the same reduced padding that the `micl-iconbutton--narrow` class applies. The icon is never clipped or scaled.
* **Buttons with a label** (`m`, `l` and `xl`) give up their inline padding down to zero, leaving the label and its icon gap.
* **`xs` and `s` buttons with a label keep their padding.**

Once every button has given up all it can, the group is still clamped to its container and the buttons overflow rather than wrap. Reach for a smaller button size, the `micl-iconbutton--narrow` class, or fewer buttons at that breakpoint.

The press-widening effect is unaffected: a pressed button still takes 15% of its height from its neighbors, and the group's total width still never changes.

## Accessibility
* A `<div class="micl-buttongroup">` requires `role="group"` and an `aria-label`. A `<fieldset class="micl-buttongroup">` is inherently a group and only needs a label (either an `aria-label` or a nested `<legend>`).
* Radio buttons sharing a `name` attribute form **one tab stop**, and arrow keys move the selection within the group natively. This is the correct browser behavior for a single-select segmented control.
* Checkboxes remain their own independent tab stops, which is the correct behavior for independent on/off toggles.
* Ensure icon-only children have an `aria-label` on the button or label element, and apply `aria-hidden="true"` to the icon element itself.
* When disabling a child in the `<label>` wrapper formats, place the `disabled` attribute on the inner `<input>`, not the label. The group will leave the disabled button in place and exclude it from the widening animation effect.

## Theming
The button group can be themed with CSS custom properties following the Material Design 3 component-token naming convention. The individual buttons inside are themed through their own properties (documented in the [Button](../button/README.md) and [Icon button](../iconbutton/README.md) components).

### Standard
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-button-group-standard-xsmall-between-space` | Space between `xs` buttons | `18px` |
| `--md-comp-button-group-standard-small-between-space` | Space between `s` buttons | `12px` |
| `--md-comp-button-group-standard-medium-between-space` | Space between `m` buttons | `8px` |
| `--md-comp-button-group-standard-large-between-space` | Space between `l` buttons | `8px` |
| `--md-comp-button-group-standard-xlarge-between-space` | Space between `xl` buttons | `8px` |
| `--md-comp-button-group-standard-expanded-ratio` | Share of its height a pressed button gains | `0.15` |

### Connected
| Custom property | Meaning | Default |
| --- | --- | --- |
| `--md-comp-button-group-connected-small-between-space` | Space between the buttons | `2px` |
| `--md-comp-button-group-connected-inner-corner-corner-size` | Radius of the corners facing a neighbor | The button's pressed corner radius |
| `--md-comp-button-group-connected-pressed-inner-corner-corner-size` | The inner radius while the button is pressed | Half of the above |
| `--md-comp-button-group-connected-maximum-width` | Width the group stops growing at on wide surfaces | `100%` |

### Motion
The widening effect and the corner morph both run on the standard Button and Icon button motion properties (`--md-comp-button-motion-duration` / `--md-comp-button-motion-effects` and their `--md-comp-icon-button-*` counterparts). This ensures the group container animates in perfect sync with the buttons it contains.

## Compatibility
The Button group relies on the CSS [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) pseudo-class to read the size of its children and locate the neighbors of a pressed button. In browsers that do not support this, the buttons will still render correctly and remain functional, but they will fall back to the small (`s`) spacing and will neither widen nor compress on press.

The toggle-button format of the connected group additionally depends on [Invoker commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) (`command` / `commandfor`). The radio and checkbox `<label>` formats have no such requirement and are supported universally.
