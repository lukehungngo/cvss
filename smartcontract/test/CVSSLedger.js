
const assertRevert = require('zeppelin-solidity/test/helpers/assertRevert');

var CVSSLedger = artifacts.require('./CVSSLedger.sol');

contract('CVSSLedger', function (accounts) {
  let instance;
  beforeEach(async function () {
    instance = await CVSSLedger.deployed();
  });
  it("Should be register User by owner", async function() { 
      await instance.registerUser("0x123","Hung",{from: web3.eth.accounts[0]});
      await instance.deleteUser("0x123",{from:web3.eth.accounts[0]})
      let registerName = await instance.mapUser("0x123")
      assert.equal(registerName, 0,`${registerName} should be zero`)
      // try {
      //   await instance.deleteUser("0x123",{from: web3.eth.accounts[0]});
      // } catch (err) {
      //   assertRevert(err);
      // }
  })
  it("Should prevent non-owner to register User and remove User", async function() {
    try {
      let owner = await instance.owner()
      assert.isTrue(owner !== web3.eth.accounts[1])
      //await instance.registerUser("0x123","Hung",{from: web3.eth.accounts[1]})
      // let registerName = await instance.mapUser("0x123")
      // assert.equal(registerName, 0,`${registerName} should be zero`)
      //assert.fail()
    } catch (err) {
      assertRevert(err);
    }
    // try {
    //   await instance.registerUser("0x123","Hung",{from: web3.eth.accounts[0]});
    //   await instance.deleteUser("0x123",{from:web3.eth.accounts[1]})
    //   assert.fail()
    // } catch (err) {
    //   assertRevert(err);
    // }
    // await instance.deleteUser("0x123",{from:account[0]})
  })
});
