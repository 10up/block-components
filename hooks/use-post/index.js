import { useSelect } from '@wordpress/data';
import { useContext } from '@wordpress/element';
import { store as editorStore } from '@wordpress/editor';
import { POST_CONTEXT } from '../../components/post-context/context';

export function usePost() {
	const {
		postId: blockContextPostId,
		postType: blockContextPostType,
		isEditable: blockContextIsEditable,
	} = useContext(POST_CONTEXT);

	const { globalPostId, globalPostType } = useSelect(
		(select) => ({
			globalPostId: select(editorStore).getCurrentPostId(),
			globalPostType: select(editorStore).getCurrentPostType(),
		}),
		[],
	);

	return {
		postId: blockContextPostId || globalPostId,
		postType: blockContextPostType || globalPostType,
		isEditable: blockContextPostId && blockContextPostType ? blockContextIsEditable : true,
	};
}
