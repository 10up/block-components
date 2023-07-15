# Image

![Image Component Example](../../images/image-component.gif)

The Image component allows you to easily add images to your custom blocks without needing to manually worry about loading states etc. It renders a `<MediaPlaceholder />` component in place of the image if the id is not set and shows a spinner when the image is still loading.

## Usage

```js
import { Image } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { imageId, focalPoint } = attributes;

    function handleImageSelect( image ) {
        setAttributes({imageId: image.id});
    }

    function handleFocalPointChange( value ) {
        setAttributes({focalPoint: value});
    }

    return (
        <Image
            id={imageId}
            className="my-image"
            size="full"
            onSelect={handleImageSelect}
            focalPoint={focalPoint}
            onChangeFocalPoint={handleFocalPointChange}
            labels={{
                title: 'Select Poster Image',
                instructions: 'Upload a media file or pick one from your media library.'
            }}
        />
    )
}
```

> **Note**
> In order to get the same result as the GIF you also need to use the [`MediaToolbar`](https://github.com/10up/block-components/tree/develop/components/media-toolbar) component. It adds the Replace flow to the Blocks Toolbar.

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `id` | `number` | `null` | Image ID |
| `onSelect` | `Function` | `null` | Callback that gets called with the new image when one is selected |
| `size` | `string` | `large` | Name of the image size to be displayed |
| `focalPoint` | `object` | `{x:0.5,y:0.5}` | Optional focal point object.
| `onChangeFocalPoint` | `function` | `undefined` | Callback that gets called with the new focal point when it changes. (Is required for the FocalPointPicker to appear) |
| `labels` | `object` | `{}` | Pass in an object of labels to be used by the `MediaPlaceholder` component under the hook. Allows the sub properties `title` and `instructions` |
| `canEditImage` | `boolean` | `true` | Whether or not the image can be edited by in the context its getting viewed. Controls whether a placeholder or upload controls should be shown when no image is present |
| `hasInlineControls` | `boolean` | `false` | When `true`, it will display inline media flow controls |
| `isOptional` | `boolean` | `false` | Wether or not the inline controls' Remove Image button should be shown. ***NOTE:*** it has no effect if `hasInlineControls` is `false` |
| `...rest` | `*` | `null` | Any additional attributes you want to pass to the underlying `img` tag |
