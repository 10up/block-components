import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import type { Taxonomy } from '@wordpress/core-data';

export function useTaxonomy(taxonomyName: string) {
	return useSelect(
		(select) => {
			const { getTaxonomy, hasFinishedResolution } = select(coreStore);

			const hasResolvedTaxonomy = hasFinishedResolution('getTaxonomy', [taxonomyName]);
			const taxonomy = getTaxonomy(taxonomyName);

			return [taxonomy, hasResolvedTaxonomy];
		},
		[taxonomyName],
	) as [ taxonomy: Taxonomy | undefined, hasResolvedTaxonomy: boolean ];
}
