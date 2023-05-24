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
import { useState, memo } from '@wordpress/element';

import { useIcons } from '../../hooks/use-icons';
import { useFilteredList } from '../../hooks/use-filtered-list';

import React from 'react';
import type { FC } from 'react';
import { Icon } from './icon';
import type { Icon as IconType} from '../../stores/icons/types';

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
	background-color: ${({ isSelected }) => (isSelected ? 'black' : 'white')};
	color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
	fill: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
	padding: 5px;
	border: none;
	border-radius: 4px;
	height: 34px;
	width: 34px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background-color: ${({ isSelected }) => (isSelected ? '#555D66' : '#f3f4f5')};
	}

	& svg {
		max-height: 100%;
		max-width: 100%;
		height: auto;
		width: auto;
		object-fit: contain;
	}
`;

export type IconPickerProps = {
	/**
	 * value of the selected icon
	 */
	value: IconType;

	/**
	 * change handler for when a new icon is selected
	 */
	onChange: Function;

	/**
	 * label of the icon picker
	 */
	label: string;
};

export const IconPicker: FC<IconPickerProps> = (props) => {
	const { value, onChange, label, ...rest } = props;

	const icons = useIcons();

	const instanceId = useInstanceId(IconPicker);
	const id = `icon-picker-${instanceId}`;

	const [searchTerm, setSearchTerm] = useState('');
	const [filteredIcons] = useFilteredList<IconType>(icons, searchTerm);

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

type IconGridProps = {
	icons: IconType[];
	selectedIcon: IconType;
	onChange: Function;
};

const IconGrid: FC<IconGridProps> = (props) => {
	const { icons, selectedIcon, onChange } = props;

	return (
		<StyledIconGrid orientation="vertical" className="component-icon-picker__list">
			{icons.map((icon) => {
				const isChecked =
					selectedIcon?.name === icon.name && selectedIcon?.iconSet === icon.iconSet;
				const Label = memo(() => (
					<>
						<StyledIconButton
							isSelected={isChecked}
							key={icon.name}
							name={icon.name}
							iconSet={icon.iconSet}
						/>
						<VisuallyHidden>{icon.label}</VisuallyHidden>
					</>
				));
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
		</StyledIconGrid>
	);
};

