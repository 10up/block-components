import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import type { Plugin } from '@wordpress/core-data';

const ACTIVE_STATUSES: string[] = ['active', 'network-active'];

/**
 * Custom hook to check if a plugin is active and whether its resolution has finished.
 *
 * @param pluginName The name of the plugin to check.
 * @returns A tuple containing two boolean values: the first indicating whether the plugin is active, 
 * and the second indicating whether the resolution for the plugin has finished.
 */
export const useIsPluginActive = (pluginName: string): [boolean, boolean] => {
	return useSelect(
		(select) => {
			const storeSelectors = select(coreStore);
			const plugin: Plugin = (storeSelectors as any).getPlugin(pluginName);
			const hasResolvedPlugins: boolean = (storeSelectors as any).hasFinishedResolution('getPlugin', [
				pluginName,
			]);

			const isPluginActive: boolean = ACTIVE_STATUSES.includes(plugin?.status);

			return [isPluginActive, hasResolvedPlugins] as [boolean, boolean];
		},
		[pluginName],
	);
};
