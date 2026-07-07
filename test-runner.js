import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { glob } from 'glob';
import { createRequire } from 'module';

// Create require for CommonJS modules
const require = createRequire(import.meta.url);

// Register TypeScript with ES modules support
const tsNode = await import('ts-node');
const tsNodeService = tsNode.register({
  transpileOnly: true,
  compilerOptions: {
    module: 'ESNext',
    moduleResolution: 'node',
    target: 'ES2020',
    esModuleInterop: true,
    allowJs: true,
    skipLibCheck: true,
    strict: false,
    forceConsistentCasingInFileNames: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    jsx: 'react-jsx',
    baseUrl: '.',
    paths: {
      '@/*': ['src/*'],
      '@tests/*': ['tests/*'],
      '@contracts/*': ['contracts/*']
    },
    typeRoots: ['./src/types', './node_modules/@types']
  }
});

// Import Mocha after TypeScript is registered
const Mocha = (await import('mocha')).default;

// Configure Mocha
const mocha = new Mocha({
  timeout: 30000,
  reporter: 'spec',
  extension: ['ts', 'tsx', 'js'],
  bail: true,
  exit: true
});

// Get test files
const testPattern = process.argv[2] || 'tests/**/*.test.ts';
const testFiles = await glob(testPattern, { absolute: true });

if (testFiles.length === 0) {
  console.error(`No test files found matching pattern: ${testPattern}`);
  process.exit(1);
}

// Add test files to Mocha
try {
  testFiles.forEach(file => {
    mocha.addFile(file);
  });

  // Run the tests
  mocha.run(failures => {
    process.exitCode = failures ? 1 : 0;
  });
} catch (error) {
  console.error('Error running tests:', error);
  process.exit(1);
}
