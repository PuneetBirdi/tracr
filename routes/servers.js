const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Server = require('../models/Server');
const auth = require('../middleware/auth');

//@router       GET api/servers
//@desc         Get all servers associated with this venue
//@access       Private
router.get('/', auth, async (req, res) => {
  try {
    const servers = await Server.find({ venue: req.user.venue });

    res.json(servers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@router      POST api/servers
//@desc        Create new server
//@access      Private
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('venue', 'This user must be associated with a venue.')
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
    const { name, email, phone } = req.body;
    const venue = req.user.venue;
    try {
      //see if the server already exists
      let user = await Server.findOne({ name: name, venue: venue });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'A server of this name already exists.' }],
        });
      }
      if (req.user.access !== 'mgr') {
        return res.status(400).json({
          errors: [{ msg: 'You do not have authorization to add a server.' }],
        });
      }

      //create a new instance of server
      server = new Server({
        name,
        email,
        phone,
        venue,
      });

      await server.save();
      res.send('Server Registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@router       PUT api/servers/:id
//@desc         Update server information
//@access       Private

//@route    DELETE api/servers/:id
//@desc     DELETE a server
//@access   Private, manager only
router.delete(`/:id`, auth, async (req,res)=>{
  try {
    //locate the server by id
    let server = await Server.findById(req.params.id);

    //if the server doesn't exist in the database return a 404
    if(!server) return res.status(404).json({msg: 'Server not found.'});

    //make sure that this server corresponds with the same venue as the user trying to delete it
    if(server.venue.toString() != req.user.venue){
      return res.status(401).json({msg: 'Not authorized.'});
    }

    //if checks above are passed, delete the Server
    await Server.findByIdAndRemove(req.params.id);
  } catch (error) {
    
  }
})

module.exports = router;
