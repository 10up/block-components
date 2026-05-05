import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Placeholder, TextControl } from '@wordpress/components';

import { Counter } from '@10up/block-components';
import { useState } from '@wordpress/element';

export const BlockEdit = () => {
	const blockProps = useBlockProps();

	const [ text, setText ] = useState( '' );

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Counter', 'example')}>
					<TextControl
						label="Text"
						help="Enter some text"
						value={ text }
						onChange={
							( value ) => {
								if ( value.length > 20 ) {
									return;
								}
								setText( value );
							}
						}
					/>
					<Counter
						count={text.length}
						limit={20}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Placeholder label={__('Counter', 'example')} instructions={__('Counter component example', 'example')}>
					<TextControl
						label="Text"
						help="Enter some text"
						value={ text }
						onChange={
							( value ) => {
								if ( value.length > 20 ) {
									return;
								}
								setText( value );
							}
						}
					/>
					<Counter
						count={text.length}
						limit={20}
					/>
				</Placeholder>
			</div>
		</>
	)
}