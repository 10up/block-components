import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

export const useIsSupportedMetaField = (metaKey) => {
	return useSelect(
		(select) => {
			const meta = select(editorStore).getCurrentPostAttribute('meta');
			const supportedMetaKeys = Object.keys(meta || {});
			const isSupportedMetaField = supportedMetaKeys?.some((name) => name === metaKey);
			return [!!isSupportedMetaField];
		},
		[metaKey],
	);
};
