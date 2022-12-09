import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

export function usePost(blockContext = {}) {
	const { globalPostId, globalPostType } = useSelect(
		(select) => ({
			globalPostId: select(editorStore).getCurrentPostId(),
			globalPostType: select(editorStore).getCurrentPostType(),
		}),
		[],
	);

	return {
		postId: blockContext?.postId || globalPostId,
		postType: blockContext?.postType || globalPostType,
		isDescendentOfQueryLoop: !!Number.isFinite(blockContext?.queryId),
	};
}
