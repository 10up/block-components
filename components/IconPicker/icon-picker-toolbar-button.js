/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';

import { __ } from '@wordpress/i18n';
import { Dropdown, ToolbarButton } from '@wordpress/components';

import { IconPicker } from './icon-picker';

/**
 * IconPickerToolbarButton
 *
 * @typedef IconPickerToolbarButtonProps
 * @property {string} buttonLabel label
 *
 * @param {IconPickerToolbarButtonProps} props IconPickerToolbarButtonProps
 * @returns {*}
 */
export const IconPickerToolbarButton = (props) => {
	return (
		<Dropdown
			className="component-icom-picker-toolbar-button"
			contentClassName="component-icom-picker-toolbar-button__content"
			position="bottom right"
			renderToggle={({ isOpen, onToggle }) => (
				<ToolbarButton onClick={onToggle} aria-expanded={isOpen}>
					{props?.buttonLabel ?? __('Select Icon')}
				</ToolbarButton>
			)}
			renderContent={() => <IconPicker {...props} />}
		/>
	);
};

IconPickerToolbarButton.defaultProps = {
	buttonLabel: __('Select Icon'),
};

IconPickerToolbarButton.propTypes = {
	buttonLabel: PropTypes.string,
};
