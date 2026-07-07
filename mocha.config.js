module.exports = {
  require: ['ts-node/register'],
  extension: ['ts', 'tsx', 'js'],
  timeout: 10000,
  recursive: true,
  exit: true,
  spec: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],
  watch: false,
  'watch-files': ['src/**/*.ts', 'tests/**/*.ts'],
  'watch-ignore': ['node_modules', 'dist']
};
