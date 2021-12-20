import { ToolbarGroup, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, useBlockProps } from '@wordpress/block-editor';

import {
    IconPicker,
    Icon,
    IconPickerToolbarButton,
    InlineIconPicker,
    IconPickerSelectControl,
} from '@10up/block-components';

export function BlockEdit(props) {
    const {
        attributes,
        setAttributes
    } = props;

    const { icon } = attributes;
    const blockProps = useBlockProps();
    const IconPreview = () => icon?.name && icon?.iconSet ? <Icon name={icon?.name} iconSet={icon?.iconSet} /> : null;

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
                <style>
                    {`.icon-preview > svg {
                        height: 60px;
                        width: 60px;
                    }`}
                </style>
                <InlineIconPicker value={icon} onChange={handleIconSelection} className="icon-preview"/>
                <h2 style={{marginTop: '0'}}>Hello World!</h2>
            </div>
        </>
    )
}