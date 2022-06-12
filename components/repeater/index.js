import { useBlockEditContext, store as blockEditorStore } from '@wordpress/block-editor';
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect, cloneElement } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
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
import { DragHandle } from '../content-picker/PickedItem';

/**
 * The Repeater Component.
 *
 * @param {object} props React props
 * @param {Function} props.children Render prop to render the children.
 * @param {string} props.attribute property of the block attribute that will provide data for Repeater.
 * @param {string} props.addButton render prop to customize the "Add item" button.
 * @param {boolean} props.allowReordering boolean to toggle reordering of Repeater items.
 * @returns {*} React JSX
 */
export const Repeater = ({ children, attribute, addButton, allowReordering }) => {
	const { clientId, name } = useBlockEditContext();
	const { updateBlockAttributes } = dispatch(blockEditorStore);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const { repeaterData, defaultRepeaterData } = useSelect((select) => {
		const { getBlockAttributes } = select(blockEditorStore);
		const { getBlockType } = select(blocksStore);

		return {
			repeaterData: getBlockAttributes(clientId)[attribute],
			defaultRepeaterData: getBlockType(name).attributes[attribute].default,
		};
	});

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

	useEffect(() => {
		updateBlockAttributes(clientId, {
			[attribute]: repeaterData.map((item) => {
				item.id = uuid();
				return item;
			}),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * Adds a new repeater item.
	 */
	function addItem() {
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

/**
 * The Sortable Item Component.
 *
 * @param {object} props React props
 * @param {Function} props.children Render prop to render the children.
 * @param {object} props.item The repeater item object.
 * @param {Function} props.setItem A function to set state of a repeater item.
 * @param {Function} props.removeItem A function to delete a repeater item.
 * @param {string} props.id A string identifier for a repeater item.
 * @returns {*} React JSX
 */
const SortableItem = ({ children, item, setItem, removeItem, id }) => {
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

Repeater.defaultProps = {
	attribute: 'items',
	addButton: null,
	allowReordering: false,
};

Repeater.propTypes = {
	children: PropTypes.func.isRequired,
	attribute: PropTypes.string,
	addButton: PropTypes.func,
	allowReordering: PropTypes.bool,
};

SortableItem.defaultProps = {
	attribute: 'items',
	addItem: null,
	setItem: null,
	removeItem: null,
	item: {},
	id: '',
};

SortableItem.propTypes = {
	children: PropTypes.func.isRequired,
	attribute: PropTypes.string,
	addItem: PropTypes.func,
	setItem: PropTypes.func,
	removeItem: PropTypes.func,
	item: PropTypes.object,
	id: PropTypes.string,
};
