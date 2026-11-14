import { act } from 'react';
import { createRoot } from 'react-dom/client';

import { AbstractRepeater } from './index';

// AbstractRepeater does not use the block editor stores. The mocks keep their ESM-only dependencies out of the test.
jest.mock('@wordpress/block-editor', () => ({ useBlockEditContext: jest.fn(), store: {} }));
jest.mock('@wordpress/blocks', () => ({ store: {} }));

describe('AbstractRepeater', () => {
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

	const value = [
		{ id: 'first', label: 'First' },
		{ id: 'second', label: 'Second' },
	];

	const renderItem = (item, id) => (
		<div className="repeater-item" key={id}>
			<span className="repeater-item__label">{item.label}</span>
		</div>
	);

	test('renders reorderable items without React warnings', () => {
		act(() => {
			root.render(
				<AbstractRepeater allowReordering value={value} onChange={() => {}}>
					{renderItem}
				</AbstractRepeater>,
			);
		});

		const items = container.querySelectorAll('.repeater-item');
		expect(items).toHaveLength(2);

		items.forEach((item, index) => {
			const [handle, label] = item.children;

			expect(handle.classList.contains('repeater-item__drag-handle')).toBe(true);
			expect(handle.style.cursor).toBe('grab');
			expect(handle.hasAttribute('isdragging')).toBe(false);
			expect(label.textContent).toBe(value[index].label);
		});

		// @wordpress/jest-console fails the test when React logs a key or unknown-prop warning.
		expect(console).not.toHaveErrored();
	});
});
