import { BaseControl } from '@wordpress/components';
// @ts-ignore
import { ColorPalette } from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import React from 'react';
import type { CSSProperties } from 'react';

export type ColorObject = {
	name: string;
	color: NonNullable< CSSProperties[ 'color' ] >;
};

export type PaletteObject = {
	name: string;
	colors: ColorObject[];
};

type ColorSettingProps = {
	/**
	 * If this property is added, a label will be generated using label property as the content.
	 */
	label: string;
	/**
	 * If this property is added, a help text will be generated using help property as the content.
	 */
	hideLabelFromVision: boolean;
	/**
	 * If no className is passed only components-base-control is used.
	 */
	help: string;
	/**
	 * If true, the label will only be visible to screen readers
	 */
	className: string;
	/**
	 * Array with the colors to be shown.
	 */
	disableCustomColors: boolean;
	/**
	 * currently active value.
	 */
	value: string;
	/**
	 * Whether to allow custom color or not.
	 */
	clearable: boolean;
	/**
	 * Callback called when a color is selected.
	 */
	colors: PaletteObject[];
	/**
	 * Whether the palette should have a clearing button or not.
	 */
	onChange: (value: string) => void;
};

export const ColorSetting = (props: ColorSettingProps) => {
	const {
		label,
		help,
		className,
		hideLabelFromVision,
		colors,
		value,
		onChange,
		disableCustomColors,
		clearable,
		...rest
	} = props;

	const instanceId = useInstanceId(ColorSetting);
	const id = `color-settings-${instanceId}`;

	return (
		<BaseControl
			id={id}
			label={label}
			help={help}
			className={className}
			hideLabelFromVision={hideLabelFromVision}
			{...rest}
		>
			<ColorPalette
				colors={colors}
				value={value}
				onChange={onChange}
				disableCustomColors={disableCustomColors}
				clearable={clearable}
			/>
		</BaseControl>
	);
};
