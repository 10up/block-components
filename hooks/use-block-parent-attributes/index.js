import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore, useBlockEditContext } from '@wordpress/block-editor';

/**
 * useBlockParentAttributes
 *
 * allows you to easily interface with the attributes of the direct
 * parent of the current block
 *
 * @typedef {object} BlockAttributes - Attributes of the blocks parent
 * @typedef {Function} BlockAttributeSetter - Setter function for the blocks parent attributes
 * @typedef {[BlockAttributes, BlockAttributeSetter]} BlockParentAttributesTuple
 *
 * @returns {BlockParentAttributesTuple} - the attributes of the direct parent of the current block and a function to update the attributes
 */
export function useBlockParentAttributes() {
	const { clientId } = useBlockEditContext();
	const parentBlocks = useSelect((select) => select(blockEditorStore).getBlockParents(clientId));
	const parentBlockClientId = parentBlocks[parentBlocks.length - 1];

	const parentBlock = useSelect((select) =>
		select(blockEditorStore).getBlock(parentBlockClientId),
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	const setParentAttributes = (attributes) => {
		updateBlockAttributes(parentBlockClientId, attributes);
	};

	return [parentBlock?.attributes ?? {}, setParentAttributes];
}
