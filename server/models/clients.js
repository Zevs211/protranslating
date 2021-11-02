const { Schema, model } = require('mongoose');

const clients = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  providers: [{
    type: Schema.Types.ObjectId,
    ref: 'providers',
  }],
});

module.exports = model('clients', clients);
