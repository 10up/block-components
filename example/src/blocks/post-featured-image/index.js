import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import { BlockEdit } from './edit';

registerBlockType(metadata, {
	edit: BlockEdit,
	save: () => null
});
