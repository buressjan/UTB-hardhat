// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721A.sol";

contract UTB is ERC721A, Ownable {
    uint256 public immutable maxSupply;
    string private baseTokenURI;
    uint256 private number;

    constructor(
        string memory _collectionName,
        string memory _collectionSymbol,
        string memory _baseTokenURI,
        uint256 _maxSupply,
        uint256 _number
    ) ERC721A(_collectionName, _collectionSymbol) {
        baseTokenURI = _baseTokenURI;
        maxSupply = _maxSupply;
        number = _number;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string calldata newURI) external onlyOwner {
        baseTokenURI = newURI;
    }

    bool public collectionMinted;

    function mint() external onlyOwner {
        require(!collectionMinted, "Already done");
        for (
            uint256 mintCycles = maxSupply / 10;
            mintCycles >= 1;
            mintCycles--
        ) {
            _safeMint(msg.sender, 10);
        }

        uint256 left = maxSupply % 10;
        if (left != 0) {
            _safeMint(msg.sender, left);
        }
        collectionMinted = true;
    }

    function getNumber() view public returns (uint256) {
        return number;
    }

    function multiply() external {
        number *= 2;
    }
}
