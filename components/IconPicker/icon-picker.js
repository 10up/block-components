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
	grid-template-columns: repeat(4, 1fr);
	gap: 12px;
	align-items: center;
	justify-content: center;

	.components-checkbox-control__input {
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
 * @returns {*}
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
			<BaseControl
				label={<VisuallyHidden>{__('Search for an Icon')}</VisuallyHidden>}
				id={`${id}--search-field`}
				css={searchBoxStyles}
			>
				<input
					placeholder={__('Search for an Icon')}
					className="component-icon-picker__search"
					type="text"
					value={searchTerm}
					onChange={setSearchTerm}
					id={`${id}--search-field`}
				/>
			</BaseControl>
			<Scrollable style={{ maxHeight: 200 }}>
				<NavigableMenu
					orientation="vertical"
					className="component-icon-picker__list"
					css={iconGridStyles}
				>
					{filteredIcons.map((icon) => {
						const isChecked =
							value?.name === icon.name && value?.iconSet === icon.iconSet;
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
