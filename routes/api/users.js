const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const { generateOTP } = require('../../services/otp');
const { sendMail } = require('../../services/mailService');

// User model
const User = require('../../models/User');

// @route  POST api/users
// @desc   register new user
// @access public
router.post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
        // Check for existing user
        User.findOne({ email }).then((user) => {
            if (user) return res.status(400).json({ msg: 'User already exist' });

            // generate and store OTP
            const otp = generateOTP();
            // send OTP via email
            sendMail({ to: email, otp }).then(info => {
                if (!info) return res.status(400).json({ msg: 'Can not send OTP' });
            })

            const newUser = new User({
                firstName,
                lastName,
                email,
                password,
                otp
            });


            // create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user) => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email,
                                        isActive
                                    }
                                });
                            }
                        );
                    });
                });
            });
        })
        .catch(err => res.status(400).json({ msg: err }))
})

module.exports = router;
