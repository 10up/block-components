import { useBlockEditContext } from '@wordpress/block-editor';

interface OptionalProps {
	value?: string | number | boolean;
	children: React.ReactNode;
}

export const Optional: React.FC<OptionalProps> = ({
	value,
	children,
}) => {
	const { isSelected } = useBlockEditContext();
	return (isSelected || !!value) && children;
};

Optional.defaultProps = {
	value: '',
};
