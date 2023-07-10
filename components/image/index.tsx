import { MediaPlaceholder, InspectorControls } from '@wordpress/block-editor';
import { Spinner, FocalPointPicker, PanelBody, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';
import type { FC } from 'react';

import { useMedia } from '../../hooks/use-media';

type FocalPoint = {
	x: number,
	y: number,
};

type ImageProps = {
	id: number;
	size: string;
	onSelect(value: { id: number } & { [key: string]: any }): void;
	onChangeFocalPoint?(value: FocalPoint): void;
	focalPoint: FocalPoint;
	labels: {
		title: string;
		instructions: string;
	};
	canEditImage: boolean;
	[key: string]: any;
};

const Image: FC<ImageProps> = (props) => {
	const {
		id,
		size = 'full',
		onSelect,
		focalPoint = { x: 0.5, y: 0.5 },
		onChangeFocalPoint,
		labels = {},
		canEditImage = true,
		...rest
	} = props;
	const hasImage = !!id;
	const { media, isResolvingMedia } = useMedia(id);

	const shouldDisplayFocalPointPicker = typeof onChangeFocalPoint === 'function';

	if (!hasImage && !canEditImage) {
		return <Placeholder className="block-editor-media-placeholder" withIllustration />;
	}

	if (!hasImage && canEditImage) {
		return (
			<MediaPlaceholder labels={labels} onSelect={onSelect} accept="image" multiple={false} />
		);
	}

	if (isResolvingMedia) {
		return <Spinner />;
	}

	const imageUrl = media?.media_details?.sizes[size]?.source_url ?? media?.source_url;
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

export { Image };
