import PropTypes from 'prop-types';

import { __ } from '@wordpress/i18n';
import {
	CheckboxControl,
	TextControl,
	BaseControl,
	NavigableMenu,
	VisuallyHidden,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { useIcons } from '../../hooks/use-icons';
import { useFilteredList } from '../../hooks/use-filtered-list';

import { Icon } from './icon';

/**
 * IconPicker
 *
 * @typedef IconPickerProps
 * @property {object} value value of the selected icon
 * @property {Function} onChange change handler for when a new icon is selected
 * @property {string} label label of the icon picker
 *
 * @param {IconPickerProps} props IconPicker Props
 * @returns {*}
 */
export const IconPicker = (props) => {
	const { value, onChange, label } = props;

	const icons = useIcons();

	const instanceId = useInstanceId(IconPicker);
	const id = `icon-picker-${instanceId}`;

	const [searchTerm, setSearchTerm] = useState('');
	const [filteredIcons] = useFilteredList(icons, searchTerm);

	return (
		<BaseControl label={label} id={id} className="component-icon-picker">
			<TextControl
				label={<VisuallyHidden>{__('Search for an Icon')}</VisuallyHidden>}
				onChange={setSearchTerm}
				value={searchTerm}
				placeholder={__('Search for an Icon')}
				className="component-icon-picker__search"
			/>
			<NavigableMenu
				orientation="vertical"
				className="component-icon-picker__list"
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					gap: '12px',
				}}
			>
				{filteredIcons.map((icon) => {
					const isChecked = value?.name === icon.name && value?.iconSet === icon.iconSet;
					const Label = () => (
						<span>
							<Icon key={icon.name} name={icon.name} iconSet={icon.iconSet} />
							<VisuallyHidden>{icon.label}</VisuallyHidden>
						</span>
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
