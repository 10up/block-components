import { FC } from 'react';
import { MediaPlaceholder, InspectorControls } from '@wordpress/block-editor';
import { Spinner, FocalPointPicker, PanelBody, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { useMedia } from '../../hooks/use-media';

interface ImageProps {
	id: number;
	size?: string;
	onSelect: (media: any) => void; // Define a more specific type for media if possible
	focalPoint?: { x: number; y: number };
	onChangeFocalPoint?: (focalPoint: { x: number; y: number }) => void;
	labels?: { [key: string]: string };
	canEditImage?: boolean;
	allowedTypes?: string[];
	[key: string]: any; // For additional props spread onto the img element
}

export const Image: FC<ImageProps> = ({
	id,
	size = 'full',
	onSelect,
	focalPoint = { x: 0.5, y: 0.5 },
	onChangeFocalPoint = undefined,
	labels = {},
	canEditImage = true,
	allowedTypes = ['image'],
	...rest
}) => {
	const hasImage = !!id;
	const { media, isResolvingMedia } = useMedia(id);

	const shouldDisplayFocalPointPicker = typeof onChangeFocalPoint === 'function';

	if (!hasImage && !canEditImage) {
		return <Placeholder className="block-editor-media-placeholder" withIllustration />;
	}

	if (!hasImage && canEditImage) {
		return (
			<MediaPlaceholder
				labels={labels}
				onSelect={onSelect}
				accept="image"
				multiple={false}
				allowedTypes={allowedTypes}
			/>
		);
	}

	if (isResolvingMedia) {
		return <Spinner />;
	}
	// @ts-ignore-next-line - The media object is not typed by WordPress currently
	const imageUrl = media?.media_details?.sizes?.[size]?.source_url ?? media?.source_url;
	const altText = media?.alt_text;

	if (shouldDisplayFocalPointPicker) {
		const focalPointStyle = {
			objectFit: 'cover',
			objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
		};

		rest.style = {
			...rest.style,
			...focalPointStyle,
		};
	}

	return (
		<>
			{shouldDisplayFocalPointPicker && (
				<InspectorControls>
					<PanelBody title={__('Image Settings')}>
						<FocalPointPicker
							label={__('Focal Point Picker')}
							url={imageUrl}
							value={focalPoint}
							onChange={onChangeFocalPoint}
						/>
					</PanelBody>
				</InspectorControls>
			)}
			<img src={imageUrl} alt={altText} {...rest} />
		</>
	);
};
