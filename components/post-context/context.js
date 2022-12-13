import { createContext } from '@wordpress/element';

const DEFAULT_POST_CONTEXT = {
	postId: null,
	postType: null,
	isEditable: null,
};

export const POST_CONTEXT = createContext(DEFAULT_POST_CONTEXT);
