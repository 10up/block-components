import {
	stripCollectionPrefix,
	mapCoreIconRecord,
	mergeIcons,
	getCoreIcons,
	FlattenedIcon,
} from './map-core-icons';
import { CoreIconRecord } from '../../stores/icons/types';

// The core store is only handed to the (faked) `select` in these tests, so a
// stub keeps Jest from loading the real `@wordpress/core-data` module graph.
jest.mock('@wordpress/core-data', () => ({ store: {} }));

// Fake `select` for WordPress > 7.1, where the `root/icon` entity is
// registered and returns the given records.
function createCoreSelect(records: CoreIconRecord[] | null) {
	const selectors = {
		getEntityConfig: () => ({ name: 'icon', kind: 'root' }),
		getEntityRecords: () => records,
	};
	return () => selectors;
}

// Fake `select` for WordPress < 7.1, where the `root/icon` entity is
// not registered.
function createLegacyCoreSelect() {
	const selectors = {
		getEntityConfig: () => undefined,
		getEntityRecords: () => null,
	};
	return () => selectors;
}

describe('use-icons | map-core-icons', () => {
	describe('stripCollectionPrefix', () => {
		test('removes the collection prefix', () => {
			expect(stripCollectionPrefix('example/smiley', 'example')).toBe('smiley');
		});

		test('leaves an unprefixed name untouched', () => {
			expect(stripCollectionPrefix('smiley', 'example')).toBe('smiley');
		});
	});

	describe('mapCoreIconRecord', () => {
		test('maps a core record onto the flattened picker shape', () => {
			const record: CoreIconRecord = {
				name: 'example/smiley',
				label: 'Smiley',
				content: '<svg>smiley</svg>',
				collection: 'example',
			};

			expect(mapCoreIconRecord(record)).toEqual({
				source: '<svg>smiley</svg>',
				name: 'smiley',
				label: 'Smiley',
				iconSet: 'example',
			});
		});
	});

	describe('mergeIcons', () => {
		test('appends core icons to the internal icons', () => {
			const internalIcons: FlattenedIcon[] = [
				{ source: '<svg>a</svg>', name: 'a', label: 'A', iconSet: 'theme' },
			];
			const coreIcons: FlattenedIcon[] = [
				{ source: '<svg>b</svg>', name: 'b', label: 'B', iconSet: 'example' },
			];

			expect(mergeIcons(internalIcons, coreIcons)).toEqual([
				{ source: '<svg>a</svg>', name: 'a', label: 'A', iconSet: 'theme' },
				{ source: '<svg>b</svg>', name: 'b', label: 'B', iconSet: 'example' },
			]);
		});

		test('dedupes by iconSet + name, keeping the internal icon', () => {
			const internalIcons: FlattenedIcon[] = [
				{
					source: '<svg>internal</svg>',
					name: 'smiley',
					label: 'Internal',
					iconSet: 'example',
				},
			];
			const coreIcons: FlattenedIcon[] = [
				{ source: '<svg>core</svg>', name: 'smiley', label: 'Core', iconSet: 'example' },
			];

			const merged = mergeIcons(internalIcons, coreIcons);

			expect(merged).toHaveLength(1);
			expect(merged[0].source).toBe('<svg>internal</svg>');
			expect(merged[0].label).toBe('Internal');
		});

		test('keeps icons that share a name across different sets', () => {
			const internalIcons: FlattenedIcon[] = [
				{ source: '<svg>a</svg>', name: 'smiley', label: 'A', iconSet: 'theme' },
			];
			const coreIcons: FlattenedIcon[] = [
				{ source: '<svg>b</svg>', name: 'smiley', label: 'B', iconSet: 'example' },
			];

			expect(mergeIcons(internalIcons, coreIcons)).toHaveLength(2);
		});
	});

	describe('getCoreIcons', () => {
		const records: CoreIconRecord[] = [
			{
				name: 'example/smiley',
				label: 'Smiley',
				content: '<svg>1</svg>',
				collection: 'example',
			},
			{
				name: 'example/heart',
				label: 'Heart',
				content: '<svg>2</svg>',
				collection: 'example',
			},
			{ name: 'other/star', label: 'Star', content: '<svg>3</svg>', collection: 'other' },
		];

		test('maps every record when no icon set is requested', () => {
			const icons = getCoreIcons(createCoreSelect(records));

			expect(icons).toHaveLength(3);
			expect(icons.map((icon) => icon.name)).toEqual(['smiley', 'heart', 'star']);
		});

		test('filters by the requested icon set', () => {
			const icons = getCoreIcons(createCoreSelect(records), 'example');

			expect(icons).toHaveLength(2);
			expect(icons.every((icon) => icon.iconSet === 'example')).toBe(true);
		});

		test('returns an empty array when the icon entity is absent (WordPress < 7.1)', () => {
			expect(getCoreIcons(createLegacyCoreSelect())).toEqual([]);
		});

		test('returns an empty array while records are still resolving (null)', () => {
			expect(getCoreIcons(createCoreSelect(null))).toEqual([]);
		});
	});
});
