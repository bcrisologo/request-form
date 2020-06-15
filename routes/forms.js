// routes/forms.js

// Setup =====================================================

var express = require('express');
var router = express.Router();

var requestform = require("../controllers/RequestFormController.js");

/*
// Passport setup =======================
var passport = require('passport');

router.use(passport.initialize());
router.use(passport.session());

// Admin model loading =======================
var AdminModel = require("../models/AdminModel.js");

// Passport Local Authentication =======================
passport.use(AdminModel.createStrategy());

passport.serializeUser(AdminModel.serializeUser(function(user, done) {
	done(null, user._id);
}));
passport.deserializeUser(AdminModel.deserializeUser(function(id, done) {
	AdminModel.findById(id, function(err, user) {
		done(err, user);
	});
}));
*/

// Middleware for ensuring connection when logged in ========================
var connectEnsureLogin = require('connect-ensure-login');


// CRUD functions reroute =====================================================

// GET login page.  ***ENTRY POINT*** ======================= 
/*
router.get('/login', function(req, res) {
	// res.render('login');
	AdminModel.findOne({ username: 'tester' }, async function(err, user) {
		// Error in accessing login
		if(err) {
			console.log('Error in loading: ', err);
		} 

		// Checks if admin account already exists
		if(user) {
			console.log('Admin already exists');
		} else {
			// Creates user admin if it doesn't exist
			// Still a bug that keeps checking this section after first server startup
		}
		res.render('login');
	});
});
*/

// POST for login page
/*router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if(err) {
			return next(err);
		}

		if(!user) {
			return res.redirect('/login?info=' + info);
		}

		req.logIn(user, function(err) {
			if(err) {
				return next(err);
			}
			return res.redirect('/');
		});
	})(req, res, next);
});

// GET back to login page after LOGOUT 
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});
*/

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