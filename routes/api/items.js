const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { auth, authCookie } = require('../../middleware/auth');

// SET STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

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

// Item Model
const Item = require('../../models/Item');
// User Model
const User = require('../../models/User');

const port = process.env.PORT || 5000;

// @route  GET api/items
// @desc   get all Items
// @access public
router.get('/', authCookie, async (req, res) => {
// router.get('/', async (req, res) => {

    // Item.find()
    //     .sort({ date: -1 })
    //     .then((items) => res.json(items));

    // const items = await Item.find().sort({ date: -1 });
    // res.json(items);

    // if (req?.user?.id) {
    //     User.findById(req.user.id)
    //     .select('-password')
    //     .then((user) => res.json(user));
    // }
    try {
        const items = await Item.find().sort({ date: -1 });
        let user = {};
        if (req.user?.id) {
            const currentUser = await User.findById(req.user.id).select('-password');
            user = {token: req.cookies?.jwt, user: currentUser};
        }
        const result = {items, user};
        if (req.shouldClearCookies) res.clearCookie('jwt', { path: '/' });
        res.json(result);
    } catch (error) {
       console.log('THE ERROR IS: ', error)
    }
    
});

// @route  POST api/items
// @desc   create a Post
// @access private
router.post('/', upload.array('pictures', 6), (req, res, next) => {
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
        price: req.body.price,
        createdBy: req.body.userId
    });

    if (!req.files) {
        const error = new Error('Please upload a files');
        error.httpStatusCode = 400;
        return next(error);
    }

    newItem
        .save()
        .then((item) => res.json(item)) // with save() we save the newItem in db
        .catch((err) => res.status(404).json({ success: false }));
});

// @route  DELETE api/items/:id
// @desc   Delete a item
// @access private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then((item) => item.remove().then(() => res.json({ success: true })))
        .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
