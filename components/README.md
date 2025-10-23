# MICL Components
Welcome to the MICL component library, a collection of components that implement the [Material Design 3](https://m3.material.io/) specification.

Each component is self-contained in a separate folder, making it easy to find what you need. You'll typically find:

- A [Sass stylesheet](https://sass-lang.com/) for component-specific styling.

- If required, a [TypeScript module](https://www.typescriptlang.org/) for interactive features.

- A README.md file for detailed documentation.

Most components are standalone, but some are built on top of others. For example, the [Menu component](./menu/README.md) extends the [List component](./list/README.md), so it requires the styles and functionality of both. Always check the documentation for each component to see which dependencies you need to import. This ensures everything works as expected.

A [separate CSS file](../foundations/layout/README.md), based on the [Material Design Layout Foundation](https://m3.material.io/foundations/layout/understanding-layout/overview), provides styles for an adaptive layout. It includes styles for the **window frame**, **body region** and **panes** that adjust to the available screen space, ensuring your layout follows Material Design's responsive guidelines.
