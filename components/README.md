# MICL Components
Welcome to the MICL component library, a collection of components that implement the [Material Design 3](https://m3.material.io/) specification.

Each component is self-contained in a separate folder, making it easy to find what you need. You'll typically find:

- A [Sass stylesheet](https://sass-lang.com/) for component-specific styling.

- If required, a [TypeScript module](https://www.typescriptlang.org/) for interactive features.

- A README.md file for detailed documentation.

When you load the per-component stylesheets instead of the full `micl.css`, load `dist/base.css` once before them: it holds the design tokens and property registrations that every component shares.

Most components are standalone, but some are built on top of others. For example, the [Menu component](./menu/README.md) extends the [List component](./list/README.md), so it requires the styles and functionality of both. The [Accordion](./accordion/README.md) has no files of its own at all: its styles and behaviour are part of the List component. Always check the documentation for each component to see which dependencies you need to import. This ensures everything works as expected.

The [foundations](../README.md#foundations-) provide styles and behaviour that are not tied to a single component:

- [Field](../foundations/field/README.md) arranges form fields in a grid with the standard Material vertical rhythm.
- [Form](../foundations/form/README.md) validates a form with the browser's Constraint Validation API and shows the result as MICL error styling.
- [Layout](../foundations/layout/README.md), based on the [Material Design Layout Foundation](https://m3.material.io/foundations/layout/layout-overview), provides the **window frame**, **rail region** and **panes** that adapt to the available screen space.
- [Scrollbar](../foundations/scrollbar/README.md) gives every scrollbar a thin, theme-colored appearance.
