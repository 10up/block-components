# Post Date

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
