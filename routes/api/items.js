const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");
const fs = require("fs");

// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

var upload = multer({ storage: storage });

// const obj = (req, res) => {
// 	upload(req, res, () => {
// 		console.log("Request ---", req.body);
// 		console.log("Request file ---", req.file); //Here you get file.
// 		 const file = new File();
// 		file.meta_data = req.file;
// 		file.save().then(() => {
// 			res.send({ message: "uploaded successfully" });
// 		});
// 		/*Now do where ever you want to do*/
// 	});
// };

//item Model
const Item = require("../../models/Item");

const port = process.env.PORT || 5000;

//@route  GET api/items
//@desc   get all Items
//@access public
router.get("/", (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then((items) => res.json(items));
});

//@route  POST api/items
//@desc   create a Post
//@access private
router.post("/", upload.array("pictures", 6), (req, res, next) => {
	const resImages = req.files;
	const imgNames = resImages.map((img) => img.filename);
	const imgPaths = resImages.map(
		(img) => `${req.hostname}:${port}/${img.path}`
	);

	// var filename = req.file.filename;
	// console.log(filename);
	// var filepath = `${req.hostname}:${port}/${req.file.path}`;
	// console.log(filepath);
	const newItem = new Item({
		name: req.body.itemName,
		description: req.body.itemDesc,
		filename: imgNames,
		filepath: imgPaths,
	});

	if (!req.files) {
		const error = new Error("Please upload a files");
		error.httpStatusCode = 400;
		return next(error);
	}

	newItem.save()
	       .then((item) => res.json(item)) //with save() we save the newItem in db
	       .catch((err) => res.status(404).json({ success: false }));
});

//@route  DELETE api/items/:id
//@desc   Delete a item
//@access private
router.delete("/:id", auth, (req, res) => {
	Item.findById(req.params.id)
		.then((item) => item.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
