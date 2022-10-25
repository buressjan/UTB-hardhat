const hre = require("hardhat");
const par = require("../config.json");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const utbFactory = await hre.ethers.getContractFactory("UTB");
  let baseURI = par.newContract.baseTokenURI;
  if (baseURI.slice(-1) !== "/") baseURI += "/";

  const ubtContract = await utbFactory.deploy(
    par.newContract.collectionName,
    par.newContract.collectionSymbol,
    baseURI,
    par.newContract.maxSupply,
    2
  );

  par.existingContract.contractAddress = ubtContract.address;

  fs.writeFileSync(
    path.resolve(__dirname, "../config.json"),
    JSON.stringify(par)
  );
  console.log(`Contract deployed to: ${ubtContract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
