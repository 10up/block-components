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

import { useIcons } from '../../hooks/use-icons';
import { useFilteredList } from '../../hooks/use-filtered-list';

import { Icon } from './icon';

/**
 * TooltipContent
 *
 * The `@wordpress/components` Tooltip component tries to clone the child element
 * passed into it. This child will get some additional children passed in. In some cases
 * this clashes with elements that use dangerouslySetInnerHTML. This component is a
 * workaround for that. It will just wrap the children in a div and pass that to the
 * Tooltip component.
 */
const TooltipContent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
	function TooltipContent(props, ref) {
		const { children } = props;

		return (
			<div ref={ref} className="component-icon-picker__tooltip-content" {...props}>
				{children}
			</div>
		);
	},
);

const StyledIconButton = styled(Icon)`
	background-color: ${({ selected }: { selected: boolean }) => (selected ? 'black' : 'white')};
	color: ${({ selected }: { selected: boolean }) => (selected ? 'white' : 'black')};
	fill: ${({ selected }: { selected: boolean }) => (selected ? 'white' : 'black')};
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
		width: 100%;
		object-fit: contain;
	}
`;

interface IconLabelProps {
	/**
	 * Icon object
	 */
	icon: { name: string; iconSet: string; label: string };
	/**
	 * Whether the icon is checked
	 */
	isChecked: boolean;
}

const IconLabel: React.FC<IconLabelProps> = (props) => {
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

interface IconGridItemProps {
	/**
	 * Column index
	 */
	columnIndex: number;
	/**
	 * Row index
	 */
	rowIndex: number;
	/**
	 * Style object
	 */
	style: React.CSSProperties;
	/**
	 * Data object
	 */
	data: unknown;
}

const IconGridItem = memo<IconGridItemProps>((props) => {
	const { columnIndex, rowIndex, style, data } = props;
	const { icons, selectedIcon, onChange } = data as {
		icons: { name: string; iconSet: string; label: string }[];
		selectedIcon: { name: string; iconSet: string };
		onChange: (icon: { name: string; iconSet: string }) => void;
	};
	const index = rowIndex * 5 + columnIndex;
	const icon = icons[index];
	const isChecked = selectedIcon?.name === icon?.name && selectedIcon?.iconSet === icon?.iconSet;

	if (!icon) {
		return null;
	}

	// We need to cast the IconLabel to a string because types in WP are not correct
	const label = (<IconLabel isChecked={isChecked} icon={icon} />) as unknown as string;

	return (
		<div style={style}>
			<CheckboxControl
				key={icon.name}
				label={label}
				checked={isChecked}
				onChange={() => onChange(icon)}
				className="component-icon-picker__checkbox-control"
			/>
		</div>
	);
}, areEqual);

const StyledIconGrid = styled(Grid)`
	.component-icon-picker__checkbox-control {
		margin-bottom: 0;
	}

	.components-checkbox-control__input,
	.components-checkbox-control__input-container {
		display: none;
	}
`;

interface IconGridProps {
	/**
	 * List of icons
	 */
	icons: { name: string; iconSet: string; label: string }[];
	/**
	 * Selected icon
	 */
	selectedIcon: { name: string; iconSet: string };
	/**
	 * Change handler for when a new icon is selected
	 */
	onChange: (icon: { name: string; iconSet: string }) => void;
}

const IconGrid: React.FC<IconGridProps> = (props) => {
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

export type IconPickerProps = Omit<React.ComponentProps<typeof BaseControl>, 'children'> & {
	/**
	 * Value of the selected icon
	 */
	value: { name: string; iconSet: string };
	/**
	 * Change handler for when a new icon is selected
	 */
	onChange: (icon: { name: string; iconSet: string }) => void;
	/**
	 * Optionally specify the icon set to use
	 * If not specified, all icon sets will be used
	 */
	iconSet?: string;
};

export const IconPicker: React.FC<IconPickerProps> = (props) => {
	const { value, onChange, iconSet, label = '', ...rest } = props;

	const icons = useIcons(iconSet ? iconSet : '');

	const instanceId = useInstanceId(IconPicker);
	const id = `icon-picker-${instanceId}`;

	const [searchTerm, setSearchTerm] = useState('');
	const [filteredIcons] = useFilteredList(icons, searchTerm);

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
