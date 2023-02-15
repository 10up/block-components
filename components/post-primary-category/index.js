import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { PostPrimaryTerm } from '../post-primary-term';

export const PostPrimaryCategory = PostPrimaryTerm;

PostPrimaryCategory.propTypes = {
	placeholder: PropTypes.string,
	taxonomyName: PropTypes.string,
	isLink: PropTypes.bool,
};

PostPrimaryCategory.defaultProps = {
	placeholder: __('Select a category', 'tenup'),
	taxonomyName: 'category',
	isLink: true,
};
