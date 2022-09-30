import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { RichTextCharacterLimit } from '../../../../components/rich-text-character-limit';

const NAMESPACE = 'example';

registerBlockType( `${ NAMESPACE }/rich-text-character-limit`, {
	apiVersion: 2,
	title: __( 'Rich Text Character Limit', NAMESPACE ),
	description: __( 'Example Block to show the Rich Text Character Limit in usage', NAMESPACE ),
	icon: 'smiley',
	category: 'common',
	example: {},
	supports: {
		html: false
	},
	attributes: {
		title: {
			type: 'string',
			default: ''
		}
	},
	edit: (props) => {
		const {
			attributes: { title },
			setAttributes
		} = props;

		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<RichTextCharacterLimit
					limit={30}
					enforce={true}
					tagName="h2"
					value={title}
					placeholder={ __( 'Enter some text', NAMESPACE ) }
					onChange={(title) => setAttributes({title})}
					allowedFormats={[
						'core/bold',
						'core/link'
					]}
				/>
			</div>
		)
	},
	save: () => null
} );
