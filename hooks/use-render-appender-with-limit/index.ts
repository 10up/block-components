import { useSelect } from '@wordpress/data';
import {
	store as blockEditorStore,
	useBlockEditContext,
	InnerBlocks,
} from '@wordpress/block-editor';

export function useRenderAppenderWithLimit(limit: number, buttonAppender = false) {
	const { clientId } = useBlockEditContext();
	const appenderType = buttonAppender
		? InnerBlocks.ButtonBlockAppender
		: InnerBlocks.DefaultBlockAppender;

	return useSelect(
		(select) => {
			// @ts-expect-error - TS doesn't know about the block editor store
			const { innerBlocks } = select(blockEditorStore).getBlock(clientId);
			const numberOfInnerBlocks = innerBlocks.length;
			const shouldRenderAppender = numberOfInnerBlocks < limit;
			return shouldRenderAppender ? appenderType : false;
		},
		[clientId, limit],
	);
}
