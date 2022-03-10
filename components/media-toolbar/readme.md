# MediaToolbar

The MediaToolbar component is build to quickly add a complete media editing experience to the `BlockControls` toolbar. It shows an "Add Image" or "Replace Image" + "Remove Image" buttons that handle the full flow. Wether or not an image can be removed can be configured using the `isOptional` prop.

## Usage

```js
import { MediaToolbar } from '@10up/block-components';

function BlockEdit(props) {

    const { attributes: { image }, setAttributes } = props;

    function handleImageSelect( image ) {
        setAttributes({image: image});
    }

    function handleImageRemove() {
        setAttributes({image: null})
    }

    return (
        <>
            <BlockControls>
                <MediaToolbar
                    isOptional
                    image={ image }
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
| `image` | `object`    | `null`   | image attribute          |
| `onSelect` | `Function` | `null` | Callback that gets called with the new image when one is selected |
| `onRemove` | `Function` | `null` | Callback that gets called when the remove image button is clicked |
| `isOptional` | `boolean` | `false` | Wether or not the Remove Image button should be shown |
