var Wallet = artifacts.require("./CVSSLedger.sol");

module.exports = function(deployer) {
  deployer.deploy(Wallet);
};
