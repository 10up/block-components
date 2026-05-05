import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { box } from '@wordpress/icons';

import { toSentence } from './utils';
import metadata from './block.json';
import { BlockEdit } from './edit';

registerBlockType(metadata, {
	icon: box,
	edit: BlockEdit,
	save: () => null
})

let availableKeys = [
	"author",
	"isbn",
	"price",
	"is_featured",
];

const newVariations = availableKeys.map(metaKey => ({
	title: toSentence(metaKey) + ' - Meta',
	description: `Displays the value of the meta key: "${metaKey}"`,
	name: metaKey,
	scope: ['inserter', 'block'],
	attributes: {
		metaKey: metaKey
	},
	isActive: ['metaKey']
}));

registerBlockVariation('example/post-meta', newVariations);
