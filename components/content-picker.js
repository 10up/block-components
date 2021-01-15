import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { TextControl, Button, Spinner, TextHighlight, NavigableMenu } from '@wordpress/components';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';

const NAMESPACE = '10up-block-components';

/**
 * Content Picker
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
export function ContentPicker(props) {
	const { 
        handleSelection,
        label = '',
        postTypes = [ 'post', 'page' ],
        placeholder = ''
    } = props;

	const [searchString, setSearchString] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	function handleItemSelection(post) {
		onSelect(post);
		setSearchResults([]);
		setSearchString('');
	}

	/**
     * handleSearchStringChange
     *
	 * Using the keyword and the list of tags that are linked to the parent block
	 * search for posts that match and return them to the autocomplete component.
	 *
	 * @param {string} keyword search query string
	 */
	const handleSearchStringChange = (keyword) => {
		setSearchString(keyword);
        setIsLoading(true);

        const searchQuery = `wp/v2/search/?search="${keyword}"&subtype="${postTypes.join(',')}"&type=post`;

        apiFetch( {
            path: searchQuery
        } ).then((results) => {
            setSearchResults(results);
            setIsLoading(false);
        })

    };
    
    /**
     * handleSelection
     * 
     * update the selected item in state to either the selected item or null if the 
     * selected item does not have a valid id
     * @param {*} item 
     */
    function handleSelection(item) {
        if (item === 0) {
            setSelectedItem(null);
        }

        setSelectedItem(item);
    }

    const hasSearchString = !! searchString.length;
    const hasSearchResults = !! searchResults.length;

	return (
		<div className={`${NAMESPACE}`}>
            <NavigableMenu onNavigate={handleSelection} orientation={'vertical'}>
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
                            listStyle: "none"
                        }}
                    >
                        {isLoading && <Spinner />}
                        {!isLoading && !hasSearchResults && (
                            <li className={`${NAMESPACE}-grid-item`}>
                                <Button disabled>{__('No Items found', NAMESPACE)}</Button>
                            </li>
                        )}
                        {searchResults.map((post, index) => {
                            if (!post.title.length) {
                                return null;
                            }
                            
                            return (
                                <li key={post.id} className={`${NAMESPACE}-grid-item`} style={ {
                                    marginBottom: "0"
                                } }>
                                    <SearchItem
                                        onClick={() => handleItemSelection(post)}
                                        searchTerm={searchString}
                                        suggestion={post}
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

/**
 * SelectedPostPreview
 * 
 * @param {Object} props react props
 */
export function SelectedPostPreview(props) {
    const {post, label} = props;
    const uniqueId = `${post.slug}-preview`;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <label htmlFor={uniqueId}>{label}</label>
            <SearchItem 
                suggestion={post}
                onClick={null}
                id={uniqueId}
            />
        </div>
    )
}

/**
 * SearchItem
 * 
 * @param {Object} props react props
 */
function SearchItem(props) {
    const {
        suggestion,
        onClick,
        searchTerm = '',
        isSelected = false,
        id = ''
    } = props;

    return (
		<Button
            id={id}
			onClick={onClick}
            className={`block-editor-link-control__search-item is-entity ${isSelected && 'is-selected'}`}
            style={{
                borderRadius: '0'
            }}
		>
			<span className="block-editor-link-control__search-item-header">
				<span className="block-editor-link-control__search-item-title">
					<TextHighlight
						text={decodeEntities(suggestion.title)}
						highlight={searchTerm}
					/>
				</span>
				<span
					aria-hidden={true}
					className="block-editor-link-control__search-item-info"
				>
                    {  
                        filterURLForDisplay(
                            safeDecodeURI(suggestion.url)
                        ) || '' 
                    }
				</span>
			</span>
			{ suggestion.type && (
				<span className="block-editor-link-control__search-item-type">
					{ /* Rename 'post_tag' to 'tag'. Ideally, the API would return the localised CPT or taxonomy label. */ }
					{ suggestion.type === 'post_tag' ? 'tag' : suggestion.type }
				</span>
			) }
		</Button>
	);
}
