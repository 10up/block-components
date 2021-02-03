import { useSelect } from '@wordpress/data';

/**
 * useHasSelectedInnerBlock
 * Determine whether one of the inner blocks currently is selected
 *
 * @param {Object} {clientId} block props containing the client id
 * @returns {boolean} wether the block is the ancestor of selected blocks
 */
export function useHasSelectedInnerBlock({clientId}) {
	return useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true));
}
