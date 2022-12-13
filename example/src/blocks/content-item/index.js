import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { PostContext, PostFeaturedImage, PostTitle, PostPrimaryCategory, PostDate, PostCategoryList } from '@10up/block-components';
import { PostAuthor, PostExcerpt, PostCoAuthors } from '../../../../components';

const NAMESPACE = 'example';

registerBlockType(`${NAMESPACE}/content-item`, {
	apiVersion: 2,
	title: __('Content Item', NAMESPACE),
	icon: 'smiley',
	category: 'common',
	example: {},
	supports: {
		html: false
	},
	attributes: {},
	transforms: {},
	variations: [],
	usesContext: ['postId', 'postType', 'queryId'],
	ancestor: ['core/post-template'],
	edit: ({ context }) => {
		const blockProps = useBlockProps();
		return (
			<article {...blockProps}>
				<PostContext postId={context.postId} postType={context.postType} isEditable={false}>
					<figure className="wp-block-example-content-item__media">
						<PostFeaturedImage className="wp-block-example-content-item__image" />
					</figure>
					<PostPrimaryCategory className="wp-block-example-content-item__category" />
					<PostTitle className="wp-block-example-content-item__title" />
					<PostCategoryList className="wp-block-example-content-item__categories">
						<PostCategoryList.ListItem className="wp-block-example-content-item__category">
							<PostCategoryList.TermLink className="wp-block-example-content-item__category-link" />
						</PostCategoryList.ListItem>
					</PostCategoryList>
					<PostDate className="wp-block-example-content-item__date" />
					<PostExcerpt className="wp-block-example-content-item__excerpt" />
					<PostAuthor className="wp-block-example-content-item__author">
						<PostAuthor.Avatar className="wp-block-example-content-item__author-avatar" />
						<PostAuthor.Name tagName="a" className="wp-block-example-content-item__author-name" />
						<PostAuthor.FirstName className="wp-block-example-content-item__author-first-name" />
						<PostAuthor.LastName className="wp-block-example-content-item__author-last-name" />
						<PostAuthor.Bio className="wp-block-example-content-item__author-bio" />
						<PostAuthor.Email className="wp-block-example-content-item__author-email" />
					</PostAuthor>
				</PostContext>
			</article>
		)
	},
	save: () => null
});
