var express = require('express');
var router = express.Router();

var app = require('../app');

//check hak akses dan role nya
var auth = function(req, res, next){
	if (! (req.isAuthenticated() && req.user.rol==="101"))  	
		res.sendStatus(401);		
	else
		next();
};

/* GET rank listing. */
router.get('/', function(req, res, next) {	
	
	res.send([
	          {nama: "Mohamad", nilai: "100"}, 
	          {nama: "Nurkamal", nilai: "90"},
	          {nama: "Nur", nilai: "92"},
	          {nama: "kamal", nilai: "70"},
	          {nama: "M", nilai: "90"},
	          {nama: "mahasiswa", nilai: "100"}
	]);  
});

module.exports = router;