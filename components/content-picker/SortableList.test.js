import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { dispatch } from '@wordpress/data';

import SortableList from './SortableList';

/*
 * @wordpress/core-data does not load in Jest. This store has the same getEntityRecord behavior:
 * with `_fields` in the query, it returns a filtered copy of the record, memoized on the arguments.
 */
jest.mock('@wordpress/core-data', () => {
	const { createReduxStore, register, createSelector } = jest.requireActual('@wordpress/data');

	const store = createReduxStore('core', {
		reducer: (state = {}, action) =>
			action.type === 'RECEIVE' ? { ...state, [action.key]: action.record } : state,
		actions: {
			receive: (kind, name, record) => ({
				type: 'RECEIVE',
				key: `${kind}/${name}/${record.id}`,
				record,
			}),
		},
		selectors: {
			getEntityRecord: createSelector(
				(state, kind, name, id, query) => {
					const record = state[`${kind}/${name}/${id}`];

					if (!record || !query?._fields) {
						return record;
					}

					return Object.fromEntries(query._fields.map((field) => [field, record[field]]));
				},
				(state, kind, name, id) => [state[`${kind}/${name}/${id}`]],
			),
		},
	});

	register(store);

	return { store };
});

// The list data is the subject of this test. A plain row keeps the markup of PickedItem out of it.
jest.mock('./PickedItem', () => ({
	__esModule: true,
	default: ({ item }) => (
		<tr>
			<td>{item.title}</td>
		</tr>
	),
}));

describe('SortableList', () => {
	let container;
	let root;

	beforeAll(() => {
		global.IS_REACT_ACT_ENVIRONMENT = true;
		// useSelect checks for unstable return values only when SCRIPT_DEBUG is set.
		globalThis.SCRIPT_DEBUG = true;
	});

	afterAll(() => {
		delete globalThis.SCRIPT_DEBUG;
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

	test('reads the picked items from the store without unstable useSelect values', () => {
		act(() => {
			const { receive } = dispatch('core');

			receive('root', 'user', { id: 1, name: 'First user', link: 'https://example.org/1' });
			receive('root', 'user', { id: 2, name: 'Second user', link: 'https://example.org/2' });
		});

		const posts = [
			{ id: 1, type: 'user', uuid: 'first', title: '' },
			{ id: 2, type: 'user', uuid: 'second', title: '' },
		];

		act(() => {
			root.render(
				<SortableList
					posts={posts}
					isOrderable={false}
					mode="user"
					handleItemDelete={() => {}}
					setPosts={() => {}}
				/>,
			);
		});

		const titles = Array.from(container.querySelectorAll('td')).map((cell) => cell.textContent);
		expect(titles).toEqual(['First user', 'Second user']);

		// @wordpress/jest-console fails the test when useSelect warns about an unstable value.
		expect(console).not.toHaveWarned();
	});
});
