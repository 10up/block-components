import PropTypes from 'prop-types';
import { useContext, createContext } from '@wordpress/element';
import { MediaPlaceholder, InspectorControls } from '@wordpress/block-editor';
import { Spinner, FocalPointPicker, PanelBody, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const ImageContext = createContext();

export const Media = (props) => {
	const { style } = props;
	const {
		imageUrl,
		altText,
		labels,
		onSelect,
		isResolvingMedia,
		shouldDisplayFocalPointPicker,
		focalPoint,
		onChangeFocalPoint,
		canEditImage,
		hasImage,
	} = useContext(ImageContext);

	let focalPointStyle = {};

	if (shouldDisplayFocalPointPicker) {
		focalPointStyle = {
			objectFit: 'cover',
			objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
		};
	}

	if (isResolvingMedia) {
		return <Spinner />;
	}

	if (!hasImage && !canEditImage) {
		return <Placeholder className="block-editor-media-placeholder" withIllustration />;
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
			{hasImage && (
				<img
					src={imageUrl}
					alt={altText}
					style={{ ...style, focalPointStyle }}
					{...props}
				/>
			)}
			{canEditImage && (
				<MediaPlaceholder
					labels={labels}
					onSelect={onSelect}
					accept="image"
					multiple={false}
					disableMediaButtons={imageUrl}
				/>
			)}
		</>
	);
};

Media.defaultProps = {
	style: {},
};

Media.propTypes = {
	style: PropTypes.object,
};
