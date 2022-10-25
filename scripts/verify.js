const hre = require("hardhat");
const par = require("../config.json");

async function main() {
    await hre.run("verify:verify", {
        address: par.existingContract.contractAddress,
        constructorArguments: [
            par.newContract.collectionName,
            par.newContract.collectionSymbol,
            par.newContract.baseTokenURI,
            par.newContract.maxSupply
        ],
    }).then(result => console.log(result))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });