// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.4;


// we will bring in the openzippelin ERC721 NFT functionality

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // counters helps us to keep track of our tokenIds

    // address of marketplace for NFTs to interact
    address contractAddress;

    // OBJ: give the NFT market the ability to transact with tokens or change ownership
    // setApprovalForAll allows us to do that with contractAddress

    constructor(address marketplaceAddress) ERC721("Cryplistic", "DMT") {
        contractAddress = marketplaceAddress;
    }


    // minting new tokens/NFts

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);

        // set the token URI: id and url
        _setTokenURI(newItemId, tokenURI);
        // give the marketplace the approval to transact between users
        setApprovalForAll(contractAddress, true);
        // mint the token and set it for sale - return the id do so
        return newItemId;
    }
}