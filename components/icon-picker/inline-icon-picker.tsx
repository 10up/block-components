import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Dropdown } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

import { IconPicker } from './icon-picker';
import { Icon } from './icon';
import React from 'react';

const StyledIconPickerDropdown = styled(IconPicker)`
	margin: 6px;
	width: 306px;
`;

/**
 * InlineIconPicker
 *
 * @typedef InlineIconPickerProps
 * @property {string} buttonLabel label
 *
 * @param {InlineIconPickerProps} props InlineIconPickerProps
 * @returns {*}
 */
export const InlineIconPicker = (props) => {
	const { value, ...rest } = props;
	const IconButton = useCallback(
		({ onToggle }: { onToggle: Function}) => (
			<Icon name={value.name} iconSet={value.iconSet} onClick={onToggle} {...rest} />
		),
		[value, rest],
	);

	return <IconPickerDropdown renderToggle={IconButton} {...props} />;
};

InlineIconPicker.propTypes = {
	value: PropTypes.object.isRequired,
};

export const IconPickerDropdown = (props) => {
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

IconPickerDropdown.propTypes = {
	renderToggle: PropTypes.func.isRequired,
};
