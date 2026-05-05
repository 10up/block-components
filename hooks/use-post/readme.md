# `usePost`

The `usePost` hook allows you to get information about the current post. It either references the global post, or when used within a [`<PostContext />`](../../components/post-context/) it reference that post.

## Usage

```js
import { usePost } from '@10up/block-components';

function BlockEdit(props) {
    const {
        postId,
        postType,
        isEditable
    } = usePost();

    return (
        ...
    );
}
```
