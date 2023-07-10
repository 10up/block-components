import { Spinner } from '@wordpress/components';
import { useIcon } from '../../hooks/use-icons';
import React from 'react';
import type { FC } from 'react';

type IconProps = {
	name: string;
	onClick?: Function | undefined;
	iconSet: string;
	[key: string]: any;
};

export const Icon: FC<IconProps> = (props) => {
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

	// eslint-disable-next-line react/no-danger
	return <div {...iconProps} dangerouslySetInnerHTML={{ __html: icon.source }} {...rest} />;
};


