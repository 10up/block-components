import { useContext } from '@wordpress/element';
import { PostTermContext } from './context';

export interface ListItemProps extends Omit<HTMLElement, 'tagName' | 'children'> {
	/**
	 * The HTML tag to use for the list item.
	 */
	tagName?: keyof JSX.IntrinsicElements | React.ComponentType<any>;

	/**
	 * The children to render inside the list item.
	 */
	children: React.ReactNode;
}

export const ListItem = ({ tagName: TagName = 'li', children, ...rest }: ListItemProps) => {
	return <TagName {...rest}>{children}</TagName>;
};

export const TermLink = (props: Omit<HTMLAnchorElement, 'href' | 'inert'>) => {
	const { link, name } = useContext(PostTermContext);

	return (
		// @ts-ignore-next-line - The inert attribute is not yet in the HTMLAnchorElement type.
		<a href={link} inert="true" {...props}>
			{name}
		</a>
	);
};
