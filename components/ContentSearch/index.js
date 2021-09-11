import { TextControl, Spinner, NavigableMenu } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useState, useRef, useEffect } from '@wordpress/element'; // eslint-disable-line
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import SearchItem from './SearchItem';

const NAMESPACE = '10up-content-search';

const searchCache = {};

const ContentSearch = ({ onSelectItem, placeholder, label, contentTypes, mode, excludeItems, perPage }) => {
	const [searchString, setSearchString] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const mounted = useRef(true);

	/**
	 * handleSelection
	 *
	 * update the selected item in state to either the selected item or null if the
	 * selected item does not have a valid id
	 *
	 * @param {*} item
	 */
	function handleOnNavigate(item) {
		if (item === 0) {
			setSelectedItem(null);
		}

		setSelectedItem(item);
	}

	/**
	 * handleItemSelection
	 *
	 * reset the search input & item container
	 * trigger the onSelectItem callback passed in via props
	 *
	 * @param {*} item
	 */
	function handleItemSelection(item) {
		setSearchResults([]);
		setSearchString('');

		onSelectItem(item);
	}

	function filterResults(results) {
		return results.filter((result) => {
			let keep = true;

			if (excludeItems.length) {
				keep = excludeItems.every((item) => item.id !== result.id);
			}

			return keep;
		});
	}

	const hasSearchString = !!searchString.length;
	const hasSearchResults = !!searchResults.length;

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
		)}&type=${mode}&_embed&per_page=${perPage}`;

		if (searchCache[searchQuery]) {
			console.log('Setting search results for ' + keyword);
			setSearchResults(filterResults(searchCache[searchQuery]));
			setIsLoading(false);
		} else {
			apiFetch({
				path: searchQuery,
			}).then((results) => {
				if (mounted.current === false) {
					return;
				}

				searchCache[searchQuery] = results;

				if (keyword === searchString) {
					console.log('Setting search results for ' + keyword);
					setSearchResults(filterResults(results));
					setIsLoading(false);
				}
			});
		}
	};

	useEffect(() => {
		return () => {
			mounted.current = false;
		};
	}, []);

	return (
		<NavigableMenu onNavigate={handleOnNavigate} orientation="vertical">
			<TextControl
				label={label}
				value={searchString}
				onChange={handleSearchStringChange}
				placeholder={placeholder}
				autoComplete="off"
			/>
			{hasSearchString ? (
				<ul
					className={`${NAMESPACE}-list`}
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
						<li
							className={`${NAMESPACE}-list-item components-button`}
							style={{ color: 'inherit', cursor: 'default', paddingLeft: '3px' }}
						>
							{__('Nothing found.', '10up-block-components')}
						</li>
					)}
					{searchResults.map((item, index) => {
						if (!item.title.length) {
							return null;
						}

						return (
							<li
								key={item.id}
								className={`${NAMESPACE}-list-item`}
								style={{
									marginBottom: '0',
								}}
							>
								<SearchItem
									onClick={() => handleItemSelection(item)}
									searchTerm={searchString}
									suggestion={item}
									contentTypes={contentTypes}
									isSelected={selectedItem === index + 1}
								/>
							</li>
						);
					})}
				</ul>
			) : null}
		</NavigableMenu>
	);
};

ContentSearch.defaultProps = {
	contentTypes: ['post', 'page'],
	placeholder: '',
	perPage: 10,
	label: '',
	excludeItems: [],
	mode: 'post',
	onSelectItem: () => {
		console.log('Select!'); // eslint-disable-line no-console
	},
};

ContentSearch.propTypes = {
	contentTypes: PropTypes.array,
	mode: PropTypes.string,
	onSelectItem: PropTypes.func,
	placeholder: PropTypes.string,
	excludeItems: PropTypes.array,
	label: PropTypes.string,
	perPage: PropTypes.number
};

export { ContentSearch };
