import PropTypes from 'prop-types';

import { PostTerms } from '../post-terms';

export const PostCategories = (props) => {
	const { context, children, ...rest } = props;

	return <PostTerms context={context} taxonomyName="category" {...rest} />;
};

PostCategories.propTypes = {
	context: PropTypes.object,
	children: PropTypes.func,
};

PostCategories.defaultProps = {
	context: {},
	children: null,
};
