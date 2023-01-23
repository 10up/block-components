import styled from '@emotion/styled';
import { select } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { v4 as uuidv4 } from 'uuid';
import { ContentSearch } from '../content-search';
import SortableList from './SortableList';
import React from 'react';

const NAMESPACE = 'tenup-content-picker';

/**
 * Unfortunately, we had to use !important because on PickedItem we couldn't @emotion/styled css
 * as it was breaking sortability from react-sortable-hoc
 */
const StyleWrapper = styled('div')`
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
const ContentPickerWrapper = styled('div')`
	width: 100%;
`;

type ContentPickerProps = {
	/**
	 * Array of content types to filter by
	 */
	contentTypes: string[];
	/**
	 * Array of content items to show in the picker
	 */
	content: {
		id: number;
		type?: string;
		uuid?: string;
	}[];
	/**
	 * Placeholder text for the search input
	 */
	placeholder: string;
	/**
	 * Mode of the picker
	 */
	mode: 'post' | 'user' | 'term';
	/**
	 * Label for the picker
	 */
	label: string;
	/**
	 * Label for the multi picked item
	 */
	multiPickedLabel: string;
	/**
	 * Label for the single picked item
	 */
	singlePickedLabel: string;
	/**
	 * Whether or not the picker is sortable
	 */
	isOrderable: boolean;
	/**
	 * Callback for when the picker changes
	 */
	onPickChange: Function;
	/**
	 * Callback that allows to modify the query
	 */
	queryFilter?: Function;
	/**
	 * Whether or not the picker should only show unique items
	 */
	uniqueContentItems: boolean;
	/**
	 * Whether or not to exclude the current post from the picker
	 */
	excludeCurrentPost: boolean;
	/**
	 * Max number of items to show in the picker
	 */
	maxContentItems: number;
	/**
	 * Number of items to show per page
	 */
	perPage: number;

	/**
	 * Whether or not to fetch initial results on mount
	 * @default true
	 */
	fetchInitialResults?: boolean;
};

export const ContentPicker = ({
	label = '',
	mode = 'post',
	onPickChange = (ids) => {
		console.log('Content picker list change', ids); // eslint-disable-line no-console
	},
	queryFilter = undefined,
	contentTypes = ['post', 'page'],
	placeholder = '',
	content = [],
	perPage = 20,
	maxContentItems = 1,
	uniqueContentItems = true,
	isOrderable = false,
	excludeCurrentPost = true,
	multiPickedLabel = __('You have selected the following items:', '10up-block-components'),
	singlePickedLabel = __('You have selected the following item:', '10up-block-components'),
	fetchInitialResults = true,
}: ContentPickerProps) => {
	const currentPostId = select('core/editor')?.getCurrentPostId();

	/**
	 * This legacy code allows you to pass in only IDs to content like [ 1, 4, 5 ].
	 * This really shouldn't be done as of version 1.5.0.
	 */
	if (content.length && typeof content[0] !== 'object') {
		for (let i = 0; i < content.length; i++) {
			content[i] = {
				id: Number(content[i]),
				uuid: uuidv4(),
				type: contentTypes[0],
			};
		}
	}

	const handleSelect = (item) => {
		const newItems = [
			{
				id: item.id,
				uuid: uuidv4(),
				type: 'subtype' in item ? item.subtype : item.type,
			},
			...content,
		];
		onPickChange(newItems);
	};

	const onDeleteItem = (deletedItem) => {
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
				uuid: uuidv4(),
			});
		}

		return items;
	}, [content, currentPostId, excludeCurrentPost, uniqueContentItems]);

	return (
		<ContentPickerWrapper className={NAMESPACE}>
			{!content.length || (content.length && content.length < maxContentItems) ? (
				<ContentSearch
					placeholder={placeholder}
					label={label}
					excludeItems={excludeItems}
					onSelectItem={handleSelect}
					contentTypes={contentTypes}
					mode={mode}
					queryFilter={queryFilter}
					perPage={perPage}
					fetchInitialResults={fetchInitialResults}
				/>
			) : (
				label && (
					<div
						style={{
							marginBottom: '8px',
						}}
					>
						{label}
					</div>
				)
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

					<ul className="block-editor-link-control__search-items">
						<SortableList
							posts={content}
							handleItemDelete={onDeleteItem}
							isOrderable={isOrderable}
							mode={mode}
							setPosts={onPickChange}
						/>
					</ul>
				</StyleWrapper>
			)}
		</ContentPickerWrapper>
	);
};
