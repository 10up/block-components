// eslint-disable-next-line import/extensions
const config = require('10up-toolkit/config/webpack.config.js');

const webpack = require('webpack');

const WORDPRESS_NAMESPACE = '@wordpress/';
const BUNDLED_PACKAGES = ['@wordpress/icons', '@wordpress/interface', '@wordpress/style-engine'];

function externalizeWpDeps({ request }, callback) {
	if (!BUNDLED_PACKAGES.includes(request) && request.startsWith(WORDPRESS_NAMESPACE)) {
		return callback(null, request, 'commonjs2');
	}

	return callback();
}

module.exports = {
	...config,
	devtool: 'source-map',
	plugins: [...config.plugins, new webpack.ExternalsPlugin(null, externalizeWpDeps)],
};
