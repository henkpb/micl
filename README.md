# Material-Inspired Component Library (MICL)
The Material-Inspired Component Library (MICL) offers a free and open-source collection of beautifully crafted components leveraging native HTML markup, designed to align with the [Material Design 3](https://m3.material.io/) guidelines. MICL prioritizes minimal HTML markup and often requires no JavaScript, making it a lightweight and efficient choice for your projects.

## Why Choose MICL?
- **Embrace Material Design 3:** Seamlessly integrate the aesthetic and user experience principles of Material Design into your web pages and applications.
- **Lightweight & Efficient:** Benefit from components built with straightforward HTML and minimal to no JavaScript, ensuring fast loading times and a streamlined development process.
- **Effortless Dark Mode:** Enjoy out-of-the-box support for both light and dark modes, automatically adapting to your defined color scheme.

## Why Might MICL Not Be for You?
- **Heavy JavaScript Dependencies:** If your project heavily relies on a JavaScript framework for component interaction, MICL's minimalist approach might not be the best fit.
- **Bootstrap Preference:** Users deeply integrated with or preferring the Bootstrap CSS framework may find MICL's distinct design philosophy less suitable.
- **Legacy Browser Support:** MICL is designed for modern browsers, and comprehensive support for older browser versions is not a primary focus.

## Demo & Documentation 📖
Explore the components in a live environment and see how they work.

- **Live Demo:** [The MICL Showcase](https://henkpb.github.io/micl/)
- **Component Documentation:** [View all component documentation](components/README.md)

## Quick start 🚀

### 1. Install via NPM
```shell
npm install material-inspired-component-library
```

### 2. Add the CSS

**Sass/SCSS**

To import the styles for a single component:
```SCSS
@use "material-inspired-component-library/components/card";
```
To import all component styles:
```SCSS
@use "material-inspired-component-library/styles";
```

**Plain CSS**

Add the main CSS file to your project:
```HTML
<link rel="stylesheet" href="node_modules/material-inspired-component-library/dist/micl.css">
```

### 3. Add the HTML & JavaScript
Here is a simple example of a **Card** component.

```HTML
<div class="micl-card-outlined">
  <img src="your-image.jpg" alt="A beautiful image" class="micl-card__image">
  <div class="micl-card__headline-s">
    <h2>Card Title</h2>
  </div>
  <p class="micl-card__supporting-text">This is a simple card component.</p>
</div>
```

Some components, list the **List**, require a small amount of JavaScript to handle interactive behaviour.

```TypeScript
// For components with interactive behaviour
import list from "material-inspired-component-library/components/lists";

// To import TypeScript for all components
import components from "material-inspired-component-library/components";
```

To import all the TypeScript into your project:
```TypeScript
import components from "material-inspired-component-library/components";
```

**Plain JavaScript**

Add the main JavaScript file to your project:
```HTML
<script src="node_modules/material-inspired-component-library/dist/micl.js"></script>
```

## Available components ✅
The library currently consists of the following components:
- [x] [Accordion](components/accordion/README.md)
- [x] [Bottom sheet](components/bottomsheet/README.md)
- [x] [Button](components/button/README.md)
- [x] [Card](components/card/README.md)
- [x] [Checkbox](components/checkbox/README.md)
- [x] [Dialog](components/dialog/README.md)
- [x] [Divider](components/divider/README.md)
- [x] [Icon button](components/iconbutton/README.md)
- [x] [List](components/list/README.md)
- [x] [Menu](components/menu/README.md)
- [x] [Radio button](components/radio/README.md)
- [x] [Select](components/select/README.md)
- [x] [Side sheet](components/sidesheet/README.md)
- [x] [Slider](components/slider/README.md)
- [x] [Switch](components/switch/README.md)
- [x] [Text field](components/textfield/README.md)

## Change Log

#### 1.1.0 (12.08.2025)
**Features**
- **Text field**: Added support for multi-line text fields.
