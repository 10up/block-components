import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Flex } from '@wordpress/components';

import { Link, Repeater } from '@10up/block-components';

export function BlockEdit() {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
			<Repeater attribute='links' >
				{(item = {}, index, setItem) => {
					const { text, url, opensInNewTab } = item;

					const handleTextChange = value => setItem({text: value});
					const handleLinkChange = value => setItem({
						url: value?.url,
						opensInNewTab: value?.opensInNewTab,
					});
				

					return (
						<Link 
							value={text}
							url={url}
							opensInNewTab={opensInNewTab}
							onTextChange={handleTextChange}
							onLinkChange={handleLinkChange}
							className='example-classname'
							placeholder='Enter Link Text here...'
						/>
					);
				}}
			</Repeater>
        </div>
    )
}