# Post Excerpt

The `PostExcerpt` component is part of the suite of components that read/write data from the global post object or the current [`<PostContext />`](../post-context/). It has a composable declarative approach to allow you full control over the markup without needing to worry about the data handling at all.

The Component allows you to showcase the excerpt of the current post.

## Usage

```js
import { PostExcerpt } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostExcerpt className="wp-block-example-hero__excerpt" />
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `placeholder` | `string` | `Enter excerpt...` |  |
| `...rest` | `object` | `{}` |  |
