import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export const useIsPluginActive = (pluginName) => {
	return useSelect(
		(select) => {
			const plugin = select(coreStore).getPlugin(pluginName);
			const hasResolvedPlugins = select(coreStore).hasFinishedResolution('getPlugin', [
				pluginName,
			]);
			return [plugin?.status === 'active' ?? false, hasResolvedPlugins];
		},
		[pluginName],
	);
};
