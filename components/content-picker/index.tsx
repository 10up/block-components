import styled from '@emotion/styled';
import { select } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { VisuallyHidden } from '@wordpress/components';
import { v4 as uuidv4 } from 'uuid';
import { ContentSearch } from '../content-search';
import SortableList from './SortableList';
import { StyledComponentContext } from '../styled-components-context';
import { defaultRenderItemType } from '../content-search/SearchItem';
import {
	ContentSearchMode,
	QueryFilter,
	QueryFieldsFilter,
	RenderItemComponentProps,
	SearchResultFilter,
} from '../content-search/types';
import { NormalizedSuggestion } from '../content-search/utils';
import { PickedItemType } from './PickedItem';

export type PickedItemFilter = (
	item: Partial<PickedItemType>,
	originalResult: any,
) => Partial<PickedItemType>;

const NAMESPACE = 'tenup-content-picker';

/**
 * Unfortunately, we had to use !important because on PickedItem we couldn't @emotion/styled css
 * as it was breaking sortability from react-sortable-hoc
 */
const StyleWrapper = styled.div`
	& .block-editor-link-control__search-item {
		cursor: default;

		&:hover {
			background: transparent;
		}
	}
`;

/**
 * Without this, the flex parents will limit the width of the picker. Fixes view when the results
 * all have short titles.
 */
const ContentPickerWrapper = styled.div`
	width: 100%;
`;

export type ContentPickerOptions = {
	inputDelay: number;
};

export interface ContentPickerProps {
	label?: string;
	hideLabelFromVision?: boolean;
	mode?: ContentSearchMode;
	contentTypes?: string[];
	placeholder?: string;
	onPickChange?: (ids: any[]) => void;
	queryFilter?: QueryFilter;
	queryFieldsFilter?: QueryFieldsFilter;
	searchResultFilter?: SearchResultFilter;
	pickedItemFilter?: PickedItemFilter;
	maxContentItems?: number;
	isOrderable?: boolean;
	singlePickedLabel?: string;
	multiPickedLabel?: string;
	content?: any[];
	uniqueContentItems?: boolean;
	excludeCurrentPost?: boolean;
	perPage?: number;
	fetchInitialResults?: boolean;
	renderItemType?: (props: NormalizedSuggestion) => string;
	renderItem?: (props: RenderItemComponentProps) => JSX.Element;
	PickedItemPreviewComponent?: React.ComponentType<{ item: PickedItemType }>;
	options?: ContentPickerOptions;
}

export const ContentPicker: React.FC<ContentPickerProps> = ({
	label = '',
	hideLabelFromVision = true,
	mode = 'post',
	contentTypes = ['post', 'page'],
	placeholder = '',
	onPickChange = (ids) => {
		console.log('Content picker list change', ids); // eslint-disable-line no-console
	},
	queryFilter = undefined,
	queryFieldsFilter,
	searchResultFilter,
	pickedItemFilter,
	maxContentItems = 1,
	isOrderable = false,
	singlePickedLabel = __('You have selected the following item:', '10up-block-components'),
	multiPickedLabel = __('You have selected the following items:', '10up-block-components'),
	content = [],
	uniqueContentItems = true,
	excludeCurrentPost = true,
	perPage = 20,
	fetchInitialResults = false,
	renderItemType = defaultRenderItemType,
	renderItem = undefined,
	PickedItemPreviewComponent = undefined,
	options,
}) => {
	const searchOptions =
		options && options.inputDelay ? { inputDelay: options.inputDelay } : undefined;
	const currentPostId = select('core/editor')?.getCurrentPostId();

	/**
	 * This legacy code allows you to pass in only IDs to content like [ 1, 4, 5 ].
	 * This really shouldn't be done as of version 1.5.0.
	 */
	if (content.length && typeof content[0] !== 'object') {
		for (let i = 0; i < content.length; i++) {
			content[i] = {
				id: content[i],
				type: contentTypes[0],
			};
		}
	}

	const handleSelect = (item: { id: number; subtype?: string; type: string }) => {
		const newItems = [
			{
				id: item.id,
				uuid: uuidv4(),
				type: 'subtype' in item && item.subtype ? item.subtype : item.type,
			},
			...content,
		];
		onPickChange(newItems);
	};

	const onDeleteItem = (deletedItem: PickedItemType) => {
		const newItems = content.filter(({ id, uuid }) => {
			if (deletedItem.uuid) {
				return uuid !== deletedItem.uuid;
			}
			return id !== deletedItem.id;
		});

		onPickChange(newItems);
	};

	const excludeItems = useMemo(() => {
		const items = uniqueContentItems ? [...content] : [];

		if (excludeCurrentPost && currentPostId) {
			items.push({
				id: currentPostId,
			});
		}

		return items;
	}, [content, currentPostId, excludeCurrentPost, uniqueContentItems]);

	return (
		<StyledComponentContext cacheKey="tenup-component-content-picker">
			<ContentPickerWrapper className={NAMESPACE}>
				{!content.length || (content.length && content.length < maxContentItems) ? (
					<ContentSearch
						placeholder={placeholder}
						label={label}
						hideLabelFromVision={hideLabelFromVision}
						excludeItems={excludeItems}
						onSelectItem={handleSelect}
						contentTypes={contentTypes}
						mode={mode}
						queryFilter={queryFilter}
						queryFieldsFilter={queryFieldsFilter}
						searchResultFilter={searchResultFilter}
						perPage={perPage}
						fetchInitialResults={fetchInitialResults}
						renderItemType={renderItemType}
						renderItem={renderItem}
						options={searchOptions}
					/>
				) : (
					label &&
					(hideLabelFromVision ? (
						<VisuallyHidden>{label}</VisuallyHidden>
					) : (
						<div
							style={{
								marginBottom: '8px',
							}}
						>
							{label}
						</div>
					))
				)}

				{Boolean(content?.length) && (
					<StyleWrapper>
						<span
							style={{
								marginTop: '15px',
								marginBottom: '2px',
								display: 'block',
							}}
						>
							{content.length > 1 ? multiPickedLabel : singlePickedLabel}
						</span>

						<ul
							className="block-editor-link-control__search-items"
							style={{ padding: 0 }}
						>
							<SortableList
								posts={content}
								handleItemDelete={onDeleteItem}
								isOrderable={isOrderable}
								mode={mode}
								setPosts={onPickChange}
								PickedItemPreviewComponent={PickedItemPreviewComponent}
								queryFieldsFilter={queryFieldsFilter}
								pickedItemFilter={pickedItemFilter}
							/>
						</ul>
					</StyleWrapper>
				)}
			</ContentPickerWrapper>
		</StyledComponentContext>
	);
};
