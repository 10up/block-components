import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import type { WP_REST_API_Term } from 'wp-types';

export const useAllTerms = (taxonomyName: string) => {
	return useSelect(
		(select) => {
			// @ts-ignore-next-line - The type definitions for the core store are incomplete.
			const { getEntityRecords, hasFinishedResolution } = select(coreStore);

			const termsSelector = [
				'taxonomy',
				taxonomyName,
				{
					per_page: -1,
					context: 'view',
				},
			] as const;

			const terms = getEntityRecords<WP_REST_API_Term>(...termsSelector);

			const hasResolvedTerms: boolean = hasFinishedResolution(
				'getEntityRecords',
				termsSelector,
			);

			return [terms, hasResolvedTerms] as const;
		},
		[taxonomyName],
	);
};
