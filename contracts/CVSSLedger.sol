pragma solidity ^0.4.18;

import './Ownable.sol';

//"Hung", "0x12345678901234567890123456789012", 1, "0x09876543210987654321098765432109"
contract CVSSLedger is Ownable {
    string public name;
    string public taxNumber;
    string public mobilePhone;
    string public email;
    string public addressPlace;
    string public website;
    
    event IssuerCreated(string name, string addressPlace, string mobilePhone, string email, string website, string taxNumber);
    
    function createIssuer(string _name, string _taxNumber, string _mobilePhone, string _email, 
       string _addressPlace, string _website) 
    public 
    onlyOwner
       {
        name = _name;
        taxNumber = _taxNumber;
        mobilePhone = _mobilePhone;
        email = _email;
        addressPlace = _addressPlace;
        website = _website;
        emit IssuerCreated(_name,_addressPlace,_mobilePhone,_email, _website, _taxNumber);
    }
    mapping (bytes32 => mapping(uint8 => string)) public certificates;

    event Submit(string, string);

    function submit(string _name, bytes32 studentHash, uint8 course, string certHash) 
    public
    onlyOwner 
    {
        certificates[studentHash][course] = certHash;
        emit Submit(_name, certHash);
    }
    function queryHash(bytes32 studentHash, uint8 course)
    view
    public
    returns (string)
    {
        return certificates[studentHash][course];
    }
}