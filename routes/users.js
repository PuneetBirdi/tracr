const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@router      POST api/users
//@desc        Create new user
//@access      Public
router.post(
  '/',
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('access', 'Please select an access level.').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('venue', 'This user must be associated with a venue.')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 4 or more characters.'
    ).isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    // if there's an errors return from validation, return 400 code and the errors array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructure the body of the request
    const { email, name, access, password, venue } = req.body;

    try {
      //see if the user already exists
      let user = await User.findOne({ email: email, venue: venue });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already registered.' }],
        });
      }

      //create a new instance of user
      user = new User({
        name,
        email,
        password,
        access,
        venue,
      });

      //hashing the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          access: user.access,
          venue: user.venue,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      //Catch a potential error and return 500 status
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
