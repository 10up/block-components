import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { PostFeaturedImage } from '@10up/block-components';

export const BlockEdit = ({ context }) => {
	const blockProps = useBlockProps();
	return (
		<figure {...blockProps}>
			<PostFeaturedImage context={context} className="wp-block-example-custom-post-featured-image__image" />
		</figure>
	)
};