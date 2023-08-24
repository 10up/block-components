import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import {
	PostFeaturedImage,
	PostTitle,
	PostPrimaryCategory,
	PostDate,
	PostCategoryList,
	PostTermList,
	PostAuthor,
	PostExcerpt,
} from '@10up/block-components';

export const BlockEdit = () => {
	const blockProps = useBlockProps({ className: 'alignwide' });
	return (
		<header {...blockProps}>
			<figure className="wp-block-example-hero__media">
				<PostFeaturedImage className="wp-block-example-hero__image" />
			</figure>
			<PostPrimaryCategory className="wp-block-example-hero__category" />
			<PostTitle className="wp-block-example-hero__title" />
			<PostCategoryList className="wp-block-example-hero__categories">
				<PostCategoryList.ListItem className="wp-block-example-hero__category">
					<PostCategoryList.TermLink className="wp-block-example-hero__category-link" />
				</PostCategoryList.ListItem>
			</PostCategoryList>
			<PostTermList taxonomyName="post_tag" className="wp-block-example-hero__tags">
				<PostTermList.ListItem className="wp-block-example-hero__tag">
					<PostTermList.TermLink className="wp-block-example-hero__tag-link" />
				</PostTermList.ListItem>
			</PostTermList>
			<PostDate className="wp-block-example-hero__date" />
			<PostExcerpt className="wp-block-example-hero__excerpt" />
			<PostAuthor className="wp-block-example-hero__author">
				<PostAuthor.Avatar className="wp-block-example-hero__author-avatar" />
				<PostAuthor.Name className="wp-block-example-hero__author-name" />
				<PostAuthor.FirstName className="wp-block-example-hero__author-first-name" />
				<PostAuthor.LastName className="wp-block-example-hero__author-last-name" />
				<PostAuthor.Bio className="wp-block-example-hero__author-bio" />
			</PostAuthor>
		</header>
	)
};
