import PropTypes from 'prop-types';
import { Spinner } from '@wordpress/components';
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
export const Icon = (props) => {
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

	// eslint-disable-next-line react/no-danger
	return <div {...iconProps} dangerouslySetInnerHTML={{ __html: icon.source }} {...rest} />;
};

Icon.defaultProps = {
	onClick: undefined,
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	iconSet: PropTypes.string.isRequired,
};
