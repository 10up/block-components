import { CoreIconCollectionRecord, CoreIconRecord, IconSet } from '../../stores/icons/types';

/**
 * Whether the site exposes WordPress core's icon registry (WP 7.0+) through
 * core-data.
 *
 * @param rootEntitiesConfig Result of `select( coreStore ).getEntitiesConfig( 'root' )`.
 * @returns Whether the `root/icon` entity exists.
 */
export function hasCoreIconEntity(rootEntitiesConfig: Array<{ name?: string }> | null | undefined) {
	return (
		Array.isArray(rootEntitiesConfig) && rootEntitiesConfig.some(({ name }) => name === 'icon')
	);
}

/**
 * Splits a core icon name (`collection/icon-name`) on its first slash into the
 * `{ iconSet, name }` shape the icon components use. `a/b/c` becomes
 * `{ iconSet: 'a', name: 'b/c' }`. A name without a slash uses `fallbackSet`.
 *
 * @param fullName    Core icon name.
 * @param fallbackSet Set to use when the name has no collection prefix.
 * @returns The `{ iconSet, name }` pair.
 */
export function splitCoreIconName(fullName: string, fallbackSet = '') {
	const index = fullName.indexOf('/');

	if (index === -1) {
		return { iconSet: fallbackSet, name: fullName };
	}

	return { iconSet: fullName.slice(0, index), name: fullName.slice(index + 1) };
}

/**
 * Core strips the root `fill` from icon markup and relies on CSS for colour.
 * Adds `fill="currentColor"` to the root `<svg>` when it declares no fill, so a
 * core icon follows the surrounding text colour wherever it is rendered.
 *
 * @param svg Icon markup.
 * @returns The markup, with a root fill.
 */
export function withCurrentColor(svg: string) {
	return svg.replace(/^(\s*<svg\b)([^>]*)>/i, (match, open: string, attributes: string) => {
		if (/\sfill\s*=/i.test(attributes)) {
			return match;
		}

		return `${open} fill="currentColor"${attributes}>`;
	});
}

/**
 * Groups core icon records into icon sets, one per collection. Collection
 * labels come from the collection records; sets follow the collections' order,
 * then any collection only seen on an icon, in the order first seen.
 *
 * @param icons       Core icon records.
 * @param collections Core icon collection records.
 * @returns Icon sets in the `tenup/icons` store's shape.
 */
export function coreRecordsToIconSets(
	icons: CoreIconRecord[] | null | undefined,
	collections: CoreIconCollectionRecord[] | null | undefined,
): IconSet[] {
	if (!Array.isArray(icons) || !icons.length) {
		return [];
	}

	const sets = new Map<string, IconSet>();

	(collections ?? []).forEach(({ slug, label }) => {
		sets.set(slug, { name: slug, label: label || slug, icons: [] });
	});

	icons.forEach((record) => {
		const { iconSet, name } = splitCoreIconName(record.name, record.collection);

		if (!iconSet) {
			return;
		}

		if (!sets.has(iconSet)) {
			sets.set(iconSet, { name: iconSet, label: iconSet, icons: [] });
		}

		sets.get(iconSet)!.icons.push({
			name,
			label: record.label || name,
			source: withCurrentColor(record.content ?? ''),
		});
	});

	return [...sets.values()].filter((set) => set.icons.length);
}

/**
 * Merges the `tenup/icons` store's sets with core's. A set name registered in
 * the store wins outright, so projects keep seeing exactly what they
 * registered; core-only sets are appended after the store's.
 *
 * @param storeSets Sets from the `tenup/icons` store.
 * @param coreSets  Sets from core's icon registry.
 * @returns The merged sets.
 */
export function mergeIconSets(storeSets: IconSet[], coreSets: IconSet[]): IconSet[] {
	const storeNames = new Set(storeSets.map(({ name }) => name));

	return [...storeSets, ...coreSets.filter(({ name }) => !storeNames.has(name))];
}
