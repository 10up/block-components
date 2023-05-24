import styled from '@emotion/styled';
import { Dropdown } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

import { DropdownProps } from '@wordpress/components/build-types/dropdown/types';

// extract type from DropdownProps renderToggle function props
type RenderToggleProps = Parameters<DropdownProps['renderToggle']>[0];

import { IconPicker } from './icon-picker';
import { Icon } from './icon';
import React from 'react';
import type { FC } from 'react';
import type { IconPickerProps } from './icon-picker';

const StyledIconPickerDropdown = styled(IconPicker)`
	margin: 6px;
	width: 306px;
`;

export const InlineIconPicker: FC<IconPickerProps> = (props) => {
	const { value, ...rest } = props;
	const IconButton = useCallback(
		({ onToggle }: RenderToggleProps) => (
			<Icon name={value.name} iconSet={value.iconSet} onClick={onToggle} {...rest} />
		),
		[value, rest],
	);

	return <IconPickerDropdown renderToggle={IconButton} {...props} />;
};

interface IconPickerDropdownProps extends IconPickerProps {
	renderToggle: (props: RenderToggleProps) => JSX.Element;
};

export const IconPickerDropdown: FC<IconPickerDropdownProps> = (props) => {
	const { renderToggle, ...iconPickerProps } = props;
	return (
		<Dropdown
			className="component-icon-picker-inline-button"
			contentClassName="component-icon-picker-inline__content"
			popoverProps={ {
				position: 'bottom center',
			} }
			renderToggle={renderToggle}
			renderContent={() => <StyledIconPickerDropdown {...iconPickerProps} />}
		/>
	);
};
