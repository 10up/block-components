import { createContext, useContext } from '@wordpress/element';

export const DEFAULT_POST_CONTEXT = {
	postId: null,
	postType: null,
	isEditable: null,
};

export const PostContext = createContext(DEFAULT_POST_CONTEXT);

export const usePostContext = () => {
	return useContext(PostContext);
};
