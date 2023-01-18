import { useSelect } from '@wordpress/data';
// @ts-ignore
import { useBlockEditContext, store as blockEditorStore } from '@wordpress/block-editor';

/**
 * useHasSelectedInnerBlock
 * Determine whether one of the inner blocks currently is selected
 *
 * @returns {boolean} wether the block is the ancestor of selected blocks
 */
export function useHasSelectedInnerBlock(): boolean {
	const { clientId } = useBlockEditContext();

	return useSelect((select) => select(blockEditorStore).hasSelectedInnerBlock(clientId, true), [ clientId ]);
}