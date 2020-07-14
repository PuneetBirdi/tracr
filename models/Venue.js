const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: String,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = Venue = mongoose.model('venue', VenueSchema);
