pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Wallet is Ownable {
    // Name
    // Date Of Birth
    // Social Security Number
    // Public Key (Address of User Account) (Optional)
    struct User {
        bytes name;
        bytes dOB;
        bytes SSN;
        bool isExist;
        uint certCount;
        mapping (bytes32 => Certificate) certificates;
        bytes32[] certID;
    }
    // State:  0 -> not initialize, 1 -> active, 2 -> inactive
    struct Certificate {
        uint8 state;

        bytes32 certHash;
        bytes provider;
        bytes ownerSignatures;
    }
    mapping (bytes32 => User) userID;
    
    event logUser(bytes32 _userID, bytes _name, bytes _dOB, bytes _SSN, bool isExist, uint certCount);
    event logCert(bytes32 _userID, bytes32 _certHash, bytes _provider, bytes _ownerSignatures);
    event logMessage(string);
    // Check if user exist or not
    modifier userExist(bytes32 _userID){
        logMessage("User exist");
        require(userID[_userID].isExist);
        _;
    }
    modifier userNotExist(bytes32 _userID){
        logMessage("User not exist");
        require(!userID[_userID].isExist);
        _;
    }
    // Create new user and import PII (personal identifiable information)
    function createUser(bytes _name, bytes _dOB, bytes _SSN, bytes32 _userID) userNotExist(_userID) onlyOwner {
        User user;
        user.name = _name;
        user.dOB = _dOB;
        user.SSN = _SSN;
        user.certCount = 0;
        user.isExist = true;
        userID[_userID] = user;
        logUser(_userID, user.name, user.dOB, user.SSN, user.isExist, user.certCount);
    }

    // create new certificates and import to user's wallet
    // Only owner can update
    // Check user exist
    // certificate must not exsit
    function createCertificate(bytes32 _userID, bytes32 _certHash, bytes _provider, bytes _ownerSignatures) userExist(_userID) onlyOwner {
        User user = userID[_userID];
        require(user.certificates[_certHash].state == 0);
        Certificate certificate;
        certificate.certHash = _certHash;
        certificate.provider = _provider;
        certificate.ownerSignatures = _ownerSignatures;
        certificate.state = 1;
        user.certificates[_certHash] = certificate;
        user.certID.push(_certHash);
        user.certCount += 1;
        logCert(_userID, certificate.certHash, certificate.provider, certificate.ownerSignatures);
    }

    // update user's certifacte state
    // Only owner can update
    // Check state != 0
    // Check user exist
    // Check certificate exsit
    function updateCertState(bytes32 _userID, bytes32 _certHash, uint8 state) userExist(_userID) onlyOwner {
        require(state != 0);
        require(userID[_userID].certificates[_certHash].state != 0);
        userID[_userID].certificates[_certHash].state = state;
    }
    // Query certificate information using userID and certHash
    function queryCertificates(bytes32 _userID, bytes32 _certHash)  userExist(_userID) public {
        // certificate exsits
        if (userID[_userID].certificates[_certHash].state != 0) {
            Certificate certificate = userID[_userID].certificates[_certHash];
            logCert(_userID, certificate.certHash, certificate.provider, certificate.ownerSignatures);
        }        
        else // certificate doesn't exsit
            logMessage("Certificate not exist");
    }
    // Query certificate information using userID
    function queryCertificates(bytes32 _userID)  userExist(_userID) public {
        for(uint i; i < userID[_userID].certID.length; i++) {
            bytes32 _certHash = userID[_userID].certID[i];
            queryCertificates(_userID, _certHash);
        }
    }
}