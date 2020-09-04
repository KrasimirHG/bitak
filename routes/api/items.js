const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
	destination: "./public/",
	filename: function(req, file, cb) {
		cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
}).single("myImage");

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
router.post("/", (req, res) => {
	upload(
		(req,
		res,
		() => {
			console.log("Request ---", req.body);
			console.log("Request file ---", req.array); //Here you get files.
			const newItem = new Item();
			newItem.name = req.body.name;
			newItem.discription = req.body.description;
			newItem.img = req.file;
		})
	);

	newItem.save().then((item) => res.json(item)); //with save() we save the newItem in db
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
