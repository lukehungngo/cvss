pragma solidity ^0.4.18;

import './Ownable.sol';

/*
 * @title Issuer Contract 
 * @author CVSS
 */
 // "TTDT", "012345678", "08123123", "TTDT@gmail.com", "TTDT KIO8", "TTDT.com.vn"
contract Issuer is Ownable {
    string public name;
    string public taxNumber;
    string public mobilePhone;
    string public email;
    //string public issuerHash;
    string public addressPlace;
    string public website;
    //string public issuerType;
    
    event IssuerCreated(string name, string taxNumber, string mobilePhone, string email, string addressPlace, string website);
    
    constructor (string _name, string _taxNumber, string _mobilePhone, string _email, 
       string _addressPlace, string _website) public {
        name = _name;
        taxNumber = _taxNumber;
        mobilePhone = _mobilePhone;
        email = _email;
        addressPlace = _addressPlace;
        website = _website;
        emit IssuerCreated(_name, _taxNumber, _mobilePhone, _email, _addressPlace, _website);
    }
}