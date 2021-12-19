/** @jsx jsx */
import PropTypes from 'prop-types';

import { __ } from '@wordpress/i18n';
import {
	CheckboxControl,
	BaseControl,
	NavigableMenu,
	VisuallyHidden,
	__experimentalScrollable as Scrollable,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { css, jsx } from '@emotion/react'; /* eslint-disable-line no-unused-vars */
import { useIcons } from '../../hooks/use-icons';
import { useFilteredList } from '../../hooks/use-filtered-list';

import { Icon } from './icon';

const iconGridStyles = css`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 12px;
	align-items: center;
	justify-content: center;

	.components-checkbox-control__input,
	.components-checkbox-control__input-container {
		display: none;
	}
`;

const selectedIconStyles = css`
	background: black;
	color: white;
`;

const searchBoxStyles = css`
	.component-icon-picker__search {
		background-color: #f3f4f5;
		border: none;
		border-radius: 2px;
		padding: 10px 16px;
		width: 100%;
	}
`;

/**
 * IconPicker
 *
 * @typedef IconPickerProps
 * @property {object} value value of the selected icon
 * @property {Function} onChange change handler for when a new icon is selected
 * @property {string} label label of the icon picker
 *
 * @param {IconPickerProps} props IconPicker Props
 * @returns {*} React Element
 */
export const IconPicker = (props) => {
	const { value, onChange, label, ...rest } = props;

	const icons = useIcons();

	const instanceId = useInstanceId(IconPicker);
	const id = `icon-picker-${instanceId}`;

	const [searchTerm, setSearchTerm] = useState('');
	const [filteredIcons] = useFilteredList(icons, searchTerm);

	return (
		<BaseControl label={label} id={id} className="component-icon-picker" {...rest}>
			<SearchControl value={searchTerm} onChange={setSearchTerm} id={id} />
			<Scrollable style={{ maxHeight: 200 }}>
				<IconGrid icons={filteredIcons} selectedIcon={value} onChange={onChange} />
			</Scrollable>
		</BaseControl>
	);
};

IconPicker.defaultProps = {
	label: '',
};

IconPicker.propTypes = {
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
};

/**
 * SeachControl
 *
 * @typedef SearchControlProps
 * @property {string} value value
 * @property {Function} onChange change handler
 * @property {string} id identifier
 *
 * @param {SearchControlProps} props SearchControl Props
 * @returns {*} React Element
 */
const SearchControl = (props) => {
	const { value, onChange, id } = props;

	return (
		<BaseControl
			label={<VisuallyHidden>{__('Search for an Icon')}</VisuallyHidden>}
			id={`${id}--search-field`}
			css={searchBoxStyles}
		>
			<input
				placeholder={__('Search for an Icon')}
				className="component-icon-picker__search"
				type="text"
				value={value}
				onChange={onChange}
				id={`${id}--search-field`}
			/>
		</BaseControl>
	);
};

SearchControl.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
};

const IconGrid = (props) => {
	const { icons, selectedIcon, onChange } = props;

	return (
		<NavigableMenu
			orientation="vertical"
			className="component-icon-picker__list"
			css={iconGridStyles}
		>
			{icons.map((icon) => {
				const isChecked =
					selectedIcon?.name === icon.name && selectedIcon?.iconSet === icon.iconSet;
				const Label = () => (
					<div css={isChecked ? selectedIconStyles : null}>
						<Icon key={icon.name} name={icon.name} iconSet={icon.iconSet} />
						<VisuallyHidden>{icon.label}</VisuallyHidden>
					</div>
				);
				return (
					<CheckboxControl
						key={icon.name}
						label={<Label />}
						checked={isChecked}
						onChange={() => onChange(icon)}
						className="component-icon-picker__checkbox-control"
					/>
				);
			})}
		</NavigableMenu>
	);
};

IconGrid.propTypes = {
	icons: PropTypes.array.isRequired,
	selectedIcon: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};
