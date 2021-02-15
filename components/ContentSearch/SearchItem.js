import PropTypes from 'prop-types';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import { Button, TextHighlight } from '@wordpress/components';

/** 
 * SearchItem
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
const SearchItem = ({ suggestion, onClick, searchTerm, isSelected, id }) => {
	return (
		<Button
			id={id}
			onClick={onClick}
			className={`block-editor-link-control__search-item is-entity ${
				isSelected && 'is-selected'
			}`}
			style={{
				borderRadius: '0',
			}}
		>
			<span className="block-editor-link-control__search-item-header">
				<span className="block-editor-link-control__search-item-title">
					<TextHighlight text={decodeEntities(suggestion.title)} highlight={searchTerm} />
				</span>
				<span aria-hidden className="block-editor-link-control__search-item-info">
					{filterURLForDisplay(safeDecodeURI(suggestion.url)) || ''}
				</span>
			</span>
			{suggestion.type && (
				<span className="block-editor-link-control__search-item-type">
					{/* Rename 'post_tag' to 'tag'. Ideally, the API would return the localised CPT or taxonomy label. */}
					{suggestion.type === 'post_tag' ? 'tag' : suggestion.type}
				</span>
			)}
		</Button>
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
};

export default SearchItem;
