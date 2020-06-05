// routes/forms.js

// Setup =====================================================

var express = require('express');
var router = express.Router();

var requestform = require("../controllers/RequestFormController.js");

// CRUD functions reroute =====================================================

// GET all forms =======================
// WORKS redirecting to list.ejs per Controller file		
router.get('/', function(req, res) {
	requestform.list(req,res);
});

// SAVE submitted form =======================
router.post('/save', function(req, res) {
	requestform.save(req, res);
});

// SUCCESS page loads after submitting form =======================
router.get('/success', function(req, res) {
	requestform.success(req, res);
});

// Delete a submitted request =======================
router.post('/delete/:id', function(req, res, next) {
	requestform.delete(req, res);
});

// Edit a submitted request =======================
router.get('/edit/:id', function(req, res) {
	requestform.edit(req, res);
});

// Update a submitted request =======================
router.post('/update/:id', function(req, res) {
	requestform.update(req, res);
});

// Search function from submitted requests =======================
router.get('/search', function(req, res) {
	requestform.search(req, res);
});


module.exports = router;