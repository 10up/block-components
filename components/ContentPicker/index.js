import apiFetch from '@wordpress/api-fetch';
import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import styled from '@emotion/styled';
import { TextControl, Button, Spinner, NavigableMenu } from '@wordpress/components';
import { select } from '@wordpress/data';
import { useState } from '@wordpress/element'; // eslint-disable-line
import { __ } from '@wordpress/i18n';
import SearchItem from './SearchItem';
import SortableList from './SortableList';

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
	onChange,
	maxContentItems,
	isOrderable,
	singlePickedLabel,
	multiPickedLabel,
	content: presetContent,
	uniqueContentItems,
	excludeCurrentPost,
}) => {
	const [searchString, setSearchString] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [content, setContent] = useState(presetContent);

	const currentPostId = select('core/editor').getCurrentPostId();

	if (content.length && typeof content[0] !== 'object') {
		for (let i = 0; i < content.length; i++) {
			content[i] = {
				id: content[i],
				type: contentTypes[0],
			};
		}
	}

	function handleItemSelection(item) {
		setSearchResults([]);
		setSearchString('');

		const newContent = [...content];

		newContent.unshift({
			id: item.id,
			type: item.subtype,
		});

		onChange(newContent);

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
			const newResults = results.filter((result) => {
				let keep = true;

				if (content.length && uniqueContentItems) {
					content.forEach((item) => {
						if (item.id === result.id) {
							keep = false;
						}
					});
				}

				if (
					excludeCurrentPost &&
					currentPostId &&
					parseInt(result.id, 10) === parseInt(currentPostId, 10)
				) {
					keep = false;
				}

				return keep;
			});

			setSearchResults(newResults);
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

	function handleItemDelete(item, sortIndex) {
		const newContent = [...content];

		newContent.splice(sortIndex, 1);

		onChange(newContent);

		setContent(newContent);
	}

	const hasSearchString = !!searchString.length;
	const hasSearchResults = !!searchResults.length;

	/**
	 * Unfortunately, we had to use !important because on PickedItem we couldn't @emotion/styled css
	 * as it was breaking sortability from react-sortable-hoc
	 */
	const StyleWrapper = styled('div')`
		& .block-editor-link-control__search-item {
			border: none !important;
			cursor: default;

			&:hover {
				background: transparent;
			}
		}
	`;

	return (
		<div className={`${NAMESPACE}`}>
			{!content.length || (content.length && content.length < maxContentItems) ? (
				<NavigableMenu onNavigate={handleSelection} orientation="vertical">
					<TextControl
						label={label}
						value={searchString}
						onChange={handleSearchStringChange}
						placeholder={placeholder}
						autoComplete="off"
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
			{content.length ? (
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

					<SortableList
						items={content}
						useDragHandle
						isOrderable={isOrderable}
						mode={mode}
						handleItemDelete={handleItemDelete}
						onSortEnd={({ oldIndex, newIndex }) => {
							const newContent = [...arrayMove(content, oldIndex, newIndex)];

							onChange(newContent);

							setContent(newContent);
						}}
					/>
				</StyleWrapper>
			) : null}
		</div>
	);
};

ContentPicker.defaultProps = {
	label: '',
	mode: 'post',
	onChange: (ids) => {
		console.log('Content picker list change', ids); // eslint-disable-line no-console
	},
	contentTypes: ['post', 'page'],
	placeholder: '',
	content: [],
	maxContentItems: 1,
	uniqueContentItems: true,
	isOrderable: false,
	excludeCurrentPost: true,
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
	isOrderable: PropTypes.bool,
	onChange: PropTypes.func,
	uniqueContentItems: PropTypes.bool,
	excludeCurrentPost: PropTypes.bool,
	maxContentItems: PropTypes.number,
};

export { ContentPicker };
