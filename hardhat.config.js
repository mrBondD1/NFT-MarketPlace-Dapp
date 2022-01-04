require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString()

const projectId = '0ffef4771a1a4d4d935d0f8218f118d7'

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },

    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/${projectId}`,
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
