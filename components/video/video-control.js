/**
 * wraps the Video component with controls to allow use for uploads in the sidebar
 */

import PropTypes from 'prop-types';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import {
	Placeholder,
	BaseControl,
	useBaseControlProps,
	Button,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Video } from './video';

const VideoControl = (props) => {
	const {
		id,
		allowedTypes = ['video/mp4'],
		onSelect,
		labels: { title = __('Video upload'), instructions = __('Choose a video') },
		canEditVideo = true,
		hideVideo = false,
		video,
		videoOptions = {
			playsInline: true,
			controls: true,
			muted: true,
			autoPlay: false,
			loop: false,
		},
		onChangeVideoOptions,
	} = props;
	const hasVideo = !!id;

	const { playsInline, controls, muted, autoPlay, loop } = videoOptions;

	const { baseControlProps, controlProps } = useBaseControlProps(props);

	if (!hasVideo && !canEditVideo) {
		return <Placeholder className="block-editor-media-placeholder" withIllustration />;
	}

	if (!hasVideo && canEditVideo) {
		return (
			<BaseControl label={title} help={instructions} {...baseControlProps}>
				<MediaUploadCheck>
					<MediaUpload
						value={video}
						onSelect={onSelect}
						allowedTypes={allowedTypes}
						mode="upload"
						multiple={false}
						title={title}
						help={instructions}
						render={({ open }) => (
							<Button variant="primary" onClick={open}>
								{__('Upload video (webm, mp4)')}
							</Button>
						)}
						{...controlProps}
					/>
				</MediaUploadCheck>
			</BaseControl>
		);
	}

	return (
		<BaseControl title={title} {...baseControlProps}>
			{!hideVideo && (
				<Video
					id={id}
					onSelect={onSelect}
					labels={{ title, instructions }}
					playsInline={playsInline}
					controls={controls}
					muted={muted}
					autoPlay={autoPlay}
					loop={loop}
				/>
			)}
			<MediaUploadCheck>
				<MediaUpload
					value={id}
					onSelect={onSelect}
					allowedTypes={allowedTypes}
					mode="upload"
					multiple={false}
					render={({ open }) => (
						<Button variant="secondary" onClick={open}>
							{__('Change video (webm, mp4)')}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			{onChangeVideoOptions && (
				<>
					<ToggleControl
						label={__('Autoplay video?')}
						checked={autoPlay}
						help={__('The video will attempt to play automatically on page load. Browser options may prevent this.')}
						onChange={(value) => {
							console.log(value);
							onChangeVideoOptions({ autoPlay: value, loop, muted });
						}}
					/>
					<ToggleControl
						label={__('Mute audio at beginning?')}
						checked={muted}
						help={__('The video will play muted. This may be the default in some browsers.')}
						onChange={(value) => {
							console.log(value);
							onChangeVideoOptions({ autoPlay, muted: value, loop });
						}}
					/>
					<ToggleControl
						label={__('Loop video?')}
						checked={loop}
						help={__('The video will play to its end, then begin again from the start.')}
						onChange={(value) => {
							console.log(value);
							onChangeVideoOptions({ autoPlay, muted, loop: value });
						}}
					/>
				</>
			)}
		</BaseControl>
	);
};

VideoControl.defaultProps = {
	labels: {
		title: __('Video upload'),
		instructions: __('Choose a video'),
	},
	canEditVideo: true,
	hideVideo: false,
	allowedTypes: ['video/mp4'],
	videoOptions: {
		playsInline: true,
		controls: true,
		muted: true,
		autoPlay: false,
		loop: false,
	},
	onChangeVideoOptions: null,
};

VideoControl.propTypes = {
	id: PropTypes.number.isRequired,
	onSelect: PropTypes.func.isRequired,
	labels: PropTypes.shape({
		title: PropTypes.string,
		instructions: PropTypes.string,
	}),
	canEditVideo: PropTypes.bool,
	hideVideo: PropTypes.bool,
	allowedTypes: PropTypes.array,
	videoOptions: PropTypes.shape({
		playsInline: PropTypes.bool,
		controls: PropTypes.bool,
		muted: PropTypes.bool,
		autoPlay: PropTypes.bool,
		loop: PropTypes.bool,
	}),
	onChangeVideoOptions: PropTypes.func,
};

export { VideoControl };
