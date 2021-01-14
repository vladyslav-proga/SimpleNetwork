'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema for posts
const postSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('posts', postSchema);
