import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import { header } from '@wordpress/icons';

import { BlockEdit } from './edit';

registerBlockType(metadata, {
	icon: header,
	edit: BlockEdit,
	save: () => null
});
