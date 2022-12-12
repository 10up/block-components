import { useEntityProp } from '@wordpress/core-data';
import { RichText, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import PropTypes from 'prop-types';
import { usePost } from '../../hooks';

export const PostTitle = (props) => {
	const { context, tagName: TagName = 'h1', ...rest } = props;
	const { postId, postType, isDescendentOfQueryLoop } = usePost(context);

	const [rawTitle = '', setTitle, fullTitle] = useEntityProp(
		'postType',
		postType,
		'title',
		postId,
	);

	const titlePlaceholder = useSelect(
		(select) => select(blockEditorStore).getSettings().titlePlaceholder,
		[],
	);

	if (isDescendentOfQueryLoop) {
		// eslint-disable-next-line react/no-danger
		return <TagName {...rest} dangerouslySetInnerHTML={{ __html: fullTitle?.rendered }} />;
	}

	return (
		<RichText
			tagName={TagName}
			placeholder={titlePlaceholder}
			value={rawTitle}
			onChange={setTitle}
			allowedFormats={[]}
			{...rest}
		/>
	);
};

PostTitle.propTypes = {
	context: PropTypes.object,
	tagName: PropTypes.string,
};

PostTitle.defaultProps = {
	context: {},
	tagName: 'h1',
};
