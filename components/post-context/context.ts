import { createContext, useContext } from '@wordpress/element';

export const DEFAULT_POST_CONTEXT: PostContextType = {
	postId: undefined,
	postType: undefined,
	isEditable: undefined,
};

export type PostContextType = {
	postId?: number;
	postType?: string;
	isEditable?: boolean;
}

export const PostContext = createContext<PostContextType>(DEFAULT_POST_CONTEXT);

export const usePostContext = () => {
	return useContext(PostContext);
};
