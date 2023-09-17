/* eslint-disable no-undef */
require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: "./config.env" })

const { VITE_ALCHEMY_HTTP_ENDPOINT, VITE_WALLET_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./artifacts"
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // URL to your local Ethereum node
    },
    sepolia: {
      url: VITE_ALCHEMY_HTTP_ENDPOINT,
      accounts: [`0x${VITE_WALLET_PRIVATE_KEY}`]
    }
  },
};
