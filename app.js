var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Section for authentication modules required =============================
require('rootpath')();
var cors = require('cors');
var jwt = require('_helpers/jwt');
var errorHandler = require('_helpers/error-handler');

// MongoDB for local with db name of requestform =============================
const url = 'mongodb://localhost/requestform';

// To remove deprecation warning for findByIdAndUpdate and ensureIndex
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Establishing connection using Mongoose =============================
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connection to MongoDB Atlas established'))
  .catch((error) => console.error(error));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forms = require('./routes/forms');		// For routing submitted forms

var login = require('./routes/users.controller');	// Test for authentication

var app = express();

// view engine setup =============================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Section for using authentication modules =============================
app.use(cors());
app.use(jwt());				// use JWT auth to secure the api
app.use('/login', login);	// test authentication

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forms', forms);			// For using forms.js route

app.use(errorHandler);		// global error handler

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// For user authentication section =============================
/*var port = process.env.NODE_ENV === 'production' ? 80: 4000;
var server = app.listen(port, function() {
	console.log('Server listening for authentication on port ' + port);
});*/

module.exports = app;
