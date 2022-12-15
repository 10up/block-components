/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * registerBlockExtension
 *
 * A helper function that allows you to add custom settings to any block.
 * Under the hood it filters the blocks registerBlockType, BlockEdit, BlockListBlock
 * and getSaveContent.extraProps filters.
 *
 * @typedef BlockOptionOptions
 * @property {object}   attributes         object for new attributes that should get added to the block
 * @property {Function} classNameGenerator function that gets passed the attributes and should return a string for the classname
 * @property {Function} Edit               block edit extension function. Will only get rendered when the block is selected
 * @property {string}   extensionName      unique identifier used for the name of the addFilter calls
 * @property {string}   order              the order where the extension should be rendered. Can be 'before' or 'after'. Defaults to 'after'
 *
 * @param {string|string[]}    blockName name of the block or array of block names
 * @param {BlockOptionOptions} options   configuration options
 */
function registerBlockExtension(
	blockName,
	{ attributes, classNameGenerator, Edit, extensionName, order = 'after' },
) {
	const isMultiBlock = Array.isArray(blockName);

	/**
	 * shouldApplyBlockExtension
	 *
	 * @param {string} blockType name of the block
	 * @returns {boolean} true if the block is the one we want to add the extension to
	 */
	const shouldApplyBlockExtension = (blockType) => {
		if (isMultiBlock) {
			return blockName.includes(blockType);
		}
		return blockType === blockName;
	};

	const blockNamespace = isMultiBlock ? blockName.join('-') : blockName;

	/**
	 * addAttributesToBlock
	 *
	 * @param {object} settings block settings
	 * @param {string} name     block name
	 * @returns {Array}
	 */
	const addAttributesToBlock = (settings, name) => {
		// return early from the block modification
		if (!shouldApplyBlockExtension(name)) {
			return settings;
		}

		// modify block registration object
		return {
			...settings,
			attributes: {
				...settings.attributes,
				...attributes,
			},
		};
	};

	addFilter(
		'blocks.registerBlockType',
		`namespace/${blockNamespace}/${extensionName}/addAttributesToBlock`,
		addAttributesToBlock,
	);

	/**
	 * addSettingsToBlock
	 */
	const addSettingsToBlock = createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, isSelected } = props;

			// return early from the block modification
			if (!shouldApplyBlockExtension(name)) {
				return <BlockEdit {...props} />;
			}

			const shouldRenderBefore = order === 'before' && isSelected;
			const shouldRenderAfter = order === 'after' && isSelected;

			const shouldRenderFallback = !shouldRenderBefore && !shouldRenderAfter && isSelected;

			return (
				<>
					{shouldRenderBefore && <Edit {...props} />}
					<BlockEdit {...props} />
					{shouldRenderAfter && <Edit {...props} />}
					{shouldRenderFallback && <Edit {...props} />}
				</>
			);
		};
	}, 'addSettingsToBlock');

	addFilter(
		'editor.BlockEdit',
		`namespace/${blockNamespace}/${extensionName}/addSettingsToBlock`,
		addSettingsToBlock,
	);

	/**
	 * addClassNameInEditor
	 */
	const addClassNameInEditor = createHigherOrderComponent((BlockList) => {
		return (props) => {
			const { name, attributes } = props;

			// return early from the block modification
			if (!shouldApplyBlockExtension(name)) {
				return <BlockList {...props} />;
			}

			const additionalClassName = classNameGenerator(attributes);

			if (!additionalClassName) {
				return <BlockList {...props} />;
			}

			return (
				<BlockList
					{...props}
					className={`${attributes.className || ''} ${additionalClassName}`}
				/>
			);
		};
	}, 'addClassNameInEditor');

	addFilter(
		'editor.BlockListBlock',
		`namespace/${blockNamespace}/${extensionName}/addClassNameInEditor`,
		addClassNameInEditor,
	);

	/**
	 * saveSpacingAttributes
	 *
	 * @param {object} props      block props
	 * @param {object} block      block object
	 * @param {object} attributes block attributes
	 * @returns {object}
	 */
	const saveSpacingAttributes = (props, block, attributes) => {
		// return early from the block modification
		if (!shouldApplyBlockExtension(block.name)) {
			return props;
		}

		const additionalClassName = classNameGenerator(attributes);

		if (!additionalClassName) {
			return props;
		}

		return { ...props, className: `${props.className || ''} ${additionalClassName}` };
	};

	addFilter(
		'blocks.getSaveContent.extraProps',
		`namespace/${blockNamespace}/${extensionName}/saveSpacingAttributes`,
		saveSpacingAttributes,
	);
}

export { registerBlockExtension };
