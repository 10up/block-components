import PropTypes from 'prop-types';
import { useBlockEditContext } from '@wordpress/block-editor';

interface OptionalProps {
	value?: string | number | boolean;
	children: React.ReactNode;
}

export const Optional: React.FC<OptionalProps> = ({
	value,
	children,
}): boolean | React.ReactNode => {
	const { isSelected } = useBlockEditContext();
	return (isSelected || !!value) && children;
};

Optional.defaultProps = {
	value: '',
};

Optional.propTypes = {
	value: PropTypes.string || PropTypes.bool || PropTypes.number,
	children: PropTypes.node.isRequired,
};
