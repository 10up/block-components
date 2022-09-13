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
	if (!str) {
		return 0;
	}
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
	const percentage = (count / limit) * 100;
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
			<CircularProgressBar percentage={percentage} />
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

	& path {
		fill: #fff;
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
	font-variant-numeric: tabular-nums;
`;

const CircularProgressBar = (props) => {
	const { percentage } = props;
	const radius = 90;
	const circumference = 2 * Math.PI * radius;

	const normalizedPercentage = Math.max(0, Math.min(percentage, 100));

	const strokeDashoffset = ((100 - normalizedPercentage) / 100) * circumference;

	const isApproachingLimit = percentage > 80;
	const isOverLimit = percentage >= 100;

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
			{isApproachingLimit && !isOverLimit && (
				<path
					style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
					d="M100,31.2c38,0,68.8,30.8,68.8,68.8S138,168.8,100,168.8S31.2,138,31.2,100S62,31.2,100,31.2z M109.7,111.9
				l3-55.6H87.3l3,55.6C90.3,111.9,109.7,111.9,109.7,111.9z M108.9,140.8c2.1-2,3.2-4.7,3.2-8.3c0-3.6-1-6.4-3.1-8.3
				c-2.1-2-5.1-3-9.1-3c-4,0-7.1,1-9.2,3c-2.1,2-3.2,4.7-3.2,8.3c0,3.5,1.1,6.3,3.3,8.3c2.2,2,5.2,2.9,9.1,2.9S106.8,142.7,108.9,140.8
				z"
				/>
			)}
			{isOverLimit && (
				<path
					style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
					d="M100,168.8c38,0,68.8-30.8,68.8-68.8c0-38-30.8-68.8-68.8-68.8C62,31.2,31.2,62,31.2,100
				C31.2,138,62,168.8,100,168.8z M127,73c2.2,2.2,2.2,5.9,0,8.1L108.1,100l18.9,18.9c2.2,2.2,2.2,5.9,0,8.1c-2.2,2.2-5.9,2.2-8.1,0
				L100,108.1L81.1,127c-2.2,2.2-5.9,2.2-8.1,0c-2.2-2.2-2.2-5.9,0-8.1L91.9,100L73,81.1c-2.2-2.2-2.2-5.9,0-8.1s5.9-2.2,8.1,0
				L100,91.9L118.9,73C121.1,70.8,124.7,70.8,127,73z"
				/>
			)}
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

export { RichTextCharacterLimit, getCharacterCount, CircularProgressBar, Counter };

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
