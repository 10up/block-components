import { createContext, useContext } from '@wordpress/element';

interface PostContextProps {
	/**
	 * The ID of the post.
	 */
	postId?: number;

	/**
	 * The type of the post.
	 */
	postType?: string;

	/**
	 * Whether the post is editable.
	 */
	isEditable?: boolean;
}

export const DEFAULT_POST_CONTEXT = {
	postId: undefined,
	postType: undefined,
	isEditable: undefined,
};

export const PostContext = createContext<PostContextProps>(DEFAULT_POST_CONTEXT);

export const usePostContext = () => {
	return useContext(PostContext);
};
