var express = require('express');
var utils = require('../routes/utils.js')
var router = express.Router();
Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));
var fs = require('fs');
const issuerHash = "0x4525570a5c0aeec0bd4b2b46213f31534c7af74b55529f78c05946d9fcb24b98"
var in_obj = JSON.parse(fs.readFileSync('../data/student-input.json', 'utf8'));
var nonce = web3.eth.getTransactionCount("0x5Fdc5Fd99B832B78b8583aA1839f72aa6C00d901")

const privateKey = "0x88fffae7b718ab21f4d79acf7602e8281f7b0d16ca7c17b34a8609d73cb7fb44"
writeTransaction = function(_certId, _txId, _studentHash, _course){
	fs.readFile('../data/student-output.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(err);
		} else {
		out_obj = JSON.parse(data); //now it an object
		out_obj.push({certId: _certId, txId:_txId, studentHash: _studentHash, course: _course}); //add some data
		json = JSON.stringify(out_obj); //convert it back to json
		fs.writeFile('../data/student-output.json', json, 'utf8'); // write it back 
	}});
}

createTransaction = function (index, nonce){
	var student = in_obj[index]
	var studentHash = web3.utils.sha3(student.B, student.C)
	var certHash = web3.utils.sha3(issuerHash, studentHash, student.D, student.E, student.F).toString()
	var course
	if(student.E === "Phát triển ứng dụng trên nền tảng Blockchain")
		course = 2
	else
		course = 1
	var certificate = student.G.split('_')
	// studentHash = "0x" + utils.ascii_to_hexa(studentHash)
	console.log("student.B", student.B, typeof(student.B))
	console.log("studentHash", studentHash, typeof(studentHash))
	console.log("course", course, typeof(course))
	console.log("certHash", certHash, typeof(certHash))
	console.log("certificate", certificate)
	const dataRegister = utils.cvssledgerContract.methods.submit(student.B, studentHash, course, certHash).encodeABI();
	utils.CreateAndBroadcastTxWithNonce(privateKey, dataRegister, nonce,(txID)=> {
		writeTransaction(certificate[1], txID, studentHash, course )
	})
}
var index = 0
nonce.then(result => {
	setInterval(() => {
		createTransaction(index, result)
		index += 1
		result += 1
		console.log("nonce", result)
		console.log("index", index)
	}, 5000);
})
