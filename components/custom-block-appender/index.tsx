// @ts-ignore
import { Inserter } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import React from 'react';

type CustomBlockAppenderProps = {
	/**
	 * Client ID of the block where this is being used.
	 */
	rootClientId: string;
	/**
	 * Text to display in the Button.
	 */
	buttonText?: string;
	/**
	 * The icon to use.
	 */
	icon?: string;
	/**
	 * class names to be added to the button.
	 */
	className?: string;
	[key: string]: any;
};

/**
 * CustomBlockAppender.
 *
 * Provide a Button component to trigger the inserter.
 * Any undocumented props are spread onto the Button component.
 */
export const CustomBlockAppender = ({
	rootClientId,
	buttonText,
	icon,
	className = 'custom-block-appender',
	...buttonProps
}: CustomBlockAppenderProps) => {
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
