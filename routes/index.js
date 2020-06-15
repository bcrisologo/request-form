var express = require('express');
var router = express.Router();

var requestform = require("../controllers/RequestFormController.js");

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

// Middleware for ensuring connection when logged in ========================
var connectEnsureLogin = require('connect-ensure-login');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* REDIRECT to Success page after successful submission */
router.get('/success', function(req, res) {
	requestform.success(req, res);
});

/* GET login page */
/*router.get('/login', function(req, res) {
	res.render('login');
});*/

// GET login page.  ***ENTRY POINT*** ======================= 
router.get('/login', function(req, res) {
	// res.render('login');
	AdminModel.findOne({ username: 'admin' }, async function(err, user) {
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
			await AdminModel.register({username: 'admin', active: false}, 'testing');
			console.log("Created Admin");
		}
		res.render('login');
	});
});

// POST for login page
router.post('/login', function(req, res, next) {
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
			return res.redirect('/forms');
		});
	})(req, res, next);
});

// GET back to login page after LOGOUT 
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});

module.exports = router;
