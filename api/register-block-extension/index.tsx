import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import clsx from 'clsx';
import { FC } from 'react';

interface BlockEditProps {
	name: string;
	isSelected: boolean;
	attributes: Record<string, any>;
	setAttributes: (attributes: Record<string, any>) => void;
	className: string;
	style: Record<string, any>;
	wrapperProps: {
		[key: string]: any;
	};
	[key: string]: unknown;
}

interface BlockOptionOptions {
	attributes: Record<string, any>;
	classNameGenerator: (attributes: Record<string, unknown>) => string;
	inlineStyleGenerator: (attributes: Record<string, unknown>) => Record<string, any>;
	Edit: FC<BlockEditProps>;
	extensionName: string;
	order?: 'before' | 'after';
}

function registerBlockExtension(
	blockName: string | string[],
	{
		attributes,
		classNameGenerator,
		inlineStyleGenerator,
		Edit,
		extensionName,
		order = 'after',
	}: BlockOptionOptions,
): void {
	const isMultiBlock = Array.isArray(blockName);

	const shouldApplyBlockExtension = (blockType: string): boolean => {
		if (blockName === '*' || blockName === 'all') {
			return true;
		}

		if (isMultiBlock) {
			return blockName.includes(blockType);
		}
		return blockType === blockName;
	};

	if (blockName === '*') {
		blockName = 'all'; // eslint-disable-line no-param-reassign
	}

	// @ts-expect-error isMultiBlock verifies if this is an Array and supports join or not.
	const blockNamespace = isMultiBlock ? blockName.join('-') : blockName;

	const addAttributesToBlock = (settings: Record<string, any>, name: string) => {
		if (!shouldApplyBlockExtension(name)) {
			return settings;
		}

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

	const addSettingsToBlock = createHigherOrderComponent((BlockEdit: FC<any>) => {
		return (props: any) => {
			const { name, isSelected } = props;

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

	const addAdditionalPropertiesInEditor = createHigherOrderComponent((BlockList: FC<any>) => {
		return (props: BlockEditProps) => {
			const { name, attributes, className = '', style = {}, wrapperProps } = props;

			if (!shouldApplyBlockExtension(name)) {
				return <BlockList {...props} />;
			}

			const additionalClassName = classNameGenerator(attributes);
			const newClassName = clsx(className, additionalClassName);

			let additionalStyles = null;
			let newStyles = { ...style };
			if (typeof inlineStyleGenerator === 'function') {
				additionalStyles = inlineStyleGenerator(attributes);
				newStyles = { ...style, ...wrapperProps?.style, ...additionalStyles };
			}

			if (!additionalClassName && !additionalStyles) {
				return <BlockList {...props} />;
			}

			return (
				<BlockList
					{...props}
					className={newClassName}
					wrapperProps={{ ...wrapperProps, style: newStyles }}
				/>
			);
		};
	}, 'addAdditionalPropertiesInEditor');

	addFilter(
		'editor.BlockListBlock',
		`namespace/${blockNamespace}/${extensionName}/addAdditionalPropertiesInEditor`,
		addAdditionalPropertiesInEditor,
	);

	const addAdditionalPropertiesToSavedMarkup = (
		props: BlockEditProps,
		block: { name: string },
		attributes: Record<string, any>,
	) => {
		const { className, style } = props;

		if (!shouldApplyBlockExtension(block.name)) {
			return props;
		}

		const additionalClassName = classNameGenerator(attributes);
		const newClassName = clsx(className, additionalClassName);

		let additionalStyles = null;
		let newStyles = { ...style };
		if (typeof inlineStyleGenerator === 'function') {
			additionalStyles = inlineStyleGenerator(attributes);
			newStyles = { ...style, ...additionalStyles };
		}

		if (!additionalClassName && !additionalStyles) {
			return props;
		}

		return { ...props, className: newClassName, style: newStyles };
	};

	addFilter(
		'blocks.getSaveContent.extraProps',
		`namespace/${blockNamespace}/${extensionName}/addAdditionalPropertiesToSavedMarkup`,
		addAdditionalPropertiesToSavedMarkup,
	);
}

export { registerBlockExtension };
