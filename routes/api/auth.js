/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { auth } = require('../../middleware/auth');

// User model
const User = require('../../models/User');

// @route  POST api/auth
// @desc  user login
// @access public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const findUser = async (email) => {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User do not exist' });
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Bad credentials' });

    jwt.sign(
      { id: user.id },
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        });
        res.json({
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        });
      },
    );
  };
  findUser(email);
});

// @route  GET api/auth/user
// @desc  get user data
// @access private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

// @route  GET api/auth/logout
// @desc  logout user
router.get('/logout', (req, res) => {
//     res.cookie('jwt', '', {
//         httpOnly: true,
//         maxAge: 0, // delete cookies
//         expires: Date.now()
//       })
  // res.cookie.set('jwt', {expires: Date.now()});
  res.clearCookie('jwt', { path: '/' });
  res.json({ success: true });
});

module.exports = router;
