# `useSelectedTerms`

The `useSelectedTerms` hook retrieves the term objects of the selected terms of the provided taxonomy.

## Usage

```js
import { useSelectedTerms } from '@10up/block-components';

function BlockEdit(props) {
    const [selectedCategories, hasResolvedSelectedCategories] = useSelectedTerms('category');

    return (
        ...
    );
}
```
