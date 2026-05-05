import { useSelect } from '@wordpress/data';
// @ts-ignore-next-line - The type definitions for the block-editor package are incomplete.
import { useBlockEditContext, store as blockEditorStore } from '@wordpress/block-editor';

/*
 * useHasSelectedInnerBlock
 * Determine whether one of the inner blocks currently is selected
 */
export function useHasSelectedInnerBlock(): boolean {
	const { clientId } = useBlockEditContext();

	return useSelect(
		// @ts-ignore-next-line - The type definitions for the core store are incomplete.
		(select) => select(blockEditorStore).hasSelectedInnerBlock(clientId, true),
		[clientId],
	);
}
