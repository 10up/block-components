import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import styled from '@emotion/styled';
import { select } from '@wordpress/data';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { v4 as uuidv4 } from 'uuid';
import { ContentSearch } from '../ContentSearch';
import SortableList from './SortableList';

const NAMESPACE = 'tenup-content-picker';

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
 * @param props.label
 * @param props.mode
 * @param props.contentTypes
 * @param props.placeholder
 * @param props.onPickChange
 * @param props.maxContentItems
 * @param props.isOrderable
 * @param props.singlePickedLabel
 * @param props.multiPickedLabel
 * @param props.content
 * @param props.uniqueContentItems
 * @param props.excludeCurrentPost
 * @param props.perPage
 * @returns {*} React JSX
 */
const ContentPicker = ({
	label,
	mode,
	contentTypes,
	placeholder,
	onPickChange,
	maxContentItems,
	isOrderable,
	singlePickedLabel,
	multiPickedLabel,
	content: presetContent,
	uniqueContentItems,
	excludeCurrentPost,
	perPage,
}) => {
	const [content, setContent] = useState([]);

	useEffect(() => {
		setContent(presetContent);
	}, [presetContent]);

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

	// Run onPickChange callback when content changes.
	useEffect(() => {
		onPickChange(content);
	}, [content]);

	const handleSelect = (item) => {
		setContent((previousContent) => [
			{
				id: item.id,
				uuid: uuidv4(),
				type: 'subtype' in item ? item.subtype : item.type,
			},
			...previousContent,
		]);
	};

	const onDeleteItem = (deletedItem) => {
		setContent((previousContent) => {
			return previousContent.filter(({ id, uuid }) => {
				if (deletedItem.uuid) {
					return uuid !== deletedItem.uuid;
				}
				return id !== deletedItem.id;
			});
		});
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
		<ContentPickerWrapper className={`${NAMESPACE}`}>
			{!content.length || (content.length && content.length < maxContentItems) ? (
				<ContentSearch
					placeholder={placeholder}
					label={label}
					excludeItems={excludeItems}
					onSelectItem={handleSelect}
					contentTypes={contentTypes}
					mode={mode}
					perPage={perPage}
				/>
			) : (
				label && (
					<div
						style={{
							'margin-bottom': '8px',
						}}
					>
						{label}
					</div>
				)
			)}

			{Boolean(content?.length) > 0 && (
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
						handleItemDelete={onDeleteItem}
						isOrderable={isOrderable}
						mode={mode}
						onSortEnd={({ oldIndex, newIndex }) => {
							const newContent = [...arrayMove(content, oldIndex, newIndex)];

							setContent(newContent);
						}}
					/>
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
	onPickChange: PropTypes.func,
	uniqueContentItems: PropTypes.bool,
	excludeCurrentPost: PropTypes.bool,
	maxContentItems: PropTypes.number,
	perPage: PropTypes.number,
};

export { ContentPicker };
