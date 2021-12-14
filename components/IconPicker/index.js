import { __ } from '@wordpress/i18n';
import {
	Spinner,
	CheckboxControl,
	TextControl,
	BaseControl,
	NavigableMenu,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { RawHTML, useState, useEffect } from '@wordpress/element';
import { useIcons, useIcon } from '../../hooks/use-icons';
import { useFilteredList } from '../../hooks/use-filtered-list';

export const IconPicker = (props) => {
	const { value, onChange, label = null } = props;

	const icons = useIcons();

	const instanceId = useInstanceId(IconPicker);
	const id = `icon-picker-${instanceId}`;

	const [searchTerm, setSearchTerm] = useState('');
	const [filteredIcons] = useFilteredList(icons, searchTerm);

	return (
		<BaseControl label={label} id={id} className="component-icon-picker">
			<TextControl
				label={__('Search for an Icon')}
				onChange={setSearchTerm}
				value={searchTerm}
				className="component-icon-picker__search"
			/>
			<NavigableMenu orientation="vertical" className="component-icon-picker__list">
				{filteredIcons.map((icon) => {
					const isChecked = value?.name === icon.name && value?.iconSet === icon.iconSet;
					return (
						<CheckboxControl
							key={icon.name}
							label={<Icon key={icon.name} name={icon.name} iconSet={icon.iconSet} />}
							checked={isChecked}
							onChange={() => onChange}
							className="component-icon-picker__checkbox-control"
						/>
					);
				})}
			</NavigableMenu>
		</BaseControl>
	);
};

export const Icon = (props) => {
	const { name, iconSet } = props;
	const icon = useIcon(iconSet, name);

	if (!icon) {
		return <Spinner />;
	}

	return <RawHTML>{icon.source}</RawHTML>;
};

export const IconPickerToolbarButton = () => {
	return null;
};

export const InlineIconPicker = () => {
	return null;
};

export const IconPickerSelectControl = () => {
	return null;
};
