/**
 * Extends the default 10up-toolkit unit test Jest configuration.
 *
 * `uuid` (v10+) ships as an ESM-only package (no CommonJS "require" export
 * condition). By default Jest's `transformIgnorePatterns` skips everything
 * under `node_modules`, so its `export`/`import` syntax reaches the CJS test
 * runtime untranspiled and throws a `SyntaxError: Unexpected token 'export'`.
 *
 * We reuse 10up-toolkit's base config (same testMatch/testEnvironment/
 * babel-transform/etc.) and only widen `transformIgnorePatterns` so that
 * `uuid` is passed through the existing Babel transform (which already
 * compiles ESM to CJS for our own source files) instead of being skipped.
 */

const baseConfig = require('10up-toolkit/config/jest-unit.config.js');

module.exports = {
	...baseConfig,
	transformIgnorePatterns: ['/node_modules/(?!(uuid)/)'],
};
