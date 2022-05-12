# `useMedia`

The `useMedia` hook is a simple helper to quickly get something from the WordPress Media Library. It accepts the `id` of the media element as it's only parameter and returns an object containing the media object itself (`media`), whether it is still loading (`isResolvingMedia`), and whether it has finished resolving (`hasResolvedMedia`).

## Usage

```js
function BlockEdit(props) {
    const { attributes } = props;
    const { imageId } = attributes;

    const { media, hasResolvedMedia } = useMedia( imageId );

    if ( ! hasResolvedMedia ) {
        return <Spinner />
    }

    return (
        <img src={ media.source_url } alt={image.alt} />
    );
}
```

_Note: In most cases it makes more sense to use the [`Image`](../../components/image/) Component instead since that uses the `useMedia` hook under the hood._
