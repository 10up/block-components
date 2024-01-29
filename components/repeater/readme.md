# Repeater

![Repeater Component Demo](../../images/repeater-component.gif)

A Repeater component that allows you to add repeater fields.

> **Warning**
> The Repeater component should only be used for repeatable fields inside of the Inspector Sidebar or on custom Settings Pages. For most repeatable content InnerBlocks should be used.

## Usage

The type definition of the attribute needs to be set as an array and the name of the attribute should be passed to the `attribute` prop of the `Repeater` component.

For example, if a repeater item unit is a group field containing a text field and a checkbox field, the attribute would be defined in `block.json` as:

```json
"attributes": {
    "repeaterFieldData": {
        "type": "array",
        "default": [
            {
                "text": "",
                "checked": false
            }
        ],
    }
}
```

**Note:** You should not provide an `id` to the repeater item unit. The Repeater component will automatically generate an `id` for each item.

```js
import { Repeater } from '@10up/block-components';

export function BlockEdit(props) {
    const { attributes } = props;
    const { repeaterFieldData } = attributes;

    return (
        <Repeater attribute="repeaterFieldData">
            {( item, index, setItem, removeItem ) => (
                <>
                    <TextControl key={index} value={item} onChange={(value) => setItem(value)} />
                    <Button icon={close} label={__('Remove')} onClick={removeItem}/>
                </>
            )}
        </Repeater>
    );
}
```

## Props

| Name             | Type       | Default               | Description                                                            |
| ---------------- | ---------- | --------------------- | ---------------------------------------------------------------------- |
| `attribute`   | `string` | `items`            | The name of the block attribute that holds data for the Repeater fields. |
| `addButton`   | `function` | `null`            | A render prop to customize the "Add item" button. |
| `allowReordering`   | `boolean` | `false`       | boolean to toggle reordering of Repeater items. |
