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
import { useState, useEffect, useRef, Fragment } from '@wordpress/element';
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

const LinkOutput = styled(RichText)`
	--color--warning: #f00;

	/* Reset margins for this block alone. */
	--global--spacing-vertical: 0;
	--global--spacing-vertical: 0;

	color: var(--wp--style--color--link);
	position: relative;
	display: inline-flex;
	align-items: center;
	gap: 0.5em;
	text-decoration: underline;

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
		className: classnames('tenup-block-components-link', {
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
		<>
			<LinkOutput
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...blockProps}
				tagName="a"
				identifier="label"
				className="tenup-block-components-link__label"
				value={value}
				onChange={onTextChange}
				aria-label={__('Link text', '10up-block-components')}
				placeholder={placeholder}
				withoutInteractiveFormatting
				allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
				onClick={() => {
					setIsLinkOpen(true);
				}}
			/>

			{!isValid && (
				<Tooltip text={__('URL or Text has not been set', '10up-block-components')}>
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
						className="tenup-block-components-link__link-control"
						value={link}
						showInitialSuggestions
						noDirectEntry={!!type}
						noURLSuggestion={!!type}
						suggestionsQuery={getSuggestionsQuery(type, kind)}
						onChange={onLinkChange}
					/>
				</Popover>
			)}
		</>
	);
};

Link.defaultProps = {
	type: '',
	kind: '',

	placeholder: __('Link text ...', '10up-block-components'),
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
