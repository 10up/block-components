import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export function useTaxonomy(taxonomyName) {
	return useSelect(
		(select) => {
			const { getTaxonomy, hasFinishedResolution } = select(coreStore);

			const hasResolvedTaxonomy = hasFinishedResolution('getTaxonomy', [taxonomyName]);
			const taxonomy = getTaxonomy(taxonomyName);

			return [taxonomy, hasResolvedTaxonomy];
		},
		[taxonomyName],
	);
}
