import { useEntityProp } from '@wordpress/core-data';
import { usePost } from '../../hooks';
import { Image } from '../image';

interface PostFeaturedImageProps
	extends Omit<React.ComponentProps<typeof Image>, 'id' | 'onSelect' | 'canEditImage'> {}

export const PostFeaturedImage = (props: PostFeaturedImageProps) => {
	const { postId, postType, isEditable } = usePost();
	const [featuredImage, setFeaturedImage] = useEntityProp(
		'postType',
		postType,
		'featured_media',
		postId as string,
	);

	const handleImageSelect = (image: { id: string }) => {
		setFeaturedImage(image.id);
	};

	return (
		<Image
			id={featuredImage}
			canEditImage={isEditable as boolean}
			onSelect={handleImageSelect}
			{...props}
		/>
	);
};
