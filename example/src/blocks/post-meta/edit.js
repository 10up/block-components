import { store as blocksStore, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import {
	useBlockProps,
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { PostMeta } from '@10up/block-components';

export const BlockEdit = (props) => {
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
};