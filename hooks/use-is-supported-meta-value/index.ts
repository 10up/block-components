import { useEntityRecord } from '@wordpress/core-data';
import { usePost } from '../use-post';

export const useIsSupportedMetaField = (metaKey: string) => {
	const { postId, postType } = usePost();
	const { record } = useEntityRecord('postType', postType, postId as number);
	const { meta } = (record as { meta?: Object }) || {}; // Add type assertion
	const supportedMetaKeys = Object.keys(meta || {});
	const isSupportedMetaField = supportedMetaKeys?.some((name) => name === metaKey);
	return [!!isSupportedMetaField] as const;
};
