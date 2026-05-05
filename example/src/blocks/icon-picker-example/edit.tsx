import React from 'react';
import { ToolbarGroup, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, useBlockProps } from '@wordpress/block-editor';

import {
    IconPicker,
    IconPickerToolbarButton,
    InlineIconPicker,
} from '@10up/block-components';

const limitedPaletteIconSet = 'example/limited-palette';

export function BlockEdit(props) {
    const {
        attributes,
        setAttributes
    } = props;

    const { icon, limitedPaletteIcon } = attributes;
    const blockProps = useBlockProps();

    const handleIconSelection = (value: {
        name: string;
        iconSet: string;
    }) => setAttributes({icon: { name: value.name, iconSet: value.iconSet }});

    const handleLPIconSelection = (value: {
        name: string;
        iconSet: string;
    }) => setAttributes({limitedPaletteIcon: { name: value.name, iconSet: value.iconSet }});

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <IconPickerToolbarButton value={icon} onChange={handleIconSelection} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <IconPickerToolbarButton value={limitedPaletteIcon} onChange={handleLPIconSelection} iconSet={limitedPaletteIconSet} label="Select Limited Palette Icon" />
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__('Icon Settings')}>
                    <IconPicker value={icon} onChange={handleIconSelection} />
                </PanelBody>
                <PanelBody title={__('Limited Palette Icon Settings')}>
                    <IconPicker value={limitedPaletteIcon} onChange={handleLPIconSelection} iconSet={limitedPaletteIconSet} />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <style>
                    {`.icon-preview > svg {
                        height: 60px;
                        width: 60px;
                    }`}
                </style>
                <p>Icon chosen from entire icon set:</p>
                <InlineIconPicker value={icon} onChange={handleIconSelection} className="icon-preview"/>
                <p>Icon chosen from limited icon set:</p>
                <InlineIconPicker value={limitedPaletteIcon} onChange={handleLPIconSelection} iconSet={limitedPaletteIconSet} className="icon-preview"/>
                <h2 style={{marginTop: '0'}}>Hello World!</h2>
            </div>
        </>
    )
}
