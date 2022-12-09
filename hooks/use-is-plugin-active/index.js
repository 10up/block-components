import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export const useIsPluginActive = (pluginName) => {
	return useSelect(
		(select) => {
			const plugins = select(coreStore).getPlugins();
			const hasResolvedPlugins = select(coreStore).hasFinishedResolution('getPlugins');
			const plugin = plugins?.find((plugin) => plugin.plugin === pluginName);
			return [plugin?.status === 'active' ?? false, hasResolvedPlugins];
		},
		[pluginName],
	);
};
