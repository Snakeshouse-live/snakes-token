import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account :", deployer.address);

  const initialOwner = process.env.BSC_OWNER as string;

  const SnakesToken = await ethers.getContractFactory("SnakesToken");
  const snakesToken = await SnakesToken.deploy(initialOwner);

  console.log("Deployed token contracts address:", await snakesToken.getAddress());
  console.log(`npx hardhat verify --network ${(await deployer.provider.getNetwork()).name} ${await snakesToken.getAddress()} ${deployer.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
