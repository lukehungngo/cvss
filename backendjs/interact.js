Web3 = require('web3')

var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));
//var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
//var web3 = new Web3(Web3.currentProvider);
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
				"type": "bytes32"
			},
			{
				"name": "issuerPubkey",
				"type": "bytes32"
			},
			{
				"name": "issuerSignature",
				"type": "bytes"
			},
			{
				"name": "certHash",
				"type": "bytes32"
			}
		],
		"name": "addCertificate",
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
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "userName",
				"type": "bytes32"
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
				"name": "ownerHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "userName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "issuerPubkey",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "issuerSignature",
				"type": "bytes"
			},
			{
				"indexed": false,
				"name": "certHash",
				"type": "bytes32"
			}
		],
		"name": "AddCertificate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "issuerPubkey",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "issuerName",
				"type": "bytes32"
			}
		],
		"name": "RegisterIssuer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "issuerPubkey",
				"type": "bytes32"
			},
			{
				"name": "issuerName",
				"type": "bytes32"
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
				"type": "bytes32"
			},
			{
				"name": "userName",
				"type": "bytes32"
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
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
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
				"type": "bytes32"
			},
			{
				"name": "certHash",
				"type": "bytes32"
			},
			{
				"name": "issuerSignature",
				"type": "bytes"
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
				"type": "bytes32"
			}
		],
		"name": "mapIssuer",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
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
				"type": "bytes32"
			}
		],
		"name": "mapUser",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
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
const CONTRACTADDRESS = "0xe9045df577e7e8aea2e0ca7b2d9f507d72a8d14f"
const ONWERADDRESS = "0xbfb0574FE1ea0AF7035c31D1D023E1Ae72583c2f"

cvssledgerContract = new web3.eth.Contract(cvssledgerContractABI, CONTRACTADDRESS)
// console.log(cvssledgerContract.registerIssuer.sendTransaction())


// function registerIssuer(key,name){
//     key = key.toString()
//     name = name.toString()
// 	cvssledgerContract.registerIssuer.sendTransaction(key,name,
// 	{
//     	from:"0xbfb0574FE1ea0AF7035c31D1D023E1Ae72583c2f",
// 		gas:4000000
// 	},function (error, result){ //get callback from function which is your transaction key
//         if(!error){
//             console.log(result);
//         } else{
//             console.log(error);
//         }
//     });
// }

const dataRegister = cvssledgerContract.methods.registerIssuer("0x12345678901234567890123456789002","0x12345678901234567890123456789002").encodeABI();
//console.log(dataRegister)
privateKey = "0x599d0294d4dc6df206e004b7723c712c801e19efd8b9db553a95d39a3404e99a"
test(privateKey,dataRegister)
function test(privateKey, dataRegister) {
	return web3.eth.accounts.signTransaction(
		{
		  data: dataRegister,
		  gas: 2000000,
		  to: CONTRACTADDRESS
		},
		privateKey,
		function(err, res) {
		  if (err) return Promise.reject(err);
	
		  const signedTransaction = res.rawTransaction;
		  return web3.eth.sendSignedTransaction(signedTransaction);
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
//registerIssuer(1,"Hung")