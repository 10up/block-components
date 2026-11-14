import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { __experimentalTreeGrid as TreeGrid } from '@wordpress/components';

import PickedItem from './PickedItem';

describe('PickedItem', () => {
	let container;
	let root;

	beforeAll(() => {
		global.IS_REACT_ACT_ENVIRONMENT = true;
	});

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
		root = createRoot(container);
	});

	afterEach(() => {
		act(() => root.unmount());
		container.remove();
	});

	test('renders the item inside a grid cell of the tree grid row', () => {
		act(() => {
			root.render(
				<TreeGrid aria-label="Selected items list">
					<PickedItem
						id="item-1"
						item={{ id: 1, type: 'post', uuid: 'item-1', title: 'First item', url: '' }}
						mode="post"
						handleItemDelete={() => {}}
					/>
				</TreeGrid>,
			);
		});

		const row = container.querySelector('tr');
		const cell = row.firstElementChild;

		expect(cell.tagName).toBe('TD');
		expect(cell.getAttribute('role')).toBe('gridcell');
		expect(cell.textContent).toContain('First item');

		// @wordpress/jest-console fails the test when React logs a validateDOMNesting error.
		expect(console).not.toHaveErrored();
	});
});
