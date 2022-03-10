import { __ } from '@wordpress/i18n';
import { MediaReplaceFlow, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useMedia } from '../../hooks/use-media';

/**
 * MediaToolbar
 *
 * This is a helper component that adds the Media Replace Flow
 * with some buttons to add or remove an image.
 *
 * This should be used on components that have optional images.
 *
 * @param {object} props options
 * @returns {object} markup of the ToolbarGroup
 */
export const MediaToolbar = (props) => {
	const { onSelect, onRemove, isOptional = false, id } = props;

	const hasImage = !!id;
	const { media } = useMedia(id);

	return (
		<ToolbarGroup>
			{hasImage ? (
				<>
					<MediaReplaceFlow
						mediaUrl={media?.source_url}
						onSelect={onSelect}
						name={__('Replace Image', '10up-block-components')}
					/>
					{!!isOptional && (
						<ToolbarButton onClick={onRemove}>
							{__('Remove Image', '10up-block-components')}
						</ToolbarButton>
					)}
				</>
			) : (
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelect}
						render={({ open }) => (
							<ToolbarButton onClick={open}>
								{__('Add Image', '10up-block-components')}
							</ToolbarButton>
						)}
					/>
				</MediaUploadCheck>
			)}
		</ToolbarGroup>
	);
};
