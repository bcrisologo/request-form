// controllers/AdminController.js
// For updating admin username and password

var mongoose = require('mongoose');
var AdminModel = require("../models/AdminModel.js");		// Schema for AdminModel

var adminController = {};

// CRUD functions =====================================================

// EDIT admin page render =============================
adminController.edit = function(req, res) {
	AdminModel.findOne({ username: 'admin' }).exec(function(err, adminuser) {
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

	AdminModel.findOneAndUpdate({ username: 'admin' })
	.then(function(adminuser) {
		if(adminuser) {
			
		}
	})

	/*  // THIS WORKS!!! But need verification of current password before changing it
	AdminModel.findOneAndUpdate({ username: 'admin' })
	.then(function(adminuser) {
		if(adminuser) {
			adminuser.setPassword(req.body.password, function() {
				adminuser.save();
				console.log("Successful password change!");
				res.render("../views/forms");
			});
		}
		else {
			res.status(500).json({message: 'This user does not exist'});
		}
	}, function(err) {
		console.error(err);
	})
	*/
};

module.exports = adminController;