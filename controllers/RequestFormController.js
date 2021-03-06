// controllers/RequestFormController.js
// Sets the CRUD operations for Form objects

// Setup =====================================================

var mongoose = require('mongoose');

// Reference to the Schema found in /models/RequestForm.js
var RequestForm = require("../models/RequestForm");

// controller object for CRUD
var requestformController = {};

// CRUD functions =====================================================

// READ all list of entries =====================================
requestformController.list = function(req, res) {
	RequestForm.find({}).exec(function(err, submissionform) {
		if (err) {
			console.log("Error: ", err);
		}
		else {
			res.render("../views/forms/list", { submissionform: submissionform });
		}
	});
};

// CREATE / Default request form =====================================
requestformController.create = function(req, res) {
	res.render("../views/index");
};

// CREATE + ADD + save a new entry function
requestformController.save = function(req, res) {
	var requestform = new RequestForm(req.body);

	requestform.save(function(err) {
		if(err) {
			console.log(err);
			res.render("../views/index");
		}
		else {
			console.log("Successfully created a new entry: ", req.body);
			res.redirect("/success");
		}
	});
};

// SUCCESS page load after successful submission =====================================
requestformController.success = function(req, res) {
	res.render("../views/success");
};

// DELETE a single form entry by ID function =====================================
requestformController.delete = function(req, res) {
	RequestForm.deleteOne({
		_id: req.params.id
	}, function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("Entry Deleted!");
			res.redirect("/forms");
		}
	});
};

// EDIT request form page =====================================
requestformController.edit = function(req, res) {
	RequestForm.findOne({ _id: req.params.id }).exec(function(err, submissionform) {
		if(err) {
			console.log("Error: ", err);
		}
		else {
			res.render("../views/forms/edit", { submissionform: submissionform });
		}
	});
};

// UPDATE database with the entries from /forms/edit.ejs =====================================
requestformController.update = function(req, res) {
	RequestForm.findByIdAndUpdate(req.params.id, {
		$set: {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			phone_number: req.body.phone_number,
			organization: req.body.organization,
			request: req.body.request
		}
	}, function(err, submissionform) {
		if(err) {
			console.log(err);
			res.render("../views/forms/edit", { submissionform: submissionform });
		}
		else {
			res.redirect("/forms");
		}
	});
};

// SEARCH database with the string entered on /forms/list.ejs =====================================
requestformController.search = function(req, res) {
	/* Reference the input value "query" using req.query */
	searchString = req.query.query;

	// RequestForm.find({ first_name: searchString }).exec(function(err, searchstring) {
	RequestForm.find( { $text: { $search: searchString } } ).exec(function(err, searchstring) {
		if(err) {
			console.log(err, "Not matches found from entry");
		}
		else {
			console.log("Search for: ", searchString);
			res.render("../views/forms/search", { searchstring: searchstring });
		}
	});
};

module.exports = requestformController;