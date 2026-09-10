# `registerIcons`

The `registerIcons` function allows you to add icons to the global icons store so they become available in the [`IconPicker`](../../components/icon-picker/) component.

> **Legacy:** On WordPress 7.1 and above, prefer registering icons on the server with [`wp_register_icon()`](https://make.wordpress.org/core/2026/07/24/registering-and-rendering-svg-icons-in-wordpress-7-1/). Server registration gives you kses sanitization and REST exposure, and the [`IconPicker`](../../components/icon-picker/) reads those icons from the core icon store automatically (see the [`useIcons`](../../hooks/use-icons/) hook). `registerIcons` remains supported for back-compat and for WordPress below 7.1; icons it registers win over a core-registered icon of the same name.

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
