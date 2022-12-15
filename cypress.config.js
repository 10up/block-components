const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'dnr1ke',
  videoCompression: 15,
  env: {
    username: 'admin',
    password: 'password',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8889',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
