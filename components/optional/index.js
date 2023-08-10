import PropTypes from 'prop-types';
import { useBlockEditContext } from '@wordpress/block-editor';

export const Optional = ({ value, children }) => {
	const { isSelected } = useBlockEditContext();
	return (isSelected || !!value) && children;
};

Optional.defaultProps = {
	value: '',
};

Optional.propTypes = {
	value: PropTypes.string || PropTypes.bool,
	children: PropTypes.node.isRequired,
};
