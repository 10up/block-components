import { useContext } from '@wordpress/element';
import { FC } from 'react';
import { PostTermContext } from './context';

export type ListItemProps = {
	tagName?: keyof HTMLElementTagNameMap;
	[key: string]: any;
};

export const ListItem: FC<ListItemProps> = (props) => {
	const { tagName: TagName = 'li', children, ...rest } = props;

	return <TagName {...rest}>{children}</TagName>;
};

export type TermNameProps = {
	[key: string]: any;
};

export const TermLink: FC<TermNameProps> = (props) => {
	const { link, name } = useContext(PostTermContext);

	return (
		// @ts-ignore-next-line
		<a href={link} inert="true" {...props}>
			{name}
		</a>
	);
};
