import cx from 'classnames';
import { useState, useEffect } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import { create, remove, getTextContent, toHTMLString } from '@wordpress/rich-text';
import PropTypes from 'prop-types';

/**
 * Get Character Count
 * 
 * @description get character count from `RichText` string.
 * 
 * @param {string} string
 * @returns {integer} text content length
 */
const getCharacterCount = (str) => {
	const richTextContent = create({ html: str });
	const textContent = getTextContent(richTextContent);
	return textContent.length;
}

/**
 * Rich Text Character Limit
 * 
 * @description extend `RichText` with the ability to add a character limit.
 * 
 * @param {object} props 
 * @returns <RichTextCharacterLimit />
 */
const RichTextCharacterLimit = (props) => {
	const {
		limit = 100,
		enforce = true,
		value,
		onChange
	} = props;

	/**
	 * State
	 */
	const [count, setCount] = useState(0);
	const [richTextValue, setRichTextValue] = useState(value);

	/**
	 * Effects
	 */
	useEffect(() => {
		setCount(getCharacterCount(richTextValue));
	}, [richTextValue]);

	/**
	 * Sanitize
	 * 
	 * @description
	 * 
	 * @param {string} str
	 * @returns {string} str
	 */
	const sanitize = (str = value) => {
		const richTextContent = create({ html: str });
		const isOverLimit = getCharacterCount(str) > limit;

		if (isOverLimit && enforce) {
			// Workaround which fixes an issue with `<RichText>` not updating.
			setRichTextValue('');
			return remove(richTextContent, limit, getCharacterCount(str));
		}

		return richTextContent;
	}

	/**
	 * Rich Text On Change
	 * 
	 * @description
	 * 
	 * @param {string} str 
	 */
	const richTextOnChange = (str = value) => {
		const sanitized = toHTMLString({ value: sanitize(str) });
		setRichTextValue(sanitized);
		onChange(sanitized);
	}

	/**
	 * Counter
	 * 
	 * @description
	 * 
	 * @returns <Counter />
	 */
	const Counter = () => (
		<div
			className={cx('tenup--block-components__character-count', {
				'is-over-limit': count > limit,
			})}
		>
			<span className="tenup--block-components__character-count__count">{count}</span> /{' '}
			<span className="tenup--block-components__character-count__limit">{limit}</span>
		</div>
	);

	/**
	 * Render
	 */
	return (
		<>
			<RichText { ...{
				...props,
				value: richTextValue,
				onChange: (str) => richTextOnChange(str),
			} } />
			<Counter />
		</>
	);
}

export { RichTextCharacterLimit };

RichTextCharacterLimit.defaultProps = {
	limit: 100,
	enforce: true,
};

RichTextCharacterLimit.propTypes = {
	limit: PropTypes.number,
	enforce: PropTypes.boolean,
};
