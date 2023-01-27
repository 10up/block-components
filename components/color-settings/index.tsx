import { BaseControl } from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import React from 'react';

type ColorSettingProps = ColorPalette.Props & BaseControl.ControlProps;

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
