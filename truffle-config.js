const path = require("path");
require('dotenv').config({path: __dirname + '/.env'});;

const HDWalletProvider = require('@truffle/hdwallet-provider');

const infuraRinkebyURL = process.env['RINKEBY_NETWORK'];
const infuraMnemonic = process.env['INFURA_ACC_MNEMONIC'];

const ganachLocalMnemonic = process.env['GANACHE_LOCAL_MNEMONIC'];
const ganachLocalURL = process.env['GANACHE_LOCAL_URL'];



module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ganache_test: {
      host: "localhost",
      port: 7545,
      network_id: "*",
    },
    ganache_local: {
      provider: function() {
          return new HDWalletProvider(ganachLocalMnemonic, ganachLocalURL, 0)
      },
      network_id: "5777"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(infuraMnemonic, infuraRinkebyURL),
      network_id: 4,
      gas: 5500000,        
    },
  },
  compilers: {
    solc: {
      version: "^0.6.0"
    }
  }
};
