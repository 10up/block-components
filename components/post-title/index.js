import { useEntityProp } from '@wordpress/core-data';
import { RichText, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import PropTypes from 'prop-types';
import { usePost } from '../../hooks';

export const PostTitle = (props) => {
	const { tagName: TagName, ...rest } = props;
	const { postId, postType, isEditable } = usePost();

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

	if (!isEditable) {
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
	tagName: PropTypes.string,
};

PostTitle.defaultProps = {
	tagName: 'h1',
};
