var ethereumjsWallet = require('ethereumjs-wallet');
var ProviderEngine = require('web3-provider-engine');
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require('web3-provider-engine/subproviders/web3.js');
var Web3 = require('web3');
var FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');

// replace with your private key
// var privateKey = '!!!!!!!!ATTENTION!!!!!!!!';

// create wallet from existing private key
// var wallet = ethereumjsWallet.fromPrivateKey(new Buffer(privateKey, "hex"));
// var address = "0x" + wallet.getAddress().toString("hex");

// using ropsten testnet
var providerUrl = 'https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'
var engine = new ProviderEngine();

// filters
engine.addProvider(new FilterSubprovider());
// engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.on('error', function(err) {
// report connectivity errors
  console.error(err.stack);
});
engine.start();

// See <http://truffleframework.com/docs/advanced/configuration>
// to customize your Truffle configuration!
module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      from: '0xbfb0574FE1ea0AF7035c31D1D023E1Ae72583c2f',
      provider: engine,
      network_id: 3,
      gas: 4600000
    }
  }
};