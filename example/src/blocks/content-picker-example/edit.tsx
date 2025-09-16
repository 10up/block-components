import React from 'react';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Placeholder } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';

import { ContentPicker } from '@10up/block-components';

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
			<time datetime={ postDate.toISOString() }>{ postDate.toLocaleDateString() }</time>
		</>
	);
};

export const BlockEdit = (props) => {
	const {
		attributes: {selectedPosts},
		setAttributes
	} = props;

	function handlePostSelection(posts) {
		setAttributes({ selectedPosts: posts })
	}

	const queryFieldsFilter = useCallback((fields, mode) => {
		if (mode === 'post') {
			fields.push('excerpt');
		}
		return fields;
	}, []);

	const searchResultFilter = useCallback((item, result) => {
		const info = `<strong>ID:</strong> ${result.id}<br>${result.excerpt || ''}`;
		return { ...item, url: '', info };
	}, []);

	const pickedItemFilter = useCallback((item, result) => {
		const info = `<strong>ID:</strong> ${result.id}`;
		return {...item, url: '', info };
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

	const ContentPickerControl = () => (
		<ContentPicker
			label={__('Select a Post or Page', 'example')}
			contentTypes={['page', 'post']}
			onPickChange={handlePostSelection}
			content={selectedPosts}
			maxContentItems={5}
			queryFilter={queryFilter}
			queryFieldsFilter={queryFieldsFilter}
			searchResultFilter={searchResultFilter}
			pickedItemFilter={pickedItemFilter}
			includeEmbeds="self"
			renderItemType={renderItemType}
			fetchInitialResults
		/>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content Picker', 'example')}>
					<ContentPickerControl />
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Placeholder label={__('Content Picker', 'example')} instructions={__('Use the text field to search for a post', 'example')}>
					<ContentPickerControl />
				</Placeholder>
			</div>
		</>
	)
}
