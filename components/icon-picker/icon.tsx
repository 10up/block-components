import { Spinner } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { useIcon } from '../../hooks/use-icons';

interface IconProps {
	/**
	 * Name of the icon
	 */
	name: string;
	/**
	 * Name of the icon set
	 */
	iconSet: string;
	/**
	 * Click handler
	 */
	onClick?: () => void;
}

export const Icon: React.FC<IconProps> = forwardRef<HTMLDivElement, IconProps>(
	function Icon(props, ref) {
		const { name, iconSet, onClick, ...rest } = props;
		const icon = useIcon(iconSet, name);

		if (!icon || Array.isArray(icon)) {
			return <Spinner />;
		}

		// only add interactive props to component if a onClick handler was provided
		const iconProps: React.JSX.IntrinsicElements['div'] = {};
		if (typeof onClick === 'function') {
			iconProps.role = 'button';
			iconProps.tabIndex = 0;
			iconProps['aria-label'] = 'Change Icon';
			iconProps.onClick = onClick;
		}

		return (
			<div
				{...iconProps}
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{ __html: icon.source }}
				{...rest}
				ref={ref}
			/>
		);
	},
);
