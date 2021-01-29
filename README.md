# 10up Block Components

A collection of simple components for the Block Editor build with the core gutenberg components. These components do not include any build files and do not bundle the WordPress components. Therefore these need to be used in an environemt where the [`Dependency Extraction Webpack Plugin`](https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin) is used and the `import { component } from '@wordpress/package';` is supported.

## Installation

1. Run `npm install --save @10up/block-components` within your WordPress theme or plugin.
2. Within your block editor code, import the relevant component(s) e.g. `import { ContentPicker } from '@10up/block-components';`
3. We highly recommend you use [@10up/scripts](https://github.com/10up/10up-scripts) to build your block files as it handles dependency extraction for you.

## ContentPicker

A Content Picker component that allows you to pick posts and pages very easily.

### Usage

```js
import { ContentPicker } from '@10up/block-components';

function MyComponent( props ) {

    return (
        <ContentPicker
			onChange={ (pickedContent) => { console.log(pickedContent) } }
			mode="post"
            label={ "Please select a Post or Page:" }
            contentTypes={ [ 'post', 'page' ] }
        />
    )
}
```

#### Props

| Name             | Type       | Default               | Description                                                            |
| ---------------- | ---------- | --------------------- | ---------------------------------------------------------------------- |
| `onChange`   | `function` | `undefined`            | Callback function the list of picked content gets changed |
| `label`          | `string`   | `''`                   | Renders a label for the Search Field.                                  |
| `mode`           | `string`   | `'post'`               | Either `post` or `term`                                 |
| `placeholder`    | `string`   | `''`                   | Renders placeholder text inside the Search Field.                      |
| `contentTypes`      | `array`    | `[ 'post', 'page' ]` | Names of the post types or taxonomies that should get searched                       |
| `maxContentItems`          | `number`   | `1`                   | Max number of items a user can select.
| `isOrderable`          | `bool`   | `false`                   | When true, will allow the user to order items. Must be used in conjunction with `maxContentItems > 1`
| `uniqueContentItems`          | `bool`   | `true`                   | Prevent duplicate items from being picked.
| `excludeCurrentPost`          | `bool`   | `true`                   | Don't allow user to pick the current post.
| `content`          | `array`   | `[]`                   | Array of items to prepopulate picker with. Must be in the format of: `[{id: 1, type: 'post'}, {id: 1, type: 'page'},... ]`. You cannot provide terms and posts to the same picker. Can also take the form `[1, 2, ...]` if only one `contentTypes` is provided.

__NOTE:__ Content picker cannot validate that posts you pass it via `content` prop actually exist. If a post does not exist, it will not render as one of the picked items but will still be passed back as picked items if new items are picked/sorted. Therefore, on save you need to validate that all the picked posts/terms actually exist.

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

## IsAdmin

A wrapper component that only renders child components if the current user has admin capabilities. The usecase for this component is when you have a certain setting that should be restricted to administrators only. For example when you have a block that requires an API token or crenentials you might only want Administrators to edit these. See [10up/maps-block-apple](https://github.com/10up/maps-block-apple/blob/774c6509eabb7ac48dcebea551f32ac7ddc5d246/src/Settings/AuthenticationSettings.js) for a real world example.

### Usage
```js
import { IsAdmin } from '@10up/block-components';

function MyComponent( props ) {

    return (
        <IsAdmin
            fallback={ <p>Sorry, you are not allowed to do that</p> }
        >
            <p>Only Administrators can see what you put in here</p>
        </IsAdmin>
    )
}
```

#### Props
| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `fallback` | `ReactElement`    | `null`   | Element that will be rendered if the user is no admin          |
| `children` | `ReactElement(s)` | `'null'` | Child components that will be rendered if the user is an Admin |

## MediaToolbar
The MediaToolbar component is build to quickly add a complete media editing experience to the `BlockControls` toolbar. It shows an "Add Image" or "Replace Image" + "Remove Image" buttons that handle the full flow. Wether or not an image can be removed can be configured using the `isOptional` prop. 

### Usage
```js
import { MediaToolbar } from '@10up/block-components';

function BlockEdit(props) {

    const { attributes: { image }, setAttributes } = props;

    function handleImageSelect( image ) {
        setAttributes({image: image});
    }

    function handleImageRemove() {
        setAttributes({image: null})
    }

    return (
        <>
            <BlockControls>
                <MediaToolbar
                    isOptional
                    image={ image }
                    onSelect={ handleImageSelect }
                    onRemove={ handleImageRemove }
                />
            </BlockControls>
            ...
        </>
    )
}
```

#### Props
| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `image` | `object`    | `null`   | image attribute          |
| `onSelect` | `Function` | `null` | Callback that gets called with the new image when one is selected |
| `onRemove` | `Function` | `null` | Callback that gets called when the remove image button is clicked |
| `isOptional` | `boolean` | `false` | Wether or not the Remove Image button should be shown |

## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" alt="Work with 10up, we create amazing websites and tools that make content management simple and fun using open source tools and platforms"></a>
