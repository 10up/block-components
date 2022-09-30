import { forwardRef } from '@wordpress/element';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from '@emotion/styled';

const StyledSvg = styled('svg')`
	transform: rotate(-90deg);

	& circle {
		transition: stroke-dashoffset 0.3s linear;
		stroke: currentColor;
		stroke-width: 1em;
		opacity: 0.3;
	}

	& path {
		fill: currentColor;
	}

	& .bar {
		stroke: currentColor;
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

CircularProgressBar.propTypes = {
	percentage: PropTypes.number.isRequired,
};

export { CircularProgressBar, Counter };
