import styled from '@emotion/styled';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import { Button, TextHighlight, Tooltip } from '@wordpress/components';
import { getTextContent, create } from '@wordpress/rich-text';
import React from 'react';

const ButtonStyled = styled(Button)`
	&:hover {
		/* Add opacity background to support future color changes */
		/* Reduce background from #ddd to 0.05 for text contrast  */
		background-color: rgba(0, 0, 0, 0.05);

		.block-editor-link-control__search-item-type {
			color: black;
		}
	}

	.block-editor-link-control__search-item-type {
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

type SearchItemProps = {
	id: string;
	searchTerm: string;
	suggestion: {
		type: string;
		title: string;
		url: string;
	};
	onClick: Function;
	isSelected: boolean;
	contentTypes: [];
	renderType: Function;
};

/**
 * SearchItem
 *
 * @param {object} props react props
 * @param {object} props.suggestion suggestion object
 * @param {Array} props.contentTypes array of content types
 * @param {Function} props.onClick callback for when the item is clicked
 * @param {string} props.searchTerm the search term
 * @param {boolean} props.isSelected whether the item is selected
 * @param {string} props.id the id of the item
 * @param {Function} props.renderType a callback to override the type text
 * @returns {*} React JSX
 */
const SearchItem = ({
	suggestion,
	onClick,
	searchTerm,
	isSelected,
	id,
	contentTypes,
	renderType,
}: SearchItemProps) => {
	const showType = suggestion.type && contentTypes.length > 1;

	const richTextContent = create({ html: suggestion.title });
	const textContent = getTextContent(richTextContent);
	const titleContent = decodeEntities(textContent);

	return (
		<Tooltip text={decodeEntities(suggestion.title)}>
			<ButtonStyled
				id={id}
				onClick={onClick}
				className={`block-editor-link-control__search-item is-entity ${
					isSelected && 'is-selected'
				}`}
				style={{
					borderRadius: '0',
					boxSizing: 'border-box',
				}}
			>
				<span className="block-editor-link-control__search-item-header">
					<span
						className="block-editor-link-control__search-item-title"
						style={{
							paddingRight: !showType ? 0 : undefined,
						}}
					>
						<TextHighlight text={titleContent} highlight={searchTerm} />
					</span>
					<span
						aria-hidden
						className="block-editor-link-control__search-item-info"
						style={{
							paddingRight: !showType ? 0 : undefined,
						}}
					>
						{filterURLForDisplay(safeDecodeURI(suggestion.url)) || ''}
					</span>
				</span>
				{showType && (
					<span className="block-editor-link-control__search-item-type">
						{renderType(suggestion)}
					</span>
				)}
			</ButtonStyled>
		</Tooltip>
	);
};

export default SearchItem;
