# `useTaxonomy`

The `useTaxonomy` hook is a simple utility that returns the taxonomy object for any given taxonomy.

## Usage

```js
import { useTaxonomy } from '@10up/block-components';

function BlockEdit(props) {
    const [postTag, hasResolvedPostTag] = useTaxonomy('post_tag');

    if ( ! hasResolvedPostTag ) {
        return <Spinner />
    }

    return (
        ...
    );
}
```
