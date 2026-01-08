# ContentSearch

A component that lets you search through posts and pages. This component is used by Content Picker. This component provides only the searching functionality and does not maintain any list of chosen items.

## Usage

### Basic Usage

```js
import { ContentSearch } from '@10up/block-components';

function MyComponent( props ) {

    return (
        <ContentSearch
            onSelectItem={ (item) => { console.log(item) } }
            mode="post"
            label={ "Please select a Post or Page:" }
            contentTypes={ [ 'post', 'page' ] }
        />
    )
}
```

### Customizing Fields and Results

You can customize which fields are fetched from the API and how search results are normalized using the `queryFieldsFilter` and `searchResultFilter` props:

```js
import { ContentSearch } from '@10up/block-components';
import { useCallback } from '@wordpress/element';

function MyComponent( props ) {
    const queryFieldsFilter = useCallback( (fields, mode) => {
        if ( mode === 'post' ) {
            fields.push('excerpt');
        }
        return fields;
    }, [] );

    const searchResultFilter = useCallback( (item, result) => {
        return {
            ...item,
            url: '',
            info: `<strong>ID:</strong> ${result.id}<br>${result.excerpt}`,
        };
    }, [] );

    return (
        <ContentSearch
            onSelectItem={ (item) => { console.log(item) } }
            mode="post"
            label={ "Please select a Post or Page:" }
            contentTypes={ [ 'post', 'page' ] }
            queryFieldsFilter={queryFieldsFilter}
            searchResultFilter={searchResultFilter}
        />
    )
}
```

## Props

| Name                  | Type       | Default                              | Description                                                                                                                      |
|-----------------------|------------|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `onSelectItem`        | `function` | `undefined`                          | Function called when a searched item is clicked                                                                                  |
| `queryFilter`         | `function` | `(query, parametersObject) => query` | Function called to allow you to customize the query before it's made. It's advisable to use `useCallback` to save this parameter |
| `queryFieldsFilter`   | `function` | `undefined`                          | Function to customize which fields are fetched from the API. Receives `(fields: string[], mode: ContentSearchMode) => string[]`. It's advisable to use `useCallback` to save this parameter. |
| `searchResultFilter`  | `function` | `undefined`                          | Function to customize the normalized search result item. Receives `(item: NormalizedSuggestion, originalResult: WP_REST_API_Search_Result \| WP_REST_API_User) => NormalizedSuggestion`. It's advisable to use `useCallback` to save this parameter. |
| `label`               | `string`   | `''`                                 | Renders a label for the Search Field.
| `hideLabelFromVision` | `bool`     | `true`                               | Whether to hide the label                                                                                           |
| `mode`                | `string`   | `'post'`                             | One of: `post`, `user`, `term`                                                                                                   |
| `placeholder`         | `string`   | `''`                                 | Renders placeholder text inside the Search Field.                                                                                |
| `contentTypes`        | `array`    | `[ 'post', 'page' ]`                 | Names of the post types or taxonomies that should get searched                                                                   |
| `excludeItems`        | `array`    | `[ { id: 1, type: 'post' ]`          | Items to exclude from search                                                                                                     |
| `perPage`             | `number`   | `50`                                 | Number of items to show during search                                                                                            |
| `renderItemType`      | `function` | `undefined`                          | Function called to override the item type label in `SearchItem`. Must return the new label.                                      |
| `renderItem`          | `function` | `undefined`                          | Function to customize the rendering of each search result item. Receives `RenderItemComponentProps` and must return a JSX element. |
| `fetchInitialResults` | `bool`     | `false`                              | Fetch initial results to present when focusing the search input                                                                  |
| `options.inputDelay`  | `number`   | `undefined`                           | Debounce delay passed to the internal search input, defaults to 350ms                                                             |
