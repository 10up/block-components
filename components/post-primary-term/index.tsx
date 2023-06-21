import { __ } from '@wordpress/i18n';
import { FC } from 'react';
import { usePrimaryTerm } from '../../hooks';

export type PostPrimaryTermProps = {
	taxonomyName?: string;
	placeholder?: string;
	isLink?: boolean;
	[key: string]: any;
};

export const PostPrimaryTerm: FC<PostPrimaryTermProps> = (props) => {
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
