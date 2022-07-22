import cx from 'classnames';
import { useState, useEffect, forwardRef } from '@wordpress/element';
import { RichText, useBlockEditContext } from '@wordpress/block-editor';
import { create, remove, getTextContent, toHTMLString } from '@wordpress/rich-text';
import PropTypes from 'prop-types';
import { useFloating, autoUpdate } from '@floating-ui/react-dom';

/**
 * Get Character Count
 *
 * @description get character count from `RichText` string.
 *
 * @param {string} str - rich text string
 * @returns {number} text content length
 */
const getCharacterCount = (str) => {
	const richTextContent = create({ html: str });
	const textContent = getTextContent(richTextContent);
	return textContent.length;
};

/**
 * Counter
 *
 * @description display character count and limit.
 *
 * @returns <Counter />
 */
const Counter = forwardRef((props, ref) => {
	const { count, limit } = props;
	return (
		<div
			className={cx('tenup--block-components__character-count', {
				'is-over-limit': count > limit,
			})}
			{...props}
			ref={ref}
		>
			<span className="tenup--block-components__character-count__count">{count}</span> /{' '}
			<span className="tenup--block-components__character-count__limit">{limit}</span>
		</div>
	);
});

/**
 * Rich Text Character Limit
 *
 * @description extend `RichText` with the ability to add a character limit.
 *
 * @param {object} props - component props
 * @returns {HTMLElement} <RichTextCharacterLimit />
 */
const RichTextCharacterLimit = (props) => {
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

export { RichTextCharacterLimit };

RichTextCharacterLimit.defaultProps = {
	limit: 100,
	enforce: true,
};

RichTextCharacterLimit.propTypes = {
	limit: PropTypes.number,
	enforce: PropTypes.bool,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
