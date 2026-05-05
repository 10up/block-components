# `useSelectedTermIds`

The `useSelectedTermIds` hook retrieves ids of the selected terms of the provided taxonomy. It gets used internally by the [`useSelectedTerms`](../use-selected-terms/) hook which is a more full featured version of this hook.

## Usage

```js
import { useSelectedTermIds } from '@10up/block-components';

function BlockEdit(props) {
    const [selectedCategoryIds, hasResolvedSelectedCategoryIds] = useSelectedTermIds('category');

    return (
        ...
    );
}
```
