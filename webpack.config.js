// eslint-disable-next-line import/extensions
const config = require('10up-toolkit/config/webpack.config.js');

const webpack = require('webpack');

const WORDPRESS_NAMESPACE = '@wordpress/';
const BUNDLED_PACKAGES = ['@wordpress/icons', '@wordpress/interface', '@wordpress/style-engine'];

const requestToExternal = (request) => {
	if (BUNDLED_PACKAGES.includes(request)) {
		return undefined;
	}

	if (request.startsWith(WORDPRESS_NAMESPACE)) {
		return request;
	}

	return undefined;
};
function externalizeWpDeps(_context, request, callback) {
	const externalRequest = requestToExternal(request);

	if (externalRequest) {
		return callback(null, externalRequest, 'commonjs2');
	}

	return callback();
}

function externalizeWpDepsV5({ context, request }, callback) {
	return externalizeWpDeps(context, request, callback);
}

module.exports = {
	...config,
	plugins: [...config.plugins, new webpack.ExternalsPlugin(null, externalizeWpDepsV5)],
};
