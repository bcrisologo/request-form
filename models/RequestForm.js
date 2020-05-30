// /models/RequestForm.js
// Schema for database

var mongoose = require('mongoose');

var RequestFormSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	phone_number: String,
	organization: String,
	updated_at: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('RequestForm', RequestFormSchema);