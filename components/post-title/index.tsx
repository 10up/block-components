import { useEntityProp } from '@wordpress/core-data';
import { RichText, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { usePost } from '../../hooks';

/**
 * Defines an object type with property `tagName` with type E.
 * `tagName` is the HTML tag name (e.g., "h1", "a") that can be used in JSX.
 */
type PolymorphicTagNameProp<E extends React.ElementType> = {
	tagName?: E;
};

type PolymorphicProps<E extends React.ElementType> = React.PropsWithChildren<React.ComponentPropsWithoutRef<E> & PolymorphicTagNameProp<E>>;

const defaultElement = 'h1';
export function PostTitle<E extends React.ElementType = typeof defaultElement>( { tagName, ...rest }: PolymorphicProps<E> ) {
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

	const TagName = tagName ?? defaultElement;

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

function LOL() {
	return (
		<>
			<PostTitle tagName='h1' id="lol" />
			<PostTitle tagName='h1' href="lol" />
			<PostTitle tagName='a' href="lol" />
			<PostTitle tagName='div' clipPath='what' />
		</>
	);
}
