import { Spinner } from '@wordpress/components';
import PropTypes from 'prop-types';

import { usePost, useSelectedTerms } from '../../hooks';

export const PostTerms = (props) => {
	const { context, taxonomyName = 'category', children, ...rest } = props;

	const { isDescendentOfQueryLoop } = usePost(context);

	const hasRenderCallback = typeof children === 'function';

	const [selectedTerms, hasResolvedSelectedTerms] = useSelectedTerms(taxonomyName, context);

	if (!hasResolvedSelectedTerms) {
		return <Spinner />;
	}

	if (hasRenderCallback) {
		return selectedTerms.map((term) => children({ ...term, isDescendentOfQueryLoop }));
	}

	return selectedTerms.map((term) => (
		<li key={term.id} {...rest}>
			{term.name}
		</li>
	));
};

PostTerms.propTypes = {
	context: PropTypes.object,
	children: PropTypes.func,
	taxonomyName: PropTypes.string.isRequired,
};

PostTerms.defaultProps = {
	context: {},
	children: null,
};
