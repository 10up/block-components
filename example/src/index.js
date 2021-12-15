import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Placeholder } from '@wordpress/components';

import { ContentPicker, SelectedPostPreview } from '@10up/block-components';
import { Link } from '@10up/block-components';

const NAMESPACE = 'example';

registerBlockType(`${NAMESPACE}/hello-world`, {
    title: __('Hello World', NAMESPACE),
    description: __('Example Block to show the Post Picker in usage', NAMESPACE),
    icon: 'smiley',
    category: 'common',
    example: {},
    supports: {
        html: false
    },
    attributes: {
        url: {
            type: 'string',
            default: '#'
        },
        opensInNewTab: {
            type: 'boolean',
            default: false
        },
        title: {
            type: 'string',
            default: 'link'
        },
        text: {
            type: 'string'
        },
    },
    transforms: {},
    variations: [],
    edit: (props) => {
        const {
            className,
            attributes: { url, opensInNewTab, title },
            setAttributes
        } = props;

        const handleLinkChange = (link) => {
            setAttributes({...link});
        }

        return (
            <>
                <Link onTextChange={(text) => { setAttributes({text}) }} opensInNewTab={opensInNewTab} onLinkChange={handleLinkChange} value={title} url={url} />
            </>
        )
    },
    save: () => null
});
