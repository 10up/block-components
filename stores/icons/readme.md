# `tenup/icons` data store

The data store for `tenup/icons` stores icons in this shape:

```js
{
    iconSets: {
        'example/theme': {
            label: 'Example',
            icons: [
                {
                    source: "...",
                    name: "...",
                    label: "..."
                },
                {
                    source: "...",
                    name: "...",
                    label: "..."
                }
            ]
        },
        'core/dashicons': {
            label: 'Dashicons',
            icons: [
                {
                    source: "...",
                    name: "...",
                    label: "..."
                },
                {
                    source: "...",
                    name: "...",
                    label: "..."
                }
            ]
        }
    }
}
```

## Available selectors:
You can access the Icons datastore using the `tenup/icons` namespace or by importing `iconStore` from `@10up/block-components`;
```js
import { iconStore } from '@10up/block-components';

select(iconStore).getIconSets();
```

### Get all available Icon Sets
```js
select('tenup/icons').getIconSets();
```
response:
```js
[
    { name: 'example/theme', label: 'Example' icons: [] },
    { name: 'core/dashicons', label: 'Dashicons' icons: [] },
]
```

### Get an Icon Set by name
```js
select('tenup/icons').getIconSet( 'core/dashicons' );
```
response:
```js
{
    name: 'core/dashicons',
    label: 'Dashicons'
    icons: []
}
```

### Get all icons from an Icon Set
```js
select('tenup/icons').getIcons( 'core/dashicons' );
```
response:
```js
[
    {
        source: "...",
        name: "...",
        label: "..."
    },
    {
        source: "...",
        name: "...",
        label: "..."
    }
]
```

### Get Singular Icon from an Icon Set
```js
select('tenup/icons').getIcon( 'core/dashicons', 'smiley' );
```
response:
```js
{
    source: "...",
    name: "...",
    label: "..."
}
```
