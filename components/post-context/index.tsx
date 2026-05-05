import { useMemo } from '@wordpress/element';
import { PostContext as PostContextContext } from './context';

interface PostContextProps {
	/**
	 * The ID of the post.
	 */
	postId: number;

	/**
	 * The type of the post.
	 */
	postType: string;

	/**
	 * Whether the post is editable.
	 */
	isEditable?: boolean;

	/**
	 * The children to render.
	 */
	children: React.ReactNode;
}

export const PostContext = ({
	children,
	postId,
	postType,
	isEditable = false,
}: PostContextProps) => {
	const value = useMemo(
		() => ({
			postId,
			postType,
			isEditable,
		}),
		[postId, postType, isEditable],
	);

	return <PostContextContext.Provider value={value}>{children}</PostContextContext.Provider>;
};
