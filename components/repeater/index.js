import { useBlockEditContext, store as blockEditorStore } from '@wordpress/block-editor';
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect, dispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * The Repeater Component.
 *
 * @param {object} props React props
 * @param {Function} props.children Render prop to render the children.
 * @param {string} props.attribute property of the block attribute that will provide data for Repeater.
 * @param {string} props.addButton render prop to customize the "Add item" button.
 * @returns {*} React JSX
 */
export const Repeater = ({ children, attribute, addButton }) => {
	const { clientId, name } = useBlockEditContext();
	const { updateBlockAttributes } = dispatch(blockEditorStore);

	const { repeaterData, defaultRepeaterData } = useSelect((select) => {
		const { getBlockAttributes } = select(blockEditorStore);
		const { getBlockType } = select(blocksStore);

		return {
			repeaterData: getBlockAttributes(clientId)[attribute],
			defaultRepeaterData: getBlockType(name).attributes[attribute].default,
		};
	});

	/**
	 * Adds a new repeater item.
	 */
	function addItem() {
		const defaultRepeaterDataCopy = defaultRepeaterData.slice();

		if (!defaultRepeaterData.length) {
			defaultRepeaterDataCopy.push([]);
		}

		updateBlockAttributes(clientId, {
			[attribute]: [...repeaterData, ...defaultRepeaterDataCopy],
		});
	}

	/**
	 * Updates the item currently being edited.
	 *
	 * @param {string|number|boolean} value The value that should be used to updated the item.
	 * @param {number} index The index at which the item should be updated.
	 */
	function setItem(value, index) {
		const repeaterDataCopy = repeaterData.slice();
		if (typeof value === 'object' && value !== null) {
			repeaterDataCopy[index] = { ...repeaterDataCopy[index], ...value };
		} else {
			repeaterDataCopy[index] = value;
		}
		updateBlockAttributes(clientId, { [attribute]: repeaterDataCopy });
	}

	/**
	 * Removes an item from the list.
	 *
	 * @param {number} index The index of the item that needs to be removed.
	 */
	function removeItem(index) {
		const repeaterDataCopy = repeaterData
			.slice()
			.filter((item, innerIndex) => index !== innerIndex);
		updateBlockAttributes(clientId, { [attribute]: repeaterDataCopy });
	}

	return (
		<>
			{repeaterData.map((item, key) => {
				return children(
					item,
					key,
					(val) => setItem(val, key),
					() => removeItem(key),
				);
			})}
			{typeof addButton === 'function' ? (
				addButton(addItem)
			) : (
				<Button variant="primary" onClick={() => addItem()}>
					{__('Add item')}
				</Button>
			)}
		</>
	);
};

Repeater.defaultProps = {
	attribute: 'items',
	addButton: null,
};

Repeater.propTypes = {
	children: PropTypes.func.isRequired,
	attribute: PropTypes.string,
	addButton: PropTypes.func,
};
