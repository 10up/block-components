/**
 * External dependencies
 */
import clsx from 'clsx';
import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { FC } from 'react';
import { Popover, Icon, Tooltip } from '@wordpress/components';
// @ts-ignore-next-line - The type definitions for the block editor are missing the __experimentalLinkControl import.
import { __experimentalLinkControl as LinkControl, RichText } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { StyledComponentContext } from '../styled-components-context';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';

interface SuggestionsQuery {
	type?: string;
	subtype?: string;
}

/*
 * Given the Link block's type attribute, return the query params to give to
 * /wp/v2/search.
 */
function getSuggestionsQuery(type: string, kind: string): SuggestionsQuery {
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

const StylesRichTextLink = styled(RichText)`
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

interface NewLinkProps {
	url?: string;
	opensInNewTab?: boolean;
	title?: string;
}

interface LinkProps {
	value?: string;
	type?: string;
	opensInNewTab?: boolean;
	url?: string;
	onLinkChange: (value: NewLinkProps) => void;
	onTextChange: (text: string) => void;
	onLinkRemove?: () => void;
	kind?: string;
	placeholder?: string;
	className?: string;
	ariaLabel?: string;
}

/*
 * Link component that can be used inside other Gutenberg blocks for setting up URLs.
 *
 * The link should not be visible if the block is not focused. This will maintain nicer
 * visuals in the block editor as a whole.
 */
export const Link: FC<LinkProps> = ({
	value = '',
	type = '',
	opensInNewTab = false,
	url = undefined,
	onLinkChange,
	onTextChange,
	onLinkRemove = null,
	kind = '',
	placeholder = __('Link text ...', '10up-block-components'),
	className = undefined,
	ariaLabel = undefined,
	...rest
}) => {
	const [isPopoverVisible, setIsPopoverVisible] = useState(false);
	const [isValidLink, setIsValidLink] = useState(false);
	const openPopover = () => setIsPopoverVisible(true);
	const closePopover = () => setIsPopoverVisible(false);

	const linkRef = useRef<HTMLAnchorElement>(null);
	const popoverRef = useOnClickOutside(closePopover);

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
			<StylesRichTextLink
				tagName="a"
				className={clsx('tenup-block-components-link__label', className)}
				value={value}
				onChange={onTextChange}
				aria-label={ariaLabel || value || __('Link text', '10up-block-components')}
				placeholder={placeholder}
				__unstablePastePlainText
				allowedFormats={[]}
				onClick={openPopover}
				// @ts-ignore-next-line - The ref is not typed correctly in the RichText component.
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
					// @ts-ignore-next-line - In order to support older versions of Gutenberg, we need to pass the anchorRef prop.
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
