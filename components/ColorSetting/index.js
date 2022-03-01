/**
 * External dependencies
 */

import PropTypes from 'prop-types';
/**
 * WordPress dependencies
 */
import { BaseControl } from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';

/**
 * ColorSetting
 *
 * @typedef ColorSettingProps
 * @property {string} label If this property is added, a label will be generated using label property as the content.
 * @property {string} help If this property is added, a help text will be generated using help property as the content.
 * @property {string} className If no className is passed only components-base-control is used.
 * @property {boolean} hideLabelFromVision If true, the label will only be visible to screen readers
 * @property {Array} colors Array with the colors to be shown.
 * @property {string} value currently active value.
 * @property {Function} onChange Callback called when a color is selected.
 * @property {boolean} disableCustomColors Whether to allow custom color or not.
 * @property {boolean} clearable Whether the palette should have a clearing button or not.
 *
 * @param {ColorSettingProps} props ColorSetting Props
 * @return {*} React Element
 */
// eslint-disable-next-line import/prefer-default-export
export const ColorSetting = (props) => {
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

ColorSetting.defaultProps = {
    label: '',
    hideLabelFromVision: false,
    help: '',
    className: '',
    disableCustomColors: false,
    value: '',
    clearable: true,
};

ColorSetting.propTypes = {
    label: PropTypes.string,
    hideLabelFromVision: PropTypes.bool,
    help: PropTypes.string,
    className: PropTypes.string,
    disableCustomColors: PropTypes.bool,
    value: PropTypes.string,
    clearable: PropTypes.bool,
    colors: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};
