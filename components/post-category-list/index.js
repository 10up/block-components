import PropTypes from 'prop-types';
import { PostTermList } from '../post-term-list';

export const PostCategoryList = PostTermList;

PostCategoryList.propTypes = {
	taxonomyName: PropTypes.string,
};

PostCategoryList.defaultProps = {
	taxonomyName: 'category',
};
