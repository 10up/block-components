# `IconPicker`

![Icon Picker Demonstration](../../images/icon-picker.gif)

The `IconPicker` comes in a few different iterations. You can choose whether you want to use an `InlineIconPicker`, `IconPickerToolbarButton`, just the `IconPicker` itself, and also just an `Icon` component to display the icon that was picked.

## Usage

```js

import {
    IconPicker,
    IconPickerToolbarButton,
    InlineIconPicker,
} from '@10up/block-components';

export function BlockEdit(props) {
    const {
        attributes,
        setAttributes
    } = props;

    const { icon } = attributes;
    const blockProps = useBlockProps();

    const handleIconSelection = value => setAttributes({icon: { name: value.name, iconSet: value.iconSet }});

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <IconPickerToolbarButton value={icon} onChange={handleIconSelection} />
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__('Icon Settings')}>
                    <IconPicker value={icon} onChange={handleIconSelection} />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <InlineIconPicker value={icon} onChange={handleIconSelection} className="icon-preview"/>
                <h2 style={{marginTop: '0'}}>Hello World!</h2>
            </div>
        </>
    )
}
```

_The recommended approach for adding an icon picker to your custom block is using the `InlineIconPicker` as it delivers the best user experience._

In order to add icons to become available to the icon picker you need to use the
[`registerIcons`](../../api/register-icons/) function.

You can optionally include the `iconSet` property to the `IconPicker`,
`InlineIconPicker`, and `IconPickerToolbarButton` to limit the icons available
in the picker if necessary.

## Core icons (WordPress 7.1+)

On WordPress versions that ship the core Icons API, the icon components also show every icon registered on the server with `wp_register_icon_collection()` and `wp_register_icon()`, with no `registerIcons` call needed. They load through `@wordpress/core-data` (the `root/icon` and `root/iconCollection` entities), so the whole list arrives in one request.

- A core icon named `collection/icon-name` is stored like any other icon: `{ iconSet: 'collection', name: 'icon-name' }`. The name is split on the first `/`, so `a/b/c` becomes `{ iconSet: 'a', name: 'b/c' }`.
- `onChange` receives the same shape for core icons as for registered ones: `{ name, iconSet, label, source }`, where `source` is the icon's SVG markup.
- If an icon set is registered with `registerIcons` and core has a collection with the same name, the registered set wins and the core collection is hidden. Registered sets come first, core-only collections after them.
- Core strips the root `fill` from icon markup, so core icons get `fill="currentColor"` on their root `<svg>` and follow the text colour. Registered icons render exactly as registered.
- On WordPress without the core Icons API, or for users who can't read it, the components only show registered icons, as before.
