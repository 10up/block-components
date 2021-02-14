import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PickedItem from './PickedItem';

const SortableList = SortableContainer(({ items, isOrderable, handleItemDelete, mode }) => {
	const ItemComponent = isOrderable ? SortableElement(PickedItem) : PickedItem;
	return (
		<div>
			{items.map((item, index) => (
				<ItemComponent
					isOrderable={isOrderable && items.length > 1 ? isOrderable : false}
					key={`item-${item.id}`}
					index={index}
					handleItemDelete={handleItemDelete}
					sortIndex={index}
					item={item}
					mode={mode}
					totalItems={items.length}
				/>
			))}
		</div>
	);
});

export default SortableList;
