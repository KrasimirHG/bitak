const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Shema
const ItemSchema = new Schema({
	name: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	description: {
		type: String,
	},
	filename: [String],
	filepath: [String],
});

module.exports = Item = mongoose.model("item", ItemSchema);
