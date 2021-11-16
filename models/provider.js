import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const providers = new Schema({
  name: { type: String, required: true, unique: true }
}, { timestamps: true });

export default model('providers', providers);
