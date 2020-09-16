const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Shema
const ItemSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	// filename: [
	// 	{
	// 		type: String,
	// 	},
	// ],
	// filepath: [
	// 	{
	// 		type: String,
	// 	},
	// ],
	filename: {
		type: String,
	},

	filepath: {
		type: String,
	},
});

module.exports = Item = mongoose.model("item", ItemSchema);
