import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Dropdown, ToolbarButton } from '@wordpress/components';
import styled from '@emotion/styled';

import { IconPicker } from './icon-picker';
import { Icon } from './icon';

const StyledIconPickerDropdown = styled(IconPicker)`
	margin: 6px;
	width: 248px;
	height: 248px;
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
	const { value, buttonLabel } = props;

	const buttonIcon =
		value?.name && value?.iconSet ? <Icon name={value?.name} iconSet={value?.iconSet} /> : null;

	return (
		<Dropdown
			className="component-icon-picker-toolbar-button"
			contentClassName="component-icon-picker-toolbar-button__content"
			popoverProps={{
				placement: 'bottom-start',
			}}
			renderToggle={({ isOpen, onToggle }) => (
				<ToolbarButton onClick={onToggle} aria-expanded={isOpen} icon={buttonIcon}>
					{buttonLabel ?? __('Select Icon')}
				</ToolbarButton>
			)}
			renderContent={() => <StyledIconPickerDropdown {...props} />}
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
