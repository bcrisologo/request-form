// /models/RequestForm.js
// Schema for database

var mongoose = require('mongoose');

var RequestFormSchema = new mongoose.Schema({
	first_name: {
		type: String,
		min: [2, 'Too few letters'],
		max: 15,
		required: [true, 'First Name required']
	},
	last_name: {
		type: String,
		min: [2, 'Too few letters'],
		max: 15,
		required: [true, 'Last Name required']
	},
	phone_number: {
		type: String,
		min: [10, 'Too few letters'],
		max: 15,
		required: [true, 'Phone number required']
	},
	organization: {
		type: String,
		min: [3, 'Too few letters'],
		max: 20,
		required: [true, 'Organization required']
	},
	request: {
		type: String,
		required: [true, 'Your request is required']
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
});

// Mongoose index section for querying names and organization
RequestFormSchema.index({ first_name: "text", last_name: "text", organization: "text" });

// Named the collection "listofforms"
module.exports = mongoose.model('RequestForm', RequestFormSchema, 'listofforms');