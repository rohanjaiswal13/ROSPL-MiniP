const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const AccountSchema=new Schema({
	name: {
		type: String,
		required: true
	},
	accountHolder: {
		type: String,
		required: true
	},
	accountType: {
		type: String,
		required: true
	},
	accountNumber: {
		type: Number,
		required: true
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}

});

//export model that was just created for the database
module.exports = Account = mongoose.model('account', AccountSchema)