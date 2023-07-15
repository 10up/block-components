import { registerBlockType, registerBlockVariation, store as blocksStore, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import {
	useBlockProps, __experimentalBlockVariationPicker as BlockVariationPicker, store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { PostMeta } from '@10up/block-components';
import { box } from '@wordpress/icons';

// Checks whether character is Uppercase.
// Crude version. Checks only A-Z.
function isCaps(char) {
	if (char.match(/[A-Z]/)) return true;
	return false;
}

// Checks whether character is digit.
function isDigit(char) {
	if (char.match(/[0-9]/)) return true;
	return false;
}

export function toKebab(string) {
	return string
		.split('')
		.map((letter, index) => {
			const previousLetter = string[index - 1] || '';
			const currentLetter = letter;

			if (isDigit(currentLetter) && !isDigit(previousLetter)) {
				return `-${currentLetter}`;
			}

			if (!isCaps(currentLetter)) return currentLetter;

			if (previousLetter === '') {
				return `${currentLetter.toLowerCase()}`;
			}

			if (isCaps(previousLetter)) {
				return `${currentLetter.toLowerCase()}`;
			}

			return `-${currentLetter.toLowerCase()}`;
		})
		.join('')
		.trim()
		.replace(/[-_\s]+/g, '-');
}

export function toSentence(string) {
	const interim = toKebab(string).replace(/-/g, ' ');
	return interim.slice(0, 1).toUpperCase() + interim.slice(1);
}

import metadata from './block.json';

registerBlockType(metadata, {
	icon: box,
	edit: (props) => {
		const { attributes, setAttributes, name } = props;
		const { metaKey } = attributes;
		const blockProps = useBlockProps();

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const variations = useSelect(
			(select) => {
				const { getBlockVariations } = select(blocksStore);
				return getBlockVariations(name, 'block');
			},
			[name],
		);

		if (!metaKey) {
			return (
				<div {...blockProps}>
					<BlockVariationPicker
						variations={variations}
						onSelect={(nextVariation) => {
							if (nextVariation.attributes) {
								setAttributes(nextVariation.attributes);
							}
							if (nextVariation.innerBlocks) {
								replaceInnerBlocks(
									clientId,
									createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks),
									true,
								);
							}
						}}
					/>
				</div>
			)
		}

		return (
			<div {...blockProps}>
				<PostMeta metaKey={metaKey} placeholder="Meta Value" />
			</div>
		);
	},
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
