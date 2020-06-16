// routes/adminsettings.js

var express = require('express');
var router = express.Router();

var admincontroller = require("../controllers/AdminController.js");

// Middleware for ensuring connection when logged in ========================
var connectEnsureLogin = require('connect-ensure-login');

/* ROUTES Point =========================================== */

// GET Admin settings page
router.get('/', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	admincontroller.edit(req, res);
});

// POST Admin settings page for update
router.post('/', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	admincontroller.update(req, res);
});

// GET Admin password change SUCCESS page
router.get('/success', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	admincontroller.success(req, res);
});

module.exports = router;