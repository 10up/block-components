import apiFetch from '@wordpress/api-fetch';
import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import styled from '@emotion/styled';
import SearchItem from './SearchItem';
import SortableList from './SortableList';

const { TextControl, Button, Spinner, NavigableMenu } = wp.components;
const { useState } = wp.element;
const { __ } = wp.i18n;

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
	isMulti,
	isOrderable,
	singlePickedLabel,
	multiPickedLabel,
	content: presetContent,
}) => {
	const [searchString, setSearchString] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [content, setContent] = useState(presetContent);

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

		content.unshift({
			id: item.id,
			type: item.type,
		});

		onChange(content);

		setContent(content);
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

	function handleItemDelete(item, sortIndex) {
		const newContent = [...content];

		newContent.splice(sortIndex, 1);

		onChange(newContent);

		setContent(newContent);
	}

	const hasSearchString = !!searchString.length;
	const hasSearchResults = !!searchResults.length;

	const StyleWrapper = styled('div')`
		& .block-editor-link-control__search-item {
			border: none;
		}
	`;

	return (
		<div className={`${NAMESPACE}`}>
			{!content.length || (content.length && isMulti) ? (
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
	onChange: PropTypes.func,
};

export { ContentPicker };
