pragma solidity ^0.4.18;

import './Ownable.sol';

/*
 * @title Issuer Contract 
 * @author CVSS
 */
contract Issuer is Ownable {
    string public name;
    string public taxNumber;
    string public mobilePhone;
    string public email;
    string public issuerHash;
    string public addressPlace;
    string public website;
    string public issuerType;
    
    event IssuerCreated(string name, string taxNumber, string mobilePhone, string email, string issuerHash);
    event MoreInformationAdded(string addressPlace, string website, string issuerType);
    
    constructor (string _name, string _taxNumber, string _mobilePhone, string _email, 
       string _issuerHash) public {
        name = _name;
        taxNumber = _taxNumber;
        mobilePhone = _mobilePhone;
        email = _email;
        issuerHash = _issuerHash;
        emit IssuerCreated(_name, _taxNumber, _mobilePhone, _email, _issuerHash);
    }
    function addMoreInformation(string _addressPlace, string _website, string _issuerType)
    public
    onlyOwner
    {
        addressPlace = _addressPlace;
        website = _website;
        issuerType = _issuerType;
        emit MoreInformationAdded(_addressPlace, _website, _issuerType);
    }
    
}
/*
 * @title Student Contract 
 * @author CVSS
 */
contract Student is Ownable {
    // State: 1 -> active, 2 -> inactive
    struct Certificate {
        uint8 state;
        address issuerAddress;
        bytes32 certHash;
    }
     // Dictionary: userHash => List of user's certificates (Dictionary: certHash => Certificate)
    mapping(bytes32 => Certificate) public mapCertificates;
    bytes32[] public certificatesList;
    event CertificateAdded(address issuerAddress, bytes32 certHash);
    event CertificateDeactivated(bytes32 certHash);
    event CertificateActivated(bytes32 certHash);
    event CertificateDeleted(bytes32 certHash);
    modifier isAllow(bytes32 certHash)
    {
        require(msg.sender == owner || msg.sender == mapCertificates[certHash].issuerAddress);
        _;
    }
    constructor () public {}
    function addCertificate(address issuerAddress, bytes32 certHash) 
    public 
    {
        Certificate memory certificate;
        certificate.state = 1;
        certificate.issuerAddress = issuerAddress;
        certificate.certHash = certHash;
        mapCertificates[certHash] = certificate;
        certificatesList.push(certHash);
        emit CertificateAdded(issuerAddress, certHash);
    }
    function deactivateCertificate(bytes32 certHash)
    public
    isAllow(certHash)
    {
        require(mapCertificates[certHash].state == 1);
        mapCertificates[certHash].state = 2;
        emit CertificateDeactivated(certHash);
    }
    function activateCertificate(bytes32 certHash)
    public
    {
        require(mapCertificates[certHash].issuerAddress == msg.sender);
        require(mapCertificates[certHash].state == 2);
        mapCertificates[certHash].state = 1;
        emit CertificateActivated(certHash);
    }
    function deleteCertificate(bytes32 certHash)
    public
    isAllow(certHash)
    {
        delete mapCertificates[certHash];
        for(uint i = 0; i < certificatesList.length; i++){
            if (certificatesList[i] == certHash){
                delete certificatesList[i];
                break;
            }
        }
        emit CertificateDeleted(certHash);
    }
    function viewCertificates(bytes32 certHash) 
    public
    view
    returns (uint, address, bytes32)
    {
        return (mapCertificates[certHash].state, mapCertificates[certHash].issuerAddress, certHash);
    }
}
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