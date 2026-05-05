# `useIsSupportedTaxonomy`

The `useIsSupportedTaxonomy` hook is a simple utility that returns whether or not a given taxonomy is supported on a given post type.

## Usage

```js
import { useIsSupportedTaxonomy } from '@10up/block-components';

function BlockEdit(props) {
    const { context } = props;
    const { postType } = context;
    const [isSupportingCategoryTaxonomy, hasResolvedIsSupportingCategoryTaxonomy] = useIsSupportedTaxonomy(
        postType,
        'category',
    );

    if ( ! hasResolvedIsSupportingCategoryTaxonomy ) {
        return <Spinner />
    }

    return (
        ...
    );
}
```
