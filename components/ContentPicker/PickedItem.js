import PropTypes from 'prop-types';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
/** @jsx jsx */
import { jsx } from '@emotion/react'; // eslint-disable-line no-unused-vars

/**
 * PickedItem
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
const PickedItem = ({ item, isOrderable, handleItemDelete, sortIndex, mode }) => {
	const type = mode === 'post' ? 'postType' : 'taxonomy';

	const preparedItem = useSelect(
		(select) => {
			const result = select('core').getEntityRecord(type, item.type, item.id);

			if (result) {
				return {
					title: mode === 'post' ? result.title.rendered : result.name,
					url: result.link,
					id: result.id,
				};
			}

			return null;
		},
		[item.id, type],
	);

	return preparedItem ? (
		<div
			css={{
				cursor: isOrderable ? 'move' : 'default',
				border: '2px dashed #ddd',
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
					{decodeEntities(preparedItem.title)}
				</span>
				<span aria-hidden className="block-editor-link-control__search-item-info">
					{filterURLForDisplay(safeDecodeURI(preparedItem.url)) || ''}
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
					handleItemDelete(preparedItem, sortIndex);
				}}
				aria-label={__('Delete item', '10up-block-components')}
			>
				&times;
			</button>
		</div>
	) : (
		''
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
	mode: PropTypes.string.isRequired,
};

export default PickedItem;
