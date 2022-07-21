import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

import { useCharacterLimit } from '@10up/block-components';

const NAMESPACE = 'example';

registerBlockType( `${ NAMESPACE }/character-limit`, {
	apiVersion: 2,
    title: __( 'Character Limit', NAMESPACE ),
    description: __( 'Example Block to show the Character Limit in usage', NAMESPACE ),
    icon: 'smiley',
    category: 'common',
    example: {},
    supports: {
        html: false
    },
    attributes: {
        content: {
            type: 'string',
			default: ''
        }
    },
    edit: (props) => {
        const {
            attributes: { content },
            setAttributes
        } = props;

		const blockProps = useBlockProps();

		const {
			Counter,
		} = useCharacterLimit(content, 25);

        return (
            <div {...blockProps}>
				<RichText
					tagName="p"
					value={ content }
					onChange={ (value) => setAttributes( { content: value } ) }
					placeholder={ __( 'Enter some text', NAMESPACE ) }
				/>
				<Counter />
			</div>
        )
    },
    save: () => null
} );
