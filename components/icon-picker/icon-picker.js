import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { __ } from '@wordpress/i18n';
import {
	CheckboxControl,
	BaseControl,
	NavigableMenu,
	VisuallyHidden,
	__experimentalScrollable as Scrollable,
	SearchControl,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useState } from '@wordpress/element';

import { useIcons } from '../../hooks/use-icons';
import { useFilteredList } from '../../hooks/use-filtered-list';

import { Icon } from './icon';

const StyledIconGrid = styled(NavigableMenu)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(34px, 1fr));
	gap: 12px;
	align-items: center;
	justify-content: center;

	.component-icon-picker__checkbox-control {
		margin-bottom: 0;
	}

	.components-checkbox-control__input,
	.components-checkbox-control__input-container {
		display: none;
	}
`;

const StyledIconButton = styled(Icon)`
	background-color: ${({ selected }) => (selected ? 'black' : 'white')};
	color: ${({ selected }) => (selected ? 'white' : 'black')};
	fill: ${({ selected }) => (selected ? 'white' : 'black')};
	padding: 5px;
	border: none;
	border-radius: 4px;
	height: 34px;
	width: 34px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background-color: ${({ selected }) => (selected ? '#555D66' : '#f3f4f5')};
	}

	& svg {
		max-height: 100%;
		max-width: 100%;
		height: auto;
		width: auto;
		object-fit: contain;
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

	const hasIcons = !!filteredIcons.length;

	return (
		<BaseControl label={label} id={id} className="component-icon-picker" {...rest}>
			<SearchControl value={searchTerm} onChange={setSearchTerm} id={id} />
			{hasIcons ? (
				<Scrollable style={{ maxHeight: 200 }}>
					<IconGrid icons={filteredIcons} selectedIcon={value} onChange={onChange} />
				</Scrollable>
			) : (
				<p>{__('No icons were found...')}</p>
			)}
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
 * IconLabel
 *
 * @typedef IconLabelProps
 * @property {object} icon icon object
 * @property {boolean} isChecked whether the icon is checked
 *
 * @param {IconLabelProps} props IconLabel Props
 * @returns {*} React Element
 */
const IconLabel = (props) => {
	const { icon, isChecked } = props;
	return (
		<>
			<StyledIconButton
				selected={isChecked}
				key={icon.name}
				name={icon.name}
				iconSet={icon.iconSet}
			/>
			<VisuallyHidden>{icon.label}</VisuallyHidden>
		</>
	);
};

IconLabel.propTypes = {
	icon: PropTypes.object.isRequired,
	isChecked: PropTypes.bool.isRequired,
};

const IconGrid = (props) => {
	const { icons, selectedIcon, onChange } = props;

	return (
		<StyledIconGrid orientation="vertical" className="component-icon-picker__list">
			{icons.map((icon) => {
				const isChecked =
					selectedIcon?.name === icon.name && selectedIcon?.iconSet === icon.iconSet;

				return (
					<CheckboxControl
						key={icon.name}
						label={<IconLabel isChecked={isChecked} icon={icon} />}
						checked={isChecked}
						onChange={() => onChange(icon)}
						className="component-icon-picker__checkbox-control"
					/>
				);
			})}
		</StyledIconGrid>
	);
};

IconGrid.propTypes = {
	icons: PropTypes.array.isRequired,
	selectedIcon: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};
