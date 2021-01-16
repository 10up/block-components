import { useSelect } from '@wordpress/data';

/**
 * check wether the block to check has any children that match the clientID of the selected block
 *
 * @param {WPBlock} selectedBlock Block object of the currently selected block
 * @param {string} clientId Client ID of the block to check
 * @return {boolean} Wether or not a child block is selected
 */
function hasSelectedInnerBlock(selectedBlock, clientId) {
	const { innerBlocks } = useSelect((select) =>
		select('core/block-editor').getBlock(clientId),
	);

	let isChildSelected = false;

	innerBlocks.forEach((innerBlock) => {
		if (selectedBlock.clientId === innerBlock.clientId) {
			isChildSelected = true;
		}

		if (innerBlock.innerBlocks.length) {
			isChildSelected = hasSelectedInnerBlock(selectedBlock, innerBlock.clientId);
		}
	});

	return isChildSelected;
}

/**
 * useHasSelectedInnerBlock
 * Determine wether one of the inner blocks currently is selected
 *
 * @param {WPBlock} block Block object to with children
 * @return {boolean} wether or not any children are selected.
 */
export function useHasSelectedInnerBlock(block) {
	try {
		const selectedBlock = useSelect((innerSelect) =>
			innerSelect('core/block-editor').getSelectionStart(),
		);

		return hasSelectedInnerBlock(selectedBlock, block.clientId);
	} catch (error) {
		return false;
	}
}