import { TextControl, Spinner, NavigableMenu, Button } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useState, useRef, useEffect } from '@wordpress/element'; // eslint-disable-line
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { jsx, css } from '@emotion/react';
import SearchItem from './SearchItem';
import SortableList from '../ContentPicker/SortableList';
/** @jsx jsx */

const NAMESPACE = 'tenup-content-search';

const searchCache = {};

const ContentSearch = ({
	onSelectItem,
	placeholder,
	label,
	contentTypes,
	mode,
	excludeItems,
	perPage,
}) => {
	const [searchString, setSearchString] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [lessThanPerPage, setLessThanPerPage] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const abortControllerRef = useRef();

	const mounted = useRef(true);

	const listMinHeight = '46px';

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
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		if (keyword.trim() === '') {
			setIsLoading(false);
			setSearchResults([]);
			setSearchString(keyword);

			abortControllerRef.current = null;
			return;
		}

		abortControllerRef.current = new AbortController();
		setSearchString(keyword);
	};

	const handleLoadMore = () => {
		setCurrentPage(currentPage + 1);
		handleSearchStringChange(searchString);
	};

	useEffect(() => {
		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (abortControllerRef.current === undefined || abortControllerRef.current === null) return;

		const filterResults = (results) =>
			results.filter((result) => {
				let keep = true;

				if (excludeItems.length) {
					keep = excludeItems.every((item) => item.id !== result.id);
				}

				return keep;
			});

		setIsLoading(true);

		// Paginate search so we have "load more" functionality.
		const searchQuery = `wp/v2/search/?search=${searchString}&subtype=${contentTypes.join(
			',',
		)}&type=${mode}&_embed&per_page=${perPage}&page=${currentPage}`;

		if (searchCache[searchQuery]) {
			abortControllerRef.current = null;

			setSearchResults(filterResults(searchCache[searchQuery]));
			setIsLoading(false);
		} else {
			apiFetch({
				path: searchQuery,
				signal: abortControllerRef.current.signal,
			})
				.then((results) => {
					if (mounted.current === false) {
						return;
					}

					abortControllerRef.current = null;

					searchCache[searchQuery] = results;

					setLessThanPerPage(results.length < perPage);
					setSearchResults([...searchResults, ...filterResults(results)]);
					setIsLoading(false);
				})
				.catch((error, code) => {
					// fetch_error means the request was aborted
					if (error.code !== 'fetch_error') {
						setSearchResults([]);
						abortControllerRef.current = null;
						setIsLoading(false);
					}
				});
		}
	}, [contentTypes, currentPage, excludeItems, mode, perPage, searchString]);

	const listCSS = css`
		/* stylelint-disable */
		max-height: 350px;
		overflow-y: auto;
	`;

	const loadingCSS = css`
		/* Custom styles to reduce jumping while loading the results */
		min-height: ${listMinHeight};
		display: flex;
		align-items: center;
		justify-content: center;
	`;

	const loadMoreCSS = css`
		/* To increase thew specificity over other UI styles form the editor. */
		&&& {
			display: flex;
			justify-content: center;
			margin-top: 1em;
		}
	`;

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
				<>
					<ul
						className={`${NAMESPACE}-list`}
						style={{
							marginTop: '0',
							marginBottom: '0',
							marginLeft: '0',
							paddingLeft: '0',
							listStyle: 'none',
						}}
						css={listCSS}
					>
						{isLoading && currentPage === 1 && (
							<div css={loadingCSS}>
								<Spinner />
							</div>
						)}

						{!isLoading && !hasSearchResults && (
							<li
								className={`${NAMESPACE}-list-item components-button`}
								style={{ color: 'inherit', cursor: 'default', paddingLeft: '3px' }}
							>
								{__('Nothing found.', '10up-block-components')}
							</li>
						)}
						{(!isLoading || currentPage > 1) &&
							searchResults.map((item, index) => {
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

					{!isLoading && hasSearchResults && !lessThanPerPage && (
						<div css={loadMoreCSS}>
							<Button
								onClick={handleLoadMore}
								type="button"
								className="components-button is-secondary"
							>
								{__('Load more', '10up-block-components')}
							</Button>
						</div>
					)}

					{isLoading && currentPage > 1 && (
						<div css={loadMoreCSS}>
							<Button
								disabled
								onClick={handleLoadMore}
								type="button"
								className="components-button is-secondary"
							>
								{__('Loading ...', '10up-block-components')}
							</Button>
						</div>
					)}
				</>
			) : null}
		</NavigableMenu>
	);
};

ContentSearch.defaultProps = {
	contentTypes: ['post', 'page'],
	placeholder: '',
	perPage: 20,
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
	perPage: PropTypes.number,
};

export { ContentSearch };
