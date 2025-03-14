import { __ } from '@wordpress/i18n';
// @ts-ignore-next-line - The types for this package are incorrect.
import { MediaReplaceFlow, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import type { Attachment } from '@wordpress/core-data';
import { useMedia } from '../../hooks/use-media';

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
	 * Whether or not the Remove Image button should be shown.
	 */
	isOptional?: boolean;

	/**
	 * The ID of the media, in this case the image.
	 */
	id: number;

	/**
	 * Labels for the buttons.
	 */
	labels?: {
		replace?: string;
		remove?: string;
		add?: string;
	};
}

const DEFAULT_LABELS = {
	add: __('Add Image', '10up-block-components'),
	remove: __('Remove Image', '10up-block-components'),
	replace: __('Replace Image', '10up-block-components'),
};

/*
 * MediaToolbar
 *
 * This is a helper component that adds the Media Replace Flow
 * with some buttons to add or remove an image.
 *
 * This should be used on components that have optional images.
 */
export const MediaToolbar: React.FC<MediaToolbarProps> = ({
	onSelect,
	onRemove,
	isOptional = false,
	id,
	labels = {},
}) => {
	const hasImage = !!id;
	const { media } = useMedia(id);
	const mergedLabels = { ...DEFAULT_LABELS, ...labels };

	return (
		<ToolbarGroup>
			{hasImage ? (
				<>
					<MediaReplaceFlow
						mediaId={id}
						mediaUrl={media?.source_url}
						onSelect={onSelect}
						name={mergedLabels.replace}
					/>
					{!!isOptional && (
						<ToolbarButton onClick={onRemove}>{mergedLabels.remove}</ToolbarButton>
					)}
				</>
			) : (
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelect}
						render={({ open }) => (
							<ToolbarButton onClick={open}>{mergedLabels.add}</ToolbarButton>
						)}
					/>
				</MediaUploadCheck>
			)}
		</ToolbarGroup>
	);
};
