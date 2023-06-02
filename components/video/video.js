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
	const altText = media?.alt_text;

	return <video controls src={sourceUrl} alt={altText} className={className} />;
};

Video.defaultProps = {
	labels: {},
	canEditVideo: true,
	size: 'full',
	className: '',
};

Video.propTypes = {
	id: PropTypes.number.isRequired,
	size: PropTypes.string,
	className: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	labels: PropTypes.shape({
		title: PropTypes.string,
		instructions: PropTypes.string,
	}),
	canEditVideo: PropTypes.bool,
};

export { Video };
