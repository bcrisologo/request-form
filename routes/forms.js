// routes/forms.js

// Setup =====================================================

var express = require('express');
var router = express.Router();

var requestform = require("../controllers/RequestFormController.js");

// Middleware for ensuring connection when logged in ========================
var connectEnsureLogin = require('connect-ensure-login');


// CRUD functions reroute =====================================================

// GET all forms =====================================================
// Redirecting to list.ejs per Controller file		
router.get('/', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	requestform.list(req,res);
});

// SAVE submitted form =======================
router.post('/save', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	requestform.save(req, res);
});

// SUCCESS page loads after submitting form =======================
/*router.get('/success', function(req, res) {
	requestform.success(req, res);
});*/

// Delete a submitted request =======================
router.post('/delete/:id', connectEnsureLogin.ensureLoggedIn(), function(req, res, next) {
	requestform.delete(req, res);
});

// Edit a submitted request =======================
router.get('/edit/:id', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	requestform.edit(req, res);
});

// Update a submitted request =======================
router.post('/update/:id', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	requestform.update(req, res);
});

// Search function from submitted requests =======================
// Directs to search page view file
router.get('/search', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
	requestform.search(req, res);
});

module.exports = router;