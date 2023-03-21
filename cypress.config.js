module.exports = {
  projectId: 'cqv4gg',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  e2e: {
    baseUrl: 'http://localhost:8000',
    specPattern: 'cypress/e2e/**/*.cy.{ts,js}',
    supportFile: 'cypress/support/index.ts',
  },
  viewportWidth: 1000,
  viewportHeight: 1000,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
  },
};
