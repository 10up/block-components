import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Flex } from '@wordpress/components';

import { Link } from '@10up/block-components';

export function BlockEdit(props) {
    const {
        attributes,
        setAttributes
    } = props;

    const { text, url, opensInNewTab, textTwo, urlTwo, opensInNewTabTwo, title } = attributes;

    const blockProps = useBlockProps();

    const handleTextChange = value => setAttributes({text: value});
    const handleLinkChange = value => setAttributes({
        url: value?.url,
        opensInNewTab: value?.opensInNewTab,
    });

    const handleTextChangeTwo = value => setAttributes({textTwo: value});
    const handleLinkChangeTwo = value => setAttributes({
        urlTwo: value?.url,
        opensInNewTabTwo: value?.opensInNewTab,
    });

    return (
        <div {...blockProps}>
            <RichText tagName='h2' value={title} onChange={value => setAttributes({title: value})} />
            <Flex gap={'1rem'} justify="flex-start">
                <Link 
                    value={text}
                    url={url}
                    opensInNewTab={opensInNewTab}
                    onTextChange={handleTextChange}
                    onLinkChange={handleLinkChange}
                    className='example-classname'
                    placeholder='Enter Link Text here...'
                />
                <Link 
                    value={textTwo}
                    url={urlTwo}
                    opensInNewTab={opensInNewTabTwo}
                    onTextChange={handleTextChangeTwo}
                    onLinkChange={handleLinkChangeTwo}
                    className='example-classname'
                    placeholder='Enter Link Text here...'
                />
            </Flex>
        </div>
    )
}