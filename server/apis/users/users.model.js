/* eslint-disable max-len */
const config = require('../../../config/config');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    index: true
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    try {
      return this.find({id});
    } catch (e) {
      const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
      return Promise.reject(err);
    }
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list() {
    return this.find({ }).exec();
  }
};

/**
 * @typedef User
 */

module.exports = mongoose.model('User', UserSchema);
