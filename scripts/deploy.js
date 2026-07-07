const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying from:", deployer.address);

  const SeleniumCoin = await hre.ethers.getContractFactory("SeleniumCoin");
  const selenium = await SeleniumCoin.deploy(deployer.address);
  await selenium.waitForDeployment();
  console.log("SeleniumCoin deployed to:", await selenium.getAddress());

  const ElectrumCoin = await hre.ethers.getContractFactory("ElectrumCoin");
  const electrum = await ElectrumCoin.deploy(deployer.address);
  await electrum.waitForDeployment();
  console.log("ElectrumCoin deployed to:", await electrum.getAddress());

  const PaymentProcessor = await hre.ethers.getContractFactory("PaymentProcessor");
  const paymentProcessor = await PaymentProcessor.deploy(
    await selenium.getAddress(),
    await electrum.getAddress()
  );
  await paymentProcessor.waitForDeployment();
  console.log("PaymentProcessor deployed to:", await paymentProcessor.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
