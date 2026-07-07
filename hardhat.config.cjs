require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat/config");

module.exports = {
  solidity: "0.8.17",
  networks: {
    holesky: {
      url: process.env.HOLESKY_RPC_URL || "https://rpc.holesky.ethpandaops.io",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  }
};
