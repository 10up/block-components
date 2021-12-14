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
```js

// get all available icon sets
select('tenup/icons').getIconSets();
/*
response:
[
    { name: 'example/theme', label: 'Example' icons: [] },
    { name: 'core/dashicons', label: 'Dashicons' icons: [] },
]
*/

// get one icon set by name
select('tenup/icons').getIconSet( 'core/dashicons' );
/*
response:
{
    name: 'core/dashicons',
    label: 'Dashicons'
    icons: []
}
*/


// get icons by iconSet
select('tenup/icons').getIcons( 'core/dashicons' );
/*
response:
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
*/

// get icon by iconSet
select('tenup/icons').getIcon( 'core/dashicons', 'smiley' );
/*
response:
{
    source: "...",
    name: "...",
    label: "..."
}
*/

```
