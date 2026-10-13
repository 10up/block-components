# `registerIcons`

The `registerIcons` function allows you to add icons to the global icons store so they become available in the [`IconPicker`](../../components/icon-picker/) component.

## Usage

```js
import { registerIcons } from '@10up/block-components';

registerIcons({
    name: 'example/theme',
    label: "Example",
    icons: [
        {
            source: '<svg>...</svg>'),
            name: "search",
            label: "Search"
        },
        {
            source: '<svg>...</svg>',
            name: "edit",
            label: "Edit"
        },
        ...
    ]
});
```

## Core icons (WordPress 7.1+)

WordPress 7.1 ships a core icon registry. Icons registered on the server with `wp_register_icon_collection()` and `wp_register_icon()` show up in the [`IconPicker`](../../components/icon-picker/) components without calling `registerIcons`, so a plugin that only needs its icons in the picker can register them in PHP alone.

`registerIcons` remains supported. When a set registered with it has the same name as a core icon collection, the registered set wins, so projects keep seeing exactly the icons they registered.
