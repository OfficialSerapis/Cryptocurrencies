// Import jest and testing-library for test setup
import '@testing-library/jest-dom';

// Import global type declarations
import './global';

// Import TextEncoder and TextDecoder from text-encoding
import { TextEncoder, TextDecoder } from 'text-encoding';

// Polyfill TextEncoder and TextDecoder for Node.js environment
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

// Mock the util module
jest.mock('util', () => ({
  TextEncoder: global.TextEncoder,
  TextDecoder: global.TextDecoder,
  promisify: (fn: any) => fn,
  inherits: jest.fn(),
  types: {
    isNativeError: jest.fn(),
  },
}));

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  } as Response)
);

// Mock the window.ethereum object
beforeEach(() => {
  // Create a mock request function with proper typing
  const mockRequest = jest.fn() as jest.MockedFunction<EthereumProvider['request']>;
  
  // Create a mock for the ethereum provider
  const mockEthereum: EthereumProvider = {
    isMetaMask: true,
    request: mockRequest,
    on: jest.fn(),
    removeListener: jest.fn(),
    // Add common Ethereum methods
    enable: jest.fn().mockResolvedValue([]),
    selectedAddress: '0x0000000000000000000000000000000000000000',
    chainId: '0x1',
    networkVersion: '1',
    isConnected: () => true,
    _metamask: {
      isUnlocked: jest.fn().mockResolvedValue(true),
    },
  };
  
  // Mock common window.ethereum methods
  mockRequest.mockImplementation(({ method, params }: { method: string; params?: any[] }) => {
    switch (method) {
      case 'eth_requestAccounts':
        return Promise.resolve(['0x0000000000000000000000000000000000000000']);
      case 'eth_accounts':
        return Promise.resolve(['0x0000000000000000000000000000000000000000']);
      case 'eth_chainId':
        return Promise.resolve('0x1');
      case 'net_version':
        return Promise.resolve('1');
      default:
        return Promise.resolve(null);
    }
  });
  
  // Make sure window is defined
  if (!global.window) {
    // @ts-ignore - Mocking window for tests
    global.window = {} as any;
  }
  
  // Assign the mock to the global window object
  Object.defineProperty(global.window, 'ethereum', {
    value: mockEthereum,
    configurable: true,
    writable: true,
  });
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  
  // Reset the window.ethereum property
  if (global.window) {
    Object.defineProperty(global.window, 'ethereum', {
      value: undefined,
      configurable: true,
      writable: true,
    });
  }
});

// Mock console methods to reduce test noise
const originalConsole = { ...console };

beforeAll(() => {
  // Suppress console errors and warnings in tests
  global.console = {
    ...originalConsole,
    error: jest.fn(),
    warn: jest.fn(),
    // Keep these for debugging
    log: originalConsole.log,
    info: originalConsole.info,
    debug: originalConsole.debug,
  };
});

afterAll(() => {
  // Restore original console
  global.console = originalConsole;
});

// Mock window.ethereum for frontend tests
const mockEthereum = {
  isMetaMask: true,
  isConnected: () => true,
  request: jest.fn().mockImplementation(async (request: { method: string; params?: any[] }) => {
    switch (request.method) {
      case 'eth_requestAccounts':
        return ['0x1234567890123456789012345678901234567890'];
      case 'eth_chainId':
        return '0x1';
      case 'eth_getBalance':
        return '0x2386f26fc10000'; // 0.01 ETH in wei
      case 'personal_sign':
        return '0xsignature';
      default:
        console.warn(`Unhandled request method: ${request.method}`);
        return null;
    }
  }),
  on: jest.fn(),
  removeListener: jest.fn(),
  enable: jest.fn().mockResolvedValue(['0x1234567890123456789012345678901234567890']),
  sendAsync: jest.fn().mockImplementation((request, callback) => {
    callback(null, { result: '0x1' });
  })
};

// Mock window.ethereum
Object.defineProperty(window, 'ethereum', {
  value: mockEthereum,
  writable: true,
  configurable: true,
});

// Mock Web3
class MockWeb3 {
  eth = {
    Contract: jest.fn(),
    getAccounts: jest.fn().mockResolvedValue(['0x1234567890123456789012345678901234567890']),
    getBalance: jest.fn().mockResolvedValue('1000000000000000000'), // 1 ETH in wei
  };
  utils = {
    fromWei: jest.fn().mockImplementation((wei) => (Number(wei) / 1e18).toString()),
    toWei: jest.fn().mockImplementation((eth) => (Number(eth) * 1e18).toString()),
  };
}

// @ts-ignore - Mock Web3
global.Web3 = MockWeb3;

// Mock ethers
const mockEthers = {
  providers: {
    Web3Provider: jest.fn().mockImplementation(() => ({
      getSigner: jest.fn().mockReturnValue({
        getAddress: jest.fn().mockResolvedValue('0x1234567890123456789012345678901234567890'),
        getBalance: jest.fn().mockResolvedValue({
          toString: () => '1000000000000000000' // 1 ETH in wei
        }),
        signMessage: jest.fn().mockResolvedValue('0xsignature'),
        sendTransaction: jest.fn().mockResolvedValue({
          wait: jest.fn().mockResolvedValue({
            status: 1,
            transactionHash: '0xhash',
            logs: []
          })
        })
      }),
      getNetwork: jest.fn().mockResolvedValue({ chainId: 1, name: 'homestead' }),
      getBlockNumber: jest.fn().mockResolvedValue(1000),
      getGasPrice: jest.fn().mockResolvedValue('1000000000'), // 1 Gwei
    })),
    JsonRpcProvider: jest.fn().mockImplementation(() => ({
      getNetwork: jest.fn().mockResolvedValue({ chainId: 1, name: 'homestead' }),
      getBlockNumber: jest.fn().mockResolvedValue(1000),
      getGasPrice: jest.fn().mockResolvedValue('1000000000'), // 1 Gwei
      getBalance: jest.fn().mockResolvedValue('1000000000000000000'), // 1 ETH in wei
    })),
  },
  Contract: jest.fn().mockImplementation(() => ({
    balanceOf: jest.fn().mockResolvedValue('1000000000000000000'), // 1 token
    decimals: jest.fn().mockResolvedValue(18),
    symbol: jest.fn().mockResolvedValue('TKN'),
    name: jest.fn().mockResolvedValue('Test Token'),
    totalSupply: jest.fn().mockResolvedValue('1000000000000000000000'), // 1000 tokens
    transfer: jest.fn().mockResolvedValue({
      wait: jest.fn().mockResolvedValue({
        status: 1,
        transactionHash: '0xhash',
        logs: []
      })
    }),
    allowance: jest.fn().mockResolvedValue('0'),
    approve: jest.fn().mockResolvedValue({
      wait: jest.fn().mockResolvedValue({
        status: 1,
        transactionHash: '0xhash',
        logs: []
      })
    }),
  })),
  utils: {
    parseEther: jest.fn().mockImplementation((eth) => (Number(eth) * 1e18).toString()),
    formatEther: jest.fn().mockImplementation((wei) => (Number(wei) / 1e18).toString()),
    parseUnits: jest.fn().mockImplementation((value, decimals) => (Number(value) * (10 ** Number(decimals))).toString()),
    formatUnits: jest.fn().mockImplementation((value, decimals = 18) => (Number(value) / (10 ** Number(decimals))).toString()),
    hexlify: jest.fn().mockImplementation((value) => `0x${value.toString(16)}`),
    keccak256: jest.fn().mockImplementation((value) => `0x${value}hashed`),
    toUtf8Bytes: jest.fn().mockImplementation((str) => new TextEncoder().encode(str)),
    toUtf8String: jest.fn().mockImplementation((bytes) => new TextDecoder().decode(bytes)),
    Interface: jest.fn().mockImplementation(() => ({
      encodeFunctionData: jest.fn().mockReturnValue('0xencoded'),
      decodeFunctionResult: jest.fn().mockReturnValue(['result']),
    })),
  },
  BigNumber: {
    from: jest.fn().mockImplementation((value: string | number) => ({
      toString: () => value.toString(),
      toNumber: () => Number(value),
      add: (other: string | number) => (Number(value) + Number(other)).toString(),
      sub: (other: string | number) => (Number(value) - Number(other)).toString(),
      mul: (other: string | number) => (Number(value) * Number(other)).toString(),
      div: (other: string | number) => (Number(value) / Number(other)).toString(),
      lt: (other: string | number) => Number(value) < Number(other),
      lte: (other: string | number) => Number(value) <= Number(other),
      gt: (other: string | number) => Number(value) > Number(other),
      gte: (other: string | number) => Number(value) >= Number(other),
      eq: (other: string | number) => value === other || Number(value) === Number(other),
    })),
  },
  constants: {
    AddressZero: '0x0000000000000000000000000000000000000000',
  },
};

// @ts-ignore - Mock ethers
global.ethers = mockEthers;

// Mock fetch for API calls
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(''),
});

// Add any global test setup here
beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks();
  
  // Reset fetch mock implementation
  // @ts-ignore
  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  });
  
  // Reset ethereum mock implementation
  if (window.ethereum) {
    // @ts-ignore
    window.ethereum.request.mockClear();
    // @ts-ignore
    window.ethereum.on.mockClear();
    // @ts-ignore
    window.ethereum.removeListener.mockClear();
  }
});

afterEach(() => {
  // Clean up after each test
  jest.restoreAllMocks();
});

// Mock console.warn to reduce noise in test output
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (message) => {
    // Suppress specific warnings
    if (typeof message === 'string') {
      // Add any warnings you want to suppress here
      const suppressedWarnings = [
        'ReactDOM.render is no longer supported in React 18',
        'componentWillReceiveProps has been renamed'
      ];
      
      if (suppressedWarnings.some(warning => message.includes(warning))) {
        return;
      }
    }
    originalWarn(message);
  };
  
  // Also suppress errors that are expected in tests
  console.error = (message) => {
    // Suppress specific errors
    if (typeof message === 'string') {
      const suppressedErrors = [
        'React.createElement: type is invalid',
        'validateDOMNesting',
        'Warning: Failed prop type',
        'Warning: Received `false` for a non-boolean attribute',
      ];
      
      if (suppressedErrors.some(error => message.includes(error))) {
        return;
      }
    }
    originalError(message);
  };
});

afterAll(() => {
  // Restore original console methods
  console.warn = originalWarn;
  console.error = originalError;
});
