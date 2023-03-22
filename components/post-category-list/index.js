import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { PostTermList } from '../post-term-list';

export const PostCategoryList = PostTermList;

PostCategoryList.propTypes = {
	taxonomyName: PropTypes.string,
};

PostCategoryList.defaultProps = {
	taxonomyName: 'category',
	noResultsMessage: __('Please select a category', 'tenup'),
};
