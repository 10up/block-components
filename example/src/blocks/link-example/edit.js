import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import { Link } from '@10up/block-components';

export function BlockEdit(props) {
    const {
        attributes,
        setAttributes
    } = props;

    const { text, url, opensInNewTab } = attributes;

    const blockProps = useBlockProps();

    const handleTextChange = value => setAttributes({text: value});
    const handleLinkChange = value => setAttributes({
        url: value?.url,
        opensInNewTab: value?.opensInNewTab,
        text: value?.title ?? text
    });

    return (
        <div {...blockProps}>
            <h2>Hello World!</h2>
            <Link 
                value={text}
                url={url}
                opensInNewTab={opensInNewTab}
                onTextChange={handleTextChange}
                onLinkChange={handleLinkChange}
                className='example-classname'
                placeholder='Enter Link Text here...'
            />
        </div>
    )
}