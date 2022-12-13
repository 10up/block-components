import PropTypes from 'prop-types';
import { useMemo } from '@wordpress/element';
import { DEFAULT_POST_CONTEXT, POST_CONTEXT } from './context';

export const PostContext = (props) => {
	const { children, postId, postType, isEditable } = props;

	const value = useMemo(
		() => ({
			postId,
			postType,
			isEditable,
		}),
		[postId, postType, isEditable],
	);

	return <POST_CONTEXT.Provider value={value}>{children}</POST_CONTEXT.Provider>;
};

PostContext.propTypes = {
	children: PropTypes.node.isRequired,
	postId: PropTypes.number,
	postType: PropTypes.string,
	isEditable: PropTypes.bool,
};

PostContext.defaultProps = DEFAULT_POST_CONTEXT;
