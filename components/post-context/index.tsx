import { FC } from 'react';
import { useMemo } from '@wordpress/element';
import { PostContext as PostContextContext } from './context';

type PostContextProps = {
	children: React.ReactNode;
	postId?: number;
	postType?: string;
	isEditable?: boolean;
};

export const PostContext: FC<PostContextProps> = (props) => {
	const { children, postId, postType, isEditable } = props;

	const value = useMemo(
		() => ({
			postId,
			postType,
			isEditable,
		}),
		[postId, postType, isEditable],
	);

	return <PostContextContext.Provider value={value}>{children}</PostContextContext.Provider>;
};
