# Select
This component implements the [Material Design 3 Expressive Select](https://m3.material.io/components/menus/guidelines#ee2f3664-c926-47ab-acbf-2ab675506932) design. A select component is used to present the user with a set of options from which one can be chosen.

## Basic Usage

### HTML
The Select component is an extension of the [Text field](../textfield/README.md) and the [Menu](../menu/README.md) components. It can be either `filled` or `outlined`. To create a basic select, use the following HTML and swap the class name to change the style.

```HTML
<div class="micl-textfield-filled">
  <label for="myselect">Country</label>
  <select id="myselect">
    <option class="micl-list-item-one" value="AR">
      <span class="micl-list-item__text">Argentina</span>
    </option>
    <option class="micl-list-item-one" value="BO">
      <span class="micl-list-item__text">Bolivia</span>
    </option>
  </select>
</div>
```

### CSS
The Select component relies on styles from the text field, menu and list components. Be sure to import all four styles into your project.

```CSS
@use "material-inspired-component-library/dist/list";
@use "material-inspired-component-library/dist/menu";
@use "material-inspired-component-library/dist/textfield";
@use "material-inspired-component-library/dist/select";
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

This will initialize any Select component, including those that will be added to the DOM later on.

### Live Demo
A live example of the [Select component](https://henkpb.github.io/micl/select.html) is available to interact with.

## Variants
A Select component can be disabled by adding the `disabled` attribute to the `<select>` element. An option within the component can be disabled by adding the `disabled` attribute to the `<option>` element.

You can add [Dividers](../divider/README.md) into the list of options and they will appear as separators to help visually break up the options.

**Example: A select with a divider**

```HTML
<div class="micl-textfield-outlined">
  <label for="myselect">Country</label>
  <select id="myselect">
    <option class="micl-list-item-two" value="" label="(none)"></option>
    <option class="micl-list-item-two" value="AR">
      <span class="micl-list-item__text">Argentina</span>
    </option>
    <hr class="micl-divider-inset">
    <option class="micl-list-item-two" value="BO">
      <span class="micl-list-item__text">Bolivia</span>
    </option>
  </select>
</div>
```

To display extra information for an option, add the `aria-description` attribute to its `<span class="micl-list-item__text">` element. In a two-line list item (`micl-list-item-two`), this displays the attribute's content as supporting text. Do not add a separate text element to the `<option>`, as this will change the text of the selected option.

**Example: A select with supporting text**

```HTML
<div class="micl-textfield-outlined">
  <label for="myselect">Country</label>
  <select id="myselect">
    <option class="micl-list-item-two" value="AR">
      <span class="micl-list-item__text" aria-description="Country code: AR">Argentina</span>
    </option>
    <option class="micl-list-item-two" value="BO">
      <span class="micl-list-item__text" aria-description="Country code: BO">Bolivia</span>
    </option>
  </select>
</div>
```

The text content of an option can be preceded by various media elements:

- **Image**: Use `micl-list-item__image` with a background image.
  ```HTML
  <option class="micl-list-item-two" value="AR">
    <span class="micl-list-item__image" style="background-image:url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/330px-Flag_of_Argentina.svg.png)"></span>
    <span class="micl-list-item__text" aria-description="Country code: AR">Argentina</span>
  </option>
  ```

- **Thumbnail**: Use `micl-list-item__thumbnail` for thumbnail imagery (e.g. video previews or photos).
  ```HTML
  <option class="micl-list-item-two" value="AR">
    <span class="micl-list-item__thumbnail" style="background-image:url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/330px-Flag_of_Argentina.svg.png)"></span>
    <span class="micl-list-item__text" aria-description="Country code: AR">Argentina</span>
  </option>
  ```

**Example: Grouping options**

Options can be grouped by using the `<optgroup>` element. Add a `<legend>` element with the `micl-menu__section` class to provide a label for the option group.

```HTML
<div class="micl-textfield-outlined">
  <label for="myselect">Country</label>
  <select id="myselect">
    <option class="micl-list-item-one" value=""></option>
    <optgroup>
      <legend class="micl-menu__section">North American Countries</legend>
      <option class="micl-list-item-one" value="CA">
        <span class="micl-list-item__text">Canada</span>
      </option>
    </optgroup>
    <hr class="micl-divider-inset">
    <optgroup>
      <legend class="micl-menu__section">South American Countries</legend>
      <option class="micl-list-item-two" value="CL">
        <span class="micl-list-item__text">Chile</span>
      </option>
    </optgroup>
  </select>
</div>
```

## Customizations
You can customize the appearance of the Select component by overriding its global CSS variables. These variables are declared on the `:root` pseudo-class and can be changed on any appropriate parent element to affect its child selects.

| Variable name                  | Default Value | Description |
| ------------------------------ | ------------- | ----------- |
| --md-comp-select-line-height   |               | The vertical line-height applied to the closed `<select>` element |
| --md-comp-select-picker-origin | left top      | The transform-origin used for the open/close scale animation of the option pick-list |

The Select component supports the CSS variables listed for the [Menu](../menu/README.md) component.

## Compatibility
This component uses modern browser features to style the `<select>` element, which may not be fully supported in all browsers. Browsers that do not support these features will display a default select menu. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/::picker#browser_compatibility) for details.
