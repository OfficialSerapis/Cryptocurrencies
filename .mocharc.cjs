module.exports = {
  require: 'ts-node/register',
  extension: ['ts', 'tsx', 'js'],
  timeout: 30000,
  recursive: true,
  exit: true,
  spec: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],
  watch: false,
  'watch-files': ['src/**/*.ts', 'tests/**/*.ts'],
  'watch-ignore': ['node_modules', 'dist'],
  reporter: 'spec',
  ui: 'bdd',
  bail: false,
  parallel: false,
  retries: 0,
  slow: 75,
  'enable-source-maps': true,
  'node-option': ['experimental-specifier-resolution=node']
};
