import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const ACTIVE_STATUSES = ['active', 'network-active'];

export const useIsPluginActive = (pluginName) => {
	return useSelect(
		(select) => {
			const plugin = select(coreStore).getPlugin(pluginName);
			const hasResolvedPlugins = select(coreStore).hasFinishedResolution('getPlugin', [
				pluginName,
			]);

			const isPluginActive = ACTIVE_STATUSES.includes(plugin?.status);

			return [isPluginActive, hasResolvedPlugins];
		},
		[pluginName],
	);
};
