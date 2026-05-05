import { Inserter } from '@wordpress/block-editor';
import { Button, IconType } from '@wordpress/components';
import { FC } from 'react';

interface CustomBlockAppenderProps {
	rootClientId: string;
	className?: string;
	buttonText?: string;
	icon?: IconType;
	[key: string]: any; // For additional props spread onto the Button component
}

/*
 * CustomBlockAppender.
 *
 * Provide a Button component to trigger the inserter.
 * Any undocumented props are spread onto the Button component.
 */
export const CustomBlockAppender: FC<CustomBlockAppenderProps> = ({
	rootClientId,
	buttonText = '',
	icon = 'plus',
	className = 'custom-block-appender',
	...buttonProps
}) => {
	return (
		<Inserter
			isAppender
			rootClientId={rootClientId}
			renderToggle={({
				onToggle,
				disabled,
			}: {
				onToggle: () => void;
				disabled?: boolean;
			}) => (
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
