import { useSelect, useDispatch } from '@wordpress/data';
// @ts-ignore-next-line - The type definitions for the block-editor package are incomplete.
import { store as blockEditorStore, useBlockEditContext } from '@wordpress/block-editor';

/*
 * useBlockParentAttributes
 *
 * allows you to easily interface with the attributes of the direct
 * parent of the current block
 */
export function useBlockParentAttributes() {
	const { clientId } = useBlockEditContext();
	const parentBlocks = useSelect(
		// @ts-ignore-next-line - The type definitions for the core store are incomplete.
		(select) => select(blockEditorStore).getBlockParents(clientId),
		[clientId],
	);
	const parentBlockClientId = parentBlocks[parentBlocks.length - 1];

	const parentBlock = useSelect(
		// @ts-ignore-next-line - The type definitions for the core store are incomplete.
		(select) => select(blockEditorStore).getBlock(parentBlockClientId),
		[parentBlockClientId],
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	const setParentAttributes = (attributes: { [key: string]: unknown }) => {
		updateBlockAttributes(parentBlockClientId, attributes);
	};

	return [(parentBlock?.attributes as Object) ?? {}, setParentAttributes] as const;
}
