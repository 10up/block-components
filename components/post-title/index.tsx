import { useEntityProp } from '@wordpress/core-data';
import { RichText, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { usePost } from '../../hooks';

interface PostTitleProps<T extends React.ElementType> {
	tagName?: T;
}

type PostTitlePropsWithOmit<T extends React.ElementType> = PostTitleProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof PostTitleProps<T>>;

export const PostTitle = <T extends React.ElementType = 'h1'>({
	tagName,
	...rest
}: PostTitlePropsWithOmit<T> ) => {
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

	const TagName = tagName ?? 'h1';

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

PostTitle.defaultProps = {
	tagName: 'h1',
};
