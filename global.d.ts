// Type definitions for global test environment

// Extend the global Window interface to include ethereum
declare global {
  interface Window {
    ethereum: any; // Use 'any' to avoid conflicts with other type definitions
  }

  namespace NodeJS {
    interface Global {
      window: any; // Use 'any' to avoid conflicts with other type definitions
    }
  }
}

// This file is a module to enable ES module imports
export {};
