import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { TextControl, Button, Spinner, TextHighlight, NavigableMenu } from '@wordpress/components';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import PropTypes from 'prop-types';

const NAMESPACE = '10up-block-components';

/**
 * Content Picker
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
const ContentPicker = ({ label, mode, contentTypes, placeholder, onSelect }) => {
	const [searchString, setSearchString] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	function handleItemSelection(item) {
		onSelect(item, item.type);
		setSearchResults([]);
		setSearchString('');
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

	const hasSearchString = !!searchString.length;
	const hasSearchResults = !!searchResults.length;

	return (
		<div className={`${NAMESPACE}`}>
			<NavigableMenu onNavigate={handleSelection} orientation="vertical">
				<TextControl
					label={label}
					value={searchString}
					onChange={handleSearchStringChange}
					placeholder={placeholder}
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
};

ContentPicker.propTypes = {
	contentTypes: PropTypes.array,
	placeholder: PropTypes.string,
	mode: PropTypes.string,
	label: PropTypes.string,
	onSelect: PropTypes.func,
};

/**
 * SelectedItemPreview
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
const SelectedItemPreview = ({ item, label }) => {
	const uniqueId = `${item.id}-preview`;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<label htmlFor={uniqueId}>{label}</label>
			<SearchItem suggestion={item} onClick={null} id={uniqueId} />
		</div>
	);
};

SelectedItemPreview.defaultProps = {
	label: '',
};

SelectedItemPreview.propTypes = {
	label: PropTypes.string,
	item: PropTypes.object.isRequired,
};

export { ContentPicker, SelectedItemPreview };

/**
 * SearchItem
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
const SearchItem = ({ suggestion, onClick, searchTerm, isSelected, id }) => {
	return (
		<Button
			id={id}
			onClick={onClick}
			className={`block-editor-link-control__search-item is-entity ${
				isSelected && 'is-selected'
			}`}
			style={{
				borderRadius: '0',
			}}
		>
			<span className="block-editor-link-control__search-item-header">
				<span className="block-editor-link-control__search-item-title">
					<TextHighlight text={decodeEntities(suggestion.title)} highlight={searchTerm} />
				</span>
				<span aria-hidden className="block-editor-link-control__search-item-info">
					{filterURLForDisplay(safeDecodeURI(suggestion.url)) || ''}
				</span>
			</span>
			{suggestion.type && (
				<span className="block-editor-link-control__search-item-type">
					{/* Rename 'post_tag' to 'tag'. Ideally, the API would return the localised CPT or taxonomy label. */}
					{suggestion.type === 'post_tag' ? 'tag' : suggestion.type}
				</span>
			)}
		</Button>
	);
};

SearchItem.defaultProps = {
	id: '',
	searchTerm: '',
	isSelected: false,
};

SearchItem.propTypes = {
	id: PropTypes.string,
	searchTerm: PropTypes.string,
	suggestion: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
	isSelected: PropTypes.bool,
};
