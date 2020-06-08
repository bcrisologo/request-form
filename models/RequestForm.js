// /models/RequestForm.js
// Schema for database

var mongoose = require('mongoose');

var RequestFormSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	phone_number: String,
	organization: String,
	request: String,
	updated_at: {
		type: Date,
		default: Date.now
	},
});

// Indexing section
RequestFormSchema.index({ first_name: String, last_name: String });

module.exports = mongoose.model('RequestForm', RequestFormSchema);