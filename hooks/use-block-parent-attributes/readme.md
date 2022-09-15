# `useBlockParentAttributes`

The `useBlockParentAttributes` hook is a simple utility that makes it easy interface with the attributes of the direct parent block.

## Usage

```js
import { useBlockParentAttributes } from '@10up/block-components';

function BlockEdit(props) {
    const [parentAttributes, setParentAttributes] = useBlockParentAttributes();

    return (
        <RichText
            tagName="h2"
            value={ parentAttributes.title }
            onChange={ value => setParentAttributes({ title: value }) }
         />
    );
}
```
