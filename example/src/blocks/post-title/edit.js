import { useBlockProps } from '@wordpress/block-editor';
import { PostTitle } from '@10up/block-components';

export const BlockEdit = ({context}) => {
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<PostTitle context={context} />
		</div>
	)
};