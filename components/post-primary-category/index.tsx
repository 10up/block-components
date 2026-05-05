import { __ } from '@wordpress/i18n';
import { PostPrimaryTerm } from '../post-primary-term';

interface PostPrimaryCategoryProps extends React.ComponentProps<typeof PostPrimaryTerm> {}

export const PostPrimaryCategory = ({
	placeholder = __('Select a category', 'tenup'),
	taxonomyName = 'category',
	isLink = true,
	...rest
}: PostPrimaryCategoryProps) => (
	<PostPrimaryTerm
		placeholder={placeholder}
		taxonomyName={taxonomyName}
		isLink={isLink}
		{...rest}
	/>
);
