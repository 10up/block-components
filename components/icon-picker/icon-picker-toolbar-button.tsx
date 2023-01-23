import { __ } from '@wordpress/i18n';
import { Dropdown, ToolbarButton } from '@wordpress/components';
import styled from '@emotion/styled';

import { IconPicker } from './icon-picker';
import { Icon } from './icon';
import React from 'react';
import type { Icon as IconType } from '../../stores/icons/selectors';

const StyledIconPickerDropdown = styled(IconPicker)`
	margin: 6px;
	width: 306px;
`;

type IconPickerToolbarButtonProps = {
	buttonLabel: string;
	value: IconType;
};

/**
 * IconPickerToolbarButton
 *
 * @typedef IconPickerToolbarButtonProps
 * @property {string} buttonLabel label
 *
 * @param {IconPickerToolbarButtonProps} props IconPickerToolbarButtonProps
 * @returns {*}
 */
export const IconPickerToolbarButton = (props: IconPickerToolbarButtonProps) => {
	const {
		value: { name, iconSet },
		buttonLabel = __('Select Icon'),
	} = props;

	const buttonIcon = name && iconSet ? <Icon name={name} iconSet={iconSet} /> : null;

	return (
		<Dropdown
			className="component-icon-picker-toolbar-button"
			contentClassName="component-icon-picker-toolbar-button__content"
			position="bottom right"
			renderToggle={({ isOpen, onToggle }) => (
				<ToolbarButton onClick={onToggle} aria-expanded={isOpen} icon={buttonIcon}>
					{buttonLabel}
				</ToolbarButton>
			)}
			renderContent={() => <StyledIconPickerDropdown {...props} />}
		/>
	);
};
