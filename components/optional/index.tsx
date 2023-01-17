import { useBlockEditContext } from '@wordpress/block-editor';

type OptionalProps = {
	value: string;
	children: React.ReactNode;
};

export const Optional = ({ value, children }: OptionalProps) => {
	const { isSelected } = useBlockEditContext();
	return (isSelected || !!value) && children;
};


