import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import PropTypes from 'prop-types';
import { usePost, useCanEditEntity } from '../../hooks';

export const PostExcerpt = (props) => {
	const { context, placeholder = __('Enter excerpt...', 'tenup'), ...rest } = props;
	const { postId, postType, isDescendentOfQueryLoop } = usePost(context);

	const userCanEditExcerpt = useCanEditEntity('postType', postType, postId);
	const [rawExcerpt = '', setExcerpt, fullExcerpt] = useEntityProp(
		'postType',
		postType,
		'excerpt',
		postId,
	);

	if (!userCanEditExcerpt || isDescendentOfQueryLoop) {
		// eslint-disable-next-line react/no-danger
		return <p {...rest} dangerouslySetInnerHTML={{ __html: fullExcerpt?.rendered }} />;
	}

	return (
		<RichText
			tagName="p"
			placeholder={placeholder}
			value={rawExcerpt}
			onChange={setExcerpt}
			allowedFormats={[]}
			{...rest}
		/>
	);
};

PostExcerpt.propTypes = {
	context: PropTypes.object,
	placeholder: PropTypes.string,
};

PostExcerpt.defaultProps = {
	context: {},
	placeholder: __('Enter excerpt...', 'tenup'),
};
