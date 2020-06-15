/* models/AdminModel.js */

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var AdminInfoSchema = new mongoose.Schema({
	username: String,
	password: String
});

/* Inserting index for query session */
AdminInfoSchema.index({ username: "text" });

/* 
	Simplifies integration between Mongoose and Passport
	Adds 'hash' and 'salt' field to schema
*/
AdminInfoSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('AdminInfo', AdminInfoSchema, 'AdminInfo');