pragma solidity ^0.4.18;

import './Ownable.sol';

//"Hung", "0x12345678901234567890123456789012", 1, "0x09876543210987654321098765432109"

contract CVSSLedger is Ownable {
    mapping (bytes32 => mapping(uint8 => string)) public certificates;

    event Submit(string, string);

    function submit(string name, bytes32 studentHash, uint8 course, string certHash) 
    public
    onlyOwner 
    {
        certificates[studentHash][course] = certHash;
        emit Submit(name, certHash);
    }
    function queryHash(bytes32 studentHash, uint8 course)
    view
    public
    returns (string)
    {
        return certificates[studentHash][course];
    }
}