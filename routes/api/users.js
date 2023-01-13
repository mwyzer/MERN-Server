const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { request, response } = require('express');
const { check, validationResult } = require('express-validator');

//route get all user
router.get('/', (request, response) => response.send('User Route'));

// @route POST
router.post(
  '/',
  [
    // validator
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email address is required').isEmail(),
    check('password', 'Password must have at least 4 characters').isLength({
      min: 4,
    }),
  ],

  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    //destructuring
    const { name, email, password } = request.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return response
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      response.json(request.body);
    } catch (error) {
      console.log(error.message);
      response.status(500).send('Server Error');
    }
  }
);

module.exports = router;
