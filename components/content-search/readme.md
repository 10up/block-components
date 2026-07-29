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
| `includeEmbeds`       | `bool, string, array` | `undefined` | Whether to include embedded items in the search results. A string or array of strings can be passed to specify the specific embeds. |
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

## Search Result Item Customization

There are a number of vectors for customizing how search results are rendered. You can customize the item type label (e.g. "Post", "Page", "Category") by passing a function to the `renderItemType` prop. This function returns a string and receives a single `suggestion` argument, an object with the following shape:

```js
{
	id: number;
	subtype: string;
	title: string;
	type: string;
	url: string;
	embedded?: object;
}
```

You can also customize the entire item by passing a function to the `renderItem` prop. This function should be a React component that receives these props:

```js
{
    item: object; // The suggestion object (see above).
    onSelect: () => void;
    searchTerm: string;
    id: string;
    contentTypes: string[];
    renderType: ( suggestion: object ) => string;
}
```

You may need more than the default suggestion fields to render your custom item. The search endpoint is limited (by design) in what fields it returns, but you can use the linking & embedding functionality of the REST API to include the entire post object (or term, or user) in the response via the `embedded` prop. To do this, pass the `includeEmbeds` prop, which can be a boolean (to include all embeds), a string (to include a single embed type), or an array of strings (to include multiple embed types). This is useful if you want to display additional information about a post, such as its publication date. See the [content search example](example/src/blocks/content-search-example/edit.tsx) for a demonstration of this in action.
