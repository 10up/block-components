import { useBlockEditContext, store as blockEditorStore } from '@wordpress/block-editor';
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect, dispatch } from '@wordpress/data';
import { cloneElement } from '@wordpress/element';
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
import { DragHandle } from '../drag-handle';

export const AttributeRepeater = ({ children, attribute, addButton, allowReordering }) => {
	const { clientId, name } = useBlockEditContext();
	const { updateBlockAttributes } = dispatch(blockEditorStore);

	const attributeValue = useSelect((select) => {
		const attributes = select(blockEditorStore).getBlockAttributes(clientId);
		return attributes[attribute] || [];
	});

	const { defaultRepeaterData } = useSelect((select) => {
		return {
			defaultRepeaterData:
				select(blocksStore).getBlockType(name).attributes[attribute].default,
		};
	});

	const handleOnChange = (value) => {
		updateBlockAttributes(clientId, { [attribute]: value });
	};

	return (
		<Repeater
			addButton={addButton}
			allowReordering={allowReordering}
			onChange={handleOnChange}
			value={attributeValue}
			defaultValue={defaultRepeaterData}
		>
			{children}
		</Repeater>
	);
};

/**
 * The Repeater Component.
 *
 * @param {object} props React props
 * @param {Function} props.children Render prop to render the children.
 * @param {string} props.addButton render prop to customize the "Add item" button.
 * @param {boolean} props.allowReordering boolean to toggle reordering of Repeater items.
 * @param {Function} props.onChange callback function to update the block attribute.
 * @param {Array} props.value array of Repeater items.
 * @param {Array} props.defaultValue array of default Repeater items.
 * @returns {*} React JSX
 */
export const Repeater = ({
	children,
	addButton,
	allowReordering,
	onChange,
	value,
	defaultValue,
}) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			const moveArray = (items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			};

			onChange(moveArray(value));
		}
	}

	/**
	 * Adds a new repeater item.
	 */
	function addItem() {
		/*
		 * [...defaultValue] does a shallow copy. To ensure deep-copy,
		 * we do JSON.parse(JSON.stringify()).
		 */
		const defaultValueCopy = JSON.parse(JSON.stringify(defaultValue));

		if (!defaultValue.length) {
			defaultValueCopy.push([]);
		}

		defaultValueCopy[0].id = uuid();

		onChange([...value, ...defaultValueCopy]);
	}

	/**
	 * Updates the item currently being edited.
	 *
	 * @param {string|number|boolean} newValue The value that should be used to updated the item.
	 * @param {number} index The index at which the item should be updated.
	 */
	function setItem(newValue, index) {
		/*
		 * [...value] does a shallow copy. To ensure deep-copy,
		 * we do JSON.parse(JSON.stringify()).
		 */
		const valueCopy = JSON.parse(JSON.stringify(value));

		if (typeof newValue === 'object' && newValue !== null) {
			valueCopy[index] = { ...valueCopy[index], ...newValue };
		} else {
			valueCopy[index] = newValue;
		}

		onChange(valueCopy);
	}

	/**
	 * Removes an item from the list.
	 *
	 * @param {number} index The index of the item that needs to be removed.
	 */
	function removeItem(index) {
		const valueCopy = JSON.parse(JSON.stringify(value)).filter(
			(item, innerIndex) => index !== innerIndex,
		);
		onChange(valueCopy);
	}

	const itemIds = value.map((item) => item.id);

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
						{value.map((item, key) => {
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
				value.map((item, key) => {
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
	addButton: null,
	allowReordering: false,
};

AttributeRepeater.defaultProps = {
	attribute: 'items',
	addButton: null,
	allowReordering: false,
};

AttributeRepeater.propTypes = {
	children: PropTypes.func.isRequired,
	attribute: PropTypes.string,
	addButton: PropTypes.func,
	allowReordering: PropTypes.bool,
};

Repeater.propTypes = {
	children: PropTypes.func.isRequired,
	addButton: PropTypes.func,
	allowReordering: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.array.isRequired,
	defaultValue: PropTypes.array.isRequired,
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
