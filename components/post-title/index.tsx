import { useEntityProp } from '@wordpress/core-data';
import { RichText, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { usePost } from '../../hooks';

interface PostTitleProps
	extends Omit<React.ComponentPropsWithoutRef<typeof RichText>, 'value' | 'onChange'> {}

export const PostTitle = ({ tagName: TagName = 'h1', ...rest }: PostTitleProps) => {
	const { postId, postType, isEditable } = usePost();

	const [rawTitle = '', setTitle, fullTitle] = useEntityProp(
		'postType',
		postType,
		'title',
		postId as undefined | string,
	);

	const titlePlaceholder = useSelect(
		// @ts-ignore-next-line - The type definitions for the block-editor store are incomplete.
		(select) => select(blockEditorStore).getSettings().titlePlaceholder,
		[],
	);

	if (!isEditable) {
		// @ts-ignore-next-line
		return <TagName {...rest} dangerouslySetInnerHTML={{ __html: fullTitle?.rendered }} />;
	}

	return (
		<RichText
			tagName={TagName}
			placeholder={titlePlaceholder}
			value={rawTitle}
			onChange={(value: string) => setTitle(value)}
			allowedFormats={[]}
			{...rest}
		/>
	);
};
