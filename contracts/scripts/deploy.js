const hre = require("hardhat");

async function main() {
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();
  const addr = await counter.getAddress();
  console.log("Counter deployed to:", addr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});