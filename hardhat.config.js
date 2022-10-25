//todo polygonscan contract verification
//console logs from scripts mint, baseuri are not fast enough to reflect changes

require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("transfer-nft", "Transfer NFT token to customer")
  .addPositionalParam("receiver")
  .addPositionalParam("tokenID")
  .setAction(async (args) => {
    console.log(args);

    const [signer] = await ethers.getSigners();
    console.log("Account balance:", (await signer.getBalance()).toString());

    const utbFactory = await ethers.getContractFactory("UTB");
    const utbContract = await utbFactory.attach(
      par.existingContract.contractAddress
    );

    console.log(`Attached contract from address: ${utbContract.address}`);

    const txTransferNFT = await utbContract.transferFrom(
      signer.address,
      args.receiver,
      args.tokenID
    );

    console.log("transfering NFT...");
    const receipt = await txTransferNFT.wait();
    console.log(receipt.logs);

    const tokenOwner = await utbContract.ownerOf(args.tokenID);
    if (tokenOwner == args.receiver) {
      console.log(
        `Token ${args.tokenID} was succesfully transfered to ${args.receiver}`
      );
    } else {
      console.error(`Token ${args.tokenID} was not succesfully transfered!`);
    }
  });

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
      // blockGasLimit: 100000000429720,
      gasPrice: 50000000000,
    },
    matic: {
      chainId: 137,
      url: "https://matic-mainnet.chainstacklabs.com ",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 50000000000, // 50gwei
    },
    mumbai: {
      chainId: 80001,
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [process.env.PRIVATE_KEY],
      gasLimit: 500000000000, // 500gwei
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 500,
      },
      outputSelection: {
        "*": {
          "*": ["evm.bytecode", "evm.deployedBytecode", "abi"],
        },
      },
      libraries: {},
    },
  },
};
