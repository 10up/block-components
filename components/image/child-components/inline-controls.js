import { __ } from '@wordpress/i18n';
import { MediaReplaceFlow } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */

export const InlineControls = (props) => {
	const { imageUrl, onSelect, isOptional, onRemove } = props;

	return (
		<div className="inline-controls-sticky-wrapper">
			<div className="inline-controls">
				<MediaReplaceFlow mediaUrl={imageUrl} onSelect={onSelect} name={__('Replace')} />
				{!!isOptional && (
					<ToolbarButton onClick={onRemove} className="remove-button">
						{__('Remove')}
					</ToolbarButton>
				)}
			</div>
		</div>
	);
};

InlineControls.defaultProps = {
	imageUrl: '',
	onSelect: undefined,
	isOptional: false,
	onRemove: undefined,
};

InlineControls.propTypes = {
	imageUrl: PropTypes.string,
	onSelect: PropTypes.func,
	isOptional: PropTypes.bool,
	onRemove: PropTypes.func,
};
