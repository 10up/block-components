import { Spinner } from '@wordpress/components';
import { Children } from '@wordpress/element';
import PropTypes from 'prop-types';
import { PostTaxonomiesHierarchicalTermSelector } from '@wordpress/editor';

import { usePopover, usePost, useSelectedTerms } from '../../hooks';
import { POST_TERM_ITEM_CONTEXT } from './context';
import { ListItem, TermLink } from './item';

export const PostTermList = (props) => {
	const { tagName: TagName = 'ul', taxonomyName = 'category', children, ...rest } = props;

	const { isEditable } = usePost();

	const hasRenderCallback = typeof children === 'function';
	const hasChildComponents = !hasRenderCallback && Children.count(children);

	const [selectedTerms, hasResolvedSelectedTerms] = useSelectedTerms(taxonomyName);

	const { toggleProps, Popover } = usePopover();

	if (!hasResolvedSelectedTerms) {
		return <Spinner />;
	}

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
						<POST_TERM_ITEM_CONTEXT.Provider value={term} key={term.id}>
							{children}
						</POST_TERM_ITEM_CONTEXT.Provider>
					))}
				</TagName>
				{isEditable && (
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
