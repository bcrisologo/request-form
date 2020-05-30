// controllers/RequestFormController.js
// Sets the CRUD operations for Form objects

// Setup =====================================================

var mongoose = require('mongoose');

// Reference to the Schema found in /models/RequestForm.js
var RequestForm = require("../models/RequestForm");

// MongoDB Atlas for xerox-form
// const url_atlas = 'mongodb+srv://yerin:T0rta_0530@bc-cloud-2-vvpqh.mongodb.net/test?retryWrites=true&w=majority';

// controller object for CRUD
var requestformController = {};

// CRUD functionss =====================================================

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
			res.redirect("/forms/success");
		}
	});
};

// SUCCESS page load after successful submission =====================================
requestformController.success = function(req, res) {
	res.render("../views/forms/success");
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
			// NEED TO ADD CONFIRMATION POP-UP HERE
			console.log("Entry Deleted!", req.body);
			res.redirect("/forms/");
		}
	});
};

// EDIT INFO PAGE => MUST DELETE THIS LATER
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

module.exports = requestformController;