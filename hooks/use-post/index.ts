import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { usePostContext } from '../../components/post-context/context';

export function usePost() {
	const {
		postId: blockContextPostId,
		postType: blockContextPostType,
		isEditable: blockContextIsEditable,
	} = usePostContext();

	const { globalPostId, globalPostType } = useSelect(
		(select) => ({
			globalPostId: select(editorStore).getCurrentPostId(),
			globalPostType: select(editorStore).getCurrentPostType(),
		}),
		[],
	);

	const hasBlockContext = !!blockContextPostId && !!blockContextPostType;

	return {
		postId: (blockContextPostId || globalPostId) as number | null,
		postType: (blockContextPostType || globalPostType) as string,
		isEditable: (hasBlockContext ? blockContextIsEditable : true) as boolean | null,
	};
}
