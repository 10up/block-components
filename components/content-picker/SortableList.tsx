import {
	DndContext,
	closestCenter,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	DragStartEvent,
	DragOverlay,
	defaultDropAnimation,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { __experimentalTreeGrid as TreeGrid } from '@wordpress/components';
import { useCallback, useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Post, User, store as coreStore } from '@wordpress/core-data';
import styled from '@emotion/styled';
import PickedItem, { PickedItemType } from './PickedItem';
import { DraggableChip } from './DraggableChip';
import { ContentSearchMode } from '../content-search/types';

const dropAnimation = {
	...defaultDropAnimation,
	dragSourceOpacity: 0.5,
};

interface SortableListProps {
	posts: Array<PickedItemType>;
	isOrderable: boolean;
	handleItemDelete: (post: PickedItemType) => void;
	mode: ContentSearchMode;
	setPosts: (posts: Array<PickedItemType>) => void;
	PickedItemPreviewComponent?: React.ComponentType<{ item: PickedItemType }>;
}

type Term = {
	count: number;
	description: string;
	id: number;
	link: string;
	meta: Record<string, unknown>;
	name: string;
	parent: number;
	slug: string;
	taxonomy: string;
};

function getEntityKind(mode: ContentSearchMode) {
	let type;
	switch (mode) {
		case 'post':
			type = 'postType' as const;
			break;
		case 'user':
			type = 'root' as const;
			break;
		default:
			type = 'taxonomy' as const;
			break;
	}

	return type;
}

const StyledTreeGrid = styled(TreeGrid)`
	max-width: 100%;
	display: block;

	& tbody,
	& tr,
	& td {
		display: block;
		max-width: 100%;
		width: 100%;
	}
`;

const SortableList: React.FC<SortableListProps> = ({
	posts,
	isOrderable = false,
	handleItemDelete,
	mode = 'post',
	setPosts,
	PickedItemPreviewComponent,
}) => {
	const hasMultiplePosts = posts.length > 1;
	const [activeId, setActiveId] = useState<string | null>(null);

	const entityKind = getEntityKind(mode);

	// Fetch all posts data at once
	const preparedItems = useSelect(
		(select) => {
			// @ts-ignore-next-line - The WordPress types are missing the hasFinishedResolution method.
			const { getEntityRecord, hasFinishedResolution } = select(coreStore);

			return posts.reduce<{ [key: string]: PickedItemType | null }>((acc, item) => {
				const fields = ['link', 'type', 'id'];
				if (mode === 'user') {
					fields.push('name');
				} else if (mode === 'post') {
					fields.push('title');
					fields.push('url');
					fields.push('subtype');
					fields.push('status'); // Include status to check for trashed posts
				} else {
					fields.push('name');
					fields.push('taxonomy');
				}
				const getEntityRecordParameters = [
					entityKind,
					item.type,
					item.id,
					{ _fields: fields },
				] as const;
				const result = getEntityRecord<Post | Term | User>(...getEntityRecordParameters);

				if (result) {
					let newItem: Partial<PickedItemType>;

					if (mode === 'post') {
						const post = result as Post;
						newItem = {
							title: post.title.rendered,
							url: post.link,
							id: post.id,
							type: post.type,
							status: (post as any).status, // Include status for trashed post detection
						};
					} else if (mode === 'user') {
						const user = result as User;
						newItem = {
							title: user.name,
							url: user.link,
							id: user.id,
							type: 'user',
						};
					} else {
						const taxonomy = result as Term;
						newItem = {
							title: taxonomy.name,
							url: taxonomy.link,
							id: taxonomy.id,
							type: taxonomy.taxonomy,
						};
					}

					if (item.uuid) {
						newItem.uuid = item.uuid;
					}

					acc[item.uuid] = newItem as PickedItemType;
				} else if (hasFinishedResolution('getEntityRecord', getEntityRecordParameters)) {
					acc[item.uuid] = null;
				}

				return acc;
			}, {});
		},
		[posts, entityKind],
	);

	const items = posts.map((item) => item.uuid);
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		}),
	);

	const handleDragStart = useCallback((event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	}, []);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			setActiveId(null);

			if (active.id !== over?.id) {
				const oldIndex = posts.findIndex((post) => post.uuid === active.id);
				const newIndex = posts.findIndex((post) => post.uuid === over?.id);

				setPosts(arrayMove(posts, oldIndex, newIndex));
			}
		},
		[posts, setPosts],
	);

	const handleDragCancel = useCallback(() => {
		setActiveId(null);
	}, []);

	const activePost = useMemo(
		() => (activeId ? preparedItems?.[activeId as string] : null),
		[activeId, preparedItems],
	);

	const renderItems = (items: Array<PickedItemType>) => {
		return items.map((post, index) => {
			const preparedItem = preparedItems[post.uuid];

			// If the item doesn't exist (was deleted) or is trashed, show a placeholder with remove option
			if (!preparedItem) {
				return (
					<PickedItem
						isOrderable={hasMultiplePosts && isOrderable}
						key={post.uuid}
						handleItemDelete={handleItemDelete}
						item={{
							id: post.id,
							type: post.type,
							uuid: post.uuid,
							title: __('(Item no longer exists)', '10up-block-components'),
							url: '',
						}}
						mode={mode}
						id={post.uuid}
						positionInSet={index + 1}
						setSize={items.length}
						onMoveUp={() => {
							if (index === 0) return;
							setPosts(arrayMove(posts, index, index - 1));
						}}
						onMoveDown={() => {
							if (index === items.length - 1) return;
							setPosts(arrayMove(posts, index, index + 1));
						}}
						PickedItemPreviewComponent={PickedItemPreviewComponent}
						isDeleted
					/>
				);
			}

			// Check if the post is trashed (only for post mode)
			const isTrashOrDeleted =
				mode === 'post' && preparedItem && preparedItem.status === 'trash';

			if (isTrashOrDeleted) {
				return (
					<PickedItem
						isOrderable={hasMultiplePosts && isOrderable}
						key={post.uuid}
						handleItemDelete={handleItemDelete}
						item={{
							id: preparedItem.id,
							type: preparedItem.type,
							uuid: preparedItem.uuid,
							title: __('(Item in trash)', '10up-block-components'),
							url: preparedItem.url,
						}}
						mode={mode}
						id={post.uuid}
						positionInSet={index + 1}
						setSize={items.length}
						onMoveUp={() => {
							if (index === 0) return;
							setPosts(arrayMove(posts, index, index - 1));
						}}
						onMoveDown={() => {
							if (index === items.length - 1) return;
							setPosts(arrayMove(posts, index, index + 1));
						}}
						PickedItemPreviewComponent={PickedItemPreviewComponent}
						isDeleted
					/>
				);
			}

			const handleMoveUp = () => {
				if (index === 0) return;
				setPosts(arrayMove(posts, index, index - 1));
			};

			const handleMoveDown = () => {
				if (index === items.length - 1) return;
				setPosts(arrayMove(posts, index, index + 1));
			};

			return (
				<PickedItem
					isOrderable={hasMultiplePosts && isOrderable}
					key={post.uuid}
					handleItemDelete={handleItemDelete}
					item={preparedItem}
					mode={mode}
					id={post.uuid}
					positionInSet={index + 1}
					setSize={items.length}
					onMoveUp={handleMoveUp}
					onMoveDown={handleMoveDown}
					PickedItemPreviewComponent={PickedItemPreviewComponent}
				/>
			);
		});
	};

	// If not orderable or only one item, render simple list
	if (!isOrderable || !hasMultiplePosts) {
		return (
			<StyledTreeGrid
				className="block-editor-list-view-tree"
				aria-label={__('Selected items list')}
				onCollapseRow={() => {}}
				onExpandRow={() => {}}
			>
				{renderItems(posts)}
			</StyledTreeGrid>
		);
	}

	// If orderable, wrap with drag and drop context
	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
		>
			<StyledTreeGrid
				className="block-editor-list-view-tree"
				aria-label={__('Selected items list')}
				onCollapseRow={() => {}}
				onExpandRow={() => {}}
			>
				<SortableContext items={items} strategy={verticalListSortingStrategy}>
					{renderItems(posts)}
				</SortableContext>
			</StyledTreeGrid>
			<DragOverlay dropAnimation={dropAnimation}>
				{activeId && activePost ? <DraggableChip title={activePost.title} /> : null}
			</DragOverlay>
		</DndContext>
	);
};

export default SortableList;
