const par = require("../config.json");

async function main() {
  const utbFactory = await ethers.getContractFactory("UTB");
  const utbContract = await utbFactory.attach(
    par.existingContract.contractAddress
  );

  console.log(`Attached contract from address: ${utbContract.address}`);
  const txMint = await utbContract.mint({ gasLimit: 3000000 });

  console.log("minting...");
  const receipt = await txMint.wait();
  console.log(receipt.logs);
  console.log(`Total supply: ${await utbContract.totalSupply()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
