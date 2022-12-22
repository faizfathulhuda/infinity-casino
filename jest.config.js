module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js', '!src/router/index.js'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0
    }
  }
}
