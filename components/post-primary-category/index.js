import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { PostPrimaryTerm } from '../post-primary-term';

export const PostPrimaryCategory = (props) => {
	const {
		context,
		placeholder = __('Select a category', 'tenup'),
		isLink = true,
		...rest
	} = props;

	return (
		<PostPrimaryTerm
			context={context}
			taxonomyName="category"
			placeholder={placeholder}
			isLink={isLink}
			{...rest}
		/>
	);
};

PostPrimaryCategory.propTypes = {
	context: PropTypes.object,
	placeholder: PropTypes.string,
	isLink: PropTypes.bool,
};

PostPrimaryCategory.defaultProps = {
	context: {},
	placeholder: __('Select a category', 'tenup'),
	isLink: true,
};
