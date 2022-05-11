# Image

The Image component allows you to easily add images to your custom blocks without needing to manually worry about loading states etc. It renders a `<MediaPlaceholder />` component in place of the image if the id is not set and shows a spinner when the image is still loading.

## Usage

```js
import { Image } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { imageId } = attributes;

    function handleImageSelect( image ) {
        setAttributes({imageId: image.id});
    }

    return (
        <Image
            id={imageId}
            className="my-image"
            size="full"
            onSelect={handleImageSelect}
        />
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `id` | `number`    | `null`   | image id          |
| `onSelect` | `Function` | `null` | Callback that gets called with the new image when one is selected |
| `size` | `string` | `large` | name of the image size to be displayed |
| `...rest` | `*` | `null` | any additional attributes you want to pass to the underlying `img` tag |
