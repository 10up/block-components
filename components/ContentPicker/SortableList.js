import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PickedItem from './PickedItem';

const { withSelect } = wp.data;

const SortableList = SortableContainer(({ preparedItems, isOrderable, handleItemDelete }) => {
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

export default withSelect((select, { items, mode }) => {
	const type = mode === 'post' ? 'postType' : 'taxonomy';

	const itemsByType = {};

	const queries = [];

	items.forEach((item) => {
		if (!itemsByType[item.type]) {
			itemsByType[item.type] = [];
		}

		itemsByType[item.type].push(item.id);
	});

	let startedQueries = 0;

	Object.keys(itemsByType).forEach((itemType) => {
		itemsByType[itemType].forEach((itemId) => {
			const query = select('core').getEntityRecord(type, itemType, itemId);

			startedQueries++;

			queries.push(query);
		});
	});

	const preparedItems = [];
	let finishedQueries = 0;

	queries.forEach((result) => {
		if (typeof result === 'object') {
			finishedQueries++;

			preparedItems.push({
				title: mode === 'post' ? result.title.rendered : result.name,
				url: result.link,
				id: result.id,
			});
		}
	});

	if (finishedQueries !== startedQueries) {
		return { preparedItems: [] };
	}

	return { preparedItems };
})(SortableList);
