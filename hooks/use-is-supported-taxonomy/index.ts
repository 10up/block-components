import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export const useIsSupportedTaxonomy = (postType: string, taxonomyName: string) => {
	return useSelect(
		(select) => {
			// @ts-ignore-next-line - The type definitions for the core store are incomplete.
			const { getPostType, hasFinishedResolution } = select(coreStore);
			const postTypeObject = getPostType(postType);
			const hasResolvedPostType = hasFinishedResolution('getPostType', [postType]);

			const isSupportedTaxonomy = postTypeObject?.taxonomies?.some(
				(name: string) => name === taxonomyName,
			);

			return [!!isSupportedTaxonomy, hasResolvedPostType];
		},
		[postType, taxonomyName],
	) as [isSupportedTaxonomy: boolean, hasResolvedPostType: boolean];
};
