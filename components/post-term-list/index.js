import { Spinner } from '@wordpress/components';
import { Children } from '@wordpress/element';
import PropTypes from 'prop-types';
import { PostTaxonomiesHierarchicalTermSelector } from '@wordpress/editor';

import { usePopover, usePost, useSelectedTerms } from '../../hooks';
import { POST_TERM_ITEM_CONTEXT } from './context';
import { ListItem, TermLink } from './item';

export const PostTermList = (props) => {
	const {
		context,
		tagName: TagName = 'ul',
		taxonomyName = 'category',
		children,
		...rest
	} = props;

	const { isDescendentOfQueryLoop } = usePost(context);

	const hasRenderCallback = typeof children === 'function';
	const hasChildComponents = !hasRenderCallback && Children.count(children);

	const [selectedTerms, hasResolvedSelectedTerms] = useSelectedTerms(taxonomyName, context);

	const { toggleProps, Popover } = usePopover();

	if (!hasResolvedSelectedTerms) {
		return <Spinner />;
	}

	if (hasRenderCallback) {
		return children({ selectedTerms, isDescendentOfQueryLoop });
	}

	let listElementProps = {
		...rest,
	};

	if (!isDescendentOfQueryLoop) {
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
						<POST_TERM_ITEM_CONTEXT.Provider value={term} key={term.id}>
							{children}
						</POST_TERM_ITEM_CONTEXT.Provider>
					))}
				</TagName>
				{!isDescendentOfQueryLoop && (
					<Popover>
						<PostTaxonomiesHierarchicalTermSelector slug={taxonomyName} />
					</Popover>
				)}
			</>
		);
	}

	return (
		<ul {...rest}>
			{selectedTerms.map((term) => (
				<li key={term.id}>
					<a href={term.link}>{term.name}</a>
				</li>
			))}
		</ul>
	);
};

PostTermList.propTypes = {
	context: PropTypes.object,
	children: PropTypes.func || PropTypes.node,
	taxonomyName: PropTypes.string.isRequired,
	tagName: PropTypes.string,
};

PostTermList.defaultProps = {
	context: {},
	children: null,
	tagName: 'ul',
};

PostTermList.ListItem = ListItem;
PostTermList.TermLink = TermLink;
