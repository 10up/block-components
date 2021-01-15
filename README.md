# 10up Block Components

## ContentPicker

A simple Content Picker Component build with the core gutenberg components. This component does not include any build files and does not bundle the WordPress components. Therefore this needs to be used in an environemt where the [`Dependency Extraction Webpack Plugin`](https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin) is used and the `import { component } from '@wordpress/package';` is supported. 

## Usage

```js
import { ContentPicker } from '@10up/block-components';

function MyComponent( props ) {

    return (
        <ContentPicker
            handleSelect={ console.log }
            label={ "Please select a Post or Page:" }
            postTypes={ [ 'posts', 'pages' ] }
        />
    )
}
```

### Props

| Name             | Type       | Default               | Description                                                            |
| ---------------- | ---------- | --------------------- | ---------------------------------------------------------------------- |
| `handleSelect`   | `function` | `undefined`            | Callback function that gets called with the post object upon selection |
| `label`          | `string`   | `''`                   | Renders a label for the Search Field.                                  |
| `placeholder`    | `string`   | `''`                   | Renders placeholder text inside the Search Field.                      |
| `postTypes`      | `array`    | `[ 'posts', 'pages' ]` | Names of the post types that should get searched                       |

The `postTypes` will get used in a Rest Request to the `search` endpoint as the `subtypes`:
```js
apiFetch( {
    path: `wp/v2/search/?search="${keyword}"&subtype="${postTypes.join(',')}"&type=post`
} )...
```