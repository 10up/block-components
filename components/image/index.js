import { MediaPlaceholder, InspectorControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { Spinner, FocalPointPicker, PanelBody, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { InlineControlsStyleWrapper } from './styles';
import { Replace, Remove } from './icons';

import { useMedia } from '../../hooks/use-media';

const ReplaceButton = () => {
	return (
		<>
			<span className="screen-reader-text">{__('Replace Image')}</span>
			<Replace />
		</>
	);
};

const RemoveButton = (onRemove) => {
	return (
		<ToolbarButton onClick={onRemove} className="remove-button">
			<span className="screen-reader-text">{__('Remove Image')}</span>
			<Remove />
		</ToolbarButton>
	);
};

const Image = (props) => {
	const {
		id,
		size = 'full',
		onSelect,
		focalPoint = undefined,
		onChangeFocalPoint,
		hasInlineControls = false,
		onRemove,
		isOptional = false,
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
			objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
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
			<InlineControlsStyleWrapper className="inline-controls-wrapper">
				{hasImage && !!hasInlineControls && (
					<div className="inline-controls">
						<MediaReplaceFlow
							mediaUrl={imageUrl}
							onSelect={onSelect}
							name={<ReplaceButton />}
						/>
						{!!isOptional && <RemoveButton onRemove={onRemove} />}
					</div>
				)}
				<img src={imageUrl} alt={altText} {...rest} />
			</InlineControlsStyleWrapper>
		</>
	);
};

export { Image };

Image.defaultProps = {
	size: 'large',
	focalPoint: undefined,
	onChangeFocalPoint: undefined,
	hasInlineControls: false,
	onRemove: undefined,
	isOptional: true,
};

Image.propTypes = {
	id: PropTypes.number.isRequired,
	size: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	onChangeFocalPoint: PropTypes.func,
	hasInlineControls: PropTypes.bool,
	focalPoint: PropTypes.shape({
		x: PropTypes.string,
		y: PropTypes.string,
	}),
	onRemove: PropTypes.func,
	isOptional: PropTypes.bool,
};
