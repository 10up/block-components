# ContentSearch

A component that lets you search through posts and pages. This component is used by Content Picker. This component provides only the searching functionality and does not maintain any list of chosen items.

## Usage

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

## Props

| Name                  | Type       | Default                              | Description                                                                                                                      |
|-----------------------|------------|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `onSelectItem`        | `function` | `undefined`                          | Function called when a searched item is clicked                                                                                  |
| `queryFilter`         | `function` | `(query, parametersObject) => query` | Function called to allow you to customize the query before it's made. It's advisable to use `useCallback` to save this parameter |
| `label`               | `string`   | `''`                                 | Renders a label for the Search Field.
| `hideLabelFromVision` | `bool`     | `true`                               | Whether to hide the label                                                                                           |
| `mode`                | `string`   | `'post'`                             | One of: `post`, `user`, `term`                                                                                                   |
| `placeholder`         | `string`   | `''`                                 | Renders placeholder text inside the Search Field.                                                                                |
| `contentTypes`        | `array`    | `[ 'post', 'page' ]`                 | Names of the post types or taxonomies that should get searched                                                                   |
| `excludeItems`        | `array`    | `[ { id: 1, type: 'post' ]`          | Items to exclude from search                                                                                                     |
| `perPage`             | `number`   | `50`                                 | Number of items to show during search                                                                                            |
| `renderItemType`      | `function` | `undefined`                          | Function called to override the item type label in `SearchItem`. Must return the new label.                                      |
| `fetchInitialResults` | `bool`     | `false`                              | Fetch initial results to present when focusing the search input                                                                  |
