import { useEntityProp } from '@wordpress/core-data';
import PropTypes from 'prop-types';
import { usePost } from '../../hooks';
import { Image } from '../image';

export const PostFeaturedImage = (props) => {
	const { context, ...rest } = props;
	const { postId, postType, isDescendentOfQueryLoop } = usePost(context);
	const [featuredImage, setFeaturedImage] = useEntityProp(
		'postType',
		postType,
		'featured_media',
		postId,
	);

	const handleImageSelect = (image) => {
		setFeaturedImage(image.id);
	};

	return (
		<Image
			id={featuredImage}
			canEditImage={!isDescendentOfQueryLoop}
			onSelect={handleImageSelect}
			{...rest}
		/>
	);
};

PostFeaturedImage.propTypes = {
	context: PropTypes.object,
};

PostFeaturedImage.defaultProps = {
	context: {},
};
