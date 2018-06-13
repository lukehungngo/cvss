var express = require('express');
var utils = require('./utils.js')
var router = express.Router();
Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));
//var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/TOIiNmTE9VH8TIrRHCib'));
const privateKey = "0x88fffae7b718ab21f4d79acf7602e8281f7b0d16ca7c17b34a8609d73cb7fb44"


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
router.post('/test', function (req, response, next) {
})
module.exports = router;
