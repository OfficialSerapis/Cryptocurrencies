const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", hre.ethers.utils.formatEther(balance), "ETH");

  const ElectrumToken = await hre.ethers.getContractFactory("ElectrumToken");
  console.log("Deploying ElectrumToken...");
  const electrumToken = await ElectrumToken.deploy();
  await electrumToken.deployed();
  console.log("ElectrumToken deployed to:", electrumToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
