const hre = require("hardhat");
const par = require("../config.json");

async function main() {
  const utbFactory = await ethers.getContractFactory("UTB");
  const utbContract = await utbFactory.attach(
    par.existingContract.contractAddress
  );

  console.log(`Attached contract from address: ${utbContract.address}`);
  console.log(`Current number: ${await utbContract.getNumber()}`);

  console.log("multiplying...");
  const txMultiply = await utbContract.multiply();
  const receipt = await txMultiply.wait();
  console.log(receipt.logs);

  console.log(`New number: ${await utbContract.getNumber()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
