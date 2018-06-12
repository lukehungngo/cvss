pragma solidity ^0.4.18;

import './Ownable.sol';

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