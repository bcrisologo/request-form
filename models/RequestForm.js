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

// Mongoose index section for querying names and organization
RequestFormSchema.index({ first_name: "text", last_name: "text", organization: "text" });

module.exports = mongoose.model('RequestForm', RequestFormSchema);