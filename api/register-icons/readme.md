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
