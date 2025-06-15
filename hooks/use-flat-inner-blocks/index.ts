import { store as blockEditorStore } from '@wordpress/block-editor';
import type { WPBlock } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

export const useFlatInnerBlocks = (clientId: string) => {
	return useSelect(
		(select) => {
			function recursivelyGetInnerBlocks(clientId: string) {
				let allInnerBlocks: Array<WPBlock> = [];

				// @ts-expect-error - TS doesn't know about the block editor store
				const innerBlocks = select(blockEditorStore).getBlocks(clientId);

				innerBlocks.forEach((block: WPBlock) => {
					allInnerBlocks.push(block);
					allInnerBlocks = allInnerBlocks.concat(
						recursivelyGetInnerBlocks(block.clientId),
					);
				});

				return allInnerBlocks;
			}

			return recursivelyGetInnerBlocks(clientId);
		},
		[clientId],
	);
};
