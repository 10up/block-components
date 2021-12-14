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
    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <IconPickerToolbarButton value={icon} onChange={ value => setAttributes({icon: { name: value.name, iconSet: value.iconSet }}) } />
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__('Icon Settings')}>
                    <IconPicker value={icon} onChange={ value => setAttributes({icon: { name: value.name, iconSet: value.iconSet }}) } />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <h2><IconPreview />Hello World!</h2>
            </div>
        </>
    )
}