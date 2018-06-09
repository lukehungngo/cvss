
const assertRevert = require('zeppelin-solidity/test/helpers/assertRevert');

var CVSSLedger = artifacts.require('./CVSSLedger.sol');

contract('CVSSLedger', function (accounts) {
  let instance;
  beforeEach(async function () {
    instance = await CVSSLedger.deployed();
  });

  it('should have an owner', async function () {
    let owner = await instance.owner();
    assert.isTrue(owner !== 0);
  });

  it('changes owner after transfer', async function () {
    let other = accounts[1];
    await instance.transferOwnership(other);
    let owner = await instance.owner();

    assert.isTrue(owner === other);

  });

  // it('should prevent non-owners from transfering', async function () {
  //   const other = accounts[2];
  //   const owner = await instance.owner();
  //   //assert.equal(other, owner, 'Owner should be ${owner}');
  //   assert.isTrue(owner !== other);
  //   try {
  //     await instance.transferOwnership(other, { from: other });
  //     assert.fail('should have thrown before');
  //   } catch (error) {
  //     assertRevert(error);
  //   }
  // });

  // it('should guard ownership against stuck state', async function () {
  //   let originalOwner = await instance.owner();
  //   try {
  //     await instance.transferOwnership(null, { from: originalOwner });
  //     assert.fail();
  //   } catch (error) {
  //     assertRevert(error);
  //   }
  // });
});
