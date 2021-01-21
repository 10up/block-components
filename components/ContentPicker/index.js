import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { TextControl, Button, Spinner, NavigableMenu } from '@wordpress/components';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PickedItem from './PickedItem';
import SearchItem from './SearchItem';

const NAMESPACE = '10up-block-components';
/**
 * Content Picker
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
const ContentPicker = ({
	label,
	mode,
	contentTypes,
	placeholder,
	onSelect,
	isMulti,
	isOrderable,
	singlePickedLabel,
	multiPickedLabel,
	content: presetContent,
}) => {
	const [searchString, setSearchString] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { useSelect } = wp.data;
	const [selectedItem, setSelectedItem] = useState(null);
	const [content, setContent] = useState({
		data: {},
		picked: presetContent,
	});

	const unavailableItems = [];

	content.picked.forEach((id) => {
		if (!content.data[id]) {
			unavailableItems.push(id);
		}
	});

	useSelect((select) => {
		if (unavailableItems.length) {
			const query = select('core').getEntityRecords('postType', 'post', {
				include: unavailableItems,
				per_page: 20,
			});

			console.log(query);

			const newContent = {
				data: { ...content.data },
				picked: [...content.picked],
			};

			if (query && query.length) {
				query.forEach((queriedItem) => {
					newContent.data[`${queriedItem.id}`] = {
						title: queriedItem.title.rendered,
						url: '',
						id: queriedItem.id,
					};
				});
			}

			setContent(newContent);

			return newContent;
		}

		return null;
	}, unavailableItems);

	function handleItemSelection(item) {
		onSelect(item, item.type);
		setSearchResults([]);
		setSearchString('');

		const newContent = {
			data: { ...content.data },
			picked: [...content.picked],
		};

		newContent.data[`${item.id}`] = item;

		newContent.picked.unshift(item.id);

		setContent(newContent);
	}

	/**
	 * handleSearchStringChange
	 *
	 * Using the keyword and the list of tags that are linked to the parent block
	 * search for posts/terms that match and return them to the autocomplete component.
	 *
	 * @param {string} keyword search query string
	 */
	const handleSearchStringChange = (keyword) => {
		setSearchString(keyword);
		setIsLoading(true);

		const searchQuery = `wp/v2/search/?search=${keyword}&subtype=${contentTypes.join(
			',',
		)}&type=${mode}`;

		apiFetch({
			path: searchQuery,
		}).then((results) => {
			setSearchResults(results);
			setIsLoading(false);
		});
	};

	/**
	 * handleSelection
	 *
	 * update the selected item in state to either the selected item or null if the
	 * selected item does not have a valid id
	 *
	 * @param {*} item
	 */
	function handleSelection(item) {
		if (item === 0) {
			setSelectedItem(null);
		}

		setSelectedItem(item);
	}

	function handleItemDelete(item) {}

	const hasSearchString = !!searchString.length;
	const hasSearchResults = !!searchResults.length;

	const SortableList = SortableContainer(({ items }) => {
		console.log(content.data);
		const ItemComponent = isOrderable ? SortableElement(PickedItem) : PickedItem;
		return (
			<div>
				{items.map((id, index) => (
					<ItemComponent
						isOrderable={isOrderable}
						key={`item-${id}`}
						index={index}
						sortIndex={index}
						item={content.data[`${id}`]}
					/>
				))}
			</div>
		);
	});

	return (
		<div className={`${NAMESPACE}`}>
			{!content.picked.length || (content.picked.length && isMulti) ? (
				<NavigableMenu onNavigate={handleSelection} orientation="vertical">
					<TextControl
						label={label}
						value={searchString}
						onChange={handleSearchStringChange}
						placeholder={placeholder}
						autocomplete="off"
					/>
					{hasSearchString ? (
						<ul
							className={`${NAMESPACE}-grid`}
							style={{
								marginTop: '0',
								marginBottom: '0',
								marginLeft: '0',
								paddingLeft: '0',
								listStyle: 'none',
							}}
						>
							{isLoading && <Spinner />}
							{!isLoading && !hasSearchResults && (
								<li className={`${NAMESPACE}-grid-item`}>
									<Button disabled>
										{__('No Items found', '10up-block-components')}
									</Button>
								</li>
							)}
							{searchResults.map((item, index) => {
								if (!item.title.length) {
									return null;
								}

								return (
									<li
										key={item.id}
										className={`${NAMESPACE}-grid-item`}
										style={{
											marginBottom: '0',
										}}
									>
										<SearchItem
											onClick={() => handleItemSelection(item)}
											searchTerm={searchString}
											suggestion={item}
											isSelected={selectedItem === index + 1}
										/>
									</li>
								);
							})}
						</ul>
					) : null}
				</NavigableMenu>
			) : null}
			{content.picked.length ? (
				<>
					<span>{content.picked.length > 1 ? multiPickedLabel : singlePickedLabel}</span>

					<SortableList
						items={content.picked}
						onSortEnd={({ oldIndex, newIndex }) => {
							console.log('sort end');
						}}
					/>
				</>
			) : null}
		</div>
	);
};

ContentPicker.defaultProps = {
	label: '',
	mode: 'post',
	onSelect: (item, type) => {
		console.log(item, type); // eslint-disable-line no-console
	},
	contentTypes: ['post', 'page'],
	placeholder: '',
	content: [],
	isMulti: false,
	isOrderable: false,
	multiPickedLabel: __('You have selected the following items:', '10up-block-components'),
	singlePickedLabel: __('You have selected the following item:', '10up-block-components'),
};

ContentPicker.propTypes = {
	contentTypes: PropTypes.array,
	content: PropTypes.array,
	placeholder: PropTypes.string,
	mode: PropTypes.string,
	label: PropTypes.string,
	multiPickedLabel: PropTypes.string,
	singlePickedLabel: PropTypes.string,
	isMulti: PropTypes.bool,
	isOrderable: PropTypes.bool,
	onSelect: PropTypes.func,
};

export { ContentPicker };
