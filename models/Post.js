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
  comments:
  [
    {
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
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      createdDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const populationFields = 'user comments.user';

postSchema.post('save', async doc => {
  await doc.populate(populationFields).execPopulate();
});

function populateFields() {
  this.populate(populationFields);
}

postSchema.pre('find', populateFields);
postSchema.pre('findone', populateFields);
postSchema.pre('findOneAndUpdate', populateFields);

module.exports = mongoose.model('posts', postSchema);
