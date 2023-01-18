# `PostContext`

The `PostContext` component allows you to customize the post object referenced by and of the components referencing the current post object. They are all prefixed with `Post`.

For example this can be used to build a custom block that gets used inside the core query loop and accesses the passed in post id / post type of that to power the functionality of all the `Post` child components.

## Usage

```js
import { PostContext, PostTitle } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostContext postId={42} postType={'page'} isEditable={true} >
            <PostTitle tagName="h2" className="wp-block-example-hero__title" />
        </PostContext>
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `postId` | `number` | `null` | ID of the post |
| `postType` | `string` | `null` | post type of the post |
| `isEditable` | `boolean` | `null` | whether the post is editable. Controls the behavior of the nested `Post` components |
| `children` | `node` | `null` | any child components |
