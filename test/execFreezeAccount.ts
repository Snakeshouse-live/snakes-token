import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const contractAddress = process.env.SNAKES_CONTRACT_ADDRESS_TESTNET as string;
  console.log("contractAddress: ", contractAddress);

  const snakesToken = await ethers.getContractAt("SnakesToken", contractAddress);

  const snakesTokenTx = await snakesToken.freezeAccount("0x25c50fdea45e879842019a6289e617ac454005f7");
  //0xF3023840099527fb39d380C1B75896b449f089F9
  //   const snakesTokenTx = await snakesToken.unfreezeAccount("0xF3023840099527fb39d380C1B75896b449f089F9");
  const receipt = await snakesTokenTx.wait();

  console.log("Snakes Token in tx : ", snakesTokenTx);
  console.log("Snakes Token receipt : ", receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
