import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { PostTitle } from '@10up/block-components';

const NAMESPACE = 'example';

registerBlockType( `${ NAMESPACE }/custom-post-title`, {
	apiVersion: 2,
    title: __( 'Custom Post Title', NAMESPACE ),
    icon: 'smiley',
    category: 'common',
    example: {},
    supports: {
        html: false
    },
    attributes: {},
    transforms: {},
    variations: [],
	usesContext: [ 'postId', 'postType', 'queryId' ],
    edit: ({context}) => {
		const blockProps = useBlockProps();
        return (
            <div {...blockProps}>
				<PostTitle context={context} />
			</div>
        )
    },
    save: () => null
} );
