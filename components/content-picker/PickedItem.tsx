import styled from '@emotion/styled';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { DragHandle } from '../drag-handle';
import React from 'react';
import { store as coreStore } from '@wordpress/core-data';

const StyledCloseButton = styled('button')`
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
`;

function getType(mode) {
	let type;
	switch (mode) {
		case 'post':
			type = 'postType';
			break;
		case 'user':
			type = 'root';
			break;
		default:
			type = 'taxonomy';
			break;
	}

	return type;
}

type PickedItemProps = {
	item: {
		id: number;
		type?: string;
		uuid: string;
	};
	isOrderable: boolean;
	handleItemDelete: Function;
	mode: string;
	id: string | number;
};

/**
 * PickedItem
 *
 * @param {object} props react props
 * @param {object} props.item item to show in the picker
 * @param {boolean} props.isOrderable whether or not the picker is sortable
 * @param {Function} props.handleItemDelete callback for when the item is deleted
 * @param {string} props.mode mode of the picker
 * @param {number|string} props.id id of the item
 * @returns {*} React JSX
 */
const PickedItem = ({ item, isOrderable = false, handleItemDelete, mode, id }: PickedItemProps) => {
	const type = getType(mode);

	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
		id,
	});

	// This will return undefined while the item data is being fetched. If the item comes back
	// empty, it will return null, which is handled in the effect below.
	const preparedItem = useSelect(
		(select) => {
			// @ts-ignore
			const { getEntityRecord, hasFinishedResolution } = select(coreStore);

			const getEntityRecordParameters = [type, item.type, item.id];
			const result: any = getEntityRecord(...getEntityRecordParameters);

			if (result) {
				const newItem: {
					[key: string]: any;
				} = {
					title: mode === 'post' ? result.title.rendered : result.name,
					url: result.link,
					id: result.id,
				};

				if (item.uuid) {
					newItem.uuid = item.uuid;
				}

				return newItem;
			}

			if (hasFinishedResolution('getEntityRecord', getEntityRecordParameters)) {
				return null;
			}

			return undefined;
		},
		[item.id, type],
	);

	// If `getEntityRecord` did not return an item, pass it to the delete callback.
	useEffect(() => {
		if (preparedItem === null) {
			handleItemDelete(item);
		}
	}, [item, handleItemDelete, preparedItem]);

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		border: isDragging ? '2px dashed #ddd' : '2px dashed transparent',
		paddingTop: '10px',
		paddingBottom: '10px',
		display: 'flex',
		alignItems: 'center',
		paddingLeft: isOrderable ? '3px' : '8px',
	};

	const normalizedItemType = item?.type ? item.type : 'post';
	const className = `block-editor-link-control__search-item is-entity is-type-${normalizedItemType}`;

	if (!preparedItem) {
		return null;
	}

	return (
		<li className={className} ref={setNodeRef} style={style}>
			{isOrderable ? <DragHandle {...attributes} {...listeners} /> : ''}
			<span className="block-editor-link-control__search-item-header">
				<span className="block-editor-link-control__search-item-title">
					{decodeEntities(preparedItem.title)}
				</span>
				<span aria-hidden className="block-editor-link-control__search-item-info">
					{filterURLForDisplay(safeDecodeURI(preparedItem.url)) || ''}
				</span>
			</span>

			<StyledCloseButton
				type="button"
				onClick={() => {
					handleItemDelete(preparedItem);
				}}
				aria-label={__('Delete item', '10up-block-components')}
			>
				&times;
			</StyledCloseButton>
		</li>
	);
};

export default PickedItem;
