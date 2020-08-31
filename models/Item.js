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
	description: {
		type: String,
		required: true,
	},
	img: {
		type: Buffer,
	},
});

module.exports = Item = mongoose.model("item", ItemSchema);
