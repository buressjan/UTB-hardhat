const hre = require("hardhat");
const par = require("../config.json");

async function main() {
  const utbFactory = await ethers.getContractFactory("UTB");
  const utbContract = await utbFactory.attach(
    par.existingContract.contractAddress
  );

  console.log(`Attached contract from address: ${utbContract.address}`);
  console.log(`Current baseURI for token 1: ${await utbContract.tokenURI(1)}`);

  let baseURI = par.existingContract.newURI;
  if (baseURI.slice(-1) !== "/") baseURI += "/";

  const txChangeURI = await utbContract.setBaseURI(baseURI);
  console.log("changing baseTokenURI...");
  const receipt = await txChangeURI.wait();
  console.log(receipt.logs);

  console.log(`New baseURI for token 1: ${await utbContract.tokenURI(1)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
