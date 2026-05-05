import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Placeholder } from '@wordpress/components';

import {ContentPicker} from '@10up/block-components';

export const BlockEdit = (props) => {
	const {
		attributes: { selectedPost },
		setAttributes
	} = props;

	function handlePostSelection( post ) {
		setAttributes( { selectedPost: post } )
	}

	const blockProps = useBlockProps();

	return (
		<>
		<InspectorControls>
			<PanelBody title={ __( 'Post Picker', 'example' ) }>
				<ContentPicker
					label={ __( 'Select a Post or Page', 'example' ) }
					onPickChange={ handlePostSelection }
					content={ selectedPost }
					maxContentItems={5}
					isOrderable={true}
				/>
			</PanelBody>
		</InspectorControls>
		<div {...blockProps}>
			<Placeholder label={ __( 'Post Picker', 'example' ) } instructions={ __( 'Use the text field to search for a post', 'example') }>
				<ContentPicker 
					label={ __( 'Select a Post or Page', 'example' ) }
					onPickChange={ handlePostSelection }
					content={ selectedPost }
					perPage={ 3 }
					maxContentItems={ 5 }
					isOrderable={ true }
				/>
			</Placeholder>
		</div>
		</>
	)
}