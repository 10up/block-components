# Repeater

A Repeater component that allows you to add repeater fields.

## Usage

The type definition of the attribute needs to be set as an array and the name of the attribute should be passed to the `attribute` prop of the `Repeater` component.

```js
import { Repeater } from '@10up/block-components';

export function BlockEdit(props) {
    const { attributes } = props;
    const { items } = attributes;

    return (
        <Repeater attribute="items">
            {( item, index, setItem, removeItem ) => (
                <TextControl key={index} value={item} onChange={(value) => setItem(value)} />
                <Button icon={close} label={__('Remove')} onClick={removeItem}/>
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
