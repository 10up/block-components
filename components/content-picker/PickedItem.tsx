import styled from '@emotion/styled';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { safeHTML } from '@wordpress/dom';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { close, chevronUp, chevronDown } from '@wordpress/icons';
import {
	Button,
	__experimentalTreeGridRow as TreeGridRow,
	VisuallyHidden,
	__experimentalVStack as VStack,
	__experimentalTruncate as Truncate,
} from '@wordpress/components';
import { DragHandle } from '../drag-handle';
import { ContentSearchMode } from '../content-search/types';

export type PickedItemType = {
	id: number;
	type: string;
	uuid: string;
	title: string;
	url: string;
	info: string;
};

const PickedItemContainer = styled.div<{ isDragging?: boolean; isOrderable?: boolean }>`
	box-sizing: border-box;
	position: relative;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 8px;
	min-height: 36px;
	max-width: 100%;
	width: 100%;
	color: #1e1e1e;
	opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
	background: ${({ isDragging }) => (isDragging ? '#f0f0f0' : 'transparent')};
	border-radius: 2px;
	transition: background-color 0.1s linear;
	cursor: ${({ isDragging, isOrderable }) => {
		if (!isOrderable) return 'default';
		return isDragging ? 'grabbing' : 'grab';
	}};
	touch-action: none;

	&:hover {
		background: #f0f0f0;

		.move-up-button,
		.move-down-button,
		.remove-button {
			opacity: 1;
			pointer-events: auto;
		}
	}

	.components-button.has-icon {
		min-width: 24px;
		padding: 0;
		height: 24px;
	}

	&:not(:hover) .remove-button {
		opacity: 0;
		pointer-events: none;
	}
`;

const DragHandleWrapper = styled.div<{ isDragging: boolean }>`
	display: ${({ isDragging }) => (isDragging ? 'flex' : 'none')};
	align-items: center;
	justify-content: center;
	opacity: ${({ isDragging }) => (isDragging ? 1 : 0)};
	pointer-events: ${({ isDragging }) => (isDragging ? 'auto' : 'none')};
	transition: opacity 0.1s linear;
	position: absolute;
	left: 8px;
`;

const RemoveButton = styled(Button)<{ isDragging?: boolean }>`
	opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
	pointer-events: ${({ isDragging }) => (isDragging ? 'none' : 'auto')};
	transition: opacity 0.1s linear;

	&:focus {
		opacity: 1;
		pointer-events: auto;
	}
`;

const ItemContent = styled.div`
	flex: 1;
	min-width: 0;
	max-width: calc(100% - 80px); /* Account for the width of buttons */
	display: flex;
	flex-direction: column;
	gap: 2px;
	padding-left: ${({ isDragging }: { isDragging?: boolean }) => (isDragging ? '24px' : '0')};
	transition: padding-left 0.1s linear;
`;

const ItemTitle = styled.span`
	font-size: 0.875rem;
	line-height: 1.4;
	font-weight: 500;
	color: #1e1e1e;
`;

const ItemURL = styled.span`
	font-size: 0.75rem;
	line-height: 1.4;
	color: #757575;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const ItemInfo = styled('div')`
	font-size: 0.75rem;
	line-height: 1.4;
	color: #757575;
	margin-top: 4px;

	& p:first-of-type {
		margin-top: 0;
	}
`;

const MoveButton = styled(Button)`
	&.components-button.has-icon {
		min-width: 20px;
		padding: 0;
		height: 14px;
	}

	&.components-button.has-icon svg {
		width: 18px;
		height: 18px;
	}

	opacity: 0;
	pointer-events: none;
	transition: opacity 0.1s linear;

	&:focus {
		opacity: 1;
		pointer-events: auto;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	margin-left: auto;
`;

interface PickedItemProps {
	item: PickedItemType;
	isOrderable?: boolean;
	handleItemDelete: (deletedItem: PickedItemType) => void;
	mode: ContentSearchMode;
	id: number | string;
	isDragging?: boolean;
	positionInSet?: number;
	setSize?: number;
	onMoveUp?: () => void;
	onMoveDown?: () => void;
	PickedItemPreviewComponent?: React.ComponentType<{ item: PickedItemType }>;
}

/**
 * Component to render a preview of a picked item.
 *
 * @component
 * @param {object} props - The component props.
 * @param {PickedItemType} props.item - The picked item to display.
 * @returns {*} React JSX
 */
const PickedItemPreview: React.FC<{ item: PickedItemType }> = ({ item }) => {
	const { title, url, info } = item;
	const decodedTitle = decodeEntities(title);
	return (
		<>
			<ItemTitle>
				<Truncate title={decodedTitle} aria-label={decodedTitle}>
					{decodedTitle}
				</Truncate>
			</ItemTitle>
			{info && (
				<ItemInfo
					dangerouslySetInnerHTML={{
						__html: safeHTML(info),
					}}
				/>
			)}
			{url && <ItemURL>{filterURLForDisplay(safeDecodeURI(url)) || ''}</ItemURL>}
		</>
	);
};

/**
 * PickedItem
 *
 * @param {PickedItemProps} props react props
 * @returns {*} React JSX
 */
const PickedItem: React.FC<PickedItemProps> = ({
	item,
	isOrderable = false,
	handleItemDelete,
	id,
	isDragging = false,
	positionInSet = 1,
	setSize = 1,
	onMoveUp,
	onMoveDown,
	PickedItemPreviewComponent,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const isFirst = positionInSet === 1;
	const isLast = positionInSet === setSize;

	return (
		<TreeGridRow level={1} positionInSet={positionInSet} setSize={setSize}>
			<PickedItemContainer
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				isDragging={isDragging}
				isOrderable={isOrderable}
			>
				{isOrderable && (
					<DragHandleWrapper isDragging={isDragging}>
						<DragHandle />
					</DragHandleWrapper>
				)}
				<ItemContent isDragging={isDragging}>
					{PickedItemPreviewComponent ? (
						<PickedItemPreviewComponent item={item} />
					) : (
						<PickedItemPreview item={item} />
					)}
				</ItemContent>
				<ButtonContainer>
					{isOrderable && !isDragging && (
						<VStack spacing={0} className="move-buttons">
							<MoveButton
								disabled={isFirst}
								icon={chevronUp}
								onClick={(e: React.MouseEvent) => {
									e.stopPropagation();
									onMoveUp?.();
								}}
								className="move-up-button"
							>
								<VisuallyHidden>
									{__('Move item up', '10up-block-components')}
								</VisuallyHidden>
							</MoveButton>
							<MoveButton
								disabled={isLast}
								icon={chevronDown}
								onClick={(e: React.MouseEvent) => {
									e.stopPropagation();
									onMoveDown?.();
								}}
								className="move-down-button"
							>
								<VisuallyHidden>
									{__('Move item down', '10up-block-components')}
								</VisuallyHidden>
							</MoveButton>
						</VStack>
					)}
					{!isDragging && (
						<RemoveButton
							className="remove-button"
							icon={close}
							size="small"
							variant="tertiary"
							isDestructive
							label={__('Remove item', '10up-block-components')}
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation();
								handleItemDelete(item);
							}}
						/>
					)}
				</ButtonContainer>
			</PickedItemContainer>
		</TreeGridRow>
	);
};

export default PickedItem;
