var express = require('express');
var utils = require('./utils.js')
var router = express.Router();
Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('abc')
});

router.post('/', function(req, response, next) {
  console.log(req.body.name)

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
const CONTRACT_ADDRESS = "0x14fed7ba85f235c468314a67bb590212411ff026"
const ONWER_ADDRESS = "0xbfb0574FE1ea0AF7035c31D1D023E1Ae72583c2f"

cvssledgerContract = new web3.eth.Contract(cvssledgerContractABI, CONTRACT_ADDRESS)

var testData = utils.ascii_to_hexa('Hung')
console.log(testData)
const dataRegister = cvssledgerContract.methods.registerIssuer("0x1234567890123456","0x48756e67").encodeABI();
privateKey = "0x599d0294d4dc6df206e004b7723c712c801e19efd8b9db553a95d39a3404e99a"

test(privateKey,dataRegister)
function test(privateKey, dataRegister) {
	return web3.eth.accounts.signTransaction(
		{
		  data: dataRegister,
		  gas: 2000000,
		  to: CONTRACT_ADDRESS
		},
		privateKey,
		function(err, res) {
      if (err) return Promise.reject(err);
      
      console.log(err);

      console.log(res)
	
		  const signedTransaction = res.rawTransaction;
		  web3.eth.sendSignedTransaction(signedTransaction, (err, res) => {
      console.log(err);
      console.log(res);

      response.json(res)
      });
		}
	  );
  };
function addCertificate(ownerHash, issuerPubkey, issuerSignature, certHash){
    ownerHash = ownerHash.toString()
    issuerPubkey = issuerPubkey.toString()
    issuerSignature = issuerSignature.toString()
    certHash = certHash.toString()
    cvssledgerContract.addCertificate.sendTransaction(ownerHash,issuerPubkey,issuerSignature,certHash,{
        from:"0xbfb0574FE1ea0AF7035c31D1D023E1Ae72583c2f",
        gas:4000000},function (error, result){ //get callback from function which is your transaction key
            if(!error){
                console.log(result);
            } else{
                console.log(error);
            }
    });
}
});

module.exports = router;
