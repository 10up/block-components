# MediaToolbar

The MediaToolbar component is build to quickly add a complete media editing experience to the `BlockControls` toolbar. It shows an "Add Image" or "Replace Image" + "Remove Image" buttons that handle the full flow. Wether or not an image can be removed can be configured using the `isOptional` prop.

## Usage

```js
import { BlockControls } from '@wordpress/block-editor';
import { MediaToolbar } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { imageId } = attributes;

    function handleImageSelect( image ) {
        setAttributes({imageId: image.id});
    }

    function handleImageRemove() {
        setAttributes({imageId: null})
    }

    return (
        <>
            <BlockControls>
                <MediaToolbar
                    isOptional
                    id={ imageId }
                    onSelect={ handleImageSelect }
                    onRemove={ handleImageRemove }
                />
            </BlockControls>
            ...
        </>
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `id` | `number`    | `null`   | image id          |
| `onSelect` | `Function` | `null` | Callback that gets called with the new image when one is selected |
| `onRemove` | `Function` | `null` | Callback that gets called when the remove image button is clicked |
| `isOptional` | `boolean` | `false` | Wether or not the Remove Image button should be shown |
