# `usePostMetaValue`

The `usePostMetaValue` hook allows you to read and write meta values of the current post. It either references the global post, or when used within a [`<PostContext />`](../../components/post-context/) it reference that post.

## Usage

```js
import { usePostMetaValue } from '@10up/block-components';

function BlockEdit(props) {
    const [price, setPrice] = usePostMetaValue( 'price' );

    return (
        ...
    );
}
```
