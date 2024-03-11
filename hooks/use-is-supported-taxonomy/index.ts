import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export const useIsSupportedTaxonomy = (postType: string, taxonomyName: string) => {
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
	) as [boolean, boolean];
};
