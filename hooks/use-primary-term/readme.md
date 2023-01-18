# `usePrimaryTerm`

The `usePrimaryTerm` hook allows you to get information about the current post. It either references the global post, or when used within a [`<PostContext />`](../../components/post-context/) it reference that post.

> **Warning**
> This hook will not function without having [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) installed and activated.

## Usage

```js
import { usePrimaryTerm } from '@10up/block-components';

function BlockEdit(props) {
    const [primaryCategory, isSupportingCategory] = usePrimaryTerm('category');

    return (
        ...
    );
}
```
