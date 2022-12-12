# PostTermList

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

### `PostTermList.ListItem`

### `PostTermList.TermLink`
