# `PostCategoryList`

The `PostCategoryList` component is part of the suite of components that read / write data from the global post object or the current [`<PostContext />`](../post-context/). It has a composable declarative approach to allow you full control over the markup without needing to worry about the data handling at all.

The Component allows you to showcase the list of Categories assigned to the current post

## Usage

```js
import { PostCategoryList } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostCategoryList className="wp-block-example-hero__categories">
            <PostCategoryList.ListItem className="wp-block-example-hero__category">
                <PostCategoryList.TermLink className="wp-block-example-hero__category-link" />
            </PostCategoryList.ListItem>
        </PostCategoryList>
    )
}
```

### Output

```html
<ul class="wp-block-example-hero__categories">
    <li class="wp-block-example-hero__category">
        <a href="#####" class="wp-block-example-hero__category-link">Term Name</a>
    </li>
</ul>
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `context` | `object` | `{}` |  |
| `children` | `function\|node\|null`  | `null` |  |
| `tagName` | `string` | `ul` |  |
| `...rest` | `object` | `{}` |  |

## Child Components

### `PostCategoryList.ListItem`

### `PostCategoryList.TermLink`
