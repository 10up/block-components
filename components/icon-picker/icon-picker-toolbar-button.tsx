import { __ } from '@wordpress/i18n';
import { Dropdown, ToolbarButton } from '@wordpress/components';
import styled from '@emotion/styled';

import { IconPicker, IconPickerProps } from './icon-picker';
import { Icon } from './icon';

const StyledIconPickerDropdown = styled(IconPicker)`
	margin: 6px;
	width: 248px;
	height: 248px;
`;

interface IconPickerToolbarButtonProps extends IconPickerProps {
	/**
	 * Label for the button
	 */
	buttonLabel?: string;
	/**
	 * Optionally specify the icon set to use
	 * If not specified, all icon sets will be used
	 */
	iconSet?: string;
}

export const IconPickerToolbarButton: React.FC<IconPickerToolbarButtonProps> = (props) => {
	const { value, buttonLabel = __('Select Icon') } = props;

	const buttonIcon =
		value?.name && value?.iconSet ? <Icon name={value?.name} iconSet={value?.iconSet} /> : null;

	return (
		<Dropdown
			className="component-icon-picker-toolbar-button"
			contentClassName="component-icon-picker-toolbar-button__content"
			popoverProps={{
				placement: 'bottom-start',
			}}
			renderToggle={({ isOpen, onToggle }) => (
				<ToolbarButton onClick={onToggle} aria-expanded={isOpen} icon={buttonIcon}>
					{buttonLabel}
				</ToolbarButton>
			)}
			renderContent={() => <StyledIconPickerDropdown {...props} />}
		/>
	);
};
