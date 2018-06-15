var express = require('express');
var utils = require('./utils.js')
var router = express.Router();
Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));
var fs = require('fs');
//var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/TOIiNmTE9VH8TIrRHCib'));
const privateKey = "0x88fffae7b718ab21f4d79acf7602e8281f7b0d16ca7c17b34a8609d73cb7fb44"

var issuerHash = "0x4525570a5c0aeec0bd4b2b46213f31534c7af74b55529f78c05946d9fcb24b98"
/* GET home page. */
router.get('/', function (req, res, next) {
	res.json('Nothing to response')
});
router.post('/queryCertificate', function (req, response, next) {
	let studentHash = req.body.studentHash.toString()
	console.log(req.body.studentHash)
	let course = req.body.course.toString()
	console.log(req.body.course)
	course = parseInt(course)
	utils.cvssledgerContract.methods.queryHash(studentHash, course).call(function(err,res){
		console.log(err)
		response.json(res)
	})
})
router.post('/addInformation/', function (req, response, next) {
	  //TBD
})
router.post('/registerIssuer', function (req, response, next) {
	let name = req.body.name.toString()
	console.log(req.body.name)
	let address = req.body.address.toString()
	console.log(req.body.address)
	let phone = req.body.phone.toString()
	console.log(req.body.phone)
	let website = req.body.website.toString()
	console.log(req.body.website)
	let email = req.body.email.toString()
	console.log(req.body.email)
	let taxNumber = req.body.taxNumber.toString()
	console.log(req.body.taxNumber)

	issuerHash = web3.utils.sha3(name, address, phone, website, email, taxNumber)
	console.log("IssuerHash: ", issuerHash)
	
	// name = "0x" + utils.ascii_to_hexa(name)
	// address = "0x" + utils.ascii_to_hexa(address)
	// phone = "0x" + utils.ascii_to_hexa(phone)
	// website = "0x" + utils.ascii_to_hexa(website)
	// email = "0x" + utils.ascii_to_hexa(email)
	// taxNumber = "0x" + utils.ascii_to_hexa(taxNumber)

	// console.log(name + ' ' + typeof (name))
	// console.log(address + ' ' + typeof (address))
	// console.log(phone + ' ' + typeof (phone))
	// console.log(website + ' ' + typeof (website))
	// console.log(email + ' ' + typeof (email))
	// console.log(taxNumber + ' ' + typeof (taxNumber))

	const dataRegister = utils.cvssledgerContract.methods.createIssuer(name, address, phone, website, email, taxNumber).encodeABI();
	utils.CreateAndBroadcastTx(privateKey, dataRegister,(txID)=> response.json(txID))
	//response.json(utils.CreateAndBroadcastTx(privateKey, dataRegister))
});
router.post('/addCertificate', function (req, response, next) {
	let name = req.body.name.toString()
	console.log(req.body.name)
	let studentHash = req.body.studentHash.toString()
	console.log(req.body.studentHash)
	let course = req.body.course.toString()
	console.log(req.body.course)
	let certHash = req.body.certHash.toString()
	console.log(req.body.certHash)

	//name = "0x" + utils.ascii_to_hexa(name)
	// studentHash = "0x" + utils.ascii_to_hexa(studentHash)
	course = parseInt(course)
	// certHash = "0x" + utils.ascii_to_hexa(certHash)

	console.log(name + ' ' + typeof (name))
	console.log(studentHash + ' ' + typeof (studentHash))
	console.log(course + ' ' + typeof (course))
	console.log(certHash + ' ' + typeof (certHash))

	const dataRegister = utils.cvssledgerContract.methods.submit(name, studentHash, course, certHash).encodeABI();
	utils.CreateAndBroadcastTx(privateKey, dataRegister,(txID)=> response.json(txID))
	//response.json(utils.CreateAndBroadcastTx(privateKey, dataRegister))
});
router.post('/addAllCertificate', function (req, response, next) {
	var obj;
	await fs.readFile('data/student.json', 'utf8', function (err, data) {
	if (err) throw err;
	obj = JSON.parse(data);
	});
	console.log(obj)
	
})
module.exports = router;
