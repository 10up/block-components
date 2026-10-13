import {
	coreRecordsToIconSets,
	hasCoreIconEntity,
	mergeIconSets,
	splitCoreIconName,
	withCurrentColor,
} from './core-icons';

const svg = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>';

describe('core icons | hasCoreIconEntity', () => {
	test('is true when the root entities include icon', () => {
		expect(hasCoreIconEntity([{ name: 'site' }, { name: 'icon' }])).toBe(true);
	});

	test('is false without the icon entity or config', () => {
		expect(hasCoreIconEntity([{ name: 'site' }, { name: 'iconCollection' }])).toBe(false);
		expect(hasCoreIconEntity([])).toBe(false);
		expect(hasCoreIconEntity(undefined)).toBe(false);
		expect(hasCoreIconEntity(null)).toBe(false);
	});
});

describe('core icons | splitCoreIconName', () => {
	test('splits on the first slash', () => {
		expect(splitCoreIconName('core/arrow-left')).toEqual({ iconSet: 'core', name: 'arrow-left' });
		expect(splitCoreIconName('a/b/c')).toEqual({ iconSet: 'a', name: 'b/c' });
	});

	test('uses the fallback set when there is no slash', () => {
		expect(splitCoreIconName('star', 'core')).toEqual({ iconSet: 'core', name: 'star' });
		expect(splitCoreIconName('star')).toEqual({ iconSet: '', name: 'star' });
	});
});

describe('core icons | withCurrentColor', () => {
	test('adds fill="currentColor" to a root svg without a fill', () => {
		expect(withCurrentColor(svg)).toBe(
			'<svg fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>',
		);
	});

	test('keeps an existing root fill', () => {
		const filled = '<svg fill="none" viewBox="0 0 24 24"><path/></svg>';
		expect(withCurrentColor(filled)).toBe(filled);
	});

	test('only looks at the root svg', () => {
		const childFill = '<svg viewBox="0 0 24 24"><path fill="red"/></svg>';
		expect(withCurrentColor(childFill)).toBe(
			'<svg fill="currentColor" viewBox="0 0 24 24"><path fill="red"/></svg>',
		);
	});

	test('leaves non-svg markup alone', () => {
		expect(withCurrentColor('')).toBe('');
		expect(withCurrentColor('<span>x</span>')).toBe('<span>x</span>');
	});
});

describe('core icons | coreRecordsToIconSets', () => {
	test('groups records by collection with collection labels and order', () => {
		const sets = coreRecordsToIconSets(
			[
				{ name: 'core/star', label: 'Star', content: svg, collection: 'core' },
				{ name: 'brand/logo', label: 'Logo', content: svg, collection: 'brand' },
				{ name: 'core/heart', label: 'Heart', content: svg, collection: 'core' },
			],
			[
				{ slug: 'brand', label: 'Brand' },
				{ slug: 'core', label: 'WordPress' },
				{ slug: 'empty', label: 'Empty' },
			],
		);

		expect(sets.map(({ name }) => name)).toEqual(['brand', 'core']);
		expect(sets[1]).toEqual({
			name: 'core',
			label: 'WordPress',
			icons: [
				{ name: 'star', label: 'Star', source: withCurrentColor(svg) },
				{ name: 'heart', label: 'Heart', source: withCurrentColor(svg) },
			],
		});
	});

	test('falls back to the slug as label and keeps nested names', () => {
		const sets = coreRecordsToIconSets(
			[{ name: 'a/b/c', label: 'C', content: svg, collection: 'a' }],
			null,
		);

		expect(sets).toEqual([
			{ name: 'a', label: 'a', icons: [{ name: 'b/c', label: 'C', source: withCurrentColor(svg) }] },
		]);
	});

	test('returns nothing while records are loading or unavailable', () => {
		expect(coreRecordsToIconSets(null, null)).toEqual([]);
		expect(coreRecordsToIconSets(undefined, [{ slug: 'core', label: 'Core' }])).toEqual([]);
	});
});

describe('core icons | mergeIconSets', () => {
	const storeSets = [
		{ name: 'theme', label: 'Theme', icons: [{ name: 'a', label: 'A', source: '<svg/>' }] },
		{ name: 'core', label: 'Store core', icons: [{ name: 'b', label: 'B', source: '<svg/>' }] },
	];
	const coreSets = [
		{ name: 'core', label: 'WordPress', icons: [{ name: 'c', label: 'C', source: '<svg/>' }] },
		{ name: 'brand', label: 'Brand', icons: [{ name: 'd', label: 'D', source: '<svg/>' }] },
	];

	test('store sets win over core sets of the same name and come first', () => {
		const merged = mergeIconSets(storeSets, coreSets);

		expect(merged.map(({ name }) => name)).toEqual(['theme', 'core', 'brand']);
		expect(merged[1]).toBe(storeSets[1]);
	});

	test('without core sets the store sets are returned unchanged', () => {
		expect(mergeIconSets(storeSets, [])).toEqual(storeSets);
	});

	test('without store sets the core sets are returned', () => {
		expect(mergeIconSets([], coreSets)).toEqual(coreSets);
	});
});
