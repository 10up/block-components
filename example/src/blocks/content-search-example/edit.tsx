import React from 'react';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Placeholder } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';

import { ContentSearch } from '@10up/block-components';

/**
 * Example search result customization that uses embedded data to display the
 * post date.
 */
const renderItemType = ( props ) => {
	const { type, subtype, embedded } = props;
	const { date } = embedded?.self?.[ 0 ] ?? {};
	const postDate = new Date( Date.parse( date ) );

	return (
		<>
			{ subtype ? subtype : type }
			<br />
			<small>{ postDate.toLocaleDateString() }</small>
		</>
	);
};

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

	/**
	 * Example query string filter that returns results in reverse chronological
	 * order.
	 */
	const queryFilter = ( query ) => {
		return addQueryArgs( query, {
			orderby: 'date',
			order: 'desc',
		} );
	};

	const ContentSearchControl = () => (
		<ContentSearch
			label={__('Select a Post or Page', 'example')}
			contentTypes={['page', 'post']}
			onSelectItem={handlePostSelection}
			queryFilter={queryFilter}
			queryFieldsFilter={queryFieldsFilter}
			searchResultFilter={searchResultFilter}
			includeEmbeds="self"
			renderItemType={renderItemType}
			fetchInitialResults
		/>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Post Searcher', 'example')}>
					<ContentSearchControl />
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Placeholder label={__('Post Searcher', 'example')} instructions={__('Use the text field to search for a post', 'example')}>
					<div>
						{ selectedPost && (
							<p>{__('Selected Post:', 'example')} {selectedPost.title}</p>
						) }
					</div>
					<ContentSearchControl />
				</Placeholder>
			</div>
		</>
	)
}
