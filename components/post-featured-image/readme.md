# Post Featured Image

The `PostFeaturedImage` component is part of the suite of components that read/write data from the global post object or the current [`<PostContext />`](../post-context/). It has a composable declarative approach to allow you full control over the markup without needing to worry about the data handling at all.

The Component allows you to showcase the featured image of the current post. It uses the [`Image`](../image/) component under the hood but handles all the selection/image management logic.

## Usage

```js
import { PostFeaturedImage } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostFeaturedImage className="wp-block-example-hero__featured_image" />
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `...rest` | `object` | `{}` |  |
