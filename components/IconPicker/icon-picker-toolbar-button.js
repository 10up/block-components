/** @jsx jsx */
import PropTypes from 'prop-types';

import { __ } from '@wordpress/i18n';
import { Dropdown, ToolbarButton } from '@wordpress/components';
import { css, jsx } from '@emotion/react'; /* eslint-disable-line no-unused-vars */

import { IconPicker } from './icon-picker';
import { Icon } from '.';

const dropdownStyles = css`
	margin: 6px;
	width: 306px;
`;

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
				<ToolbarButton
					onClick={onToggle}
					aria-expanded={isOpen}
					icon={<Icon name={props.value.name} iconSet={props.value.iconSet} />}
				>
					{props?.buttonLabel ?? __('Select Icon')}
				</ToolbarButton>
			)}
			renderContent={() => <IconPicker css={dropdownStyles} {...props} />}
		/>
	);
};

IconPickerToolbarButton.defaultProps = {
	buttonLabel: __('Select Icon'),
};

IconPickerToolbarButton.propTypes = {
	buttonLabel: PropTypes.string,
	value: PropTypes.object.isRequired,
};
