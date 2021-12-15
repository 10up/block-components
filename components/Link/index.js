/**
 * External dependencies
 */
import classnames from 'classnames';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { Popover, Icon, Tooltip } from '@wordpress/components';
import { isKeyboardEvent, ENTER, ESCAPE } from '@wordpress/keycodes';
import {
	__experimentalLinkControl as LinkControl,
	useBlockProps,
	RichText,
	useBlockEditContext,
} from '@wordpress/block-editor';

/**
 * Removes HTML from a given string.
 * Note the does not provide XSS protection or otherwise attempt
 * to filter strings with malicious intent.
 *
 * See also: https://github.com/WordPress/gutenberg/pull/35539
 *
 * @param {string} html the string from which HTML should be removed.
 * @returns {string} the "cleaned" string.
 */
function navStripHTML(html) {
	const doc = document.implementation.createHTMLDocument('');
	doc.body.innerHTML = html;
	return doc.body.textContent || '';
}

/**
 * Given the Link block's type attribute, return the query params to give to
 * /wp/v2/search.
 *
 * @param {string} type Link block's type attribute.
 * @param {string} kind Link block's entity of kind (post-type|taxonomy)
 * @returns {{ type?: string, subtype?: string }} Search query params.
 */
function getSuggestionsQuery(type, kind) {
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
			if (kind === 'taxonomy') {
				return { type: 'term', subtype: type };
			}
			if (kind === 'post-type') {
				return { type: 'post', subtype: type };
			}
			return {};
	}
}

const LinkOutput = styled.a`
	--color--warning: #f00;

	color: var(--wp--style--color--link);
	position: relative;
	display: inline-flex;
	align-items: center;
	gap: 0.5em;

	/* This  holds the text URL input */
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

/**
 * Link component that can be used inside other Gutenberg blocks for setting up URLs.
 *
 * The link should not be visible if the block is not focused. This will mainain nicer
 * visuals in the block editor as a whole.
 *
 * @param {object} props								All properties passed to the component.
 * @param {string} props.value 							The text to show inside the link
 * @param {string} props.type 							Post or Page, used to autosuggest content for URL
 * @param {boolean} props.opensInNewTab 				Should the link open in a new tab?
 * @param {string} props.url 							The actual link to be set as href
 * @param {Function} props.onLinkChange 				Callback when the URL is changed
 * @param {Function} props.onTextChange 				Callback when the link's text is changed
 * @param {string} props.kind 							Page or Post
 * @param {string} props.placeholder 					Text visible before actual value is inserted
 *
 * @returns {JSX}
 */
const Link = ({
	value,
	type,
	opensInNewTab,
	url,
	onLinkChange,
	onTextChange,
	kind,
	placeholder,
}) => {
	const ref = useRef();
	const [isLinkOpen, setIsLinkOpen] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const { isSelected } = useBlockEditContext();

	const link = {
		url,
		opensInNewTab,
		title: value && navStripHTML(value), // don't allow HTML to display inside the <LinkControl>
	};

	const blockProps = useBlockProps({
		ref,
		className: classnames('wp-block-link', {
			'is-editing': isSelected,
			'has-link': !!url,
		}),
	});

	if (!url) {
		blockProps.onClick = () => setIsLinkOpen(true);
	}

	/**
	 * The hook shouldn't be necessary but due to a focus loss happening
	 * when selecting a suggestion in the link popover, we force close on block unselection.
	 */
	useEffect(() => {
		if (!isSelected) {
			setIsLinkOpen(false);
		}
	}, [isSelected]);

	/**
	 * Check if the URL and Value are set. If yes, then the component is valid.
	 * Otherwise, we will output a visual reminder to the editor that one of the
	 * two needs to be set.
	 */
	useEffect(() => {
		setIsValid(!!url && !!value);
	}, [url, value]);

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<span {...blockProps}>
			{/* eslint-disable jsx-a11y/anchor-is-valid */}
			<LinkOutput>
				<RichText
					ref={ref}
					identifier="label"
					className="wp-block-navigation-item__label"
					value={value}
					onChange={onTextChange}
					aria-label={__('Link text')}
					placeholder={placeholder}
					withoutInteractiveFormatting
					allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
					onClick={() => {
						setIsLinkOpen(true);
					}}
					onBlur={() => {
						setIsLinkOpen(false);
					}}
				/>

				{!isValid && (
					<Tooltip text="URL or Text has not been set">
						<Icon icon="warning" />
					</Tooltip>
				)}

				{isLinkOpen && (
					<Popover
						position="top center"
						onClose={() => setIsLinkOpen(false)}
						anchorRef={ref.current}
						focusOnMount={false}
					>
						<LinkControl
							hasTextControl
							className="wp-block-navigation-link__inline-link-input"
							value={link}
							showInitialSuggestions
							noDirectEntry={!!type}
							noURLSuggestion={!!type}
							suggestionsQuery={getSuggestionsQuery(type, kind)}
							onChange={onLinkChange}
						/>
					</Popover>
				)}
			</LinkOutput>
		</span>
	);
};

Link.defaultProps = {
	type: '',
	kind: '',

	placeholder: 'Link text ...',
};

Link.propTypes = {
	value: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	onLinkChange: PropTypes.func.isRequired,
	onTextChange: PropTypes.func.isRequired,
	opensInNewTab: PropTypes.bool.isRequired,

	type: PropTypes.string,
	kind: PropTypes.string,
	placeholder: PropTypes.string,
};

export { Link };
