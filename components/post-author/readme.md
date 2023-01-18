# PostAuthor

The `PostAuthor` component is part of the suite of components that read / write data from the global post object or the current [`<PostContext />`](../post-context/). It has a composable declarative approach to allow you full control over the markup without needing to worry about the data handling at all.

The Component allows you to showcase information about the author of the current post.

## Usage

```js
import { PostAuthor } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostAuthor className="wp-block-example-hero__author">
            <PostAuthor.Avatar className="wp-block-example-hero__author-avatar" />
            <PostAuthor.Name tagName="p" className="wp-block-example-hero__author-name" />
            <PostAuthor.FirstName tagName="span" className="wp-block-example-hero__author-first-name" />
            <PostAuthor.LastName className="wp-block-example-hero__author-last-name" />
            <PostAuthor.Bio className="wp-block-example-hero__author-bio" />
        </PostAuthor>
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `children` | `function\|node\|null`  | `null` |  |
| `...rest` | `object` | `{}` |  |

## Child Components

You can use this component in three different ways. Without any children it will just return some default markup containing the name of the author. Alternatively you can pass a render function as the children. This render function will get the author object passed into it. The third option is using the provided sub-components as shown in the example code. Each of these child component again automatically manages the data and allows you to just focus on the markup.

## Sub-Components

These are all the available sub-components of the `PostAuthor` component.

### `PostAuthor.Name`

Returns the full name of the Author

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `tagName` | `string` | `span` | the tag name that should be used for the element |
| `...rest` | `object` | `{}` |  |

### `PostAuthor.FirstName`

Returns the first name of the Author

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- |
-------------------------------------------------------------- |
| `tagName` | `string` | `span` | the tag name that should be used for the element |
| `...rest` | `object` | `{}` |  |

### `PostAuthor.LastName`

Returns the last name of the Author

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `tagName` | `string` | `span` | the tag name that should be used for the element |
| `...rest` | `object` | `{}` |  |

### `PostAuthor.Avatar`

Returns the avatar image of the Author

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `...rest` | `object` | `{}` |  |

### `PostAuthor.Bio`

Returns the bio of the Author

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `tagName` | `string` | `p` | the tag name that should be used for the element |
| `...rest` | `object` | `{}` |  |

### `PostAuthor.Email`

Returns the email of the Author

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `...rest` | `object` | `{}` |  |
