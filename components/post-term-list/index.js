import { Spinner } from '@wordpress/components';
import { Children } from '@wordpress/element';
import PropTypes from 'prop-types';
import {
	PostTaxonomiesHierarchicalTermSelector,
	PostTaxonomiesFlatTermSelector,
} from '@wordpress/editor';

import { usePopover, usePost, useSelectedTerms, useTaxonomy } from '../../hooks';
import { PostTermItemContext } from './context';
import { ListItem, TermLink } from './item';

export const PostTermList = (props) => {
	const { tagName: TagName = 'ul', taxonomyName = 'category', children, ...rest } = props;

	const { isEditable } = usePost();

	const hasRenderCallback = typeof children === 'function';
	const hasChildComponents = !hasRenderCallback && Children.count(children);

	const [selectedTerms, hasResolvedSelectedTerms] = useSelectedTerms(taxonomyName);
	const [taxonomy, hasResolvedTaxonomy] = useTaxonomy(taxonomyName);

	const { toggleProps, Popover } = usePopover();

	if (!hasResolvedSelectedTerms || !hasResolvedTaxonomy) {
		return <Spinner />;
	}

	const PostTaxonomiesTermSelector = taxonomy.hierarchical
		? PostTaxonomiesHierarchicalTermSelector
		: PostTaxonomiesFlatTermSelector;

	if (hasRenderCallback) {
		return children({ selectedTerms, isEditable });
	}

	let listElementProps = {
		...rest,
	};

	if (isEditable) {
		listElementProps = {
			...listElementProps,
			...toggleProps,
		};
	}

	if (hasChildComponents) {
		return (
			<>
				<TagName {...listElementProps}>
					{selectedTerms.map((term) => (
						<PostTermItemContext.Provider value={term} key={term.id}>
							{children}
						</PostTermItemContext.Provider>
					))}
				</TagName>
				{isEditable && (
					<Popover>
						<PostTaxonomiesTermSelector slug={taxonomyName} />
					</Popover>
				)}
			</>
		);
	}

	return (
		<>
			<TagName {...listElementProps}>
				{selectedTerms.map((term) => (
					<li key={term.id}>
						<a href={term.link}>{term.name}</a>
					</li>
				))}
			</TagName>
			{isEditable && (
				<Popover>
					<PostTaxonomiesTermSelector slug={taxonomyName} />
				</Popover>
			)}
		</>
	);
};

PostTermList.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	taxonomyName: PropTypes.string.isRequired,
	tagName: PropTypes.string,
};

PostTermList.defaultProps = {
	children: null,
	tagName: 'ul',
};

PostTermList.ListItem = ListItem;
PostTermList.TermLink = TermLink;
