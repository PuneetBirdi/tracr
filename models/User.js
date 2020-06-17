const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'venues',
    required: true,
  },
  access: {
    type: String,
    required: true,
    default: 'staff',
  },
});

module.exports = User = mongoose.model('user', UserSchema);
