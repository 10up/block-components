# `useDebouncedInput`

The `useDebouncedInput` hook is a revision of the `@wordpress/components` version of the hook which exposes options, specifically to configure the debounce delay.

## Usage

```js
import { SearchControl } from '@wordpress/components';
import { useDebouncedInput } from '@10up/block-components';

function BlockEdit(props) {
	const [searchInput, setSearchString, searchString] = useDebouncedInput('');
    ...
    async fetchTitles => {
        let options = await apiFetch({
            path: addQueryArgs('/wp/v2/search', {
                search: searchString,
                ...
            })
        });
        options = options.filter(option => option.title !== '');

        return options;
    };
    ...
    return (
        <>
            <SearchControl
				value={searchInput}
				onChange={(newSearchString: string) => {
					setSearchString(newSearchString);
				}}
			/>
        ...
        </>
    );
}
```
