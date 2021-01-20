# 10up Block Components
A collection of simple Components for the Block Editor build with the core gutenberg components. These components do not include any build files and do not bundle the WordPress components. Therefore these need to be used in an environemt where the [`Dependency Extraction Webpack Plugin`](https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin) is used and the `import { component } from '@wordpress/package';` is supported.

## ContentPicker
A Content Picker component that allows you to pick posts and pages very easily.

### Usage

```js
import { ContentPicker } from '@10up/block-components';

function MyComponent( props ) {

    return (
        <ContentPicker
			onSelect={ (item, type) => { console.log(item) } }
			mode="post"
            label={ "Please select a Post or Page:" }
            contentTypes={ [ 'posts', 'pages' ] }
        />
    )
}
```

#### Props

| Name             | Type       | Default               | Description                                                            |
| ---------------- | ---------- | --------------------- | ---------------------------------------------------------------------- |
| `onSelect`   | `function` | `undefined`            | Callback function that gets called with the post or term object upon selection |
| `label`          | `string`   | `''`                   | Renders a label for the Search Field.                                  |
| `mode`           | `string`   | `'post'`               | Either `post` or `term`                                 |
| `placeholder`    | `string`   | `''`                   | Renders placeholder text inside the Search Field.                      |
| `contentTypes`      | `array`    | `[ 'posts', 'pages' ]` | Names of the post types or taxonomies that should get searched                       |

The `contentTypes` will get used in a Rest Request to the `search` endpoint as the `subtypes`:
```js
apiFetch( {
    path: `wp/v2/search/?search="${keyword}"&subtype="${contentTypes.join(',')}"&type=${mode}`
} )...
```

## useHasSelectedInnerBlock

Determine whether one of the inner blocks currently is selected.

### Usage
```js
import { useHasSelectedInnerBlock } from '@10up/block-components';

function BlockEdit( props ) {
    const hasSelectedInnerBlock = useHasSelectedInnerBlock(props);

    return (
        <div>
            { hasSelectedInnerBlock ? 'InnerBlocks are selected' : 'InnerBlocks are not selected' }
        </div>
    )
}
```

## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" alt="Work with 10up, we create amazing websites and tools that make content management simple and fun using open source tools and platforms"></a>
