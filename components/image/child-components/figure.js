import PropTypes from 'prop-types';
import { StyledComponentContext } from '../../styled-components-context';
import { InlineControlsStyleWrapper } from '../styles';

export const Figure = (props) => {
	const { style, children, ...rest } = props;

	return (
		<StyledComponentContext cacheKey="tenup-component-image">
			<InlineControlsStyleWrapper {...style} {...rest}>
				{children}
			</InlineControlsStyleWrapper>
		</StyledComponentContext>
	);
};

Figure.defaultProps = {
	style: {},
	children: [],
};

Figure.propTypes = {
	style: PropTypes.object,
	children: PropTypes.array,
};
