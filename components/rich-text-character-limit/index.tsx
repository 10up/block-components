import { useState, useEffect } from '@wordpress/element';
import { RichText, useBlockEditContext } from '@wordpress/block-editor';
import { create, remove, getTextContent, toHTMLString } from '@wordpress/rich-text';
import { useFloating, autoUpdate } from '@floating-ui/react-dom';
import { Counter } from '../counter';
import React from 'react';

/**
 * Get Character Count
 *
 * @description get character count from `RichText` string.
 *
 * @param {string} str - rich text string
 * @returns {number} text content length
 */
const getCharacterCount = (str) => {
	if (!str) {
		return 0;
	}
	const richTextContent = create({ html: str });
	const textContent = getTextContent(richTextContent);
	return textContent.length;
};

type RichTextCharacterLimitProps = {
	limit?: number;
	enforce?: boolean;
	value: string;
	onChange: (str: string) => void;
};

/**
 * Rich Text Character Limit
 *
 * @description extend `RichText` with the ability to add a character limit.
 */
const RichTextCharacterLimit = (props: RichTextCharacterLimitProps) => {
	const { limit = 100, enforce = true, value, onChange } = props;

	const { x, y, reference, floating, strategy } = useFloating({
		placement: 'bottom-end',
		strategy: 'fixed',
		whileElementsMounted: autoUpdate,
	});
	const { isSelected } = useBlockEditContext();
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
	 * @description remove characters if `enforce` is set to true.
	 *
	 * @param {string} str - rich text string
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
	};

	/**
	 * Rich Text On Change
	 *
	 * @description set rich text value and run `onChange` from initial props.
	 *
	 * @param {string} str - rich text string
	 */
	const richTextOnChange = (str = value) => {
		const sanitized = toHTMLString({ value: sanitize(str) });
		setRichTextValue(sanitized);
		onChange(sanitized);
	};

	const { enforce: _enforce, ...richTextProps } = props;

	/**
	 * Render
	 */
	return (
		<>
			<RichText
				{...{
					...richTextProps,
					value: richTextValue,
					onChange: (str) => richTextOnChange(str),
					ref: reference,
				}}
			/>
			{isSelected && (
				<Counter
					count={count}
					limit={limit}
					ref={floating}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
					}}
				/>
			)}
		</>
	);
};

export { RichTextCharacterLimit, getCharacterCount };

