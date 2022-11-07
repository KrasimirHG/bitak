const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//CReate schema
const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	registration_date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("user", userSchema);
