import styled from '@emotion/styled';
import { Dropdown } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

import { IconPicker } from './icon-picker';
import { Icon } from './icon';
import React from 'react';
import type { IconPickerProps } from './icon-picker';

const StyledIconPickerDropdown = styled(IconPicker)`
	margin: 6px;
	width: 306px;
`;

export const InlineIconPicker = (props: IconPickerProps) => {
	const { value, ...rest } = props;
	const IconButton = useCallback(
		({ onToggle }: Dropdown.RenderProps) => (
			<Icon name={value.name} iconSet={value.iconSet} onClick={onToggle} {...rest} />
		),
		[value, rest],
	);

	return <IconPickerDropdown renderToggle={IconButton} {...props} />;
};

interface IconPickerDropdownProps extends IconPickerProps {
	renderToggle: (props: Dropdown.RenderProps) => JSX.Element;
};

export const IconPickerDropdown = (props: IconPickerDropdownProps) => {
	const { renderToggle, ...iconPickerProps } = props;
	return (
		<Dropdown
			className="component-icon-picker-inline-button"
			contentClassName="component-icon-picker-inline__content"
			position="bottom right"
			renderToggle={renderToggle}
			renderContent={() => <StyledIconPickerDropdown {...iconPickerProps} />}
		/>
	);
};
