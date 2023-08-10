import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export const useIsSupportedTaxonomy = (postType, taxonomyName) => {
	return useSelect(
		(select) => {
			const postTypeObject = select(coreStore).getPostType(postType);
			const hasResolvedPostType = select(coreStore).hasFinishedResolution('getPostType', [
				postType,
			]);

			const isSupportedTaxonomy = postTypeObject?.taxonomies?.some(
				(name) => name === taxonomyName,
			);

			return [!!isSupportedTaxonomy, hasResolvedPostType];
		},
		[postType, taxonomyName],
	);
};
