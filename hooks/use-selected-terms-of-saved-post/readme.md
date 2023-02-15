# `useSelectedTermsOfSavedPost`

The `useSelectedTermsOfSavedPost` hook retrieves the ids of the selected terms of the provided taxonomy. It gets used internally by the [`useSelectedTerms`](../use-selected-terms/) hook which is a more full featured version of this hook.

## Usage

```js
import { useSelectedTermsOfSavedPost } from '@10up/block-components';

function BlockEdit(props) {
    const { context } = props;
    const { postId } = context;
    const [
        selectedCategoriesOfSavedPost,
        hasResolvedSelectedCategoriesOfSavedPost
    ] = useSelectedTermsOfSavedPost('category', postId);

    return (
        ...
    );
}
```
