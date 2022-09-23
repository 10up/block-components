import { MediaPlaceholder, InspectorControls } from '@wordpress/block-editor';
import { Spinner, FocalPointPicker, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

import { useMedia } from '../../hooks/use-media';

const Image = (props) => {
	const {
		id,
		size = 'full',
		onSelect,
		focalPoint = undefined,
		onChangeFocalPoint,
		...rest
	} = props;
	const hasImage = !!id;
	const { media, isResolvingMedia } = useMedia(id);

	const hasFocalPoint = !!focalPoint;

	if (hasFocalPoint && typeof onChangeFocalPoint !== 'function') {
		// eslint-disable-next-line no-console
		console.warn('onChangeFocalPoint is required when focalPoint is set');
	}

	if (!hasImage) {
		return <MediaPlaceholder onSelect={onSelect} accept="image" multiple={false} />;
	}

	if (isResolvingMedia) {
		return <Spinner />;
	}

	const imageUrl = media?.media_details?.sizes[size]?.source_url ?? media?.source_url;
	const altText = media?.alt_text;

	if (hasFocalPoint) {
		const focalPointStyle = {
			objectFit: 'cover',
			backgroundPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
		};

		rest.style = {
			...rest.style,
			...focalPointStyle,
		};
	}

	return (
		<>
			{hasFocalPoint && (
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
	focalPoint: undefined,
	onChangeFocalPoint: undefined,
};

Image.propTypes = {
	id: PropTypes.number.isRequired,
	size: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	onChangeFocalPoint: PropTypes.func,
	focalPoint: PropTypes.shape({
		x: PropTypes.string,
		y: PropTypes.string,
	}),
};
