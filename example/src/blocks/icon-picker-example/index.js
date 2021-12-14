import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import {} from '@wordpress/icons';

import { IconPicker, Icon, IconPickerToolbarButton, InlineIconPicker, IconPickerSelectControl, registerIcons } from '@10up/block-components';

const NAMESPACE = 'example';

registerIcons({
    name: 'example/theme',
    label: "Example",
    icons: [
        {
            source: "...",
            name: "test1",
            label: "Test 1"
        },
        {
            source: "...",
            name: "test2",
            label: "Test 2"
        },
        {
            source: "...",
            name: "test3",
            label: "Test 3"
        },
        {
            source: "...",
            name: "test4",
            label: "Test 4"
        },
    ]
});

registerBlockType( `${ NAMESPACE }/icon-picker-example`, {
    title: __( 'Icon Picker Example', NAMESPACE ),
    description: __( 'Example Block to show the Icon Picker in usage', NAMESPACE ),
    icon: 'smiley',
    category: 'common',
    example: {},
    supports: {
        html: false
    },
    attributes: {},
    transforms: {},
    variations: [],
    edit: (props) => {
        const {
            attributes,
            setAttributes
        } = props;

        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <h2>Hello World!</h2>
            </div>
        )
    },
    save: () => null
} );
