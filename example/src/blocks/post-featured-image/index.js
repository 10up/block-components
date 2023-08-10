import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { PostFeaturedImage } from '@10up/block-components';

const NAMESPACE = 'example';

registerBlockType(`${NAMESPACE}/custom-post-featured-image`, {
	apiVersion: 2,
	title: __('Custom Post Featured Image', NAMESPACE),
	icon: 'format-image',
	category: 'common',
	example: {},
	supports: {
		html: false
	},
	attributes: {},
	transforms: {},
	variations: [],
	usesContext: ['postId', 'postType', 'queryId'],
	edit: ({ context }) => {
		const blockProps = useBlockProps();
		return (
			<figure {...blockProps}>
				<PostFeaturedImage context={context} className="wp-block-example-custom-post-featured-image__image" />
			</figure>
		)
	},
	save: () => null
});
