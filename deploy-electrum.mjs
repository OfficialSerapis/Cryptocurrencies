import hre from "hardhat";

async function main() {
  const ElectrumToken = await hre.ethers.getContractFactory("ElectrumToken");
  const electrumToken = await ElectrumToken.deploy();
  await electrumToken.waitForDeployment();
  console.log("ElectrumToken deployed to:", await electrumToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});