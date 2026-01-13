import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import type { Taxonomy } from '@wordpress/core-data';

export function useTaxonomy(taxonomyName: string) {
	return useSelect(
		(select) => {
			// @ts-ignore-next-line - The type definitions for the core store are incomplete.
			const { getTaxonomy, hasFinishedResolution } = select(coreStore);

			const hasResolvedTaxonomy = hasFinishedResolution('getTaxonomy', [taxonomyName]);
			const taxonomy: Taxonomy<'edit'> | undefined = getTaxonomy(taxonomyName);

			return [taxonomy, hasResolvedTaxonomy];
		},
		[taxonomyName],
	) as [taxonomy: Taxonomy | undefined, hasResolvedTaxonomy: boolean];
}
