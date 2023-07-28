# Field Validation

The Field Validation component enables the ability to add field validation.

## Usage

### Prop: Required

`<FieldValidation>` provides a `required` prop which accepts true or a string. Passing true will display the default response which is "Required", while passing a string enables the use of a custom response.

```js
import { FieldValidation } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { title } = attributes;

    return (
        <>
            <FieldValidation value={title} required={true}>
                <RichText
                    tagName="p"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                />
            </FieldValidation>

            <FieldValidation value={title} required={__('Title is a required field', '10up')__}>
                <RichText
                    tagName="p"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                />
            </FieldValidation>
        </>
    )
}
```

### Prop: Validate

`<FieldValidation>` can provide more extensive validation tests, `validate` accepts an array of tests. Each test entry is an array containing a callback function and response.

```js
import { FieldValidation } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { title } = attributes;

    return (
        <>
            <FieldValidation
                value={title}
                validate={[ (value) => /^[a-zA-Z\s]+$/.test(value), __('Title requires a-z characters', '10up') ]}
            >
                <RichText
                    tagName="p"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                />
            </FieldValidation>
        </>
    )
}
```

### Full example

Required and validate props can be combined. The required validation will display if the value is empty, and validate will display if there is a value available for custom tests.

```js
import { FieldValidation } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { title } = attributes;

    return (
        <>
            <FieldValidation
                value={title}
                required={__('Title is a required field', '10up')}
                validate={[
                    [ (value) => /^[a-zA-Z\s]+$/.test(value), __('Title requires a-z characters', '10up') ],
                    [ (value) => /^.{10,}$/.test(value), __('Title requires 10 characters or more', '10up') ],
                ]}
            >
                    <RichText
                        tagName="p"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
            </FieldValidation>
        </>
    )
}
```

## Styling

The following elements/states are available for styling;

- `.tenup--block-components__validation-error__field`
  - State/class applied to the field when there is a validation error.
- `.tenup--block-components__validation-error__response`
  - The responses container element.
- `.tenup--block-components__validation-error__response-rule`
  - Each response rule element within the responses container.

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `value` | `string` | `undefined` | Value to validate |
| `required` | `boolean/string` | `false/Required` | Required validation response |
| `validate` | `array` | `false` | Tests to validate value |
