# `useIcon` & `useIcons`

The `useIcon` and `useIcons` hooks allows you to easily get any registered icons. With `useIcon` you need to provide the name of the iconSet and the name of the icon and you get the icon object in return.

The `useIcons` hook on the other hand allows you to either get all available icons of all iconSets, or allows you to pass in the name of the iconSet you want and then only returns you an array containing all the icons within that iconSet.

## Usage

```js
import { useIcon } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes } = props;
    const { iconName, iconSet } = attributes;

    const icon = useIcon( iconSet, iconName );

    return ( 
        <div dangerouslySetInnerHTML={{ __html: icon.source }} />
    );
}
```

_Note: Instead of using the `useIcon` hook it is recommended to use the [`Icon`](../../components/icon-picker/) Component which uses the `useIcon` hook under the hood._

## Core icon store

On WordPress 7.1 and above both hooks also read the core icon store (the `root/icon` REST entity registered by `wp_register_icon`) and merge those icons on top of the ones registered with [`registerIcons`](../../api/register-icons/). Each core record is flattened to the same `{ source, name, label, iconSet }` shape, with its `<collection>/` prefix stripped from the name and its collection used as the `iconSet`.

Merging is deduped by `iconSet` + `name`, and the internal store wins on a collision, so an explicit `registerIcons` entry overrides a core-registered icon of the same name. On WordPress below 7.1 the `root/icon` entity is absent, so the hooks fall back to the internal store alone. No configuration is required.
