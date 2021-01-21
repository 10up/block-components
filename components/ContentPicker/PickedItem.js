import PropTypes from 'prop-types';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * PickedItem
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
const PickedItem = ({ item: { title, url }, isOrderable }) => {
	return (
		<div
			className="block-editor-link-control__search-item is-entity"
			style={isOrderable ? { cursor: 'move' } : null}
		>
			<span className="block-editor-link-control__search-item-header">
				<span className="block-editor-link-control__search-item-title">
					{decodeEntities(title)}
				</span>
				<span aria-hidden className="block-editor-link-control__search-item-info">
					{filterURLForDisplay(safeDecodeURI(url)) || ''}
				</span>
			</span>
			<span
				style={{
					display: 'block',
					padding: '3px 8px',
					'margin-left': 'auto',
					'font-size': '2em',
					cursor: 'pointer',
				}}
			>
				&times;
			</span>
		</div>
	);
};

PickedItem.defaultProps = {
	isOrderable: false,
};

PickedItem.propTypes = {
	item: PropTypes.object.isRequired,
	isOrderable: PropTypes.bool,
};

export default PickedItem;
