import React from 'react';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Placeholder } from '@wordpress/components';

import { ContentSearch } from '@10up/block-components';

export const BlockEdit = (props) => {
	const {
		attributes: {selectedPost},
		setAttributes
	} = props;

	function handlePostSelection(post) {
		setAttributes({ selectedPost: post })
	}

	const queryFieldsFilter = useCallback((fields, mode) => {
		if (mode === 'post') {
			fields.push('excerpt');
		}
		return fields;
	}, []);

	const searchResultFilter = useCallback((item, result) => {
		return {
			...item,
			url: '',
			info: `<strong>ID:</strong> ${result.id}<br>${result.excerpt || ''}`,
		};
	}, []);

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
						queryFieldsFilter={queryFieldsFilter}
						searchResultFilter={searchResultFilter}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Placeholder label={__('Post Searcher', 'example')} instructions={__('Use the text field to search for a post', 'example')}>
				<div>
						{
							selectedPost &&
							<p>{__('Selected Post:', 'example')} {selectedPost.title}</p>
						}
					</div>
					<ContentSearch
						label={__('Select a Post or Page', 'example')}
						contentTypes={['page', 'post']}
						onSelectItem={handlePostSelection}
						fetchInitialResults
						queryFieldsFilter={queryFieldsFilter}
						searchResultFilter={searchResultFilter}
					/>
				</Placeholder>
			</div>
		</>
	)
}