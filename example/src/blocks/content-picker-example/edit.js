import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Placeholder } from '@wordpress/components';

import { ContentPicker } from '@10up/block-components';

export const BlockEdit = (props) => {
	const {
		attributes: {selectedPosts},
		setAttributes
	} = props;

	function handlePostSelection(posts) {
		setAttributes({ selectedPosts: posts })
	}

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content Picker', 'example')}>
					<ContentPicker
						label={__('Select a Post or Page', 'example')}
						contentTypes={['page', 'post']}
						onPickChange={handlePostSelection}
						fetchInitialResults
						value={selectedPosts}
						content={selectedPosts}
						maxContentItems={5}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Placeholder label={__('Content Picker', 'example')} instructions={__('Use the text field to search for a post', 'example')}>
					<ContentPicker
						label={__('Select a Post or Page', 'example')}
						contentTypes={['page', 'post']}
						onPickChange={handlePostSelection}
						fetchInitialResults
						value={selectedPosts}
						content={selectedPosts}
						maxContentItems={5}
					/>
				</Placeholder>
			</div>
		</>
	)
}