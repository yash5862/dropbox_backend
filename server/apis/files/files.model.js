/* eslint-disable max-len */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const user = require('../users/users.model');

/**
 * Files Schema
 */
const FilesSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  name: { type: String, required: true },
  originalName: {type: String},
  mime: { type: String },
  size: { type: Number },
  createdBy: {
    type: ObjectId,
    required: true,
    ref: user,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

FilesSchema.method({});

module.exports = mongoose.model('Files', FilesSchema);
