// eslint-disable-next-line import/extensions
const config = require('10up-toolkit/config/webpack.config.js');

const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

module.exports = {
	...config,
	plugins: [
		...config.plugins,
		new DependencyExtractionWebpackPlugin({
			requestToExternal: () => undefined,
			requestToHandle: () => undefined,
		}),
	],
};
