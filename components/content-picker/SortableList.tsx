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
import React from 'react';
import PickedItem from './PickedItem';

type SortableListProps = {
	posts: {
		uuid: string;
	}[];
	isOrderable: boolean;
	handleItemDelete: Function;
	mode: string;
	setPosts: Function;
};

const SortableList = ({ posts, isOrderable = false, handleItemDelete, mode = 'post', setPosts }: SortableListProps) => {
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

export default SortableList;
