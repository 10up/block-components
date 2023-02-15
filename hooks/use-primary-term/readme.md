# `usePrimaryTerm`

The `usePrimaryTerm` hook retrieves the primary term of any given taxonomy.

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
