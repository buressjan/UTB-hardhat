const { expect } = require("chai");
const { ethers } = require("hardhat");
const par = require("../config.json");

describe("UTB NFT contract", function () {
  let utbFactory;
  let utbContract;

  beforeEach(async function () {
    utbFactory = await ethers.getContractFactory("UTB");
    let baseURI = par.newContract.baseTokenURI;
    if (baseURI.slice(-1) !== "/") baseURI += "/";
    utbContract = await utbFactory.deploy(
      par.newContract.collectionName,
      par.newContract.collectionSymbol,
      baseURI,
      par.newContract.maxSupply
    );
  });

  it("Should revert when call tokenURI before mint", async function () {
    await expect(utbContract.tokenURI(1)).to.be.revertedWith(
      "ERC721Metadata: URI query for nonexistent token"
    );
  });

  it("Should return correct baseURI", async function () {
    await utbContract.mint();
    let baseURI = par.newContract.baseTokenURI;
    if (baseURI.slice(-1) !== "/") baseURI += "/";
    expect(await utbContract.tokenURI(1)).to.equal(baseURI + "1.json");
  });

  it("TotalSupply should be equal to maxSupply", async function () {
    await utbContract.mint();
    expect(await utbContract.totalSupply()).to.equal(par.newContract.maxSupply);
  });

  it("Should correctly change baseTokenURI", async function () {
    await utbContract.mint();

    let baseURI = par.existingContract.newURI;
    if (baseURI.slice(-1) !== "/") baseURI += "/";
    await utbContract.setBaseURI(baseURI);
    expect(await utbContract.tokenURI(1)).to.equal(baseURI + "1.json");
  });
});
