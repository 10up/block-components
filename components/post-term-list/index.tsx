import { Spinner } from '@wordpress/components';
import { Children } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import {
	PostTaxonomiesHierarchicalTermSelector,
	PostTaxonomiesFlatTermSelector,
} from '@wordpress/editor';
import { FC } from 'react';

import { usePopover, usePost, useSelectedTerms, useTaxonomy } from '../../hooks';
import { Optional } from '..';
import { PostTermContext } from './context';
import { ListItem, TermLink } from './item';

export type PostTermListProps = {
	tagName?: keyof HTMLElementTagNameMap | undefined;
	taxonomyName: string;
	children?:
		| React.ReactNode
		| ((props: { selectedTerms: Array<{ id: number; name: string }>, isEditable?: boolean }) => React.ReactNode);
	noResultsMessage?: string;
	[key: string]: any;
};

export const PostTermList: FC<PostTermListProps> = (props) => {
	const {
		tagName: TagName = 'ul',
		taxonomyName,
		children,
		noResultsMessage = __('Please select a term', 'tenup'),
		...rest
	} = props;

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

	const hasSelectedTerms = selectedTerms.length > 0;

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

PostTermList.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	taxonomyName: PropTypes.string,
	tagName: PropTypes.string,
	noResultsMessage: PropTypes.string,
};

PostTermList.defaultProps = {
	children: null,
	tagName: 'ul',
	taxonomyName: 'category',
	noResultsMessage: __('Please select a term', 'tenup'),
};

PostTermList.ListItem = ListItem;
PostTermList.TermLink = TermLink;
