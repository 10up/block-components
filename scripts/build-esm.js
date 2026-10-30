/**
 * Builds the unbundled ES module output in `dist/esm`.
 *
 * Every source file is transpiled on its own with the same Babel preset the
 * webpack build uses, so the module graph stays intact. That lets consumers
 * tree-shake root imports, and makes modules that hold shared state (like the
 * React context in `components/post-context`) exist exactly once, no matter
 * whether they are reached through the package root or a subpath export.
 *
 * Relative import specifiers are rewritten to fully specified `.js` paths so
 * the output is valid ESM for any bundler.
 *
 * Run after the webpack build: `node scripts/build-esm.js`.
 */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'dist', 'esm');
const SOURCE_DIRS = ['api', 'components', 'hooks', 'stores'];
const SOURCE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
const IGNORED = /(\.test\.|\.spec\.|__snapshots__|__tests__)/;

/**
 * Resolves a relative specifier to the path of the emitted `.js` file,
 * e.g. `../../hooks` -> `../../hooks/index.js`.
 *
 * @param {string} specifier Relative import specifier.
 * @param {string} fromFile  Absolute path of the importing source file.
 * @returns {string} Fully specified specifier.
 */
function resolveSpecifier(specifier, fromFile) {
	const target = path.resolve(path.dirname(fromFile), specifier);

	if (SOURCE_EXTENSIONS.some((ext) => fs.existsSync(`${target}${ext}`))) {
		return `${specifier}.js`;
	}

	if (SOURCE_EXTENSIONS.some((ext) => fs.existsSync(path.join(target, `index${ext}`)))) {
		return `${specifier.replace(/\/$/, '')}/index.js`;
	}

	throw new Error(`Unable to resolve "${specifier}" imported from ${fromFile}`);
}

/**
 * Babel plugin that rewrites relative import/export specifiers via resolveSpecifier.
 *
 * @returns {object} Babel plugin object.
 */
function fullySpecifiedImports() {
	const rewrite = (source, state) => {
		if (source?.value.startsWith('.')) {
			source.value = resolveSpecifier(source.value, state.filename);
		}
	};

	return {
		visitor: {
			ImportDeclaration: (nodePath, state) => rewrite(nodePath.node.source, state),
			ExportNamedDeclaration: (nodePath, state) => rewrite(nodePath.node.source, state),
			ExportAllDeclaration: (nodePath, state) => rewrite(nodePath.node.source, state),
		},
	};
}

function collectSourceFiles(directory) {
	return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const entryPath = path.join(directory, entry.name);

		if (IGNORED.test(entryPath)) return [];
		if (entry.isDirectory()) return collectSourceFiles(entryPath);

		const isSource =
			SOURCE_EXTENSIONS.includes(path.extname(entry.name)) && !entry.name.endsWith('.d.ts');
		return isSource ? [entryPath] : [];
	});
}

const files = [
	path.join(ROOT, 'index.ts'),
	...SOURCE_DIRS.flatMap((dir) => collectSourceFiles(path.join(ROOT, dir))),
];

files.forEach((file) => {
	const { code } = babel.transformFileSync(file, {
		babelrc: false,
		configFile: false,
		envName: 'production',
		sourceType: 'module',
		presets: [
			[
				require.resolve('@10up/babel-preset-default'),
				{ wordpress: true, useBuiltIns: false, modules: false },
			],
		],
		plugins: [fullySpecifiedImports],
	});

	const relativePath = path.relative(ROOT, file).replace(/\.(tsx?|jsx?)$/, '.js');
	const outFile = path.join(OUT_DIR, relativePath);

	fs.mkdirSync(path.dirname(outFile), { recursive: true });
	fs.writeFileSync(outFile, code);
});

// eslint-disable-next-line no-console
console.log(`Built ${files.length} ES modules into ${path.relative(ROOT, OUT_DIR)}`);
