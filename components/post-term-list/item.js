import { useContext } from '@wordpress/element';
import PropTypes from 'prop-types';
import { PostTermItemContext } from './context';

export const ListItem = (props) => {
	const { tagName: TagName = 'li', children, ...rest } = props;

	return <TagName {...rest}>{children}</TagName>;
};

ListItem.propTypes = {
	tagName: PropTypes.string,
	children: PropTypes.node.isRequired,
};

ListItem.defaultProps = {
	tagName: 'li',
};

export const TermLink = (props) => {
	const { link, name } = useContext(PostTermItemContext);

	return (
		<a href={link} inert="true" {...props}>
			{name}
		</a>
	);
};
