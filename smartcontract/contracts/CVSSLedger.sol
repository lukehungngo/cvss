pragma solidity ^0.4.18;

contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);



  function Ownable() public {
    owner = msg.sender;
  }



  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }



  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}

contract CVSSLedger is Ownable {
    // State:  0 -> not initialize, 1 -> active, 2 -> inactive
    struct Certificate {
        uint8 state;
        bytes16 issuerPubkey;
        bytes16 certHash;
        bytes16 issuerSignature;
    }
    
    // Dictionary: userHash => List of user's certificates (Dictionary: certHash => Certificate)
    mapping (bytes16 => mapping(bytes16 => Certificate)) public mapCertificates;

    // Dictionary: issuerHash => issuerName
    mapping (bytes16 => bytes16) public mapIssuer;
    
    // Dictionary: userHash => userHash
    mapping (bytes16 => bytes16) public mapUser;
    
    event AddCertificate(bytes16 ownerHash, bytes16 userName, bytes16 issuerPubkey, bytes16 issuerSignature, bytes16 certHash);
    event RegisterIssuer(bytes16 issuerPubkey, bytes16 issuerName);
    event RegisterUser(bytes16 userHash, bytes16 userName);
    event LogMessage(string);
    event DeleteUser(bytes16 userHash);
    event DeleteIssuer(bytes16 issuerPubkey);
    modifier isUser(bytes16 userHash) {
        require(mapUser[userHash] != bytes16(0));
        _;
    }
    modifier isIssuer(bytes16 issuerPubkey) {
        require(mapIssuer[issuerPubkey] != bytes16(0));
        _;
    }  
    // Output:
    // Generate new instance of Certificate 
    // Put new instance to certificate list in mapCertificates
    function addCertificate(bytes16 userHash, bytes16 issuerPubkey, bytes16 issuerSignature, bytes16 certHash) public onlyOwner {
        Certificate memory certificate;
        certificate.state = 1;
        certificate.issuerPubkey = issuerPubkey;
        certificate.issuerSignature = issuerSignature;
        certificate.certHash = certHash;
        mapCertificates[userHash][certHash] = certificate;
        AddCertificate(userHash, mapUser[userHash], issuerPubkey, issuerSignature, certHash);
    }

    // Output: Put new key-value to mapIssuer
    function registerIssuer(bytes16 issuerPubkey, bytes16 issuerName) public onlyOwner {
        mapIssuer[issuerPubkey] = issuerName;
        RegisterIssuer(issuerPubkey, issuerName);
    }
    function deleteIssuer(bytes16 issuerPubkey) public onlyOwner {
        delete mapIssuer[issuerPubkey];
        DeleteIssuer(issuerPubkey);
    }
    // Output: map hash of user to hash of name
    function registerUser(bytes16 userHash, bytes16 userName) public onlyOwner{
        mapUser[userHash] = userName;
        RegisterUser(userHash, userName);
    }
    function deleteUser(bytes16 userHash) public onlyOwner {
        delete mapUser[userHash];
        DeleteUser(userHash);
    }

}  