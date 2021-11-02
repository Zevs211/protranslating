const { Schema, model } = require('mongoose')

const providers = new Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = model('providers', providers);
