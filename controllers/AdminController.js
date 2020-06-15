// controllers/AdminController.js
// For updating admin username and password

var mongoose = require('mongoose');
var AdminModel = require("../models/AdminModel.js");		// Schema for AdminModel

var adminController = {};

// CRUD functions =====================================================

// EDIT admin page render =============================
adminController.edit = function(req, res) {
	AdminModel.findOne({ _id: req.params.id }).exec(function(err, adminuser) {
		if(err) {
			console.log("Error: ", err)
		}
		else {
			res.render("../views/forms/adminsettings", { adminuser: adminuser });
		}
	});
};

// UPDATE admin username and password =============================
adminController.update = function(req, res) {
	AdminModel.findOneAndUpdate({ username: 'admin'}, {
		// NEED TO CHANGE THIS TO UPDATE SALT AND HASH FOR PASSWORD
		// ALL THIS DOES IS INSERT NEW PASSOWRD
		$set: {
			password: req.body.password
		}
	}, function(err, adminuser) {
		if(err) {
			console.log("Error: ", err);
			res.render("../views/forms/adminsettings", { adminuser: adminuser });
		}
		else {
			res.redirect("/forms");
		}
	});
};

module.exports = adminController;