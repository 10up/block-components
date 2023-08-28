import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Placeholder } from '@wordpress/components';

import { ContentSearch } from '@10up/block-components';

export const BlockEdit = (props) => {
	const {
		setAttributes
	} = props;

	function handlePostSelection(post) {
		setAttributes({ selectedPost: post })
	}

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Post Searcher', 'example')}>
					<ContentSearch
						label={__('Select a Post or Page', 'example')}
						contentTypes={['page', 'post']}
						onSelectItem={handlePostSelection}
						fetchInitialResults
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Placeholder label={__('Post Searcher', 'example')} instructions={__('Use the text field to search for a post', 'example')}>
					<ContentSearch
						label={__('Select a Post or Page', 'example')}
						contentTypes={['page', 'post']}
						onSelectItem={handlePostSelection}
						fetchInitialResults
					/>
				</Placeholder>
			</div>
		</>
	)
}