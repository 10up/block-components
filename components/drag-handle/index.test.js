import { act } from 'react';
import { createRoot } from 'react-dom/client';

import { DragHandle } from './index';

describe('DragHandle', () => {
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

	test.each([
		[true, 'grabbing'],
		[false, 'grab'],
	])('keeps isDragging=%s off the DOM and sets the %s cursor', (isDragging, cursor) => {
		act(() => {
			root.render(<DragHandle className="drag-handle" isDragging={isDragging} />);
		});

		const handle = container.querySelector('.drag-handle');

		expect(handle.style.cursor).toBe(cursor);
		expect(handle.hasAttribute('isdragging')).toBe(false);

		// @wordpress/jest-console fails the test when React logs an unknown-prop warning.
		expect(console).not.toHaveErrored();
	});
});
