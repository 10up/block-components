# Post Date

The `PostDate` component is part of the suite of components that read/write data from the global post object or the current [`<PostContext />`](../post-context/). It has a composable declarative approach to allow you full control over the markup without needing to worry about the data handling at all.

The Component allows you to showcase the publish date of the current post.

## Usage

```js
import { PostDate } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostDate className="wp-block-example-hero__date" />
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `placeholder` | `string` | `No date set` |  |
| `format` | `string` |  | Uses the WordPress date format setting of the site |
| `...rest` | `object` | `{}` |  |
