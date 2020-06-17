const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'venues',
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'servers',
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
  contact: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  notes: {
    type: String,
  },
  guests: [{ type: String }],
});

module.exports = Party = mongoose.model('party', PartySchema);
