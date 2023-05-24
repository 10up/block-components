import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { usePrimaryTerm } from '../../hooks';

export const PostPrimaryTerm = (props) => {
	const {
		taxonomyName = 'category',
		placeholder = __('Select a term', 'tenup'),
		isLink = true,
		...rest
	} = props;

	const [primaryTerm, isSupportedTaxonomy] = usePrimaryTerm(taxonomyName);

	const hasPrimaryTerm = !!primaryTerm;

	const termString = hasPrimaryTerm ? primaryTerm.name : placeholder;
	const termUrl = hasPrimaryTerm ? primaryTerm.link : '#';

	if (!isSupportedTaxonomy) {
		return null;
	}

	const Tag = isLink ? 'a' : 'span';

	const wrapperProps = {
		...rest,
	};

	if (isLink) {
		wrapperProps.href = termUrl;
	}

	return <Tag {...wrapperProps}>{termString}</Tag>;
};

PostPrimaryTerm.propTypes = {
	placeholder: PropTypes.string,
	taxonomyName: PropTypes.string,
	isLink: PropTypes.bool,
};

PostPrimaryTerm.defaultProps = {
	placeholder: __('Select a Term', 'tenup'),
	isLink: true,
	taxonomyName: 'category',
};
