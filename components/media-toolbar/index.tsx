import { __ } from '@wordpress/i18n';
import { MediaReplaceFlow, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useMedia } from '../../hooks/use-media';
import type { Attachment } from '@wordpress/core-data';

interface MediaToolbarProps {
	/**
	 * Callback to handle the selection of a media.
	 */
	onSelect: (media: Attachment) => void;

	/**
	 * Callback to handle the removal of a media.
	 */
	onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;

	/**
	 * Wether or not the Remove Image button should be shown.
	 */
	isOptional?: boolean;

	/**
	 * The ID of the media, in this case the image.
	 */
	id: number;
}

/**
 * MediaToolbar
 *
 * This is a helper component that adds the Media Replace Flow
 * with some buttons to add or remove an image.
 *
 * This should be used on components that have optional images.
 *
 * @param {object} props options
 * @returns {React.ReactElement} markup of the ToolbarGroup
 */
export const MediaToolbar: React.FC<MediaToolbarProps> = ( { onSelect, onRemove, isOptional = false, id } ) => {
	const hasImage = !!id;
	const { media } = useMedia(id);

	return (
		<ToolbarGroup label={__('Media', '10up-block-components')}>
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
