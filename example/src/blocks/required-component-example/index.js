import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { Required } from '@10up/block-components';

const NAMESPACE = 'example';

registerBlockType( `${ NAMESPACE }/required-component-example`, {
	apiVersion: 2,
	title: __( 'Required Component Example', NAMESPACE ),
	icon: 'smiley',
	category: 'common',
	example: {},
	supports: {
		html: false
	},
	attributes: {
		fname: {
			type: 'string',
			default: '',
		},
		lname: {
			type: 'string',
			default: ''
		}
	},
	transforms: {},
	variations: [],
	edit: ( { attributes, setAttributes, isSelected } ) => {
		const blockProps = useBlockProps();
		const { fname, lname } = attributes;

		return (
			<div {...blockProps}>
				<Required value={ fname }>
					<TextControl
						label="First name"
						value={ fname }
						onChange={ ( val ) => setAttributes( { fname: val } ) }
					/>
				</Required>
				<Required value={ lname }>
					<TextControl
						label="Last name"
						value={ lname }
						onChange={ ( val ) => setAttributes( { lname: val } ) }
					/>
				</Required>
			</div>
		)
	},
	save: () => null
} );
