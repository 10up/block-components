# Post Meta

The `PostMeta` component is part of the suite of components that read/write data from the global post object or the current [`<PostContext />`](../post-context/). It has a composable declarative approach to allow you full control over the markup without needing to worry about the data handling at all.

The Component allows you to showcase any piece of post-meta information of the current post.

> **Warning**
> In order for the Meta Value to show up it needs to be registered properly and have `show_in_rest` set to `true`.

## Usage

```js
import { PostMeta } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostMeta metaKey="price" className="wp-block-example-block__price" />
    )
}
```

The component automatically tries to figure out the type of the meta value and dynamically displays either a text field, number control, or a toggle control.

If you want to override this automatic type casting you can use the sub-components which expose the underlying type controls.

> **Warning**
> Currently only `string`, `number`, `boolean` for `single` meta values are supported.

You can also completely customize the UI of the meta field by passing a [render function as the children](https://reactpatterns.js.org/docs/function-as-child-component/) of the `PostMeta` component:

```js
import { PostMeta } from '@10up/block-components';

function BlockEdit() {

    return (
        <PostMeta metaKey="price">
            {( price, setPrice ) => (
                <>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" value={price} onChange={setPrice} placeholder="10" />
                </>
            )}
        </PostMeta>
    )
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `metaKey` | `string` | `""` | name of the meta key |
| `...rest` | `object` | `{}` |  |

## Sub-components

This component contains a few sub-components which relate to the various types a piece of meta can be represented as.

### `PostMeta.String`

Control string meta values

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `metaKey` | `string` | `""` | name of the meta key |
| `tagName` | `string` | `p` | tagName to be used by the underlying RichText field |
| `...rest` | `object` | `{}` |  |

### `PostMeta.Number`

Control number meta values

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `metaKey` | `string` | `""` | name of the meta key |
| `label` | `string` | `""` | Label to be added to the NumberControl |
| `...rest` | `object` | `{}` |  |

### `PostMeta.Boolean`

Control boolean meta values

#### Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `metaKey` | `string` | `""` | name of the meta key |
| `label` | `string` | `""` | Label to be added to the ToggleControl |
| `...rest` | `object` | `{}` |  |
