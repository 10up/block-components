import { useEntityProp } from '@wordpress/core-data';
import { usePost } from '../../hooks';
import { Image } from '../image';

export const PostFeaturedImage = (props) => {
	const { postId, postType, isEditable } = usePost();
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
			canEditImage={isEditable}
			onSelect={handleImageSelect}
			{...props}
		/>
	);
};
