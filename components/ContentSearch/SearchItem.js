import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import { Button, TextHighlight, Tooltip } from '@wordpress/components';

const ButtonStyled = styled(Button)`
	&:hover {
		/* Add opacity background to support future color changes */
		/* Reduce background from #ddd to 0.05 for text contrast  */
		background-color: rgba(0, 0, 0, 0.05);

		.block-editor-link-control__search-item-type {
			color: black;
		}
	}

	.block-editor-link-control__search-item-type {
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

/**
 * SearchItem
 *
 * @param {Object} props react props
 * @param props.suggestion
 * @param props.onClick
 * @param props.searchTerm
 * @param props.isSelected
 * @param props.id
 * @return {*} React JSX
 */
const SearchItem = ({ suggestion, onClick, searchTerm, isSelected, id, contentTypes }) => {
	const showType = suggestion.type && contentTypes.length > 1;

	return (
		<Tooltip text={decodeEntities(suggestion.title)}>
			<ButtonStyled
				id={id}
				onClick={onClick}
				className={`block-editor-link-control__search-item is-entity ${
					isSelected && 'is-selected'
				}`}
				style={{
					borderRadius: '0',
					boxSizing: 'border-box',
				}}
			>
				<span className="block-editor-link-control__search-item-header">
					<span
						className="block-editor-link-control__search-item-title"
						style={{
							paddingRight: !showType ? 0 : null,
						}}
					>
						<TextHighlight text={decodeEntities(suggestion.title)} highlight={searchTerm} />
					</span>
					<span
						aria-hidden
						className="block-editor-link-control__search-item-info"
						style={{
							paddingRight: !showType ? 0 : null,
						}}
					>
						{filterURLForDisplay(safeDecodeURI(suggestion.url)) || ''}
					</span>
				</span>
				{showType && (
					<span className="block-editor-link-control__search-item-type">
						{/* Rename 'post_tag' to 'tag'. Ideally, the API would return the localised CPT or taxonomy label. */}
						{suggestion.type === 'post_tag' ? 'tag' : suggestion.type}
					</span>
				)}
			</ButtonStyled>
		</Tooltip>
	);
};

SearchItem.defaultProps = {
	id: '',
	searchTerm: '',
	isSelected: false,
};

SearchItem.propTypes = {
	id: PropTypes.string,
	searchTerm: PropTypes.string,
	suggestion: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
	isSelected: PropTypes.bool,
	contentTypes: PropTypes.array.isRequired,
};

export default SearchItem;
