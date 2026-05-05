/**
 * WordPress dependencies
 */
import { BaseControl } from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';

interface ColorSettingProps {
	/**
	 * If this property is added, a label will be generated using label property as the content.
	 */
	label?: string;

	/**
	 * If true, the label will only be visible to screen readers.
	 */
	hideLabelFromVision?: boolean;

	/**
	 * If this property is added, a help text will be generated using help property as the content.
	 */
	help?: string;

	/**
	 * If no className is passed only components-base-control is used.
	 */
	className?: string;

	/**
	 * Whether to allow custom color or not.
	 */
	disableCustomColors?: boolean;

	/**
	 * currently active value.
	 */
	value?: string;

	/**
	 * Whether the palette should have a clearing button or not.
	 */
	clearable?: boolean;

	/**
	 * Array with the colors to be shown.
	 */
	colors: Array<Color>;

	/**
	 * Callback called when a color is selected.
	 */
	onChange: (newColor?: string | undefined, index?: number | undefined) => void;
}

interface Color {
	/**
	 * Color name.
	 */
	name: string;

	/**
	 * Color hex code.
	 */
	color: string;
}

// eslint-disable-next-line import/prefer-default-export
export const ColorSetting: React.FC<ColorSettingProps> = ({
	label = '',
	help = '',
	className = '',
	hideLabelFromVision = false,
	colors,
	value = '',
	onChange,
	disableCustomColors = false,
	clearable = true,
}) => {
	const instanceId = useInstanceId(ColorSetting);
	const id = `color-settings-${instanceId}`;

	return (
		<BaseControl
			id={id}
			label={label}
			help={help}
			className={className}
			hideLabelFromVision={hideLabelFromVision}
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
