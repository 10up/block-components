import { MediaPlaceholder, InspectorControls } from '@wordpress/block-editor';
import { Spinner, FocalPointPicker, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { useRefEffect } from '@wordpress/compose';
import { useState } from '@wordpress/element';

import { useMedia } from '../../hooks/use-media';

const Image = (props) => {
	const {
		id,
		size = 'full',
		onSelect,
		focalPoint = { x: 0.5, y: 0.5 },
		onChangeFocalPoint,
		fallback,
		...rest
	} = props;
	const hasImage = !!id && id !== -1;
	const { media, isResolvingMedia } = useMedia(id);

	const shouldDisplayFocalPointPicker = typeof onChangeFocalPoint === 'function';

	if (!hasImage) {
		return <MediaPlaceholder onSelect={onSelect} accept="image" multiple={false} />;
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

	const [isBlockPreview, setIsBlockPreview] = useState(false);

	const ref = useRefEffect((node) => {
		const isRenderedInsideIframe = node.ownerDocument.documentElement.classList.contains(
			'block-editor-block-preview__content-iframe',
		);

		setIsBlockPreview(isRenderedInsideIframe);
	});

	if (isBlockPreview && hasFallbackImage) {
		rest.style = {
			...rest.style,
			maxWidth: '100%',
		};
		return <img src={fallback} alt="" ref={ref} {...rest} />;
	}

	if (!hasImage) {
		return (
			<>
				<MediaPlaceholder onSelect={onSelect} accept="image" multiple={false} />
				<span
					style={{
						border: 0,
						clip: 'rect(1px, 1px, 1px, 1px)',
						clipPath: 'inset(50%)',
						height: '1px',
						margin: '-1px',
						overflow: 'hidden',
						padding: 0,
						position: 'absolute',
						width: '1px',
						wordWrap: 'normal !important',
					}}
					ref={ref}
				/>
			</>
		);
	}

	if (isResolvingMedia) {
		return <Spinner />;
	}

	const imageUrl = media?.media_details?.sizes[size]?.source_url ?? media?.source_url;
	const altText = media?.alt_text;

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

Image.defaultProps = {
	size: 'large',
	fallback: '',
	focalPoint: { x: 0.5, y: 0.5 },
	onChangeFocalPoint: undefined,
};

Image.propTypes = {
	id: PropTypes.number.isRequired,
	size: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	fallback: PropTypes.string,
	onChangeFocalPoint: PropTypes.func,
	focalPoint: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}),
};
