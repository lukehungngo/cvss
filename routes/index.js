var express = require('express');
var utils = require('./utils.js')
var router = express.Router();
Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));
//var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/TOIiNmTE9VH8TIrRHCib'));

/* GET home page. */
router.get('/', function (req, res, next) {
	res.json('Nothing to response')
});
router.post('/getUserCertHash', function (req, response, next) {

	const dataRegister = utils.cvssledgerContract.methods.mapCertificates("0x5f31313232333334345f", "0x5f42433130315f").encodeABI()
	//const dataRegister = utils.cvssledgerContract.methods.registerUser(userHash, userName).encodeABI();
	privateKey = "0x599d0294d4dc6df206e004b7723c712c801e19efd8b9db553a95d39a3404e99a"
	utils.CreateAndBroadcastTx(privateKey, dataRegister,(txID)=> response.json(txID))
});
router.post('/registerIssuer', function (req, response, next) {
	let issuerPubkey = req.body.issuerPubkey.toString()
	console.log(req.body.issuerPubkey)
	let issuerName = req.body.issuerName.toString()
	console.log(req.body.issuerName)

	issuerPubkey = "0x" + utils.ascii_to_hexa(issuerPubkey)
	issuerName = "0x" + utils.ascii_to_hexa(issuerName)
	console.log(issuerPubkey + ' ' + typeof (issuerPubkey))
	console.log(issuerName + ' ' + typeof (issuerName))

	const dataRegister = utils.cvssledgerContract.methods.registerIssuer(issuerPubkey, issuerName).encodeABI();
	privateKey = "0x599d0294d4dc6df206e004b7723c712c801e19efd8b9db553a95d39a3404e99a"

	utils.CreateAndBroadcastTx(privateKey, dataRegister,(txID)=> response.json(txID))
});

router.post('/registerUser', function (req, response, next) {
	let userHash = req.body.userHash.toString()
	console.log(req.body.userHash)
	let userName = req.body.userName.toString()
	console.log(req.body.userName)

	userHash = "0x" + utils.ascii_to_hexa(userHash)
	userName = "0x" + utils.ascii_to_hexa(userName)
	console.log(userHash + ' ' + typeof (userHash))
	console.log(userName + ' ' + typeof (userName))

	const dataRegister = utils.cvssledgerContract.methods.registerUser(userHash, userName).encodeABI();
	privateKey = "0x599d0294d4dc6df206e004b7723c712c801e19efd8b9db553a95d39a3404e99a"

	utils.CreateAndBroadcastTx(privateKey, dataRegister,(txID)=> response.json(txID))
});
//function addCertificate(bytes16 userHash, bytes16 issuerPubkey, bytes16 issuerSignature, bytes16 certHash) public onlyOwner {
router.post('/addCertificate', function (req, response, next) {
	let userHash = req.body.userHash.toString()
	console.log(req.body.userHash)
	let issuerPubkey = req.body.issuerPubkey.toString()
	console.log(req.body.issuerPubkey)
	let issuerSignature = req.body.issuerSignature.toString()
	console.log(req.body.issuerSignature)
	let certHash = req.body.certHash.toString()
	console.log(req.body.certHash)

	userHash = "0x" + utils.ascii_to_hexa(userHash)
	issuerPubkey = "0x" + utils.ascii_to_hexa(issuerPubkey)
	issuerSignature = "0x" + utils.ascii_to_hexa(issuerSignature)
	certHash = "0x" + utils.ascii_to_hexa(certHash)

	console.log(userHash + ' ' + typeof (userHash))
	console.log(issuerPubkey + ' ' + typeof (issuerPubkey))
	console.log(issuerSignature + ' ' + typeof (issuerSignature))
	console.log(certHash + ' ' + typeof (certHash))

	const dataRegister = utils.cvssledgerContract.methods.addCertificate(userHash, issuerPubkey, issuerSignature, certHash).encodeABI();
	privateKey = "0x599d0294d4dc6df206e004b7723c712c801e19efd8b9db553a95d39a3404e99a"
	utils.CreateAndBroadcastTx(privateKey, dataRegister,(txID)=> response.json(txID))
	//response.json(utils.CreateAndBroadcastTx(privateKey, dataRegister))
});
module.exports = router;
