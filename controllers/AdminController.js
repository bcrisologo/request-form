// controllers/AdminController.js
// For updating admin username and password

var mongoose = require('mongoose');
var AdminModel = require("../models/AdminModel.js");		// Schema for AdminModel

var adminController = {};

// CRUD functions =====================================================

// EDIT admin page render =============================
adminController.edit = function(req, res) {
	AdminModel.findOne({ _id: req.params.id }).exec(function(err, user) {
		if(err) {
			console.log("Error: ", err)
		}
		else {
			res.render("../views/forms/adminsettings", { user: user });
		}
	});
};

// UPDATE admin username and password =============================
adminController.update = function(req, res) {
	AdminModel.findByIdAndUpdate(req.params.id, {
		$set: {
			username: req.body.username,
			password: req.body.password
		}
	}, function(err, user) {
		if(err) {
			console.log("Error: ", err);
			res.render("../views/forms/adminsettings", { user: user });
		}
		else {
			res.redirect("/forms");
		}
	});
};

module.exports = adminController;