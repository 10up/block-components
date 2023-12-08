/**
 * External dependencies
 */
import classnames from 'classnames';
import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { Popover, Icon, Tooltip } from '@wordpress/components';
import { __experimentalLinkControl as LinkControl, RichText } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { StyledComponentContext } from '../styled-components-context';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';

type Type = 'post' | 'page' | 'category' | 'tag' | 'post_format' | '';
type Kind = 'taxonomy' | 'post-type' | '';

/**
 * Given the Link block's type attribute, return the query params to give to
 * /wp/v2/search.
 *
 * @param {string} type Link block's type attribute.
 * @param {string} kind Link block's entity of kind (post-type|taxonomy)
 * @returns {{ type?: string, subtype?: string }} Search query params.
 */
function getSuggestionsQuery(type: Type, kind: Kind) {
	switch (type) {
		case 'post':
		case 'page':
			return { type: 'post', subtype: type };
		case 'category':
			return { type: 'term', subtype: 'category' };
		case 'tag':
			return { type: 'term', subtype: 'post_tag' };
		case 'post_format':
			return { type: 'post-format' };
		default:
			break;
	}

	switch (kind) {
		case 'taxonomy':
			return { type: 'term', subtype: type };
		case 'post-type':
			return { type: 'post', subtype: type };
		default:
			return {};
	}
}

const StyledRichTextLink = styled(RichText)`
	--color--warning: #f00;

	/* Reset margins for this block alone. */
	--global--spacing-vertical: 0;
	--global--spacing-vertical: 0;

	color: var(--wp--style--color--link);
	position: relative;
	display: block;
	align-items: center;
	gap: 0.5em;
	text-decoration: underline;

	/* This holds the text URL input */
	& > div {
		text-decoration: underline;
	}

	.dashicon {
		text-decoration: none;
		font-size: 1em;
		width: 1.5em;
		height: 1.5em;
		border-radius: 50%;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color--warning);
	}
`;

interface LinkProps {
	/**
	 * The text to show inside the link
	 */
	value?: string;
	/**
	 * Post or Page, used to autosuggest content for URL
	 */
	type?: Type;
	/**
	 * Should the link open in a new tab?
	 */
	opensInNewTab: boolean;
	/**
	 * The actual link to be set as href
	 */
	url?: string;
	/**
	 * Callback when the URL is changed
	 */
	onLinkChange: (link: string) => void;
	/**
	 * Callback when the link's text is changed
	 */
	onTextChange: (text: string) => void;
	/**
	 * Callback when the URL is changed
	 */
	onLinkRemove?: () => void;
	/**
	 * Page or Post
	 */
	kind?: Kind;
	/**
	 * Text visible before actual value is inserted
	 */
	placeholder?: string;
	/**
	 * html class to be applied to the anchor element
	 */
	className?: string;
}

/**
 * Link component that can be used inside other Gutenberg blocks for setting up URLs.
 *
 * The link should not be visible if the block is not focused. This will maintain nicer
 * visuals in the block editor as a whole.
 */
export const Link = (props: LinkProps) => {
	const {
		value = '',
		type = '',
		opensInNewTab,
		url = '',
		onLinkChange,
		onTextChange,
		onLinkRemove,
		kind = '',
		placeholder = __('Link text ...', '10up-block-components'),
		className,
		...rest
	} = props;

	const [isPopoverVisible, setIsPopoverVisible] = useState<boolean>(false);
	const [isValidLink, setIsValidLink] = useState<boolean>(false);
	const openPopover = () => setIsPopoverVisible(true);
	const closePopover = () => setIsPopoverVisible(false);

	const linkRef = useRef<HTMLAnchorElement>(null);
	const popoverRef = useOnClickOutside<HTMLDivElement>(closePopover);

	const link = {
		url,
		opensInNewTab,
		title: value, // don't allow HTML to display inside the <LinkControl>
	};

	/**
	 * Check if the URL and Value are set. If yes, then the component is valid.
	 * Otherwise, we will output a visual reminder to the editor that one of the
	 * two needs to be set.
	 */
	useEffect(() => {
		setIsValidLink(!!url && !!value);
	}, [url, value]);

	return (
		<StyledComponentContext cacheKey="tenup-component-link">
			<StyledRichTextLink
				tagName="a"
				className={classnames('tenup-block-components-link__label', className)}
				value={value}
				onChange={onTextChange}
				aria-label={__('Link text', '10up-block-components')}
				placeholder={placeholder}
				__unstablePastePlainText
				allowedFormats={[]}
				onClick={openPopover}
				ref={linkRef}
				{...rest}
			/>

			{!isValidLink && (
				<Tooltip text={__('URL or Text has not been set', '10up-block-components')}>
					{/*
					 * This additional span is needed to prevent an issue with how the Tooltip tries
					 * to pass a ref to the Icon component. The Icon component is a functional
					 * component and does not accept a ref.
					 *
					 * @see https://github.com/WordPress/gutenberg/issues/43129
					 */}
					<span>
						<Icon icon="warning" />
					</span>
				</Tooltip>
			)}

			{isPopoverVisible && (
				<Popover
					anchorRef={linkRef.current}
					anchor={linkRef.current}
					ref={popoverRef}
					focusOnMount={false}
				>
					<LinkControl
						hasTextControl
						className="tenup-block-components-link__link-control"
						value={link}
						showInitialSuggestions
						noDirectEntry={!!type}
						noURLSuggestion={!!type}
						suggestionsQuery={getSuggestionsQuery(type, kind)}
						onChange={onLinkChange}
						onRemove={onLinkRemove}
						settings={[
							{
								id: 'opensInNewTab',
								title: __('Open in new tab', '10up-block-components'),
							},
						]}
					/>
				</Popover>
			)}
		</StyledComponentContext>
	);
};
