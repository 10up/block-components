import PropTypes from 'prop-types';
import { Spinner } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { useIcon } from '../../hooks/use-icons';

/**
 * Icon
 *
 * @typedef IconProps
 * @property {string } name name of the icon
 * @property {string } iconSet name of the icon set
 *
 * @param {IconProps} props IconProps
 * @returns {*}
 */
export const Icon = forwardRef(function Icon(props, ref) {
	const { name, iconSet, onClick, ...rest } = props;
	const icon = useIcon(iconSet, name);

	if (!icon) {
		return <Spinner />;
	}

	// only add interactive props to component if a onClick handler was provided
	const iconProps = {};
	if (typeof onClick === 'function') {
		iconProps.role = 'button';
		iconProps.tabIndex = 0;
		iconProps['aria-label'] = 'Change Icon';
		iconProps.onClick = onClick;
	}

	return (
		// eslint-disable-next-line react/no-danger
		<div {...iconProps} dangerouslySetInnerHTML={{ __html: icon.source }} {...rest} ref={ref} />
	);
});

Icon.defaultProps = {
	onClick: undefined,
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	iconSet: PropTypes.string.isRequired,
};
