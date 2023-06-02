/**
 * wraps the Video component with controls to allow use for uploads in the sidebar
 */

import { Video } from './video';
import { MediaPlaceholder, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { Spinner, Placeholder, BaseControl, useBaseControlProps, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const VideoControl = ( props ) => {
	const {
		id,
		onSelect,
		labels: {
			title = __('Video upload'),
			instructions = __('Choose a video')
		},
		canEditVideo = true
	} = props;
	const hasVideo = !!id;

	const allowedTypes = [ 'video/webm', 'video/mp4' ];

	const { baseControlProps, controlProps } = useBaseControlProps( props );

	if ( !hasVideo && !canEditVideo ) {
		return <Placeholder className="block-editor-media-placeholder" withIllustration />;
	}

	if ( !hasVideo && canEditVideo ) {
		return (
			<BaseControl
				label={title}
				help={instructions}
				{ ...baseControlProps }
			>
				<MediaUploadCheck>
					<MediaUpload
						value={props.video}
						onSelect={onSelect}
						allowedTypes={allowedTypes}
						mode="upload"
						multiple={false}
						title={title}
						help={instructions}
						render={ ({open}) => (
							<Button variant="primary" onClick={open}>{__('Upload video (webm, mp4)')}</Button>
						)}
						{ ...controlProps }
					/>
				</MediaUploadCheck>
			</BaseControl>
		);
	}

	if ( hasVideo ) {
		return (
			<BaseControl
				title={title}
				{ ...baseControlProps }
			>
				<Video
					id={id}
					onSelect={onSelect}
					labels={{ title: title, instructions: instructions }}
				/>
				<MediaUploadCheck>
					<MediaUpload
						value={id}
						onSelect={onSelect}
						allowedTypes={allowedTypes}
						mode="upload"
						multiple={false}
						render={ ({open}) => (
							<Button variant="secondary" onClick={open}>{__("Change video (webm, mp4)")}</Button>
						)}
					/>
				</MediaUploadCheck>
			</BaseControl>
		);
	}
}

VideoControl.defaultProps = {
	labels: {
		title: __('Video upload'),
		instructions: __('Choose a video')
	},
	canEditVideo: true
}

VideoControl.propTypes = {
	id: PropTypes.number.isRequired,
	onSelect: PropTypes.func.isRequired,
	labels: PropTypes.shape({
		title: PropTypes.string,
		instructions: PropTypes.string,
	}),
	canEditVideo: PropTypes.bool,
}

export { VideoControl };
