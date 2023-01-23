import { useBlockEditContext, store as blockEditorStore } from '@wordpress/block-editor';
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect, dispatch } from '@wordpress/data';
import { cloneElement } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { v4 as uuid } from 'uuid';

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle } from '../drag-handle';
import React from 'react';

export type RepeaterProps = {
	/**
	 * Render prop to render the children.
	 */
	children: React.ReactNode;
	/**
	 * property of the block attribute that will provide data for Repeater.
	 */
	attribute: string;
	/**
	 * render prop to customize the "Add item" button.
	 */
	addButton?: Function | null;
	/**
	 * boolean to toggle reordering of Repeater items.
	 */
	allowReordering: boolean;
};

export const Repeater = ({ children, attribute = 'items', addButton = null, allowReordering = false }: RepeaterProps) => {
	const { clientId, name } = useBlockEditContext();
	const { updateBlockAttributes } = dispatch(blockEditorStore);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const { repeaterData, defaultRepeaterData } = useSelect((select) => {

		// @ts-ignore
		const { getBlockAttributes } = select(blockEditorStore);
		// @ts-ignore
		const { getBlockType } = select(blocksStore);
		const repeaterDataTemp = getBlockAttributes(clientId)[attribute];

		if (repeaterDataTemp.length === 1 && !repeaterDataTemp[0].id) {
			repeaterDataTemp[0].id = uuid();
		}

		return {
			repeaterData: repeaterDataTemp,
			defaultRepeaterData: getBlockType(name).attributes[attribute].default,
		};
	}, [clientId, attribute, name]);

	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			const moveArray = (items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			};

			updateBlockAttributes(clientId, {
				[attribute]: moveArray(repeaterData),
			});
		}
	}

	/**
	 * Adds a new repeater item.
	 */
	function addItem() {
		/*
		 * [...defaultRepeaterData] does a shallow copy. To ensure deep-copy,
		 * we do JSON.parse(JSON.stringify()).
		 */
		const defaultRepeaterDataCopy = JSON.parse(JSON.stringify(defaultRepeaterData));

		if (!defaultRepeaterData.length) {
			defaultRepeaterDataCopy.push([]);
		}

		defaultRepeaterDataCopy[0].id = uuid();

		updateBlockAttributes(clientId, {
			[attribute]: [...repeaterData, ...defaultRepeaterDataCopy],
		});
	}

	/**
	 * Updates the item currently being edited.
	 *
	 * @param {string|number|boolean} value The value that should be used to updated the item.
	 * @param {number} index The index at which the item should be updated.
	 */
	function setItem(value, index) {
		/*
		 * [...repeaterData] does a shallow copy. To ensure deep-copy,
		 * we do JSON.parse(JSON.stringify()).
		 */
		const repeaterDataCopy = JSON.parse(JSON.stringify(repeaterData));

		if (typeof value === 'object' && value !== null) {
			repeaterDataCopy[index] = { ...repeaterDataCopy[index], ...value };
		} else {
			repeaterDataCopy[index] = value;
		}
		updateBlockAttributes(clientId, { [attribute]: repeaterDataCopy });
	}

	/**
	 * Removes an item from the list.
	 *
	 * @param {number} index The index of the item that needs to be removed.
	 */
	function removeItem(index) {
		const repeaterDataCopy = JSON.parse(JSON.stringify(repeaterData)).filter(
			(item, innerIndex) => index !== innerIndex,
		);
		updateBlockAttributes(clientId, { [attribute]: repeaterDataCopy });
	}

	const itemIds = repeaterData.map((item) => item.id);

	return (
		<>
			{allowReordering ? (
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={(e) => handleDragEnd(e)}
					modifiers={[restrictToVerticalAxis]}
				>
					<SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
						{repeaterData.map((item, key) => {
							return (
								<SortableItem
									item={item}
									setItem={(val) => setItem(val, key)}
									removeItem={() => removeItem(key)}
									key={item.id}
									id={item.id}
								>
									{(item, id, setItem, removeItem) => {
										return children(
											item,
											id,
											(val) => setItem(val, key),
											() => removeItem(key),
										);
									}}
								</SortableItem>
							);
						})}
					</SortableContext>
				</DndContext>
			) : (
				repeaterData.map((item, key) => {
					return children(
						item,
						item.id,
						(val) => setItem(val, key),
						() => removeItem(key),
					);
				})
			)}
			{typeof addButton === 'function' ? (
				addButton(addItem)
			) : (
				<Button variant="primary" onClick={() => addItem()}>
					{__('Add item')}
				</Button>
			)}
		</>
	);
};

export type SortableItemProps = {
	/**
	 * Render prop to render the children.
	 */
	children: Function;
	/**
	 * A function to set state of a repeater item.
	 */
	setItem?: Function | null;
	/**
	 * A function to delete a repeater item.
	 */
	removeItem?: Function | null;
	/**
	 * The repeater item object.
	 */
	item: Object;
	/**
	 * A string identifier for a repeater item.
	 */
	id: string;
};

const SortableItem = ({ children, item = {}, setItem = null, removeItem = null, id = '' }: SortableItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		display: 'flex',
		zIndex: isDragging ? 999 : 1,
		position: 'relative',
	};

	// check if the children is a function
	if (typeof children !== 'function') {
		return null;
	}

	const repeaterItem = children(item, id, setItem, removeItem);
	const clonedRepeaterChild = cloneElement(
		repeaterItem,
		{
			ref: setNodeRef,
			style,
			className: isDragging
				? `${repeaterItem.props.className} repeater-item--is-dragging`
				: repeaterItem.props.className,
		},
		[
			<DragHandle className="repeater-item__drag-handle" {...attributes} {...listeners} />,
			repeaterItem.props.children,
		],
	);

	return clonedRepeaterChild;
};
