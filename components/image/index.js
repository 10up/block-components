import { MediaPlaceholder, InspectorControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { useContext, useMemo, Children, createContext } from '@wordpress/element';
import {
	Spinner,
	FocalPointPicker,
	PanelBody,
	Placeholder,
	ToolbarButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { StyledComponentContext } from '../styled-components-context';
import { InlineControlsStyleWrapper } from './styles';
import { useMedia } from '../../hooks/use-media';

export const ImageContext = createContext();

const ImageWrapper = (props) => {
	const {
		id,
		size = 'full',
		onSelect,
		focalPoint = { x: 0.5, y: 0.5 },
		onChangeFocalPoint,
		labels = {},
		canEditImage = true,
		children,
		hasInlineControls = false,
		isOptional = true,
		onRemove,
		...rest
	} = props;
	const hasImage = !!id;
	const { media, isResolvingMedia } = useMedia(id);

	const hasRenderCallback = typeof children === 'function';
	const hasChildComponents = !hasRenderCallback && Children.count(children);

	const shouldDisplayFocalPointPicker = typeof onChangeFocalPoint === 'function';

	const imageUrl = media?.media_details?.sizes[size]?.source_url ?? media?.source_url;
	const altText = media?.alt_text;

	const imageContext = useMemo(() => {
		return {
			id,
			size,
			focalPoint,
			onChangeFocalPoint,
			imageUrl,
			altText,
			labels,
			canEditImage,
			onSelect,
			isResolvingMedia,
			shouldDisplayFocalPointPicker,
			hasImage,
		};
	}, [
		id,
		size,
		focalPoint,
		onChangeFocalPoint,
		imageUrl,
		altText,
		labels,
		canEditImage,
		onSelect,
		isResolvingMedia,
		shouldDisplayFocalPointPicker,
		hasImage,
	]);

	if (hasRenderCallback) {
		return children({
			hasImage,
			imageUrl,
			altText,
			focalPoint,
			labels,
			canEditImage,
			onSelect,
		});
	}

	if (hasChildComponents) {
		return <ImageContext.Provider value={imageContext}>{children}</ImageContext.Provider>;
	}

	if (!hasImage && canEditImage) {
		return (
			<MediaPlaceholder
				labels={labels}
				onSelect={onSelect}
				accept="image"
				multiple={false}
				disableMediaButtons={imageUrl}
			/>
		);
	}

	return (
		<ImageContext.Provider value={imageContext}>
			<Figure>
				<Image {...rest} />
				{hasImage && !!hasInlineControls && (
					<div className="inline-controls-sticky-wrapper">
						<div className="inline-controls">
							<MediaReplaceFlow
								mediaUrl={imageUrl}
								onSelect={onSelect}
								name={__('Replace')}
							/>
							{!!isOptional && (
								<ToolbarButton onClick={onRemove} className="remove-button">
									{__('Remove')}
								</ToolbarButton>
							)}
						</div>
					</div>
				)}
			</Figure>
		</ImageContext.Provider>
	);
};

export { ImageWrapper as Image };

ImageWrapper.defaultProps = {
	size: 'large',
	focalPoint: { x: 0.5, y: 0.5 },
	onChangeFocalPoint: undefined,
	labels: {},
	canEditImage: true,
	hasInlineControls: false,
	isOptional: true,
	onRemove: undefined,
	children: [],
};

ImageWrapper.propTypes = {
	id: PropTypes.number.isRequired,
	size: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	onChangeFocalPoint: PropTypes.func,
	focalPoint: PropTypes.shape({
		x: PropTypes.string,
		y: PropTypes.string,
	}),
	labels: PropTypes.shape({
		title: PropTypes.string,
		instructions: PropTypes.string,
	}),
	canEditImage: PropTypes.bool,
	hasInlineControls: PropTypes.bool,
	isOptional: PropTypes.bool,
	onRemove: PropTypes.func,
	children: PropTypes.array,
};

const Figure = (props) => {
	const { style, children, ...rest } = props;

	return (
		<StyledComponentContext cacheKey="tenup-component-image">
			<InlineControlsStyleWrapper {...style} {...rest}>
				{children}
			</InlineControlsStyleWrapper>
		</StyledComponentContext>
	);
};

Figure.defaultProps = {
	style: {},
	children: [],
};

Figure.propTypes = {
	style: PropTypes.object,
	children: PropTypes.array,
};

const Image = (props) => {
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

	if (shouldDisplayFocalPointPicker) {
		const focalPointStyle = {
			objectFit: 'cover',
			objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
		};

		props.styles = {
			...style,
			...focalPointStyle,
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
			{hasImage && <img src={imageUrl} alt={altText} {...props} />}
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

Image.defaultProps = {
	style: {},
};

Image.propTypes = {
	style: PropTypes.object,
};
