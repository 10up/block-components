const fs = require('fs');
const path = require('path');

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

function getEntriesFromSubFolders(parentDirectory) {
	const entries = {};

	fs.readdirSync(parentDirectory, { withFileTypes: true }).forEach((childDirectory) => {
		if (!childDirectory.isDirectory()) return;

		const potentialEntryPaths = ['index.js', 'index.jsx', 'index.ts', 'index.tsx'].map(
			(fileName) => path.join(parentDirectory, childDirectory.name, fileName),
		);

		for (const potentialEntryPath of potentialEntryPaths) {
			if (fs.existsSync(potentialEntryPath)) {
				const entryName = path.join(
					path.basename(parentDirectory),
					childDirectory.name,
					'index',
				);

				entries[entryName] = potentialEntryPath;
				break;
			}
		}
	});

	return entries;
}

module.exports = {
	...config,
	entry: {
		...config.entry(),
		...getEntriesFromSubFolders(path.resolve(__dirname, 'api')),
		...getEntriesFromSubFolders(path.resolve(__dirname, 'components')),
		...getEntriesFromSubFolders(path.resolve(__dirname, 'hooks')),
		...getEntriesFromSubFolders(path.resolve(__dirname, 'stores')),
	},
	devtool: 'source-map',
	plugins: [...config.plugins, new webpack.ExternalsPlugin(null, externalizeWpDeps)],
};
