Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));
var contract = require('./contract.js')
exports.ascii_to_hexa = function (str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n++) {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join('');
}


// Contract address
var CONTRACT_ADDRESS = contract.cvssledgerAddress

var cvssledgerContractABI = contract.cvssledgerContractABI
// Create Smart Contract using address (in Ethereum Blockhain) and ABI
exports.cvssledgerContract = new web3.eth.Contract(cvssledgerContractABI, CONTRACT_ADDRESS)

exports.CreateAndBroadcastTx = function (privateKey, dataRegister, callback)
{
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
			
			//broadcast signed transaction
			web3.eth.sendSignedTransaction(signedTransaction, (err, res) => {

				console.log(err);

				console.log(res);
				//callback('https://ropsten.etherscan.io/tx/' + res)
				callback(res)
				return res;
			});
		}
	);
}
exports.QueryTransactionReceipt = function (txID)
{
	return web3.eth.getTransactionReceipt(txID,function(err,res){
		console.log(err)

		console.log(res)
		return res
	})
}

