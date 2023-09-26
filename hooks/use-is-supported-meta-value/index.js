import { useEntityRecord } from '@wordpress/core-data';
import { usePost } from '../use-post';

export const useIsSupportedMetaField = (metaKey) => {
	const { postId, postType } = usePost();
	const { record } = useEntityRecord('postType', postType, postId);
	const { meta } = record || {};
	const supportedMetaKeys = Object.keys(meta || {});
	const isSupportedMetaField = supportedMetaKeys?.some((name) => name === metaKey);
	return [!!isSupportedMetaField];
};
