var express = require('express');
var router = express.Router();

var requestform = require("../controllers/RequestFormController.js");

// user.service.js controller file
var userService = require('../controllers/user.service.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* REDIRECT to Success page after successful submission */
router.get('/success', function(req, res) {
	requestform.success(req, res);
});

/* GET login page */
router.get('/login', function(req, res) {
	res.render('login');
});

router.post('/login', function(req, res, next) {
	userService.authenticate(req.body)
	//.then(user => res.json(user))
	.then( console.log(req.body), res.redirect('/forms'))
	.catch(next);
});

module.exports = router;
