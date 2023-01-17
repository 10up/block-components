import { __ } from '@wordpress/i18n';
import { MediaReplaceFlow, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useMedia } from '../../hooks/use-media';
import React from 'react';

type MediaToolbarProps = {
	id: number;
	onSelect: (media: any) => void;
	onRemove: () => void;
	isOptional?: boolean;
};

/**
 * MediaToolbar
 *
 * This is a helper component that adds the Media Replace Flow
 * with some buttons to add or remove an image.
 *
 * This should be used on components that have optional images.
 */
export const MediaToolbar = (props: MediaToolbarProps) => {
	const { onSelect, onRemove, isOptional = false, id } = props;

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
