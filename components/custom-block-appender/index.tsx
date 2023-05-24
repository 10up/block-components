import { Inserter } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import React from 'react';
import type { FC } from 'react';

import { DropdownProps } from '@wordpress/components/build-types/dropdown/types';
// extract IconType from Button props
type IconType = Parameters<typeof Button>[0]['icon'];
// extract renderToggle prop types from Dropdown
type RenderToggleProps = Parameters<DropdownProps['renderToggle']>[0];

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
	icon?: IconType;
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
export const CustomBlockAppender: FC<CustomBlockAppenderProps> = ({
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
			renderToggle={({ onToggle }: RenderToggleProps) => (
				<Button
					className={`tenup-${className}`}
					onClick={onToggle}
					icon={icon}
					{...buttonProps}
				>
					{buttonText}
				</Button>
			)}
		/>
	);
};
