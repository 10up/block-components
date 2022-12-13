import { createContext, useContext } from '@wordpress/element';

export const DEFAULT_POST_CONTEXT = {
	postId: null,
	postType: null,
	isEditable: null,
};

export const POST_CONTEXT = createContext(DEFAULT_POST_CONTEXT);

export const usePostContext = () => {
	return useContext(POST_CONTEXT);
};
