var express = require('express');
Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs')); // adds Async() versions that return promises

exports.ascii_to_hexa = function (str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n++) {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join('');
}

// Contract ABI
// Obtain after deploy Smart Contract to Ethereum
var cvssledgerContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "userHash",
				"type": "bytes16"
			},
			{
				"name": "issuerPubkey",
				"type": "bytes16"
			},
			{
				"name": "issuerSignature",
				"type": "bytes16"
			},
			{
				"name": "certHash",
				"type": "bytes16"
			}
		],
		"name": "addCertificate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "issuerPubkey",
				"type": "bytes16"
			}
		],
		"name": "deleteIssuer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "issuerPubkey",
				"type": "bytes16"
			}
		],
		"name": "DeleteIssuer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "userHash",
				"type": "bytes16"
			}
		],
		"name": "DeleteUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "string"
			}
		],
		"name": "LogMessage",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "userHash",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "userName",
				"type": "bytes16"
			}
		],
		"name": "RegisterUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "issuerPubkey",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "issuerName",
				"type": "bytes16"
			}
		],
		"name": "RegisterIssuer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "userHash",
				"type": "bytes16"
			}
		],
		"name": "deleteUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ownerHash",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "userName",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "issuerPubkey",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "issuerSignature",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "certHash",
				"type": "bytes16"
			}
		],
		"name": "AddCertificate",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "issuerPubkey",
				"type": "bytes16"
			},
			{
				"name": "issuerName",
				"type": "bytes16"
			}
		],
		"name": "registerIssuer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "userHash",
				"type": "bytes16"
			},
			{
				"name": "userName",
				"type": "bytes16"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes16"
			},
			{
				"name": "",
				"type": "bytes16"
			}
		],
		"name": "mapCertificates",
		"outputs": [
			{
				"name": "state",
				"type": "uint8"
			},
			{
				"name": "issuerPubkey",
				"type": "bytes16"
			},
			{
				"name": "certHash",
				"type": "bytes16"
			},
			{
				"name": "issuerSignature",
				"type": "bytes16"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes16"
			}
		],
		"name": "mapIssuer",
		"outputs": [
			{
				"name": "",
				"type": "bytes16"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes16"
			}
		],
		"name": "mapUser",
		"outputs": [
			{
				"name": "",
				"type": "bytes16"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
// Contract address
var CONTRACT_ADDRESS = "0x14fed7ba85f235c468314a67bb590212411ff026"
// Create Smart Contract using address (in Ethereum Blockhain) and ABI
exports.cvssledgerContract = new web3.eth.Contract(cvssledgerContractABI, CONTRACT_ADDRESS)

// Function
// Create transaction with owner private key and data to broadcast
// respone transaction hash if success
// Input: 
//private key of EOA 
//data want to broadcast
exports.CreateAndBroadcastTx = function (privateKey, dataRegister, callback)
{
	//var resLink = 'https://ropsten.etherscan.io/tx/'
	// Create transaction
	// Sign transaction with data, gas, receipient address, owner's privatekey
	return web3.eth.accounts.signTransaction(
		{
			data: dataRegister,
			gas: 300000,
			to: CONTRACT_ADDRESS
		},
		privateKey,
		function (err, res) {
			if (err) return Promise.reject(err);

			console.log(err);

			console.log(res)

			//get raw transaction
			const signedTransaction = res.rawTransaction;
			callback(signedTransaction)
			//broadcast signed transaction
			return web3.eth.sendSignedTransaction(signedTransaction, (err, res) => {

				console.log(err);

				console.log(res);
			});
		}
	);
}
exports.QueryTransaction = function (userHash, certHash)
{
	
}
function addCertificate(ownerHash, issuerPubkey, issuerSignature, certHash) {
	ownerHash = ownerHash.toString()
	issuerPubkey = issuerPubkey.toString()
	issuerSignature = issuerSignature.toString()
	certHash = certHash.toString()
	cvssledgerContract.addCertificate.sendTransaction(ownerHash, issuerPubkey, issuerSignature, certHash, {
		from: "0xbfb0574FE1ea0AF7035c31D1D023E1Ae72583c2f",
		gas: 4000000
	}, function (error, result) { //get callback from function which is your transaction key
		if (!error) {
			console.log(result);
		} else {
			console.log(error);
		}
	});
}
