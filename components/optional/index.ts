// @ts-ignore-next-line - The WordPress types are missing the hasFinishedResolution method.
import { useBlockEditContext } from '@wordpress/block-editor';

interface OptionalProps {
	/**
	 * The value to check for truthiness.
	 */
	value?: string | number | boolean;

	/**
	 * The children to render if the value is truthy.
	 */
	children: React.ReactNode;
}

export const Optional: React.FC<OptionalProps> = ({ value = '', children }) => {
	const { isSelected } = useBlockEditContext();
	return (isSelected || !!value) && children;
};
