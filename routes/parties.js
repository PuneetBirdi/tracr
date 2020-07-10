const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Server = require('../models/Server');
const User = require('../models/User');
const Party = require('../models/Party');
const auth = require('../middleware/auth');
const { query } = require('express');

//@router       GET api/parties/history
//@desc         Get all the parties that have been to this venue
//@access       Private
router.get('/history', auth, async (req, res) => {
  console.log(req.query);
  if (JSON.stringify(req.query) === '{}') {
    try {
      const parties = await Party.find({
        venue: req.user.venue,
      })
        .populate('server', ['name'])
        .sort({ time: -1 });
      result = parties;
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } else {
    try {
      //CREATE A DYNAMIC QUERY OBJECT BASED ON WHICH PARAMETERS HAVE BEEN PASSED IN
      let queryObj = {};

      if (req.query.server !== '') {
        queryObj = {
          venue: req.user.venue,
          server: req.query.server,
          time: {
            $gte: req.query.endDate,
            $lte: req.query.startDate,
          },
        };
      } else {
        queryObj = {
          venue: req.user.venue,
          time: {
            $gte: req.query.endDate,
            $lte: req.query.startDate,
          },
        };
      }

      const parties = await Party.find(queryObj)
        .populate('server', ['name'])
        .sort({ time: -1 });
      result = parties;
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
});

//@router      POST api/parties
//@desc        Create new party
//@access      Private
router.post(
  '/',
  auth,
  [
    check('contact.name', 'Name is required.').not().isEmpty(),
    check('server', 'Please indicate who will be serving this party.')
      .not()
      .isEmpty(),
    check('table', 'Please indicate the table where this party will be seated.')
      .not()
      .isEmpty(),
    check('contact', 'Please indicate the main contact for this party.')
      .not()
      .isEmpty(),
    check('guests', 'Please add the guests present in this party.')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    // if there's an errors return from validation, return 400 code and the errors array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructure the body of the request
    const { time, server, table, contact, guests, notes } = req.body;

    const venue = req.user.venue;

    try {
      //create a new instance of server
      party = new Party({
        venue,
        time,
        server,
        table,
        contact,
        guests,
        notes,
      });
      const newParty = await party.save();
      res.json(newParty);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
