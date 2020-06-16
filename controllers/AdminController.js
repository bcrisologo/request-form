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

	// Old_password variable reference
	oldPassword = req.body.old_password;
	newPassword = req.body.new_password;

	AdminModel.findOne({ username: 'admin' })
	.then(function(adminuser) {
		if(adminuser) {
			console.log(oldPassword, newPassword)
			adminuser.changePassword(oldPassword, newPassword, function(err) {
				if(err) {
					if(err.name === 'IncorrectPasswordError') {
						//res.json({ message: 'Incorrect password' }); // Return error
						console.log("Incorrect old password entry");
						res.redirect("/forms/adminsettings")
 					}
 					else {
 						res.json({ message: 'Something went wrong!! Please try again after sometimes.' });
 					}
				}
				else {
					console.log("Success in password change!")
					// Need to redirect to a success password change page
					res.redirect("/forms/adminsettings");
				}
			});
		}
		else {
			res.status(500).json({message: 'This user does not exist'});
		}
	});

	/*  // This setup works is without old password verification
	AdminModel.findOneAndUpdate({ username: 'admin' })
	.then(function(adminuser) {
		if(adminuser) {
			adminuser.setPassword(req.body.new_password, function() {
				adminuser.save();
				console.log("Successful password change!");
				res.redirect("/forms/adminsettings");
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