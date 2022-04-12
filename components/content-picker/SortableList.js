import {
	DndContext,
	closestCenter,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PropTypes from 'prop-types';
import PickedItem from './PickedItem';

const SortableList = ({ posts, isOrderable, handleItemDelete, mode, setPosts }) => {
	const hasMultiplePosts = posts.length > 1;

	const items = posts.map((item) => item.uuid);
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = posts.findIndex((post) => post.uuid === active.id);
			const newIndex = posts.findIndex((post) => post.uuid === over.id);

			setPosts(arrayMove(posts, oldIndex, newIndex));
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{posts.map((post) => (
					<PickedItem
						isOrderable={hasMultiplePosts && isOrderable}
						key={post.uuid}
						handleItemDelete={handleItemDelete}
						item={post}
						mode={mode}
						id={post.uuid}
					/>
				))}
			</SortableContext>
		</DndContext>
	);
};

SortableList.defaultProps = {
	isOrderable: false,
	mode: 'post',
};

SortableList.propTypes = {
	posts: PropTypes.array.isRequired,
	isOrderable: PropTypes.bool,
	handleItemDelete: PropTypes.func.isRequired,
	mode: PropTypes.string,
	setPosts: PropTypes.func.isRequired,
};

export default SortableList;
