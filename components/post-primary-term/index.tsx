import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { usePrimaryTerm } from '../../hooks';

interface PostPrimaryTermProps {
	/**
	 * The taxonomy name to get the primary term for.
	 */
	taxonomyName?: string;

	/**
	 * The placeholder to show when no term is set.
	 */
	placeholder?: string;

	/**
	 * Whether the term should be a link.
	 */
	isLink?: boolean;

	/**
	 * Remaining props to pass to the element.
	 */
	[key: string]: unknown;
}

export const PostPrimaryTerm = ({
	taxonomyName = 'category',
	placeholder = __('Select a term', 'tenup'),
	isLink = true,
	...rest
}: PostPrimaryTermProps) => {
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

	return <Tag {...wrapperProps}>{decodeEntities(termString)}</Tag>;
};
