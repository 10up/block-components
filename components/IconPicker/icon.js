import PropTypes from 'prop-types';

import { Spinner } from '@wordpress/components';
import { RawHTML } from '@wordpress/element';
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
	const { name, iconSet } = props;
	const icon = useIcon(iconSet, name);

	if (!icon) {
		return <Spinner />;
	}

	return <RawHTML>{icon.source}</RawHTML>;
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	iconSet: PropTypes.string.isRequired,
};
