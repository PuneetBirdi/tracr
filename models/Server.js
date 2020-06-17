const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
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
  venue: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'venues',
   required: true
  },
});

module.exports = Server = mongoose.model('server', ServerSchema);
