import { Spinner } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { useIcon } from '../../hooks/use-icons';
import React from 'react';

type IconProps = {
	name: string;
	onClick?: Function | undefined;
	iconSet: string;
	[key: string]: any;
};

type IconRef = HTMLDivElement;

export const Icon = forwardRef<IconRef,IconProps>( function Icon(props, ref) {
	const { name, iconSet, onClick, ...rest } = props;
	const icon = useIcon(iconSet, name);

	if (!icon) {
		return <Spinner />;
	}

	// only add interactive props to component if a onClick handler was provided
	const iconProps: {
		[key: string]: any;
	} = {};
	if (typeof onClick === 'function') {
		iconProps.role = 'button';
		iconProps.tabIndex = 0;
		iconProps['aria-label'] = 'Change Icon';
		iconProps.onClick = onClick;
	}

	return (
		// eslint-disable-next-line react/no-danger
		<div {...iconProps} dangerouslySetInnerHTML={{ __html: icon.source }} {...rest} ref={ref} />
	);
});


