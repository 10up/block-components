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
import { placeCaretAtHorizontalEdge } from '@wordpress/dom';
import {
	__experimentalLinkControl as LinkControl,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { isURL, prependHTTP, safeDecodeURI } from '@wordpress/url';

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
 * @param props.attributes {object}
 * @param props.setAttributes {function}
 *
 * @returns JSX.Element
 */
const Link = ({
	label,
	type,
	opensInNewTab,
	url,
	onLinkChange,
	onTextChange,
	kind,
	placeholder,
	isSelected,
}) => {
	const ref = useRef();
	const [isLinkOpen, setIsLinkOpen] = useState(false);
	console.log('isLinkOpen', isLinkOpen);

	function onKeyDown(event) {
		if (isKeyboardEvent.primary(event, 'k') || (!url && event.keyCode === ENTER)) {
			setIsLinkOpen(true);
		}
	}

	/**
	 * Focus the Link label text and select it.
	 */
	function selectLabelText() {
		// ref.current.focus();

		console.log(ref.current);

		// const { ownerDocument } = ref.current;
		// const { defaultView } = ownerDocument;
		// const selection = defaultView.getSelection();
		// const range = ownerDocument.createRange();
		// // Get the range of the current ref contents so we can add this range to the selection.
		// range.selectNodeContents(ref.current);
		// selection.removeAllRanges();
		// selection.addRange(range);
	}

	const link = {
		url,
		opensInNewTab,
		title: label && navStripHTML(label), // don't allow HTML to display inside the <LinkControl>
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
			console.log('setIsLinkOpen(false)');
		}
	}, [isSelected]);

	// If the LinkControl popover is open and the URL has changed, close the LinkControl and focus the label text.
	// useEffect(() => {
	// 	if (isLinkOpen && url) {
	// 		// Does this look like a URL and have something TLD-ish?
	// 		if (isURL(prependHTTP(label)) && /^.+\.[a-z]+/.test(label)) {
	// 			// Focus and select the label text.
	// 			selectLabelText();
	// 		} else {
	// 			// Focus it (but do not select).
	// 			placeCaretAtHorizontalEdge(ref.current, true);
	// 		}
	// 	}
	// }, [isLinkOpen, label, url]);

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
					value={label}
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
