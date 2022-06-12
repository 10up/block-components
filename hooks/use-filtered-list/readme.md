# `useFilteredList`

The `useFilteredList` hook is a simple utility that makes it easy to search for any key in a list of objects and only return the items that match the query.

## Usage

```js
import { useIcons, useFilteredList } from '@10up/block-components';

function BlockEdit(props) {
    const icons = useIcons();
    const [searchTerm, setSearchTerm] = useState('');

    // the useFilteredList hook only returns the icons where the value 
    // of the 'name' property that includes the provided search term
    const [filteredIcons] = useFilteredList(icons, searchTerm, 'name');

    return (
        ...
    );
}
```
