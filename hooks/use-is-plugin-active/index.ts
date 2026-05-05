import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import type { Plugin } from '@wordpress/core-data';

const ACTIVE_STATUSES = ['active', 'network-active'] as const;

/**
 * Custom hook to check if a plugin is active and whether its resolution has finished.
 *
 * @param {string} pluginName The name of the plugin to check.
 * @returns {[boolean, boolean]} A tuple with the first value being whether the plugin is active and the second value being whether the resolution has finished.
 */
export const useIsPluginActive = (pluginName: string) => {
	return useSelect(
		(select) => {
			const storeSelectors = select(coreStore);
			const plugin: Plugin = (storeSelectors as any).getPlugin(pluginName);
			const hasResolvedPlugins: boolean = (storeSelectors as any).hasFinishedResolution(
				'getPlugin',
				[pluginName],
			);

			// @ts-ignore-next-line - The check here is intentional to see if the plugin is active.
			const isPluginActive: boolean = ACTIVE_STATUSES.includes(plugin?.status);

			return [isPluginActive, hasResolvedPlugins];
		},
		[pluginName],
	) as [boolean, boolean];
};
