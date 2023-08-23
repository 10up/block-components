import styled from '@emotion/styled';
import { __ } from '@wordpress/i18n';
import {
	CheckboxControl,
	BaseControl,
	NavigableMenu,
	SearchControl,
	Tooltip,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useState, memo, useMemo, forwardRef } from '@wordpress/element';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import type { GridChildComponentProps } from 'react-window';

import { useIcons } from '../../hooks/use-icons';
import { useFilteredList } from '../../hooks/use-filtered-list';

import React from 'react';
import type { FC } from 'react';
import { Icon } from './icon';
import type { Icon as IconType} from '../../stores/icons/types';

const StyledIconGrid = styled(Grid)`
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
				<IconGrid icons={filteredIcons} selectedIcon={value} onChange={onChange} />
			) : (
				<p>{__('No icons were found...')}</p>
			)}
		</BaseControl>
	);
};

type IconLabelProps = {
	icon: IconType;
	isChecked: boolean;
};

type TooltipContentProps = {
	children: React.ReactNode;
};

type TooltipContentRef = HTMLDivElement;

/**
 * TooltipContent
 *
 * The `@wordpress/components` Tooltip component tries to clone the child element
 * passed into it. This child will get some additional children passed in. In some cases
 * this clashes with elements that use dangerouslySetInnerHTML. This component is a
 * workaround for that. It will just wrap the children in a div and pass that to the
 * Tooltip component.
 */
const TooltipContent = forwardRef<TooltipContentRef, TooltipContentProps>(function TooltipContent(props, ref) {
	const { children } = props;

	return (
		<div ref={ref} className="component-icon-picker__tooltip-content" {...props}>
			{children}
		</div>
	);
});

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
const IconLabel: FC<IconLabelProps> = (props) => {
	const { icon, isChecked } = props;
	return (
		<Tooltip text={icon.label}>
			<TooltipContent>
				<StyledIconButton
					selected={isChecked}
					key={icon.name}
					name={icon.name}
					iconSet={icon.iconSet}
				/>
			</TooltipContent>
		</Tooltip>
	);
};

type IconGridProps = {
	icons: IconType[];
	selectedIcon: IconType;
	onChange: Function;
};

type IconGridItemDataType = {
	icons: Array<IconType>,
	selectedIcon: IconType,
	onChange: (newIcon: IconType) => void,
};

const IconGridItem = memo<GridChildComponentProps<IconGridItemDataType>>(function IconGridItem(props) {
	const { columnIndex, rowIndex, style, data } = props;
	const { icons, selectedIcon, onChange } = data;
	const index = rowIndex * 5 + columnIndex;
	const icon = icons[index];
	const isChecked = selectedIcon?.name === icon?.name && selectedIcon?.iconSet === icon?.iconSet;

	if (!icon) {
		return null;
	}

	return (
		<div style={style}>
			<CheckboxControl
				key={icon.name}
				label={<IconLabel isChecked={isChecked} icon={icon} />}
				checked={isChecked}
				onChange={() => onChange(icon)}
				className="component-icon-picker__checkbox-control"
			/>
		</div>
	);
}, areEqual);

const IconGrid: FC<IconGridProps> = (props) => {
	const { icons, selectedIcon, onChange } = props;

	const itemData = useMemo(
		() => ({ icons, selectedIcon, onChange }),
		[icons, selectedIcon, onChange],
	);

	return (
		<NavigableMenu orientation="vertical" className="component-icon-picker__list">
			<StyledIconGrid
				columnCount={5}
				columnWidth={248 / 5}
				rowCount={Math.ceil(icons.length / 5)}
				rowHeight={248 / 5}
				itemData={itemData}
				height={200}
				width={248}
			>
				{IconGridItem}
			</StyledIconGrid>
		</NavigableMenu>
	);
};

