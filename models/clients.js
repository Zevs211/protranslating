import mongoose from 'mongoose'

const { Schema, Types, model } = mongoose;

const ClientSchema = new Schema({
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
    type: Types.ObjectId,
    ref: 'providers',
  }],
}, { timestamps: true });

export default model('clients', ClientSchema);
