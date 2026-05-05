import styled from '@emotion/styled';
import { Dropdown } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

import { IconPicker, IconPickerProps } from './icon-picker';
import { Icon } from './icon';

const StyledIconPickerDropdown = styled(IconPicker)`
	margin: 6px;
	width: 248px;
	height: 248px;
`;

interface InlineIconPickerProps extends IconPickerProps {
	/**
	 * Render function for the toggle button
	 * @param props
	 */
	renderToggle: (props: { onToggle: () => void }) => React.JSX.Element;
	/**
	 * Optionally specify the icon set to use
	 * If not specified, all icon sets will be used
	 */
	iconSet?: string;
}

export const IconPickerDropdown: React.FC<InlineIconPickerProps> = (props) => {
	const { renderToggle, ...iconPickerProps } = props;
	return (
		<Dropdown
			className="component-icon-picker-inline-button"
			contentClassName="component-icon-picker-inline__content"
			popoverProps={{ placement: 'bottom-start' }}
			renderToggle={renderToggle}
			renderContent={() => <StyledIconPickerDropdown {...iconPickerProps} />}
		/>
	);
};

export const InlineIconPicker: React.FC<IconPickerProps> = (props) => {
	const { value, ...rest } = props;
	const IconButton = useCallback(
		({ onToggle }: { onToggle: () => void }) => (
			<Icon name={value?.name} iconSet={value?.iconSet} onClick={onToggle} {...rest} />
		),
		[value, rest],
	);

	return <IconPickerDropdown renderToggle={IconButton} {...props} />;
};
