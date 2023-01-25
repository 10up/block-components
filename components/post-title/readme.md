# Post Title

The `PostTitle` component is part of the suite of components that read/write data from the global post object or the current [`<PostContext />`](../post-context/). It has a composable declarative approach to allow you full control over the markup without needing to worry about the data handling at all.

The Component allows you to showcase the title of the current post.

## Usage

```js
import { PostTitle } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostTitle tagName="h2" className="wp-block-example-hero__title" />
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `tagName` | `string` | `h1` |  |
| `...rest` | `object` | `{}` |  |
