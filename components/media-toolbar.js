import { __ } from '@wordpress/i18n';
import { MediaReplaceFlow, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
const NAMESPACE = '10up-block-components';

/**
 * MediaToolbar
 *
 * This is a helper component that adds the Media Replace Flow
 * with some buttons to add or remove an image.
 *
 * This should be used on components that have optional images.
 *
 * @param {Object} props options
 * @return {Object} markup of the ToolbarGroup
 */
export function MediaToolbar(props) {
	const {
        onSelect,
        onRemove,
        isOptional = false,
        image,
    } = props;

    const hasImage = image?.url?.length;

	return (
		<ToolbarGroup>
			{hasImage ? (
				<>
					<MediaReplaceFlow
						mediaUrl={image.url}
						onSelect={onSelect}
						name={__('Replace Image', NAMESPACE)}
					/>
                    { !!isOptional (
                        <ToolbarButton onClick={onRemove}>
                            {__('Remove Image', NAMESPACE)}
                        </ToolbarButton>
                    ) }
				</>
			) : (
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelect}
						render={({ open }) => (
							<ToolbarButton onClick={open}>
								{__('Add Image', NAMESPACE)}
							</ToolbarButton>
						)}
					/>
				</MediaUploadCheck>
			)}
		</ToolbarGroup>
	);
}
