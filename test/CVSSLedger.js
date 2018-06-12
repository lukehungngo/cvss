var CVSSLedger = artifacts.require('./CVSSLedger.sol');

contract('CVSSLedger', function (accounts) {
  let instance;
  beforeEach(async function () {
    instance = await CVSSLedger.deployed();
  });
  it("Should be register User by owner", async function() { 
      await instance.submit("Hung","0x123",1,"0x456",{from: web3.eth.accounts[0]})
      let value = await instance.queryHash("0x123",1,{from: web3.eth.accounts[0]})
      console.log(value)
  })
  it("Should prevent non-owner to register User", async function() {
      //await instance.submit("Hung","0x123",1,"0x456",{from: web3.eth.accounts[1]})
  })
});
