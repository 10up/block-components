import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import { BlockEdit } from './edit';
import metadata from './block.json';

registerBlockType(metadata, {
	edit: BlockEdit,
	save: () => <InnerBlocks.Content />,
});
