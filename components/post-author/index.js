import { Children } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import PropTypes from 'prop-types';
import { usePost } from '../../hooks';
import { Name, FirstName, LastName, Avatar, Bio, Email } from '../author';

import { AUTHOR_CONTEXT } from '../author/context';

export const PostAuthor = (props) => {
	const { context, children, ...rest } = props;
	const { postId, postType } = usePost(context);

	const [author, hasResolved] = useSelect(
		(select) => {
			const { getEditedEntityRecord, getUser, hasFinishedResolution } = select(coreStore);

			const postQuery = ['postType', postType, postId];

			const post = getEditedEntityRecord(...postQuery);
			const hasResolvedPost = hasFinishedResolution('getEditedEntityRecord', postQuery);

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
			<AUTHOR_CONTEXT.Provider value={author}>
				<div {...rest}>{children}</div>
			</AUTHOR_CONTEXT.Provider>
		);
	}

	if (hasRenderCallback) {
		return children(author);
	}

	return <Name {...rest} />;
};

PostAuthor.propTypes = {
	context: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};

PostAuthor.defaultProps = {
	context: {},
	children: null,
};

PostAuthor.Name = Name;
PostAuthor.FirstName = FirstName;
PostAuthor.LastName = LastName;
PostAuthor.Avatar = Avatar;
PostAuthor.Bio = Bio;
PostAuthor.Email = Email;
