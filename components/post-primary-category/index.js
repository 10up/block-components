import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { usePrimaryTerm } from '../../hooks';

export const PostPrimaryCategory = (props) => {
	const {
		context,
		placeholder = __('Select a category', 'tenup'),
		isLink = true,
		...rest
	} = props;

	const [primaryCategory, isSupportedTaxonomy] = usePrimaryTerm('category', context);

	const hasPrimaryCategory = !!primaryCategory;

	const categoryString = hasPrimaryCategory ? primaryCategory.name : placeholder;
	const categoryUrl = hasPrimaryCategory ? primaryCategory.link : '#';

	if (!isSupportedTaxonomy) {
		return null;
	}

	const Tag = isLink ? 'a' : 'span';

	const wrapperProps = {
		...rest,
	};

	if (isLink) {
		wrapperProps.href = categoryUrl;
	}

	return <Tag {...wrapperProps}>{categoryString}</Tag>;
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
