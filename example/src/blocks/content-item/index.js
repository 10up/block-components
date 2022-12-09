import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { PostFeaturedImage, PostTitle, PostPrimaryCategory, PostDate, PostCategories } from '@10up/block-components';
import { PostAuthor, PostExcerpt, PostCoAuthors } from '../../../../components';

const NAMESPACE = 'example';

registerBlockType( `${ NAMESPACE }/content-item`, {
	apiVersion: 2,
    title: __( 'Content Item', NAMESPACE ),
    icon: 'smiley',
    category: 'common',
    example: {},
    supports: {
        html: false
    },
    attributes: {},
    transforms: {},
    variations: [],
	usesContext: [ 'postId', 'postType', 'queryId' ],
	ancestor: [ 'core/post-template' ],
    edit: ({context}) => {
		const blockProps = useBlockProps();
        return (
            <article {...blockProps}>
				<figure className="wp-block-example-content-item__media">
					<PostFeaturedImage context={context} className="wp-block-example-content-item__image" />
				</figure>
				<PostPrimaryCategory context={context} className="wp-block-example-content-item__category" />
				<PostTitle context={context} className="wp-block-example-content-item__title" />
				<ul className="wp-block-example-content-item__categories">
					<PostCategories context={context}>
						{({ name, link, id }) => (
							<li key={id} className="wp-block-example-content-item__category">
								<a href={link} className="wp-block-example-content-item__category-link">{name}</a>
							</li>
						)}
					</PostCategories>
				</ul>
				<PostDate context={context} className="wp-block-example-content-item__date" />
				<PostExcerpt context={context} className="wp-block-example-content-item__excerpt" />
				<PostAuthor context={context}>
					<div className="wp-block-example-content-item__author">
						<PostAuthor.Avatar className="wp-block-example-content-item__author-avatar" />
						<PostAuthor.Name as="a" className="wp-block-example-content-item__author-name" />
						<PostAuthor.FirstName className="wp-block-example-content-item__author-first-name" />
						<PostAuthor.LastName className="wp-block-example-content-item__author-last-name" />
						<PostAuthor.Bio className="wp-block-example-content-item__author-bio" />
						<PostAuthor.Email className="wp-block-example-content-item__author-email" />
					</div>
				</PostAuthor>
			</article>
        )
    },
    save: () => null
} );
