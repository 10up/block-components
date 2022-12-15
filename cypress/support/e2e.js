// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@10up/cypress-wp-utils';
import "cypress-localstorage-commands";

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {

	/*
	 * the ResizeObserver loop limit exceeded error is thrown because of the underlying
	 * implementation of the Popover component which uses the floating-ui library
	 *
	 * @see https://github.com/floating-ui/floating-ui/issues/1740
	 */
	if (err.message.includes('ResizeObserver loop limit exceeded')) {
		// returning false here prevents Cypress from failing the test
		return false;
	}

	return runnable;
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
