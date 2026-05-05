import { Children } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { usePost } from '../../hooks';
import { Name, FirstName, LastName, Avatar, Bio, Email } from '../author';

import { AuthorContext } from '../author/context';
import type { Author } from '../author/context';

interface PostAuthorProps {
	children?: React.ReactNode | ((author: Author) => React.ReactNode);
	[key: string]: unknown;
}

export const PostAuthor: React.FC<PostAuthorProps> & {
	Name: typeof Name;
	FirstName: typeof FirstName;
	LastName: typeof LastName;
	Avatar: typeof Avatar;
	Bio: typeof Bio;
	Email: typeof Email;
} = (props) => {
	const { children, ...rest } = props;
	const { postId, postType } = usePost();

	const [author, hasResolved] = useSelect(
		(select) => {
			// @ts-ignore-next-line - The type definitions for the core store are incomplete.
			const { getEditedEntityRecord, getUser, hasFinishedResolution } = select(coreStore);

			const postQuery = ['postType', postType, postId as number] as const;

			const post = getEditedEntityRecord(...postQuery);
			const hasResolvedPost = hasFinishedResolution('getEditedEntityRecord', postQuery);

			// @ts-ignore-next-line - The type definitions for the core store are incomplete.
			const _authorId = hasResolvedPost ? post?.author : undefined;

			const author = getUser(_authorId);
			const hasResolvedAuthor = hasFinishedResolution('getUser', [_authorId]);

			return [author, hasResolvedAuthor && hasResolvedPost];
		},
		[postType, postId],
	);

	const hasRenderCallback = typeof children === 'function';

	const hasChildComponents = !hasRenderCallback && Children.count(children);

	if (!hasResolved) {
		return <Spinner />;
	}

	if (hasChildComponents) {
		return (
			<AuthorContext.Provider value={author}>
				<div {...rest}>{children}</div>
			</AuthorContext.Provider>
		);
	}

	if (hasRenderCallback) {
		return children(author);
	}

	return <Name {...rest} />;
};

PostAuthor.Name = Name;
PostAuthor.FirstName = FirstName;
PostAuthor.LastName = LastName;
PostAuthor.Avatar = Avatar;
PostAuthor.Bio = Bio;
PostAuthor.Email = Email;
