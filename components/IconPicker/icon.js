/* eslint-disable react/no-danger */
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
	console.log(props);
	const { name, iconSet, onClick = () => {} } = props;
	const icon = useIcon(iconSet, name);

	if (!icon) {
		return <Spinner />;
	}

	return (
		<div
			onClick={onClick}
			role="button"
			tabIndex="0"
			aria-label="Change Icon"
			dangerouslySetInnerHTML={{ __html: icon.source }}
		/>
	);
};

Icon.defaultProps = {
	onClick: () => {
		console.log('Default');
	},
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	iconSet: PropTypes.string.isRequired,
};
