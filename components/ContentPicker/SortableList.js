import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PickedItem from './PickedItem';

const { useSelect } = wp.data;

const SortableList = SortableContainer(({ items, isOrderable, handleItemDelete }) => {
	const preparedItems = useSelect((select) => {
		if (items.length) {
			const query = select('core').getEntityRecords('postType', 'post', {
				include: items.join(','),
				per_page: 100,
			});

			if (query && query.length) {
				const queriedItems = [];

				query.forEach((queriedItem) => {
					queriedItems.push({
						title: queriedItem.title.rendered,
						url: '',
						id: queriedItem.id,
					});
				});

				return queriedItems;
			}
		}

		return [];
	}, items);

	const ItemComponent = isOrderable ? SortableElement(PickedItem) : PickedItem;
	return (
		<div>
			{preparedItems.map((item, index) => (
				<ItemComponent
					isOrderable={isOrderable}
					key={`item-${item.id}`}
					index={index}
					handleItemDelete={handleItemDelete}
					sortIndex={index}
					item={item}
				/>
			))}
		</div>
	);
});

export default SortableList;
