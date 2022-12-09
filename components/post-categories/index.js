import { Spinner } from '@wordpress/components';
import PropTypes from 'prop-types';

import { usePost, useSelectedTerms } from '../../hooks';

export const PostCategories = (props) => {
	const { context, children, ...rest } = props;

	const { isDescendentOfQueryLoop } = usePost(context);

	const hasRenderCallback = typeof children === 'function';

	const [selectedCategories, hasResolvedSelectedCategories] = useSelectedTerms(
		'category',
		context,
	);

	if (!hasResolvedSelectedCategories) {
		return <Spinner />;
	}

	if (hasRenderCallback) {
		return selectedCategories.map((category) =>
			children({ ...category, isDescendentOfQueryLoop }),
		);
	}

	return selectedCategories.map((category) => (
		<li key={category.id} {...rest}>
			{category.name}
		</li>
	));
};

PostCategories.propTypes = {
	context: PropTypes.object,
	children: PropTypes.func,
};

PostCategories.defaultProps = {
	context: {},
	children: null,
};
