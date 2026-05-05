import { Spinner } from '@wordpress/components';
import { Children } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	PostTaxonomiesHierarchicalTermSelector,
	PostTaxonomiesFlatTermSelector,
	// @ts-ignore - The types for this package are incorrect.
} from '@wordpress/editor';
import { WP_REST_API_Term } from 'wp-types';
import { Optional } from '../optional';

import { usePopover, usePost, useSelectedTerms, useTaxonomy } from '../../hooks';
import { PostTermContext } from './context';
import { ListItem, TermLink } from './item';

interface PostTermListProps {
	/**
	 * The HTML tag to use for the list element.
	 */
	tagName?: keyof JSX.IntrinsicElements;

	/**
	 * The taxonomy name to fetch terms from.
	 */
	taxonomyName?: string;

	/**
	 * The message to display when no terms are selected.
	 */
	noResultsMessage?: string;

	/**
	 * The children to render for each term.
	 */
	children?:
		| React.ReactNode
		| ((props: {
				selectedTerms: Array<WP_REST_API_Term> | null | undefined;
				isEditable: boolean;
		  }) => React.ReactNode);
}

export const PostTermList = ({
	tagName: TagName = 'ul',
	taxonomyName = 'category',
	children = null,
	noResultsMessage = __('Please select a term', 'tenup'),
	...rest
}: PostTermListProps) => {
	const { isEditable } = usePost();

	const hasRenderCallback = typeof children === 'function';
	const hasChildComponents = !hasRenderCallback && Children.count(children);

	const [selectedTerms, hasResolvedSelectedTerms] = useSelectedTerms(taxonomyName);
	const [taxonomy, hasResolvedTaxonomy] = useTaxonomy(taxonomyName);

	const { toggleProps, Popover } = usePopover();

	if (!hasResolvedSelectedTerms || !hasResolvedTaxonomy) {
		return <Spinner />;
	}

	const PostTaxonomiesTermSelector = taxonomy?.hierarchical
		? PostTaxonomiesHierarchicalTermSelector
		: PostTaxonomiesFlatTermSelector;

	if (hasRenderCallback) {
		return children({ selectedTerms, isEditable: !!isEditable });
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

	const hasSelectedTerms = !!(selectedTerms && selectedTerms.length > 0);

	if (hasChildComponents) {
		return (
			<>
				<Optional value={hasSelectedTerms}>
					<TagName {...listElementProps}>
						{hasSelectedTerms ? (
							selectedTerms.map((term) => (
								<PostTermContext.Provider value={term} key={term.id}>
									{children}
								</PostTermContext.Provider>
							))
						) : (
							<li>
								<i>{noResultsMessage}</i>
							</li>
						)}
					</TagName>
				</Optional>
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
			<Optional value={hasSelectedTerms}>
				<TagName {...listElementProps}>
					{hasSelectedTerms ? (
						selectedTerms.map((term) => (
							<li key={term.id}>
								<a href={term.link}>{term.name}</a>
							</li>
						))
					) : (
						<li>
							<i>{noResultsMessage}</i>
						</li>
					)}
				</TagName>
			</Optional>
			{isEditable && (
				<Popover>
					<PostTaxonomiesTermSelector slug={taxonomyName} />
				</Popover>
			)}
		</>
	);
};

PostTermList.ListItem = ListItem;
PostTermList.TermLink = TermLink;
