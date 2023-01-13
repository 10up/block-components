import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { RichTextCharacterLimit } from '@10up/block-components';
import metadata from './block.json';

registerBlockType( metadata, {
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
					placeholder={ __( 'Enter some text', 'example' ) }
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
