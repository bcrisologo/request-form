var express = require('express');
var router = express.Router();

var requestform = require("../controllers/RequestFormController.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* REDIRECT to Success page after successful submission */
router.get('/success', function(req, res) {
	requestform.success(req, res);
});

module.exports = router;
