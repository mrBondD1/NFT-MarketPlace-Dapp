const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Should mint and trade NFTs", async function () {
    // we're getting Market API from market contract for market address
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    // we're getting NFT API from NFT contract for NFT address

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    // test to recieve listing price and auction price
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("100", "ether");

    // test for minting
    await nft.createToken("https://www.mytokenlocation.com"); // IPFS endpoint
    await nft.createToken("https://www.mytokenlocation2.com"); // IPFS endpoint

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    // test for different addresses from different users - test accounts
    // return an array of how many addresses
    const [_, buyerAddress] = await ethers.getSigners(); // 1st address - sellers
 
    // create a market sale with address, id and price
    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

      // fetching what items are on the market - testing
    let items = await market.fetchMarketItems();
    items = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );

    // test out all the items
    console.log("items: ", items);
  });
});


/* Test obj:
  1. getting addresses of market and nfts
  2. setting up listing and auction price
  3. minting nfts
  4. setting seller and buyer addresses
  5. selling an token 
  6. fetching market items
*/