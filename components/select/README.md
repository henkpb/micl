# Select
This component implements the the [Material Design 3 Expressive Select](https://m3.material.io/components/menus/guidelines#ee2f3664-c926-47ab-acbf-2ab675506932) design.

## Basic Usage

### HTML
The Select component is an extension of the [Text field](../textfield/README.md) and the [List](../list/README.md). It can be either `filled` or `outlined`. To create a basic select, use the following HTML and swap the class name to change the style.

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
The Select component relies on styles from the text field and list components. Be sure to import all three styles into your project.

```CSS
@use "micl/components/list";
@use "micl/components/textfield";
@use "micl/components/select";
```

### TypeScript
This component requires the **Text field** TypeScript module for functionality. You can import the specific module and handle initialization manually, or use the main MICL library for automatic initialization.

To manually initialize the component:

```TypeScript
import miclTextField from 'micl/components/textfield';

miclTextField.initialize(document.querySelector('.micl-textfield-filled'));
```

### Demo
A live example of the [Select component](https://henkpb.github.io/micl/select.html) is available for you to interact with.

## Variants
To display extra information for an option, add the `aria-description` attribute to the `<option>` element. In a two-line list item (`micl-list-item-two`), this displays the attribute's content as supporting text. Do not add a separate text element to the `<option>`, as this will change the text of the selected option.

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

- **Thumbnail**: Use `micl-list-item__thumbnail` for video previews with a background-image.
  ```HTML
  <option class="micl-list-item-two" value="AR">
    <span class="micl-list-item__thumbnail" style="background-image:url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/330px-Flag_of_Argentina.svg.png)"></span>
    <span class="micl-list-item__text" aria-description="Country code: AR">Argentina</span>
  </option>
  ```

## Compatibility
This component uses modern browser features to style the `<select>` element, which may not be fully supported in all browsers. Browsers that do not support these features will display a default select menu. Please check [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/::picker#browser_compatibility) for details.
