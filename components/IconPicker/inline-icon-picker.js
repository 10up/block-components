/** @jsx jsx */
import PropTypes from 'prop-types';

import { __ } from '@wordpress/i18n';
import { Dropdown } from '@wordpress/components';
import { css, jsx } from '@emotion/react'; /* eslint-disable-line no-unused-vars */

import { IconPicker } from './icon-picker';
import { Icon } from '.';

const dropdownStyles = css`
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
	return (
		<Dropdown
			className="component-icom-picker-toolbar-button"
			contentClassName="component-icom-picker-toolbar-button__content"
			position="bottom right"
			renderToggle={({ onToggle }) => (
				<Icon
					name={props.value.name}
					iconSet={props.value.iconSet}
					onClick={() => {
						onToggle();
						console.log('Testing');
					}}
				/>
			)}
			renderContent={() => <IconPicker css={dropdownStyles} {...props} />}
		/>
	);
};

InlineIconPicker.defaultProps = {
	buttonLabel: __('Select Icon'),
};

InlineIconPicker.propTypes = {
	buttonLabel: PropTypes.string,
	value: PropTypes.object.isRequired,
};
