import { InnerBlockSlider } from '@10up/block-components';
import { useBlockProps } from '@wordpress/block-editor';

export const BlockEdit = (props) => {
	const { clientId } = props;
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<InnerBlockSlider
				allowedBlock="core/cover"
				slidesPerPage={1}
				parentBlockId={clientId}
			/>
		</div>
	);
};

