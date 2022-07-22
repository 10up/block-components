import cx from 'classnames';
import { useState, useEffect, forwardRef } from '@wordpress/element';
import { RichText, useBlockEditContext } from '@wordpress/block-editor';
import { create, remove, getTextContent, toHTMLString } from '@wordpress/rich-text';
import PropTypes from 'prop-types';
import { useFloating, autoUpdate } from '@floating-ui/react-dom';
import styled from '@emotion/styled';

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
		<StyledCounter
			className={cx('tenup--block-components__character-count', {
				'is-over-limit': count > limit,
			})}
			{...props}
			ref={ref}
		>
			<div className="tenup--block-components__character-count__label">
				<span className="tenup--block-components__character-count__count">{count}</span> /{' '}
				<span className="tenup--block-components__character-count__limit">{limit}</span>
			</div>
			<CircularProgressBar percentage={(count / limit) * 100} />
		</StyledCounter>
	);
});

const StyledSvg = styled('svg')`
	transform: rotate(-90deg);

	& circle {
		transition: stroke-dashoffset 0.3s linear;
		stroke: #fff;
		stroke-width: 1em;
		opacity: 0.3;
	}

	& .bar {
		stroke: #fff;
		opacity: 1;
	}
`;

const StyledCounter = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5em;
`;

const CircularProgressBar = (props) => {
	const { percentage } = props;
	const radius = 90;
	const circumference = 2 * Math.PI * radius;

	const strokeDashoffset = ((100 - percentage) / 100) * circumference;

	return (
		<StyledSvg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 200 200"
			version="1.1"
		>
			<circle
				cx="100"
				cy="100"
				r={radius}
				fill="transparent"
				strokeDasharray={circumference}
			/>
			<circle
				className="bar"
				cx="100"
				cy="100"
				r={radius}
				fill="transparent"
				strokeDasharray={circumference}
				strokeDashoffset={strokeDashoffset}
			/>
		</StyledSvg>
	);
};

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

CircularProgressBar.propTypes = {
	percentage: PropTypes.number.isRequired,
};
