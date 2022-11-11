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
        />
    )
}
```

> **Note**
> In order to get the same result as the GIF you also need to use the [`MediaToolbar`](https://github.com/10up/block-components/tree/develop/components/media-toolbar) component. It adds the Replace flow to the Blocks Toolbar.


## Props

| Name       | Type              | Default  | Required |  Description                                                   |
| ---------- | ----------------- | -------- | -------- |-------------------------------------------------------------- |
| `id` | `number`    | `null`   | Yes | image id          |
| `onSelect` | `function` | `null` | Yes | Callback that gets called with the new image when one is selected |
| `size` | `string` | `large` | No | name of the image size to be displayed |
| `focalPoint` | `object` | `undefined` | No | optional focal point object |
| `onChangeFocalPoint` | `function` | `undefined` | No | Callback that gets called with the new focal point when it changes |
| `hasInlineControls` | `boolean` | `false` | No | When `true`, it will display inline media flow controls |
| `onRemove` | `function` | `undefined` | No | Callback that gets called and passed to the Remove Image button inside the inline controls. ***NOTE:*** it has no effect if `hasInlineControls` is `false` |
| `isOptional` | `boolean` | `false` | No | Wether or not the inline controls' Remove Image button should be shown. ***NOTE:*** it has no effect if `hasInlineControls` is `false` |
| `...rest` | `*` | `null` | No | any additional attributes you want to pass to the underlying `img` tag |
