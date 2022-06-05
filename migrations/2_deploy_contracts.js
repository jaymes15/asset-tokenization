require('dotenv').config({path: '../.env'});

var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSales = artifacts.require("./MyTokenSale.sol");


module.exports = async function(deployer) {
const INITIAL_TOKENS = process.env.INITIAL_TOKENS;
let addr = await web3.eth.getAccounts();
await deployer.deploy(MyToken, INITIAL_TOKENS);
await deployer.deploy(MyTokenSales, 1, addr[0], MyToken.address);
let tokenInstance = await MyToken.deployed();
await tokenInstance.transfer(MyTokenSales.address, INITIAL_TOKENS);

};
