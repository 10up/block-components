/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { Popover } from '@wordpress/components';
import { isKeyboardEvent, ENTER } from '@wordpress/keycodes';
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

/**
 * Link component that can be used inside other Gutenberg blocks for setting up URLs.
 *
 * The link should not be visible if the block is not focused. This will mainain nicer
 * visuals in the block editor as a whole.
 *
 * @param props {object}
 * @param props.value {string} 							The text to show inside the link
 * @param props.type {string} 							Post or Page, used to autosuggest content for URL
 * @param props.opensInNewTab {boolean} 				Should the link open in a new tab?
 * @param props.url {string} 							The actual link to be set as href
 * @param props.onLinkChange {onLinfunctionkChange} 	Callback when the URL is changed
 * @param props.onTextChange {function} 				Callback when the link's text is changed
 * @param props.kind {string} 							Page or Post
 * @param props.placeholder {string} 					Text visible before actual value is inserted
 *
 * @returns JSX.Element
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
	const { isSelected } = useBlockEditContext();

	function onKeyDown(event) {
		if (isKeyboardEvent.primary(event, 'k') || (!url && event.keyCode === ENTER)) {
			setIsLinkOpen(true);
		}
	}

	const link = {
		url,
		opensInNewTab,
		title: value && navStripHTML(value), // don't allow HTML to display inside the <LinkControl>
	};

	const classes = classnames('wp-block-navigation-item__content', {
		'wp-block-navigation-link__placeholder': !url,
	});

	const blockProps = useBlockProps({
		ref,
		className: classnames('wp-block-navigation-item', {
			'is-editing': isSelected,
			'has-link': !!url,
		}),
		onKeyDown,
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

	const linkStyle = {
		textDecoration: 'underline',
		color: 'var(--wp--style--color--link, var(--global--color-primary))',
		position: 'relative',
	};

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<span {...blockProps}>
			{/* eslint-disable jsx-a11y/anchor-is-valid */}
			<a style={linkStyle} className={classes}>
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
				/>

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
			</a>
		</span>
	);
};

export default Link;
