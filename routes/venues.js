const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Venue = require('../models/Venue');
const auth = require('../middleware/auth');

//@router       GET api/venu
//@desc         Get the information of the venue this user is associted with
//@access       Private
router.get('/', auth, async (req, res) => {
  // console.log(req.user);
  try {
    const venue = await Venue.find({ _id: req.user.venue });
    res.json(venue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@router      POST api/venue
//@desc        Create a new venue
//@access      Public
router.post(
  '/',
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('address.street', 'Please include a street address.').not().isEmpty(),
    check('address.city', 'Please include city.').not().isEmpty(),
    check('address.province', 'Please include a province').not().isEmpty(),
    check('address.postalCode', 'Please include a valid postal code.').isLength(
      {
        min: 6,
      }
    ),
    check('email', 'Please include a valid email.').isEmail(),
    check('phone', 'Please include a valid phone number.').isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure the body of the request
    const { name, address, email, phone } = req.body;

    try {
      //Check if a venue has already been added with that email address
      let user = await Venue.findOne({ name: name });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'Venue of this name already exists.' }],
        });
      }

      //Create an instance of the venue
      venue = new Venue({
        name,
        address,
        email,
        phone,
      });

      await venue.save();
      res.send('Venue Added');
    } catch (err) {}
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
);

module.exports = router;
