# `IconPicker`

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

In order to add icons to become available to the icon picker you need to use the [`registerIcons`](../../api/register-icons/) function.
