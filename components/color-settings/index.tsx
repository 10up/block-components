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
	 * If true, the label will only be visible to screen readers
	 */
	hideLabelFromVision: boolean;
	/**
	 * If this property is added, a help text will be generated using help property as the content.
	 */
	help: string;
	/**
	 * If no className is passed only components-base-control is used.
	 */
	className: string;
	/**
	 * Whether to allow custom color or not.
	 */
	disableCustomColors: boolean;
	/**
	 * currently active value.
	 */
	value: string;
	/**
	 * Whether the palette should have a clearing button or not.
	 */
	clearable: boolean;
	/**
	 * Array with the colors to be shown.
	 */
	colors: PaletteObject[];
	/**
	 * Callback called when a color is selected.
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
