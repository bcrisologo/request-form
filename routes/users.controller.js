// routes/users.controller.js

var express = require('express');
var router = express.Router();

// route for the user.service.js
// contains the hardcoded admin user
var adminService = require('../controllers/user.service.js');

// routes ==========================

router.post('/login', function(req, res, next) {
	adminService.authenticate(req.body)
	.then(user => res.json(user))
	.catch(next);
});

router.get('/forms', function(req, res, next) {
	adminService.getAll()
	.then(users => res.json(users))
	.catch(next);
});

module.exports = adminAuthenticate;