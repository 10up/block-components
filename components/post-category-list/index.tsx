import { __ } from '@wordpress/i18n';
import { PostTermList } from '../post-term-list';

export const PostCategoryList = ({
	taxonomyName = 'category',
	noResultsMessage = __('Please select a category', 'tenup'),
	...rest
}) => <PostTermList taxonomyName={taxonomyName} noResultsMessage={noResultsMessage} {...rest} />;

PostCategoryList.ListItem = PostTermList.ListItem;
PostCategoryList.TermLink = PostTermList.TermLink;
