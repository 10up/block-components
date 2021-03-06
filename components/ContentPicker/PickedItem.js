import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { sortableHandle } from 'react-sortable-hoc';

/**
 * PickedItem
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */

const DragHandle = sortableHandle(() => (
	<svg
		style={{ marginRight: '5px', cursor: 'grab' }}
		width="18"
		height="18"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 18 18"
		role="img"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z" />
	</svg>
));

const Wrapper = styled('div')`
	button {
		display: block;
		padding: 2px 8px 6px 8px;
		margin-left: auto;
		font-size: 2em;
		cursor: pointer;
		border: none;
		background-color: transparent;

		&:hover {
			background-color: #ccc;
		}
	}
`;

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
		<Wrapper
			style={{
				border: '2px dashed #ddd',
				paddingTop: '10px',
				paddingBottom: '10px',
				paddingLeft: isOrderable ? '3px' : '8px',
			}}
			className="block-editor-link-control__search-item is-entity"
		>
			{isOrderable ? <DragHandle /> : ''}
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
				onClick={() => {
					handleItemDelete(preparedItem, sortIndex);
				}}
				aria-label={__('Delete item', '10up-block-components')}
			>
				&times;
			</button>
		</Wrapper>
	) : (
		<div />
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
