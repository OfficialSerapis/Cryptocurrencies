import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";

const config = {
  solidity: "0.8.17",
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v5",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    holesky: {
      url: process.env.HOLESKY_RPC_URL || "https://rpc.holesky.ethpandaops.io",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  }
};

export default config;