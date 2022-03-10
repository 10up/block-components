import { MediaPlaceholder } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import PropTypes from 'prop-types';

import { useMedia } from '../../hooks/use-media';

const Image = (props) => {
	const { id, size = 'full', onSelect, ...rest } = props;
	const hasImage = !!id;
	const { media, isResolvingMedia } = useMedia(id);

	if (!hasImage) {
		return <MediaPlaceholder onSelect={onSelect} accept="image" multiple={false} />;
	}

	if (isResolvingMedia) {
		<Spinner />;
	}

	const imageUrl = media?.media_details?.sizes[size]?.source_url ?? media?.source_url;
	const altText = media?.alt_text;

	return <img src={imageUrl} alt={altText} {...rest} />;
};

export { Image };

Image.defaultProps = {
	size: 'large',
};

Image.propTypes = {
	id: PropTypes.number.isRequired,
	size: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
};
