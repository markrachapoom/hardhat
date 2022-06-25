require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const INFURA_ID = process.env.INFURA_ID;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_ID}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`]
    }
  }
};
