import { ethers } from 'ethers';
import type { BigNumber, BigNumberish } from 'ethers';

export type TokenContract = {
  balanceOf: (address: string) => Promise<BigNumber>;
  transfer: (to: string, amount: BigNumberish) => Promise<boolean>;
  approve: (spender: string, amount: BigNumberish) => Promise<boolean>;
};

export type MultiTokenContract = TokenContract & {
  transfer: (to: string, amount: BigNumberish, tokenId: number) => Promise<boolean>;
  makePayment: (to: string, seleniumAmount: BigNumberish, electrumAmount: BigNumberish) => Promise<boolean>;
};

export const setupTestEnvironment = async () => {
  // Create a local testing provider
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  
  // Create test accounts
  const owner = new ethers.Wallet(process.env.PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);
  const user1 = new ethers.Wallet(process.env.TEST_PRIVATE_KEY_1 || '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', provider);
  const user2 = new ethers.Wallet(process.env.TEST_PRIVATE_KEY_2 || '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a', provider);
  
  // Create mock token contract
  const createMockToken = (): TokenContract => ({
    balanceOf: async () => ethers.BigNumber.from('1000000000000000000'),
    transfer: async () => true,
    approve: async () => true
  });
  
  // Create mock multi-token contract
  const multiTokenContract: MultiTokenContract = {
    balanceOf: async () => ethers.BigNumber.from('0'),
    transfer: async () => true,
    approve: async () => true,
    makePayment: async () => true
  } as MultiTokenContract;

  return {
    provider,
    owner,
    user1,
    user2,
    seleniumCoin: createMockToken(),
    electrumCoin: createMockToken(),
    multiTokenPayment: multiTokenContract
  };
};

export const mintTokens = async (
  token: TokenContract,
  to: string,
  amount: string
) => {
  // In a real test, this would interact with the contract
  // For mocks, we just resolve the promise
  return Promise.resolve();
};

export const transferTokens = async (
  token: TokenContract,
  from: string,
  to: string,
  amount: string
) => {
  // In a real test, this would transfer tokens
  // For mocks, we just resolve the promise
  return Promise.resolve(true);
};

export const makePayment = async (
  multiToken: MultiTokenContract,
  from: string,
  seleniumAmount: string,
  electrumAmount: string
) => {
  // In a real test, this would make a payment
  // For mocks, we just resolve the promise
  return Promise.resolve(true);
};
