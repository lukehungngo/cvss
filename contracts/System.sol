pragma solidity ^0.4.18;

import './Ownable.sol';
/*
 * @title System contract
 * @author CVSS
 */
contract System is Ownable{
    address[] public issuerAddresses;
    // mapping address of issuerEOA to issuerContract
    mapping(address => address) mapIssuer;

    address[] public studentAddresses;
    // mapping address of student to studentContract
    mapping(address => address) mapStudent;
    constructor () public {}
    event IssuerAdded(address issuerAddress);
    event IssuerContractChanged(address issuerAddress, address oldIssuerContract, address newIssuerContract);
    event StudentAdded(address studentAddress);
    event StudentContractChanged(address studentAddress, address oldStudentContract, address newStudentContract);
    function addIssuer(address issuerAddress)
    public
    onlyOwner
    {
        issuerAddresses.push(issuerAddress);
        emit IssuerAdded(issuerAddress);
        emit IssuerContractChanged(issuerAddress, address(0), address(0));
    }
       
    function changeIssuerContract(address issuerAddress, address issuerContract)
    public
    onlyOwner
    {
        address oldIssuerContract = mapIssuer[issuerAddress];
        mapIssuer[issuerAddress] = issuerContract;
        emit IssuerContractChanged(issuerAddress, oldIssuerContract, issuerContract);
    }

    function addStudent(address studentAddress)
    public
    onlyOwner
    {
        studentAddresses.push(studentAddress);
        emit StudentAdded(studentAddress);
        emit StudentContractChanged(studentAddress, address(0), address(0));
    }
       
    function changeStudentContract(address studentAddress, address studentContract)
    public
    onlyOwner
    {
        address oldStudentAddress = mapStudent[studentAddress];
        mapStudent[studentAddress] = studentContract;
        emit StudentContractChanged(studentAddress, oldStudentAddress, studentContract);
    }
    
}