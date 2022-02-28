/* eslint-disable react/jsx-props-no-spreading */
/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Fragment } from '@wordpress/element';
import { Inserter } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * CustomBlockAppender.
 *
 * Provide a Button component to trigger the inserter.
 * Any undocumented props are spread onto the Button component.
 *
 * @param {object} props              All props sent to this component.
 * @param {string} props.rootClientId Client ID of the block where this is being used.
 * @param {string} [props.buttonText] Text to display in the Button.
 * @param {string} [props.icon]       The icon to use.
 * @returns {Function} The component.
 */
const CustomBlockAppender = ({
	rootClientId,
	buttonText,
	icon,
	className = 'custom-block-appender',
	...buttonProps
}) => {
	return (
		<Inserter
			isAppender
			rootClientId={rootClientId}
			renderToggle={({ onToggle, disabled }) => (
				<Button
					className={`tenup-${className}`}
					onClick={onToggle}
					disabled={disabled}
					icon={icon}
					{...buttonProps}
				>
					{buttonText}
				</Button>
			)}
		/>
	);
};

CustomBlockAppender.propTypes = {
	rootClientId: PropTypes.string.isRequired,
	buttonText: PropTypes.string,
	label: PropTypes.string,
	icon: PropTypes.string,
	className: PropTypes.string,
};

CustomBlockAppender.defaultProps = {
	buttonText: '',
	label: '',
	icon: 'plus',
	className: 'custom-block-appender',
};

export default CustomBlockAppender;
