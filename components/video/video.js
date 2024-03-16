import { MediaPlaceholder } from '@wordpress/block-editor';
import { Spinner, Placeholder } from '@wordpress/components';

import { useMedia, PropTypes } from '@10up/block-components';

const Video = (props) => {
	const {
		id,
		size = 'full',
		onSelect,
		labels = {},
		canEditVideo = true,
		className = '',
		playsInline = true,
		autoPlay = false,
		loop = false,
		muted = true,
		controls = true,
	} = props;
	const hasVideo = !!id;
	const { media, isResolvingMedia } = useMedia(id);

	if (!hasVideo && !canEditVideo) {
		return <Placeholder className="block-editor-media-placeholder" withIllustration />;
	}

	if (!hasVideo && canEditVideo) {
		return (
			<MediaPlaceholder labels={labels} onSelect={onSelect} accept="video" multiple={false} />
		);
	}

	if (isResolvingMedia) {
		return <Spinner />;
	}

	const sourceUrl = media?.media_details?.sizes[size]?.source_url ?? media?.source_url;
	const mimeType = media?.media_details?.type ?? '';
	const altText = media?.alt_text;

	return (
		<video
			alt={altText}
			className={className}
			playsInline={playsInline}
			autoPlay={autoPlay}
			loop={loop}
			muted={muted}
			controls={controls}
		>
			<source src={sourceUrl} type={mimeType} />
		</video>
	);
};

Video.defaultProps = {
	labels: {},
	canEditVideo: true,
};

Video.propTypes = {
	id: PropTypes.number.isRequired,
	onSelect: PropTypes.func.isRequired,
	labels: PropTypes.shape({
		title: PropTypes.string,
		instructions: PropTypes.string,
	}),
	canEditVideo: PropTypes.bool,
};

export { Video };
