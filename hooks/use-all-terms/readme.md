# `useAllTerms`

The `useAllTerms` hook is a simple utility that makes it easy to get all terms from a taxonomy.

## Usage

```js
import { useAllTerms } from '@10up/block-components';

function BlockEdit(props) {
    const [categories, hasResolvedCategories] = useAllTerms('category');

    if ( ! hasResolvedCategories ) {
        return <Spinner />
    }

    return (
        ...
    );
}
```
