import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
/** @jsx jsx */
import { jsx } from '@emotion/react';

/**
 * PickedItem
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
const PickedItem = ({ item, isOrderable, handleItemDelete, sortIndex }) => {
	return (
		<div
			css={{
				cursor: isOrderable ? 'move' : 'default',
				':hover': !isOrderable
					? {
							backgroundColor: 'transparent',
					  }
					: '',
			}}
			className="block-editor-link-control__search-item is-entity"
		>
			<span className="block-editor-link-control__search-item-header">
				<span className="block-editor-link-control__search-item-title">
					{decodeEntities(item.title)}
				</span>
				<span aria-hidden className="block-editor-link-control__search-item-info">
					{filterURLForDisplay(safeDecodeURI(item.url)) || ''}
				</span>
			</span>
			<button
				type="button"
				css={{
					display: 'block',
					padding: '2px 8px 6px 8px;',
					marginLeft: 'auto',
					fontSize: '2em',
					cursor: 'pointer',
					border: 'none',
					backgroundColor: 'transparent',
					':hover': {
						backgroundColor: '#ccc',
					},
				}}
				onClick={() => {
					handleItemDelete(item, sortIndex);
				}}
				aria-label={__('Delete item', '10up-block-components')}
			>
				&times;
			</button>
		</div>
	);
};

PickedItem.defaultProps = {
	isOrderable: false,
};

PickedItem.propTypes = {
	item: PropTypes.object.isRequired,
	isOrderable: PropTypes.bool,
	handleItemDelete: PropTypes.func.isRequired,
	sortIndex: PropTypes.number.isRequired,
};

export default PickedItem;
