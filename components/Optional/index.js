import PropTypes from 'prop-types';
import { useBlockEditContext } from '@wordpress/block-editor';

export const Optional = ({ value, children }) => {
	const { isSelected } = useBlockEditContext();
	return !!value && isSelected && children;
};

Optional.defaultProps = {
	value: '',
};

Optional.propTypes = {
	value: PropTypes.string,
	children: PropTypes.node.isRequired,
};
