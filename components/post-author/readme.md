# PostAuthor

## Usage

```js
import { PostAuthor } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostAuthor className="wp-block-example-hero__author">
            <PostAuthor.Avatar className="wp-block-example-hero__author-avatar" />
            <PostAuthor.Name className="wp-block-example-hero__author-name" />
            <PostAuthor.FirstName className="wp-block-example-hero__author-first-name" />
            <PostAuthor.LastName className="wp-block-example-hero__author-last-name" />
            <PostAuthor.Bio className="wp-block-example-hero__author-bio" />
        </PostAuthor>
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `context` | `object` | `{}` |  |
| `children` | `function\|node\|null`  | `null` |  |
| `...rest` | `object` | `{}` |  |

## Child Components

### `PostAuthor.Name`

### `PostAuthor.FirstName`

### `PostAuthor.LastName`

### `PostAuthor.Avatar`

### `PostAuthor.Bio`

### `PostAuthor.Email`
