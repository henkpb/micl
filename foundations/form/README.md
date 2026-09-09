# Form
This foundation validates HTML forms and maps the results to MICL's specific error styling. It builds on the browser's native [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) rather than replacing it: the standard attributes (`required`, `min`, `maxlength`, `pattern`, `type="email"`, …) keep working exactly as they do without MICL, and this foundation adds two things on top — component-aware error presentation, and count rules for a set of related checkboxes.

## Basic Usage

### CSS
None. The error styling lives in the components it applies to — see [Checkbox](../../components/checkbox/README.md) and [Text field](../../components/textfield/README.md).

### JavaScript
Import the foundation and call it, typically from a submit handler:

```JavaScript
import form from "material-inspired-component-library/dist/foundations/form";

document.getElementById("myform").addEventListener("submit", event => {
    if (!form.validateForm(event.currentTarget, true)) {
        event.preventDefault();
    }
});
```

If you load the foundation directly via a `<script>` tag, the object is exposed as the `micl` global:

```HTML
<script src="path/to/dist/foundations/form/index.js"></script>
<script>
    micl.validateForm(document.getElementById("myform"), true);
</script>
```

This foundation is **not** part of `dist/micl.js`'s public API, so import it separately even if you already load the full bundle.

## API

| Function | Description |
|---|---|
| `validateForm(form, doReport?)` | Validates every fieldset and every control in a `<form>`. Returns `true` when all of them are valid. `doReport` defaults to `false` when omitted. |
| `validateFieldSet(fieldset, doReport?)` | The same for a single `<fieldset>`, so you can validate one step of a multi-step form on its own. `doReport` defaults to `false` when omitted. |

Both apply the error styling described below. `doReport` additionally asks the browser to display its native validation bubble on the first offending control; omit it (or pass `false`) to apply the error styling silently — useful when you validate as the user types, or when the component shows the message inline itself.

Note that neither function is wired to any event. Nothing is validated until you call it, which leaves you free to decide when validation should begin.

## Error presentation
Validation messages come from the browser, so they are already localised. This foundation controls how and where those messages are displayed.

**Checkboxes.** An `<input type="checkbox">` with the `micl-checkbox` class gets the `micl-checkbox--error` class while it has a validation message, and loses it again once it is valid. The browser's bubble is still used for the message itself.

**Text fields.** An input inside a `micl-textfield-outlined` or `micl-textfield-filled` wrapper gets the `micl-textfield--error` class on that wrapper. If the wrapper also contains a `micl-textfield__supporting-text` element, the validation message replaces the supporting text — the original wording is stored in `data-micltext` and restored when the field becomes valid — and the browser's bubble is suppressed, because the message is already visible in place.

**Everything else** is left to the browser's own reporting.

## Checkbox count rules
Native constraint validation can require *a* checkbox, but not "at least two of these five". Describe such a rule on the `<fieldset>` that wraps the related checkboxes:

| Attribute | Meaning |
|---|---|
| `data-miclvalidate-checkboxes-name` | The `name` shared by the checkboxes to count. Required. |
| `data-miclvalidate-message` | The message shown when the rule is broken. Required — without it the fieldset is skipped. |
| `data-miclvalidate-checkboxes-count-min` | The smallest allowed number of checked checkboxes. |
| `data-miclvalidate-checkboxes-count-max` | The largest allowed number of checked checkboxes. |
| `data-miclvalidate-checkboxes-count-equal` | The exact number of checked checkboxes required. |

At least one of the three `count` attributes must be present. They may be combined, and the fieldset is invalid as soon as any one of them is violated.

```HTML
<form id="myform">
  <fieldset
    data-miclvalidate-checkboxes-name="topping"
    data-miclvalidate-checkboxes-count-min="2"
    data-miclvalidate-checkboxes-count-max="3"
    data-miclvalidate-message="Please choose two or three toppings.">
    <legend>Toppings</legend>
    <input type="checkbox" id="t1" class="micl-checkbox" name="topping" value="olives">
    <label for="t1">Olives</label>
    <input type="checkbox" id="t2" class="micl-checkbox" name="topping" value="capers">
    <label for="t2">Capers</label>
    ...
  </fieldset>
</form>
```

Every `<fieldset>` inside the validated container is checked, including nested ones, so a form may carry several independent rules.

The message is attached to the **first** checkbox of the named set — that is the control that reports as invalid and shows the message — and is cleared again as soon as that checkbox changes, so the error does not outlive the user's correction.

The counted set is defined by the `name` attribute alone, independently of the [checkbox group](../../components/checkbox/README.md#checkbox-group) classes. If you combine the two, give the `micl-checkbox__parent` checkbox a **different** `name` or none at all, otherwise it is counted alongside its children once they are all selected.
