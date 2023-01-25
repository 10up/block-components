# PostTermList

The `PostTermList` component is part of the suite of components that read/write data from the global post object or the current [`<PostContext />`](../post-context/). It has a composable declarative approach to allow you full control over the markup without needing to worry about the data handling at all.

The Component allows you to showcase a list of the selected terms of the provided taxonomy of the current post.

## Usage

```js
import { PostTermList } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostTermList taxonomyName="category" className="wp-block-example-hero__categories">
            <PostTermList.ListItem className="wp-block-example-hero__category">
                <PostTermList.TermLink className="wp-block-example-hero__category-link" />
            </PostTermList.ListItem>
        </PostTermList>
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
| `taxonomyName` | `string` | `category` |  |
| `tagName` | `string` | `ul` |  |
| `...rest` | `object` | `{}` |  |

## Child Components

You can use this component in three different ways. Without any children it will just return some default markup containing the name of the term. Alternatively you can pass a render function as the children. This render function will get the term object passed into it. The third option is using the provided sub-components as shown in the example code. Each of these child component again automatically manages the data and allows you to just focus on the markup.

## Sub-Components

These are all the available sub-components of the `PostTermList` component.

### `PostTermList.ListItem`

Returns the list item markup

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `tagName` | `string` | `li` | the tag name that should be used for the element |
| `...rest` | `object` | `{}` |  |

### `PostTermList.TermLink`

Returns the anchor element containing the title of the term

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `...rest` | `object` | `{}` |  |
