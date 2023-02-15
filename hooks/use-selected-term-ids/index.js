import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export const useSelectedTermIds = (taxonomyName) => {
	return useSelect(
		(select) => {
			const { getTaxonomy, hasFinishedResolution } = select(coreStore);
			const taxonomyObject = getTaxonomy(taxonomyName);
			const hasResolvedTaxonomyObject = hasFinishedResolution('getTaxonomy', [taxonomyName]);
			const { getEditedPostAttribute } = select(editorStore);

			const selectedTermIds = getEditedPostAttribute(taxonomyObject?.rest_base);

			return [selectedTermIds, hasResolvedTaxonomyObject];
		},
		[taxonomyName],
	);
};
