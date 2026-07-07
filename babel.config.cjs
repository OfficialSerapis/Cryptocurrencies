// babel.config.cjs
// Using CommonJS for compatibility with Jest and other tools that don't support ESM configs yet

module.exports = function (api) {
  // Cache the configuration based on the environment
  api.cache.using(() => process.env.NODE_ENV);
  
  const isTest = api.env('test');
  const isDevelopment = api.env('development');
  const isProduction = api.env('production');

  // Common presets for all environments
  const presets = [
    [
      '@babel/preset-env',
      {
        // Use CommonJS modules in test environment, ESM otherwise
        modules: isTest ? 'commonjs' : false,
        // Use core-js 3 for polyfills
        corejs: 3,
        // Enable debug logs in development
        debug: isDevelopment,
        // Target current Node.js version for tests, modern browsers for production
        targets: isTest ? { node: 'current' } : '> 0.25%, not dead',
        // Include only necessary polyfills
        useBuiltIns: 'usage',
        // Disable loose mode for better compatibility with class features
        loose: false,
      },
    ],
    // React preset with automatic runtime
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: isDevelopment,
        // Enable fast refresh in development
        refresh: isDevelopment,
      },
    ],
    // TypeScript preset
    '@babel/preset-typescript',
  ];


  // Common plugins for all environments
  const plugins = [
    // Transform runtime for polyfills and helpers
    [
      '@babel/plugin-transform-runtime',
      {
        // Use ES modules in non-test environments
        useESModules: !isTest,
        // Use core-js 3 for polyfills
        corejs: 3,
        // Enable regenerator runtime
        regenerator: true,
        // Use absolute runtime path to avoid module resolution issues
        absoluteRuntime: false,
      },
    ],
    // Class properties and private methods with consistent loose mode
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['@babel/plugin-transform-private-methods', { loose: false }],
    ['@babel/plugin-transform-private-property-in-object', { loose: false }],
    // Optional chaining and nullish coalescing
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-nullish-coalescing-operator',
    // Logical assignment operators
    '@babel/plugin-transform-logical-assignment-operators',
    // Numeric separator
    '@babel/plugin-transform-numeric-separator',
    // Transform modules to CommonJS for Jest
    isTest && ['@babel/plugin-transform-modules-commonjs', { loose: false }],
  ].filter(Boolean); // Remove any falsey values (like disabled plugins)


  // Development-only plugins
  if (isDevelopment) {
    plugins.push('react-refresh/babel');
  }

  // Production-only plugins
  if (isProduction) {
    // Add any production-specific plugins here
  }

  return {
    // Enable source maps
    sourceMaps: true,
    // Compact output in production
    compact: isProduction,
    // Presets and plugins
    presets,
    plugins,
    // Assumptions for better tree-shaking and compatibility
    assumptions: {
      setPublicClassFields: true,
      privateFieldsAsProperties: true,
      privateFieldsAsSymbols: false,
    },
  };
};
