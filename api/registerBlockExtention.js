/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * registerBlockExtention
 *
 * A helper function that allows you to add custom settings to any block.
 * Unter the hood it filters the blocks registerBlockType, BlockEdit, BlockListBlock
 * and getSaveContent.extraProps filters.
 *
 * @typedef BlockOptionOptions
 * @property {object}   attributes         object for new attributes that should get added to the block
 * @property {Function} classNameGenerator function that gets passed the attributes and should return a string for the classname
 * @property {Function} Edit               block edit extention function. Will only get rendered when the block is selected
 * @property {string}   extentionName      unique indentifier used for the name of the addFilter calls
 *
 * @param {string}             blockName name of the block
 * @param {BlockOptionOptions} options   configuration options
 */
function registerBlockExtention(
	blockName,
	{ attributes, classNameGenerator, Edit, extentionName },
) {
	/**
	 * addAttributesToBlock
	 *
	 * @param {object} settings block settings
	 * @param {string} name     block name
	 * @returns {Array}
	 */
	const addAttributesToBlock = (settings, name) => {
		// return early from the block mofification
		if (!name === blockName) {
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
		`namespace/${blockName}/${extentionName}/addAttributesToBlock`,
		addAttributesToBlock,
	);

	/**
	 * addSettingsToBlock
	 */
	const addSettingsToBlock = createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, isSelected } = props;

			// return early from the block mofification
			if (name !== blockName) {
				return <BlockEdit {...props} />;
			}

			return (
				<>
					<BlockEdit {...props} />
					{isSelected && <Edit {...props} />}
				</>
			);
		};
	}, 'addSettingsToBlock');

	addFilter(
		'editor.BlockEdit',
		`namespace/${blockName}/${extentionName}/addSettingsToBlock`,
		addSettingsToBlock,
	);

	/**
	 * addClassNameInEditor
	 */
	const addClassNameInEditor = createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, attributes } = props;

			// return early from the block mofification
			if (!name === blockName) {
				return <BlockEdit {...props} />;
			}

			const additionalClassName = classNameGenerator(attributes);

			if (!additionalClassName) {
				return <BlockEdit {...props} />;
			}

			return (
				<BlockEdit
					{...props}
					className={`${attributes.className || ''} ${additionalClassName}`}
				/>
			);
		};
	}, 'addClassNameInEditor');

	addFilter(
		'editor.BlockListBlock',
		`namespace/${blockName}/${extentionName}/addClassNameInEditor`,
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
		// return early from the block mofification
		if (!block.name === blockName) {
			return props;
		}

		const additionalClassName = classNameGenerator(attributes);

		if (!additionalClassName) {
			return props;
		}

		return { ...props, className: `${attributes.className || ''} ${additionalClassName}` };
	};

	addFilter(
		'blocks.getSaveContent.extraProps',
		`namespace/${blockName}/${extentionName}/saveSpacingAttributes`,
		saveSpacingAttributes,
	);
}

export { registerBlockExtention };
