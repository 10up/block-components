import { useContext } from '@wordpress/element';
import PropTypes from 'prop-types';
import { Disabled } from '@wordpress/components';
import { POST_TERM_ITEM_CONTEXT } from './context';

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
	const { tagName: TagName = 'a', children, ...rest } = props;

	const { link, name } = useContext(POST_TERM_ITEM_CONTEXT);

	return (
		<Disabled>
			<TagName href={link} {...rest}>
				{name}
			</TagName>
		</Disabled>
	);
};

TermLink.propTypes = {
	tagName: PropTypes.string,
	children: PropTypes.node.isRequired,
};

TermLink.defaultProps = {
	tagName: 'a',
};
