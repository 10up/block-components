import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { usePost } from '../../hooks';

interface PostExcerptProps {
	/**
	 * The placeholder to show when no excerpt is set.
	 */
	placeholder?: string;

	/**
	 * Remaining props to pass to the paragraph element.
	 */
	[key: string]: unknown;
}

export const PostExcerpt = ({
	placeholder = __('Enter excerpt...', 'tenup'),
	...rest
}: PostExcerptProps) => {
	const { postId, postType, isEditable } = usePost();

	const [rawExcerpt = '', setExcerpt, fullExcerpt] = useEntityProp(
		'postType',
		postType,
		'excerpt',
		postId as string,
	);

	if (!isEditable) {
		// eslint-disable-next-line react/no-danger
		return <p {...rest} dangerouslySetInnerHTML={{ __html: fullExcerpt?.rendered }} />;
	}

	return (
		<RichText
			tagName="p"
			placeholder={placeholder}
			value={rawExcerpt}
			onChange={(value: string) => setExcerpt(value)}
			allowedFormats={[]}
			{...rest}
		/>
	);
};
