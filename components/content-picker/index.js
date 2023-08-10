import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { select } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { v4 as uuidv4 } from 'uuid';
import { ContentSearch } from '../content-search';
import SortableList from './SortableList';

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

/**
 * Content Picker
 *
 * @param {object} props React props
 * @param {string} props.label label for the picker
 * @param {string} props.mode mode of the picker
 * @param {Array} props.contentTypes array of content types to filter by
 * @param {string} props.placeholder placeholder text for the search input
 * @param {Function} props.onPickChange callback for when the picker changes
 * @param {Function} props.queryFilter callback that allows to modify the query
 * @param {number} props.maxContentItems max number of items to show in the picker
 * @param {boolean} props.isOrderable whether or not the picker is sortable
 * @param {string} props.singlePickedLabel label for the single picked item
 * @param {string} props.multiPickedLabel label for the multi picked item
 * @param {Array} props.content items to show in the picker
 * @param {boolean} props.uniqueContentItems whether or not the picker should only show unique items
 * @param {boolean} props.excludeCurrentPost whether or not to exclude the current post from the picker
 * @param {number} props.perPage number of items to show per page
 * @param {boolean} props.fetchInitialResults whether or not to fetch initial results on mount
 * @param {string} props.pickedOrder string determining where the new item fits in the current list
 * @returns {*} React JSX
 */
const ContentPicker = ({
	label,
	mode,
	contentTypes,
	placeholder,
	onPickChange,
	queryFilter,
	maxContentItems,
	isOrderable,
	singlePickedLabel,
	multiPickedLabel,
	content,
	uniqueContentItems,
	excludeCurrentPost,
	perPage,
	fetchInitialResults,
	pickedOrder,
}) => {
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

	const handleSelect = (item) => {
		const newItem = {
			id: item.id,
			uuid: uuidv4(),
			type: 'subtype' in item ? item.subtype : item.type,
		};
		let newItems = [];

		if (pickedOrder instanceof Function) {
			newItems = pickedOrder(newItem, content);
		} else if (pickedOrder === 'start') {
			newItems = [newItem, ...content];
		} else if (pickedOrder === 'end') {
			newItems = [...content, newItem];
		}

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

ContentPicker.defaultProps = {
	label: '',
	mode: 'post',
	onPickChange: (ids) => {
		console.log('Content picker list change', ids); // eslint-disable-line no-console
	},
	queryFilter: undefined,
	contentTypes: ['post', 'page'],
	placeholder: '',
	content: [],
	perPage: 20,
	maxContentItems: 1,
	uniqueContentItems: true,
	isOrderable: false,
	excludeCurrentPost: true,
	multiPickedLabel: __('You have selected the following items:', '10up-block-components'),
	singlePickedLabel: __('You have selected the following item:', '10up-block-components'),
	fetchInitialResults: false,
	pickedOrder: 'start',
};

ContentPicker.propTypes = {
	contentTypes: PropTypes.array,
	content: PropTypes.array,
	placeholder: PropTypes.string,
	mode: PropTypes.oneOf(['post', 'user', 'term']),
	label: PropTypes.string,
	multiPickedLabel: PropTypes.string,
	singlePickedLabel: PropTypes.string,
	isOrderable: PropTypes.bool,
	onPickChange: PropTypes.func,
	queryFilter: PropTypes.func,
	uniqueContentItems: PropTypes.bool,
	excludeCurrentPost: PropTypes.bool,
	maxContentItems: PropTypes.number,
	perPage: PropTypes.number,
	fetchInitialResults: PropTypes.bool,
	pickedOrder: PropTypes.oneOfType([PropTypes.oneOf(['start', 'end']), PropTypes.func]),
};

export { ContentPicker };
