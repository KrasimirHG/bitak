const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const { generateOTP } = require('../../services/otp');
const { sendMail } = require('../../services/mailService');

// User model
const User = require('../../models/User');
const { updateOne } = require('../../models/User');

// @route  POST api/users
// @desc   register new user
// @access public
router.post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const reqisterUser = async(email) => {
            // Check for existing user
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exist' });

            // generate and store OTP
            const otp = generateOTP();
            // send OTP via email
            const sendOtp = await sendMail({ to: email, otp });
            if (!sendOtp) return res.status(400).json({ msg: 'Can not send OTP' });

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
    };

        reqisterUser(email);
})

router.get('/verifyOtp', (req, res) => {
    console.log(req.url);
    const {email, otp} = req.query;

    if (!email || !otp) {
        return res.status(400).json({ msg: 'Missing email or otp' });
    }

    const checkOtp = async (email, otp) => {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User do not exist' });

        if (user.otp === otp) {
            const activeUser = { $set: { isActive: true } };
            User.updateOne(user, activeUser, function(err) {
                if (err) return res.status(400).json({ msg: err });
                console.log('user status updated');
              });
        } else {
            return res.status(400).json({ msg: 'OTP not match' });
        }

        res.json({ msg: 'user status updated' });
    }

    checkOtp(email, otp);

})

module.exports = router;
